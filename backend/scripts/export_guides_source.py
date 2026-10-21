"""Export private guide/article research into one AI-friendly JSON file.

This is a local working artifact. It is intentionally written below
``backend/private`` (which is gitignored) and must never be published. The
next step is to give this JSON to an AI editor, review its rewritten content,
then run ``sync_guides --input ... --ai --single-file --apply``.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = BACKEND_DIR / "private/guide-source.json"
PRIVATE_ENV_FILE = BACKEND_DIR / ".env.guide-sync"


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def extract_article(page_html: str, page_url: str) -> dict[str, Any]:
    soup = BeautifulSoup(page_html, "html.parser")
    for element in soup(["script", "style", "nav", "footer", "header", "form"]):
        element.decompose()

    title_node = soup.select_one("h1, article h2, [class*='post'] h2")
    title = clean_text(title_node.get_text(" ", strip=True)) if title_node else ""
    date_node = soup.select_one("time, [class*='date'], [class*='Date']")
    date = clean_text(date_node.get_text(" ", strip=True)) if date_node else ""
    image_node = soup.select_one("article img, main img, [class*='post'] img")
    image_url = urljoin(page_url, str(image_node.get("src", ""))) if image_node else ""
    content_node = soup.select_one("article, main, [class*='content'], [class*='post']") or soup.body
    paragraphs: list[str] = []
    if content_node:
        for node in content_node.select("h1, h2, h3, h4, p, li"):
            text = clean_text(node.get_text(" ", strip=True))
            if len(text) >= 20 and text not in paragraphs:
                paragraphs.append(text)

    product_links = []
    for link in soup.select("a[href*='/product/']"):
        href = urljoin(page_url, str(link.get("href", "")))
        slug = unquote(urlparse(href).path.rstrip("/").split("/product/")[-1]).lower()
        title_text = clean_text(link.get_text(" ", strip=True))
        if slug and slug not in {item["sourceSlug"] for item in product_links}:
            product_links.append({"sourceSlug": slug, "title": title_text})

    return {
        "sourceUrl": page_url,
        "sourceSlug": unquote(urlparse(page_url).path.rstrip("/").split("/blog/")[-1]).lower(),
        "sourceTitle": title,
        "sourceDate": date,
        "sourceImageUrl": image_url,
        "sourceProductLinks": product_links,
        "sourceContent": "\n\n".join(paragraphs),
    }


def discover_article_urls(index_html: str, index_url: str) -> list[str]:
    soup = BeautifulSoup(index_html, "html.parser")
    urls: list[str] = []
    seen: set[str] = set()
    for link in soup.select("a[href]"):
        url = urljoin(index_url, str(link.get("href", "")))
        path = urlparse(url).path
        if "/blog/" not in path:
            continue
        normalized = url.split("#", 1)[0].rstrip("/")
        if normalized not in seen:
            urls.append(normalized)
            seen.add(normalized)
    return urls


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export private guide research for AI editing")
    parser.add_argument("--source-url", default="", help="Private reference site base URL")
    parser.add_argument("--paths", default="/blog", help="Comma-separated index paths")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Private JSON output path")
    parser.add_argument("--limit", type=int, default=0, help="Limit article count; 0 means all")
    return parser.parse_args()


def main() -> int:
    load_dotenv(PRIVATE_ENV_FILE)
    args = parse_args()
    source_url = args.source_url or os.getenv("GUIDE_SOURCE_URL", "")
    if not source_url:
        raise SystemExit("Set GUIDE_SOURCE_URL in backend/.env.guide-sync or pass --source-url")

    headers = {"User-Agent": "Mozilla/5.0 (compatible; Fluxo private exporter)", "Accept-Language": "fa,en;q=0.8"}
    urls: list[str] = []
    with httpx.Client(headers=headers, follow_redirects=True, timeout=45.0) as client:
        for path in [part.strip() for part in args.paths.split(",") if part.strip()]:
            index_url = urljoin(source_url.rstrip("/") + "/", path.lstrip("/"))
            response = client.get(index_url)
            response.raise_for_status()
            urls.extend(discover_article_urls(response.text, index_url))

        unique_urls = list(dict.fromkeys(urls))
        if args.limit > 0:
            unique_urls = unique_urls[:args.limit]
        guides: list[dict[str, Any]] = []
        for index, article_url in enumerate(unique_urls, start=1):
            response = client.get(article_url)
            response.raise_for_status()
            article = extract_article(response.text, article_url)
            if article["sourceTitle"] and article["sourceContent"]:
                guides.append({"id": index, "editorial": {}, **article})
            print(f"[{index}/{len(unique_urls)}] {article.get('sourceTitle') or article_url}")

    payload = {
        "exportedAt": datetime.now(timezone.utc).isoformat(),
        "sourceBaseUrl": source_url,
        "guides": guides,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\nExported {len(guides)} private guides to {args.output}")
    print("Edit this private JSON with AI, then run sync_guides with --input.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
