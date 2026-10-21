"""Synchronize catalog prices from a private reference page.

The source URL is deliberately supplied at runtime through ``PRICE_SOURCE_URL``
or ``--source-url``.  Nothing fetched from the reference site is written to
the frontend catalog; the only generated frontend artifact is a mapping of
existing product slugs to numeric prices.

Typical usage (from ``backend/``)::

    python -m scripts.sync_prices --source-url "$PRICE_SOURCE_URL"
    python -m scripts.sync_prices --source-url "$PRICE_SOURCE_URL" --apply

Use ``--input`` to review a previously exported JSON payload without making a
network request.  The default mode is a dry run.  ``--apply`` is required to
write ``frontend/data/price-overrides.json``.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import threading
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Iterable, Sequence
from urllib.parse import unquote, urljoin

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[1]
ROOT_DIR = BACKEND_DIR.parent
FRONTEND_PRODUCTS = ROOT_DIR / "frontend/data/products.ts"
PRICE_OVERRIDES = ROOT_DIR / "frontend/data/price-overrides.json"
PRIVATE_ENV_FILE = BACKEND_DIR / ".env.price-sync"
SYNC_LOCK = threading.Lock()

PERSIAN_DIGITS = str.maketrans("۰۱۲۳۴۵۶۷۸۹", "0123456789")
ARABIC_DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")
GENERIC_WORDS = {
    "account",
    "ai",
    "plus",
    "premium",
    "pro",
    "subscription",
    "اشتراک",
    "اکانت",
    "خرید",
    "پریمیوم",
    "ویژه",
    "قانونی",
    "روی",
    "ایمیل",
    "فوری",
    "ارزان",
    "ماه",
    "ماهانه",
}


@dataclass(frozen=True)
class PriceRecord:
    name: str
    price: int
    name_en: str = ""
    slug: str = ""


@dataclass(frozen=True)
class ProductMatch:
    catalog: PriceRecord
    source: PriceRecord
    score: float


def clean_price(value: Any) -> int:
    """Return a positive integer price from Persian or Latin text."""

    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return int(round(value))
    text = str(value or "").translate(PERSIAN_DIGITS).translate(ARABIC_DIGITS)
    digits = re.sub(r"[^0-9]", "", text)
    try:
        return int(digits)
    except ValueError:
        return 0


def normalize_text(value: str) -> str:
    value = unicodedata.normalize("NFKC", value or "")
    value = value.translate(PERSIAN_DIGITS).translate(ARABIC_DIGITS).lower()
    value = value.replace("ي", "ی").replace("ك", "ک")
    return re.sub(r"[^\w\s-]", " ", value, flags=re.UNICODE)


def meaningful_tokens(record: PriceRecord) -> set[str]:
    values = (record.name, record.name_en, record.slug)
    tokens = {
        token
        for value in values
        for token in normalize_text(value).replace("-", " ").split()
        if len(token) > 1 and token not in GENERIC_WORDS and not token.isdigit()
    }
    return tokens


def identifier_tokens(record: PriceRecord) -> set[str]:
    """Return product-brand tokens, excluding descriptive Persian copy."""

    # A curated catalog has a reliable Latin identity. For a parsed HTML
    # record the slug is usually the reliable identity; fall back to the
    # display name only when neither is available.
    values = (record.name_en, record.slug) if (record.name_en or record.slug) else (record.name,)
    return {
        token
        for value in values
        for token in normalize_text(value).replace("-", " ").split()
        if len(token) > 1 and token not in GENERIC_WORDS and not token.isdigit()
    }


def record_similarity(left: PriceRecord, right: PriceRecord) -> float:
    """Score two products using names and stable English/slug identifiers."""

    left_tokens = meaningful_tokens(left)
    right_tokens = meaningful_tokens(right)
    if not left_tokens or not right_tokens:
        return 0.0

    overlap = len(left_tokens & right_tokens)
    token_score = (overlap / len(left_tokens) + overlap / len(right_tokens)) / 2

    left_identifiers = identifier_tokens(left)
    right_identifiers = identifier_tokens(right)
    identifier_overlap = len(left_identifiers & right_identifiers)
    identifier_score = (
        (identifier_overlap / len(left_identifiers) + identifier_overlap / len(right_identifiers)) / 2
        if left_identifiers and right_identifiers
        else 0.0
    )
    sequence_score = max(
        SequenceMatcher(None, normalize_text(left.name), normalize_text(right.name)).ratio(),
        SequenceMatcher(None, normalize_text(left.name_en), normalize_text(right.name)).ratio() if left.name_en else 0.0,
        SequenceMatcher(None, normalize_text(left.name_en), normalize_text(right.name_en)).ratio()
        if left.name_en and right.name_en
        else 0.0,
        SequenceMatcher(None, normalize_text(left.slug), normalize_text(right.name)).ratio()
        if left.slug
        else 0.0,
    )
    return max(token_score, identifier_score, sequence_score)


def match_products(
    catalog: Sequence[PriceRecord],
    source: Sequence[PriceRecord],
    minimum_score: float = 0.62,
) -> list[ProductMatch]:
    """Create one-to-one matches, preferring the strongest candidates first."""

    candidates = sorted(
        [
            (
            record_similarity(catalog_product, source_product),
            catalog_product,
            source_product,
            )
            for catalog_product in catalog
            for source_product in source
            if source_product.price > 0
        ],
        key=lambda item: item[0],
    )
    candidates.reverse()

    used_catalog: set[str] = set()
    used_source: set[tuple[str, int]] = set()
    matches: list[ProductMatch] = []
    for score, catalog_product, source_product in candidates:
        catalog_key = catalog_product.slug or catalog_product.name
        source_key = (source_product.name, source_product.price)
        if score < minimum_score or catalog_key in used_catalog or source_key in used_source:
            continue
        matches.append(ProductMatch(catalog_product, source_product, score))
        used_catalog.add(catalog_key)
        used_source.add(source_key)
    return sorted(matches, key=lambda item: item.catalog.slug or item.catalog.name)


def _json_string(value: str) -> str:
    try:
        return json.loads(f'"{value}"')
    except json.JSONDecodeError:
        return value


def load_catalog(path: Path = FRONTEND_PRODUCTS) -> list[PriceRecord]:
    """Read only the stable identity fields from the TypeScript catalog."""

    text = path.read_text(encoding="utf-8")
    pattern = re.compile(
        r'"id"\s*:\s*(\d+).*?'
        r'"name"\s*:\s*"((?:\\.|[^"\\])*)".*?'
        r'"nameEn"\s*:\s*"((?:\\.|[^"\\])*)".*?'
        r'"slug"\s*:\s*"((?:\\.|[^"\\])*)".*?'
        r'"price"\s*:\s*([0-9]+(?:\.[0-9]+)?)',
        re.DOTALL,
    )
    records = [
        PriceRecord(
            name=_json_string(match.group(2)),
            price=int(float(match.group(5))),
            name_en=_json_string(match.group(3)),
            slug=_json_string(match.group(4)),
        )
        for match in pattern.finditer(text)
    ]
    if not records:
        raise ValueError(f"No catalog products found in {path}")
    return records


def load_json_records(path: Path) -> list[PriceRecord]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    raw_products = payload.get("products", payload) if isinstance(payload, dict) else payload
    if not isinstance(raw_products, list):
        raise ValueError("Input JSON must contain a products array")

    records: list[PriceRecord] = []
    for item in raw_products:
        if not isinstance(item, dict):
            continue
        price = clean_price(item.get("price"))
        name = str(item.get("name") or "").strip()
        if name and price > 0:
            records.append(
                PriceRecord(
                    name=name,
                    price=price,
                    name_en=str(item.get("nameEn") or item.get("name_en") or ""),
                    slug=str(item.get("slug") or ""),
                )
            )
    if not records:
        raise ValueError(f"No priced products found in {path}")
    return records


def _first_text(element: Any, selectors: Iterable[str]) -> str:
    for selector in selectors:
        child = element.select_one(selector)
        if child:
            text = " ".join(child.stripped_strings)
            if text:
                return text
    return ""


def parse_html_records(html: str) -> list[PriceRecord]:
    """Extract product names and prices without retaining source HTML."""

    soup = BeautifulSoup(html, "html.parser")
    selectors = (
        "article",
        "[class*='product']",
        "[class*='card']",
        "[class*='item']",
    )
    seen: set[tuple[str, int]] = set()
    records: list[PriceRecord] = []
    product_links = soup.select("a[href*='/product/']")
    cards = product_links or soup.select(", ".join(selectors))
    for card in cards:
        name = _first_text(card, ("h1", "h2", "h3", "h4", "h5", "[class*='title']", "[class*='name']"))
        if not name:
            continue

        price = 0
        # The reference markup exposes the current selling amount as js-price
        # and the crossed-out amount as raw-price. Prefer the former.
        price_nodes = card.select("[class*='js-price'], .js-price")
        if not price_nodes:
            price_nodes = card.select("[class*='price']:not([class*='raw-price']), [class*='amount']")
        preferred_prices: list[int] = []
        fallback_prices: list[int] = []
        for node in price_nodes:
            text = " ".join(node.stripped_strings)
            if not re.search(r"[0-9۰-۹٠-٩]", text):
                continue
            candidate = clean_price(text)
            if candidate > 0:
                preferred_prices.append(candidate)
        if preferred_prices:
            price = min(preferred_prices)
        else:
            for node in card.select("span, p"):
                text = " ".join(node.stripped_strings)
                if not re.search(r"[0-9۰-۹٠-٩]", text):
                    continue
                candidate = clean_price(text)
                if candidate >= 1000:
                    fallback_prices.append(candidate)
            if fallback_prices:
                price = min(fallback_prices)
        if price <= 0:
            continue

        href = card.get("href", "")
        source_slug = ""
        if "/product/" in href:
            source_slug = unquote(href.split("/product/", 1)[1].split("?", 1)[0]).strip("/").lower()
        key = (normalize_text(name), price)
        if key not in seen:
            records.append(PriceRecord(name=name, price=price, slug=source_slug))
            seen.add(key)
    return records


def fetch_source_records(source_url: str, paths: Sequence[str]) -> list[PriceRecord]:
    if not source_url:
        raise ValueError("Set PRICE_SOURCE_URL or pass --source-url")

    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; Fluxo price updater)",
        "Accept-Language": "fa,en;q=0.8",
    }
    records: list[PriceRecord] = []
    with httpx.Client(headers=headers, follow_redirects=True, timeout=30.0) as client:
        for path in paths:
            url = urljoin(source_url.rstrip("/") + "/", path.lstrip("/"))
            response = client.get(url)
            response.raise_for_status()
            records.extend(parse_html_records(response.text))

    unique: dict[tuple[str, int], PriceRecord] = {}
    for record in records:
        unique[(normalize_text(record.name), record.price)] = record
    return list(unique.values())


def load_overrides(path: Path = PRICE_OVERRIDES) -> dict[str, int]:
    if not path.exists():
        return {}
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError(f"Price overrides must be an object: {path}")
    return {str(slug): clean_price(price) for slug, price in payload.items() if clean_price(price) > 0}


def write_overrides(matches: Sequence[ProductMatch], path: Path = PRICE_OVERRIDES) -> None:
    overrides = load_overrides(path)
    for match in matches:
        overrides[match.catalog.slug] = match.source.price
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(dict(sorted(overrides.items())), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def write_database_overrides(matches: Sequence[ProductMatch]) -> None:
    """Persist the public catalog price map without persisting source metadata."""

    from app.db.client import execute

    for match in matches:
        execute(
            """
            INSERT INTO catalog_price_overrides (slug, price, updated_at)
            VALUES (?, ?, datetime('now'))
            ON CONFLICT(slug) DO UPDATE SET
                price=excluded.price,
                updated_at=excluded.updated_at
            """,
            [match.catalog.slug, match.source.price],
        )


def sync_catalog_prices(
    source_url: str,
    paths: Sequence[str],
    minimum_score: float = 0.62,
    minimum_matches: int = 1,
) -> dict[str, Any]:
    """Fetch, match and persist prices for the one-click admin action.

    The source URL is read only at runtime. Only slug/price pairs and a server
    timestamp are persisted; source HTML, URLs and names are discarded.
    """

    if not source_url:
        raise ValueError("Private price source is not configured on the server")
    normalized_paths = [path for path in paths if path] or ["/"]
    with SYNC_LOCK:
        catalog = load_catalog()
        source = fetch_source_records(source_url, normalized_paths)
        matches = match_products(catalog, source, minimum_score=minimum_score)
        if len(matches) < minimum_matches:
            raise RuntimeError(
                f"Only {len(matches)} catalog prices matched; refusing to publish the result"
            )
        write_database_overrides(matches)

        # Keep the transactional backend catalog in sync when a matching
        # product exists there. The public static catalog may contain more
        # products than the purchase database, so unmatched rows are expected.
        database_matches = match_products(
            [
                PriceRecord(name=record.name, name_en=record.name, slug=str(product_id))
                for product_id, record in load_database_records()
            ],
            source,
            minimum_score=minimum_score,
        )
        updated_backend = apply_database_matches(database_matches)

    return {
        "matched": len(matches),
        "catalog_products": len(catalog),
        "source_products": len(source),
        "backend_products_updated": updated_backend,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


def print_report(matches: Sequence[ProductMatch], catalog_count: int, source_count: int) -> None:
    print(f"Catalog products: {catalog_count}")
    print(f"Source products: {source_count}")
    print(f"Accepted matches: {len(matches)}")
    print()
    for match in matches:
        print(
            f"{match.catalog.slug:32} "
            f"{match.catalog.name[:34]:34} "
            f"{match.catalog.price or 0:>10,} -> {match.source.price:>10,} "
            f"({match.score:.0%})"
        )


def load_database_records() -> list[tuple[int, PriceRecord]]:
    from app.db.client import execute

    result = execute("SELECT id, name, price FROM products WHERE is_active=1 ORDER BY sort_order")
    return [
        (int(row.values[0]), PriceRecord(name=str(row.values[1]), price=clean_price(row.values[2])))
        for row in result.rows
        if row.values[1] and clean_price(row.values[2]) > 0
    ]


def apply_database_matches(matches: Sequence[ProductMatch]) -> int:
    from app.db.client import execute

    updated = 0
    for match in matches:
        product_id = int(match.catalog.slug)
        result = execute("UPDATE products SET price=? WHERE id=?", [match.source.price, product_id])
        # Turso does not expose a portable rowcount through both API versions;
        # the successful statement is the useful signal here.
        if result is not None:
            updated += 1
    return updated


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Review and apply catalog price updates")
    source = parser.add_mutually_exclusive_group()
    source.add_argument("--source-url", help="Private reference page base URL")
    source.add_argument("--input", type=Path, help="Previously exported JSON payload")
    parser.add_argument(
        "--paths",
        default="/",
        help="Comma-separated paths to inspect when using --source-url (default: /)",
    )
    parser.add_argument(
        "--target",
        choices=("frontend", "backend", "both"),
        default="frontend",
        help="Artifact to update when --apply is provided",
    )
    parser.add_argument("--min-score", type=float, default=0.62, help="Minimum automatic match score")
    parser.add_argument("--min-matches", type=int, default=1, help="Abort if fewer matches are found")
    parser.add_argument("--apply", action="store_true", help="Write the selected target")
    return parser.parse_args()


def main() -> int:
    load_dotenv(PRIVATE_ENV_FILE)
    load_dotenv(BACKEND_DIR / ".env")
    args = parse_args()

    try:
        catalog = load_catalog()
        if args.input:
            source = load_json_records(args.input)
        else:
            source_url = args.source_url or os.getenv("PRICE_SOURCE_URL", "")
            configured_paths = os.getenv("PRICE_SOURCE_PATHS", "")
            paths_value = configured_paths if args.paths == "/" and configured_paths else args.paths
            source = fetch_source_records(source_url, [p.strip() for p in paths_value.split(",") if p.strip()])

        matches = match_products(catalog, source, minimum_score=args.min_score)
        print_report(matches, len(catalog), len(source))
        if len(matches) < args.min_matches:
            raise RuntimeError(f"Only {len(matches)} matches found; refusing to continue")

        if not args.apply:
            print("\nDry run only. Re-run with --apply to write changes.")
            return 0

        if args.target in ("frontend", "both"):
            write_overrides(matches)
            print(f"\nWrote {len(matches)} price overrides to {PRICE_OVERRIDES}")

        if args.target in ("backend", "both"):
            database = load_database_records()
            database_matches = match_products(
                [
                    PriceRecord(name=record.name, name_en=record.name, slug=str(product_id))
                    for product_id, record in database
                ],
                source,
                minimum_score=args.min_score,
            )
            updated = apply_database_matches(database_matches)
            print(f"Updated {updated} backend product prices")
        return 0
    except (OSError, ValueError, RuntimeError, httpx.HTTPError) as error:
        print(f"Price sync failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
