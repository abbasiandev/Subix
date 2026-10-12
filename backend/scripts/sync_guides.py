"""Discover new guide topics from a private feed and publish original guides.

Only link titles and product identity hints are read from the private feed.
Article prose, remote images, hostnames, and source slugs are never copied to
the public catalog. The generated entries are append-only so an update cannot
silently replace an existing guide.
"""

from __future__ import annotations

import argparse
import base64
from difflib import SequenceMatcher
import hashlib
import html
import json
import os
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv

from scripts.sync_prices import FRONTEND_PRODUCTS, PriceRecord, load_catalog, record_similarity


BACKEND_DIR = Path(__file__).resolve().parents[1]
ROOT_DIR = BACKEND_DIR.parent
GUIDES_JSON = ROOT_DIR / "frontend/data/guides.json"
COVERS_DIR = ROOT_DIR / "frontend/public/selection-guides"
PRIVATE_ENV_FILE = BACKEND_DIR / ".env.guide-sync"

BLUEPRINTS: list[tuple[str, tuple[str, ...], str, str, list[str]]] = [
    ("محتوای تصویری", ("ویدیو", "ادیت", "طراحی", "تصویر", "canva", "capcut", "captions"), "برای ساخت محتوای تصویری", "اگر خروجی شما تصویر یا ویدیوست، ابزار را با سرعت تولید، کنترل قالب و کیفیت خروجی مقایسه کنید.", ["طراحی", "ویدیو", "شبکه اجتماعی"]),
    ("تحقیق و نوشتن", ("chatgpt", "claude", "gemini", "پرامپت", "نوشتن", "هوش مصنوعی"), "برای تحقیق و نوشتن", "برای کار متنی، کیفیت تصمیم‌گیری را با یک ورودی ثابت و یک معیار قابل بررسی بسنجید.", ["تحقیق", "نگارش", "اسناد"]),
    ("یادگیری زبان", ("زبان", "duolingo", "busuu", "english", "گرامر"), "برای ساختن عادت یادگیری", "هدف هفتگی خود را مشخص کنید و ابزاری را انتخاب کنید که همان فعالیت را آسان‌تر و تکرارپذیرتر می‌کند.", ["زبان", "تمرین", "یادگیری"]),
    ("موسیقی و صدا", ("موسیقی", "suno", "spotify", "sound", "audio"), "برای موسیقی و صدا", "برای شنیدن یا ساختن صدا، نوع دسترسی، سقف مصرف و کاربرد نهایی را پیش از قیمت بررسی کنید.", ["موسیقی", "تولید", "استریم"]),
    ("توسعه نرم‌افزار", ("کد", "program", "cursor", "github", "توسعه", "نرم افزار"), "برای کدنویسی و توسعه", "یک تغییر کوچک و قابل تست، معیار بهتری از نمایش‌های تبلیغاتی برای سنجش دستیار توسعه است.", ["کدنویسی", "توسعه", "بازبینی"]),
]


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").lower().replace("ي", "ی").replace("ك", "ک")).strip()


def classify(title: str) -> tuple[str, str, str, list[str]]:
    value = normalize(title)
    for category, keywords, guide_title, summary, tags in BLUEPRINTS:
        if any(keyword in value for keyword in keywords):
            return category, guide_title, summary, tags
    return "راهنمای انتخاب", "برای انتخاب ابزار مناسب", "نیاز، روش استفاده و نوع دسترسی را کنار هم بگذارید تا انتخاب شما از مسئله واقعی شروع شود.", ["انتخاب", "مقایسه", "ابزار"]


def discover_links(page_html: str, page_url: str) -> list[tuple[str, str, str]]:
    soup = BeautifulSoup(page_html, "html.parser")
    links: list[tuple[str, str, str]] = []
    seen: set[str] = set()
    for anchor in soup.select("a[href]"):
        href = str(anchor.get("href", ""))
        parsed = urlparse(urljoin(page_url, href))
        if "/blog/" not in parsed.path:
            continue
        slug = unquote(parsed.path.rstrip("/").split("/blog/", 1)[-1]).lower()
        title = " ".join(anchor.stripped_strings)
        if not slug or len(title) < 8 or slug in seen:
            continue
        links.append((slug, title, parsed.geturl()))
        seen.add(slug)
    return links


def find_products(title: str, catalog: list[PriceRecord]) -> list[str]:
    ranked = sorted(
        ((record_similarity(product, PriceRecord(name=title, price=1)), product.slug) for product in catalog),
        reverse=True,
    )
    return [slug for score, slug in ranked[:4] if score >= 0.52]


def extract_article_text(page_html: str) -> str:
    """Extract private reference text in memory; never write it to the repo."""

    soup = BeautifulSoup(page_html, "html.parser")
    for element in soup(["script", "style", "nav", "footer", "header", "form"]):
        element.decompose()
    content = soup.select_one("article, main, [class*='content'], [class*='post']") or soup.body
    if not content:
        return ""
    text = re.sub(r"\s+", " ", content.get_text(" ", strip=True)).strip()
    return text[:14000]


def _response_text(response: httpx.Response) -> str:
    payload = response.json()
    try:
        return str(payload["choices"][0]["message"]["content"])
    except (KeyError, IndexError, TypeError) as error:
        raise ValueError("AI provider returned an unexpected response") from error


def generate_with_ai(
    client: httpx.Client,
    api_url: str,
    api_key: str,
    model: str,
    source_title: str,
    source_text: str,
    category: str,
    product_slugs: list[str],
    catalog: list[PriceRecord],
) -> dict[str, Any]:
    """Ask an AI provider for an independent guide, never for a translation."""

    product_names = [product.name for product in catalog if product.slug in product_slugs]
    system_prompt = """تو ویراستار ارشد محتوای فارسی برای فروشگاه سابیکس هستی.
یک راهنمای کاملاً مستقل و تازه بنویس؛ متن منبع را ترجمه، خلاصه، پارافریز یا با همان ساختار بازتولید نکن.
از عبارت‌ها، تیترها، ترتیب بخش‌ها، ادعاهای اختصاصی و لحن منبع فاصله بگیر. فقط از موضوع کلی برای ایده‌گرفتن استفاده کن.
نام برند یا فروشگاه منبع، آدرس سایت، URL، عبارت‌های مربوط به منبع، قیمت ثابت، تخفیف و ادعای تأییدنشده را ننویس.
راهنما باید تصمیم‌محور، کاربردی، بی‌طرف و به فارسی باشد. قیمت و مدت را به مقاله وارد نکن؛ این‌ها از کاتالوگ جاری خوانده می‌شوند.
خروجی فقط یک JSON معتبر با کلیدهای title, excerpt, content, tags, category باشد.
content باید Markdown ساده فارسی با ۴ تا ۶ تیتر ## و چند فهرست کوتاه باشد و حداقل ۵۰۰ کلمه داشته باشد.
excerpt یک خلاصه مستقل حداکثر ۲۵۰ کاراکتری باشد. tags آرایه‌ای از ۳ تا ۶ رشته کوتاه باشد."""
    user_prompt = json.dumps(
        {
            "موضوع_کلی": source_title,
            "دسته_سابیکس": category,
            "محصولات_مرتبط": product_names,
            "متن_مرجع_خصوصی_فقط_برای_تحقیق": source_text,
        },
        ensure_ascii=False,
    )
    response = client.post(
        api_url,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={
            "model": model,
            "temperature": 0.85,
            "response_format": {"type": "json_object"},
            "messages": [{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}],
        },
    )
    response.raise_for_status()
    raw = _response_text(response).strip()
    raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw, flags=re.IGNORECASE | re.DOTALL).strip()
    try:
        generated = json.loads(raw)
    except json.JSONDecodeError as error:
        raise ValueError("AI provider did not return valid JSON") from error
    required = ("title", "excerpt", "content", "tags", "category")
    if not isinstance(generated, dict) or not all(generated.get(key) for key in required):
        raise ValueError("AI output is missing a required guide field")
    if not isinstance(generated["tags"], list) or not isinstance(generated["content"], str):
        raise ValueError("AI output has invalid guide field types")

    forbidden = ("منبع", "سایت اصلی")
    output_text = " ".join(str(generated[key]) for key in ("title", "excerpt", "content", "tags")).lower()
    if any(marker in output_text for marker in forbidden):
        raise ValueError("AI output contains a private-source marker; guide was rejected")
    if SequenceMatcher(None, normalize(str(generated["title"])), normalize(source_title)).ratio() >= 0.86:
        raise ValueError("AI title is too close to the private source title; guide was rejected")
    if len(str(generated["content"]).split()) < 250:
        raise ValueError("AI guide is too short; guide was rejected")
    digest = hashlib.sha1(f"{category}|{generated['title']}|{'|'.join(sorted(product_slugs))}".encode()).hexdigest()[:10]
    return {
        "id": 0,
        "slug": f"choose-{digest}",
        "title": str(generated["title"]).strip(),
        "excerpt": str(generated["excerpt"]).strip(),
        "category": "guide",
        "imagePath": f"/selection-guides/choose-{digest}.svg",
        "readTime": max(3, min(12, len(str(generated["content"]).split()) // 180)),
        "publishDate": "2026-10-11",
        "author": "تحریریه سابیکس",
        "content": str(generated["content"]).strip(),
        "tags": [str(tag).strip() for tag in generated["tags"][:6]],
        "productSlugs": product_slugs,
    }


def make_content(category: str, summary: str) -> str:
    return (
        f"این راهنما برای مسیری نوشته شده که با عنوان «{category}» می‌شناسیم. هدف، معرفی یک برنده قطعی نیست؛ "
        "می‌خواهیم قبل از پرداخت، معیارهایی داشته باشید که بتوانید روی کار واقعی خود امتحان کنید.\n\n"
        "## مسئله را به یک آزمون کوتاه تبدیل کنید\n\n"
        f"ابتدا یک کار کوچک از همان مسیری که دنبال می‌کنید انتخاب کنید. {summary} یک ورودی ثابت، زمان انجام و شکل خروجی مطلوب را مشخص کنید تا گزینه‌ها با شرایط برابر مقایسه شوند.\n\n"
        "## سه چیز را کنار هم ببینید\n\n"
        "- نتیجه: آیا خروجی برای کار شما قابل استفاده است یا فقط در پیش‌نمایش جذاب به نظر می‌رسد؟\n"
        "- روند: برای رسیدن به نتیجه چند مرحله و چند اصلاح لازم دارید؟\n"
        "- محدودیت: چه چیزی در نسخه رایگان، دستگاه شما یا نوع پلن در دسترس نیست؟\n\n"
        "## قبل از خرید، یک بار تکرار کنید\n\n"
        "آزمون را با یک نمونه دوم تکرار کنید. اگر نتیجه فقط در یک مثال خوب بود، هنوز برای انتخاب تصمیم کافی ندارید. مواردی را که نیاز به بررسی انسانی دارند جدا بنویسید و وعده‌های عمومی را با تجربه واقعی خود جایگزین کنید.\n\n"
        "## انتخاب را به محصول جاری وصل کنید\n\n"
        "پس از مشخص‌شدن معیارها، جزئیات محصول مرتبط را ببینید: قیمت و مدت در کاتالوگ جاری قرار دارند و ممکن است تغییر کنند. این صفحه برای تصمیم‌گیری درباره مسیر است، نه نگهداری عددهای متغیر."
    )


def make_guide(title: str, product_slugs: list[str], index: int) -> dict[str, Any]:
    category, guide_title, summary, tags = classify(title)
    digest = hashlib.sha1(f"{category}|{'|'.join(sorted(product_slugs))}".encode()).hexdigest()[:10]
    slug = f"choose-{digest}"
    return {
        "id": index,
        "slug": slug,
        "title": guide_title,
        "excerpt": summary,
        "category": "guide",
        "imagePath": f"/selection-guides/{slug}.svg",
        "readTime": 3,
        "publishDate": "2026-10-11",
        "author": "تحریریه سابیکس",
        "content": make_content(category, summary),
        "tags": tags,
        "productSlugs": product_slugs,
    }


def make_editorial_guide(editorial: dict[str, Any], product_slugs: list[str], index: int) -> dict[str, Any]:
    required = ("title", "excerpt", "content", "tags")
    if not all(editorial.get(key) for key in required):
        raise ValueError("AI-edited input needs editorial.title, excerpt, content, and tags")
    content = str(editorial["content"]).strip()
    title = str(editorial["title"]).strip()
    output_text = " ".join([title, str(editorial["excerpt"]), content, " ".join(map(str, editorial["tags"]))]).lower()
    if any(marker in output_text for marker in ("سایت اصلی",)):
        raise ValueError("AI-edited input contains a private-source marker")
    if len(content.split()) < 120:
        raise ValueError("AI-edited guide is too short")
    category = str(editorial.get("category", "guide"))
    digest = hashlib.sha1(f"{category}|{title}|{'|'.join(sorted(product_slugs))}".encode()).hexdigest()[:10]
    return {
        "id": index,
        "slug": str(editorial.get("slug") or f"choose-{digest}"),
        "title": title,
        "excerpt": str(editorial["excerpt"]).strip(),
        "category": category,
        "imagePath": f"/selection-guides/choose-{digest}.svg",
        "readTime": int(editorial.get("readTime", max(3, min(12, len(content.split()) // 180)))),
        "publishDate": str(editorial.get("publishDate", "2026-10-11")),
        "author": str(editorial.get("author", "تحریریه سابیکس")),
        "content": content,
        "tags": [str(tag).strip() for tag in editorial["tags"][:6]],
        "productSlugs": product_slugs,
    }


def load_manual(path: Path) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(payload, dict):
        payload = payload.get("guides", [])
    if not isinstance(payload, list):
        raise ValueError("Manual guide input must be an array")
    return payload


def cover_svg(guide: dict[str, Any], index: int) -> str:
    palette = [("#00f5ff", "#45216f"), ("#ff4ecd", "#1b145c"), ("#c2ef75", "#11624f"), ("#ff795e", "#6b1d40")][index % 4]
    title = html.escape(str(guide["title"]))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 465" role="img" aria-labelledby="title desc"><title id="title">{title}</title><desc id="desc">Original abstract Subix guide illustration</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#070314"/><stop offset=".55" stop-color="{palette[1]}"/><stop offset="1" stop-color="{palette[0]}"/></linearGradient></defs><rect width="800" height="465" fill="url(#bg)"/><circle cx="650" cy="90" r="140" fill="{palette[0]}" opacity=".22"/><path d="M0 370 210 175l115 100 170-155 305 300H0Z" fill="#070314" opacity=".62"/><path d="M110 270h580M250 145v220M420 120v245M585 175v180" stroke="#fff" stroke-opacity=".28" stroke-width="2"/><text x="48" y="72" fill="{palette[0]}" font-family="monospace" font-size="18" letter-spacing="4">SUBIX / GUIDE {index + 1:02d}</text><text x="48" y="390" fill="#fff" font-family="Arial,sans-serif" font-size="30" font-weight="700">{title}</text></svg>'''


def publish(new_guides: list[dict[str, Any]], output_path: Path = GUIDES_JSON, single_file: bool = False) -> None:
    current = json.loads(output_path.read_text(encoding="utf-8")) if output_path.exists() else []
    existing_slugs = {entry["slug"] for entry in current}
    next_id = max((int(entry.get("id", 0)) for entry in current), default=0) + 1
    appended: list[dict[str, Any]] = []
    for guide in new_guides:
        if guide["slug"] in existing_slugs:
            continue
        image_path = f"/selection-guides/{guide['slug']}.svg"
        if single_file:
            cover = cover_svg({**guide, "title": guide["title"]}, len(appended))
            image_path = "data:image/svg+xml;base64," + base64.b64encode(cover.encode("utf-8")).decode("ascii")
        guide = {
            **guide,
            "id": next_id,
            "imagePath": image_path,
        }
        next_id += 1
        existing_slugs.add(guide["slug"])
        current.append(guide)
        appended.append(guide)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(current, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if not single_file:
        COVERS_DIR.mkdir(parents=True, exist_ok=True)
        for index, guide in enumerate(appended):
            (COVERS_DIR / f"{guide['slug']}.svg").write_text(cover_svg(guide, index), encoding="utf-8")
    print(f"Published {len(appended)} new guides; kept {len(current) - len(appended)} existing guides")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Review and append AI-generated original guide entries")
    source = parser.add_mutually_exclusive_group()
    source.add_argument("--source-url", help="Private reference feed base URL")
    source.add_argument("--input", type=Path, help="Manual JSON containing original guide entries")
    parser.add_argument("--paths", default="/blog", help="Comma-separated feed paths")
    parser.add_argument("--min-products", type=int, default=1, help="Minimum linked products for an imported guide")
    parser.add_argument("--limit", type=int, default=6, help="Maximum number of new source articles to process")
    parser.add_argument("--ai", action="store_true", help="Generate original guide copy with the configured AI provider")
    parser.add_argument("--single-file", action="store_true", help="Embed generated SVG covers in guides.json so only that file is needed for merge")
    parser.add_argument("--output", type=Path, default=GUIDES_JSON, help="Published guides JSON path")
    parser.add_argument("--apply", action="store_true", help="Append entries and generate local covers")
    return parser.parse_args()


def main() -> int:
    load_dotenv(PRIVATE_ENV_FILE)
    args = parse_args()
    try:
        catalog = load_catalog(FRONTEND_PRODUCTS)
        ai_api_key = os.getenv("OPENAI_API_KEY", "")
        ai_api_url = os.getenv("AI_API_URL", "https://api.openai.com/v1/chat/completions")
        ai_model = os.getenv("AI_MODEL", "gpt-4o-mini")
        if args.ai and not args.input and not (args.source_url or os.getenv("GUIDE_SOURCE_URL", "")):
            raise ValueError("AI mode needs GUIDE_SOURCE_URL or --input with private exported research")

        if args.input:
            candidates = load_manual(args.input)
            # The exporter stores source fields; map them to the same internal
            # candidate shape without carrying source URLs into public data.
            for candidate in candidates:
                if "productSlugs" not in candidate:
                    candidate["productSlugs"] = []
                if not candidate.get("title"):
                    candidate["title"] = candidate.get("sourceTitle", "راهنمای انتخاب ابزار مناسب")
                if candidate.get("sourceContent") and not candidate.get("content"):
                    candidate["content"] = candidate["sourceContent"]
        else:
            source_url = args.source_url or os.getenv("GUIDE_SOURCE_URL", "")
            if not source_url:
                raise ValueError("Set GUIDE_SOURCE_URL or pass --source-url")
            if args.ai and not ai_api_key:
                raise ValueError("Set OPENAI_API_KEY in backend/.env.guide-sync before using --ai")
            headers = {"User-Agent": "Mozilla/5.0 (compatible; Subix guide updater)", "Accept-Language": "fa,en;q=0.8"}
            candidates = []
            with httpx.Client(headers=headers, follow_redirects=True, timeout=30.0) as client:
                for path in [part.strip() for part in args.paths.split(",") if part.strip()]:
                    page_url = urljoin(source_url.rstrip("/") + "/", path.lstrip("/"))
                    response = client.get(page_url)
                    response.raise_for_status()
                    for _, title, article_url in discover_links(response.text, page_url):
                        product_slugs = find_products(title, catalog)
                        if len(product_slugs) >= args.min_products:
                            candidates.append({"title": title, "productSlugs": product_slugs, "url": article_url})
                            if len(candidates) >= args.limit:
                                break
                    if len(candidates) >= args.limit:
                        break

        generated: list[dict[str, Any]] = []
        seen_products: set[tuple[str, ...]] = set()
        if args.ai and args.input:
            with httpx.Client(headers={"User-Agent": "Mozilla/5.0 (compatible; Subix guide updater)"}, follow_redirects=True, timeout=45.0) as ai_client:
                for candidate in candidates:
                    source_title = str(candidate.get("sourceTitle") or candidate.get("title", ""))
                    editorial = candidate.get("editorial") if isinstance(candidate.get("editorial"), dict) else None
                    product_slugs = [str(slug) for slug in candidate.get("productSlugs", [])]
                    if not product_slugs:
                        product_slugs = find_products(source_title, catalog)
                    if not product_slugs:
                        continue
                    product_key = tuple(sorted(product_slugs))
                    if product_key in seen_products:
                        continue
                    seen_products.add(product_key)
                    if editorial and editorial.get("content"):
                        generated.append(make_editorial_guide(editorial, product_slugs, len(generated) + 1))
                        continue
                    if not ai_api_key:
                        raise ValueError("Set OPENAI_API_KEY or fill editorial fields in the private JSON")
                    source_text = str(candidate.get("sourceContent") or candidate.get("content", ""))
                    if not source_text:
                        continue
                    category, _, _, _ = classify(source_title)
                    generated.append(generate_with_ai(ai_client, ai_api_url, ai_api_key, ai_model, source_title, source_text, category, product_slugs, catalog))
        elif args.ai:
            with httpx.Client(headers={"User-Agent": "Mozilla/5.0 (compatible; Subix guide updater)"}, follow_redirects=True, timeout=45.0) as ai_client:
                for candidate in candidates:
                    product_key = tuple(sorted(str(slug) for slug in candidate["productSlugs"]))
                    if product_key in seen_products:
                        continue
                    seen_products.add(product_key)
                    category, _, _, _ = classify(str(candidate["title"]))
                    article_response = ai_client.get(str(candidate["url"]))
                    article_response.raise_for_status()
                    source_text = extract_article_text(article_response.text)
                    if len(source_text) < 120:
                        print(f"Skipped {candidate['title']}: no usable private article text", file=sys.stderr)
                        continue
                    generated.append(
                        generate_with_ai(
                            ai_client,
                            ai_api_url,
                            ai_api_key,
                            ai_model,
                            str(candidate["title"]),
                            source_text,
                            category,
                            [str(slug) for slug in candidate["productSlugs"]],
                            catalog,
                        )
                    )
        for candidate in (candidates if not args.ai else []):
            product_slugs = [str(slug) for slug in candidate.get("productSlugs", [])]
            if not product_slugs:
                continue
            key = tuple(sorted(product_slugs))
            if key in seen_products:
                continue
            seen_products.add(key)
            if all(field in candidate for field in ("slug", "title", "excerpt", "content", "imagePath", "tags")):
                generated.append(candidate)
            else:
                generated.append(make_guide(str(candidate.get("title", "راهنمای انتخاب ابزار مناسب")), product_slugs, len(generated) + 1))

        print(f"Candidate guides: {len(generated)}")
        for guide in generated:
            print(f"- {guide['slug']}: {', '.join(guide['productSlugs'])}")
        if not args.apply:
            print("\nDry run only. Re-run with --apply to append changes.")
            return 0
        publish(generated, output_path=args.output, single_file=args.single_file)
        return 0
    except (OSError, ValueError, httpx.HTTPError) as error:
        print(f"Guide sync failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
