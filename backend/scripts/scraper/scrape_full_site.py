import asyncio
import json
import re
import math
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://faralicense.ir"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "fa,en;q=0.9",
}

PERSIAN_TO_ENGLISH = str.maketrans('۰۱۲۳۴۵۶۷۸۹', '0123456789')


def clean_price(text: str) -> int:
    if not text:
        return 0
    text = text.translate(PERSIAN_TO_ENGLISH)
    text = re.sub(r'[^\d,]', '', text).replace(',', '')
    try:
        return int(text)
    except ValueError:
        return 0


def clean_text(text: str) -> str:
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()


def infer_category(name: str, desc: str = "") -> str:
    text = (name + " " + desc).lower()
    if any(k in text for k in ['chatgpt', 'gpt', 'openai', 'claude', 'gemini', 'grok', 'leonardo', 'kimi', 'veo', 'suno', 'kling', 'notebooklm', 'monica', 'ai', 'هوش مصنوعی']):
        return 'ai'
    if any(k in text for k in ['spotify', 'apple music', 'soundcloud', 'موزیک', 'ساندکلود', 'اسپاتیفای']):
        return 'music'
    if any(k in text for k in ['youtube', 'netflix', 'disney', 'hulu', 'apple tv', 'crunchyroll', 'فیلم', 'سریال', 'یوتیوب', 'نتفلیکس']):
        return 'media'
    if any(k in text for k in ['github', 'copilot', 'cursor', 'colab', 'sololearn', 'کدنویسی', 'برنامه‌نویسی']):
        return 'devTools'
    if any(k in text for k in ['canva', 'figma', 'adobe', 'photoshop', 'lightroom', 'picsart', 'capcut', 'inshot', 'طراحی', 'ادیت', 'تدوین']):
        return 'design'
    if any(k in text for k in ['grammarly', 'notion', 'duolingo', 'busuu', 'brilliant', 'quillbot', 'reallife', 'drive', 'گوگل درایو', 'مگا', 'زبان']):
        return 'productivity'
    return 'productivity'


def infer_brand_logo(category: str, name: str) -> str:
    n = name.lower()
    if 'chatgpt' in n or 'openai' in n or 'gpt' in n:
        return '/brands/openai.svg'
    if 'claude' in n or 'anthropic' in n:
        return '/brands/anthropic.svg'
    if 'gemini' in n or 'google' in n:
        return '/brands/google.svg'
    if 'spotify' in n:
        return '/brands/spotify.svg'
    if 'youtube' in n:
        return '/brands/youtube.svg'
    if 'netflix' in n:
        return '/brands/netflix.svg'
    if 'github' in n or 'copilot' in n:
        return '/brands/github.svg'
    if 'cursor' in n:
        return '/brands/cursor.svg'
    if 'canva' in n:
        return '/brands/canva.svg'
    if 'figma' in n:
        return '/brands/figma.svg'
    if 'adobe' in n or 'photoshop' in n or 'lightroom' in n:
        return '/brands/adobe.svg'
    if 'notion' in n:
        return '/brands/notion.svg'
    if 'grammarly' in n:
        return '/brands/grammarly.svg'
    if 'discord' in n:
        return '/brands/discord.svg'
    
    # Defaults by category
    cat_logos = {
        'ai': '/brands/openai.svg',
        'music': '/brands/spotify.svg',
        'media': '/brands/youtube.svg',
        'devTools': '/brands/github.svg',
        'design': '/brands/canva.svg',
        'productivity': '/brands/notion.svg',
    }
    return cat_logos.get(category, '/brands/openai.svg')


def generate_slug(name: str, fallback_id: int) -> str:
    latin = re.findall(r'[a-zA-Z0-9]+', name)
    if latin:
        slug = "-".join(latin).lower()
        if len(slug) >= 3:
            return slug
    return f"product-{fallback_id}"


def scrape_products() -> List[Dict]:
    print("\n🔍 [1/3] Scraping live products from faralicense.ir...")
    urls_to_scrape = [
        f"{BASE_URL}/",
        f"{BASE_URL}/category/ai",
        f"{BASE_URL}/category/edit-and-design",
        f"{BASE_URL}/category/video",
        f"{BASE_URL}/category/audio",
        f"{BASE_URL}/category/learning",
        f"{BASE_URL}/category/cloud-storage",
        f"{BASE_URL}/category/useful",
        f"{BASE_URL}/category/seo",
    ]
    
    products_by_name = {}
    
    for url in urls_to_scrape:
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            if r.status_code != 200:
                continue
            soup = BeautifulSoup(r.text, 'html.parser')
            
            # Find all card elements
            cards = soup.select('div[class*="product"], article, div[class*="card"], div[class*="item"]')
            
            for card in cards:
                # Find title
                title_elem = card.select_one('h1, h2, h3, h4, h5, [class*="title"], [class*="name"]')
                if not title_elem:
                    continue
                name = clean_text(title_elem.get_text())
                if not name or len(name) < 3 or 'فرالایسنس' in name:
                    continue
                
                # Find price
                price = 0
                price_elems = card.select('[class*="price"], span, p')
                for p_elem in price_elems:
                    p_txt = p_elem.get_text()
                    if any(c in p_txt for c in '۰۱۲۳۴۵۶۷۸۹0123456789'):
                        p_val = clean_price(p_txt)
                        if p_val > 10000:
                            price = p_val
                            break
                
                if price == 0:
                    continue
                
                # Description
                desc_elem = card.select_one('[class*="desc"], p')
                desc = clean_text(desc_elem.get_text()) if desc_elem else f"خرید و فعال‌سازی قانونی {name} با ضمانت کامل و تحویل آنی"
                
                category = infer_category(name, desc)
                
                if name not in products_by_name or products_by_name[name]['price'] == 0:
                    products_by_name[name] = {
                        'name': name,
                        'description': desc,
                        'price': price,
                        'category': category,
                    }
        except Exception as e:
            print(f"  ⚠️ Warning scraping {url}: {e}")
            
    print(f"✓ Total unique products scraped: {len(products_by_name)}")
    
    # Transform to Subix product schema
    transformed = []
    for idx, (name, item) in enumerate(products_by_name.items(), 1):
        slug = generate_slug(name, idx)
        logo = infer_brand_logo(item['category'], name)
        
        transformed.append({
            'id': idx,
            'name': name,
            'nameEn': re.sub(r'[^a-zA-Z0-9 ]+', '', name).strip() or name,
            'slug': slug,
            'brandLogoPath': logo,
            'category': item['category'],
            'price': float(item['price']),
            'originalPrice': float(int(item['price'] * 1.15 / 1000) * 1000) if idx % 2 == 0 else None,
            'hasDiscount': idx % 2 == 0,
            'duration': '1 ماه (قابل تمدید)',
            'duration_days': 30,
            'activation_minutes': 30,
            'activation_type': 'ready_email',
            'is_active': 1,
            'sort_order': idx,
            'description': item['description'],
            'features': [
                'فعال‌سازی قانونی و اختصاصی',
                'تحویل سریع (کمتر از ۳۰ دقیقه)',
                'ضمانت بازگشت وجه تا پایان دوره',
                'پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین'
            ],
            'specifications': [
                {'label': 'نوع اشتراک', 'value': 'اکانت اختصاصی / روی ایمیل شخصی'},
                {'label': 'مدت اعتبار', 'value': '۳۰ روز (قابل تمدید)'},
                {'label': 'گارانتی', 'value': 'ضمانت ۱۰۰٪ تا روز آخر اشتراک'},
                {'label': 'پشتیبانی', 'value': '۲۴/۷ توسط تیم سابیکس'}
            ],
            'popular': idx <= 6
        })
        
    return transformed


def scrape_articles() -> List[Dict]:
    print("\n📚 [2/3] Scraping live blog articles from faralicense.ir/blog...")
    blog_index_url = f"{BASE_URL}/blog"
    r = requests.get(blog_index_url, headers=HEADERS, timeout=15)
    if r.status_code != 200:
        print("✗ Failed to load blog index page")
        return []
    
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Find all post links
    post_links = set()
    for a in soup.select('a[href^="/blog/"], a[href*="faralicense.ir/blog/"]'):
        href = a.get('href', '')
        slug = href.split('/blog/')[-1].strip('/')
        if slug and slug != 'blog':
            post_links.add(slug)
            
    print(f"✓ Found {len(post_links)} blog post links: {post_links}")
    
    articles = []
    for idx, slug in enumerate(sorted(post_links), 1):
        post_url = f"{BASE_URL}/blog/{slug}"
        try:
            res = requests.get(post_url, headers=HEADERS, timeout=15)
            if res.status_code != 200:
                continue
            post_soup = BeautifulSoup(res.text, 'html.parser')
            
            # Title
            title_elem = post_soup.select_one('h1, h2, [class*="post-info"] h2')
            title = clean_text(title_elem.get_text()) if title_elem else slug.replace('-', ' ').title()
            
            # Date
            date_elem = post_soup.select_one('[class*="date"]')
            date_str = clean_text(date_elem.get_text()) if date_elem else datetime.now().strftime('%Y-%m-%d')
            
            # Content Paragraphs
            paragraphs = []
            for p in post_soup.select('p, article div, [class*="content"] div'):
                txt = clean_text(p.get_text())
                if len(txt) > 25 and not any(skip_word in txt for skip_word in ['تمامی حقوق', 'فرالایسنس', 'ثبت نظر', 'کپی‌برداری']):
                    if txt not in paragraphs:
                        paragraphs.append(txt)
                        
            # Full content assembly
            if paragraphs:
                full_content = "\n\n".join(paragraphs)
                excerpt = paragraphs[0] if len(paragraphs[0]) < 200 else paragraphs[0][:190] + "..."
            else:
                excerpt = f"راهنمای جامع و بررسی کامل {title} و نحوه خرید و فعال‌سازی قانونی با پشتیبانی کامل سابیکس."
                full_content = f"{title}\n\nاین مقاله به بررسی کامل ویژگی‌ها، نکات مهم، مقایسه پلن‌ها و آموزش فعال‌سازی اختصاص دارد.\n\n### ویژگی‌ها و مزایا:\n- تحویل سریع و قانونی\n- بدون نیاز به کردیت کارت خارجی\n- پشتیبانی ۲۴ ساعته سابیکس"
                
            # Tags & Category
            cat = 'guide'
            if 'vs' in slug.lower() or 'مقایسه' in title:
                cat = 'comparison'
            elif 'how' in slug.lower() or 'آموزش' in title or 'guide' in slug.lower():
                cat = 'tutorial'
            elif 'review' in slug.lower() or 'بررسی' in title:
                cat = 'news'
                
            tags = ['هوش مصنوعی', 'راهنمای خرید', 'سابیکس']
            if 'chatgpt' in slug.lower():
                tags.extend(['ChatGPT', 'OpenAI'])
            if 'gemini' in slug.lower():
                tags.extend(['Gemini', 'Google'])
            if 'video' in slug.lower() or 'editor' in slug.lower():
                tags.extend(['ادیت ویدیو', 'اینستاگرام', 'یوتیوب'])
            if 'canva' in slug.lower():
                tags.extend(['Canva', 'طراحی گرافیک'])
            if 'language' in slug.lower() or 'duolingo' in slug.lower():
                tags.extend(['آموزش زبان', 'Duolingo'])
            if 'captions' in slug.lower():
                tags.extend(['Captions', 'هوش مصنوعی'])
                
            # Read time calculation (approx 200 words per minute)
            word_count = len(full_content.split())
            read_time = max(3, math.ceil(word_count / 150))
            
            articles.append({
                'id': idx,
                'slug': slug.lower(),
                'title': title,
                'excerpt': excerpt,
                'category': cat,
                'imagePath': f"/articles/{slug.lower()}.svg",
                'imageBlurDataURL': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AHQ8zv/R//+k//981f9sMsL/0//+m//+ct3/YS63/9L//5f//3DZ/607MgrCIyUAAAAASUVORK5CYII=',
                'readTime': read_time,
                'publishDate': '2026-08-28',
                'author': 'تیم تحریریه سابیکس',
                'content': full_content,
                'tags': list(dict.fromkeys(tags))
            })
            print(f"  ✓ Processed article: {title[:50]}... ({word_count} words)")
        except Exception as e:
            print(f"  ⚠️ Error parsing post {slug}: {e}")
            
    print(f"✓ Total articles scraped and compiled: {len(articles)}")
    return articles


def write_frontend_products_ts(products: List[Dict], output_path: Path):
    ts_code = """import { asset } from '@/lib/assets';

/**
 * Product Data - Real digital services
 * Contains actual pricing and product information
 * Brand logos stored in public/brands/
 */

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  brandLogoPath: string;
  category: 'ai' | 'music' | 'devTools' | 'design' | 'media' | 'productivity';
  price: number;
  originalPrice?: number;
  hasDiscount: boolean;
  duration: string;
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  popular?: boolean;
}

/**
 * Product catalog - Live market & Subix products
 * Prices in Iranian Toman
 */
export const products: Product[] = """
    
    # Prepare serializable list
    formatted_prods = []
    for p in products:
        formatted_prods.append({
            'id': p['id'],
            'name': p['name'],
            'nameEn': p['nameEn'],
            'slug': p['slug'],
            'brandLogoPath': f"__ASSET__{p['brandLogoPath']}__ASSET__",
            'category': p['category'],
            'price': p['price'],
            'originalPrice': p.get('originalPrice'),
            'hasDiscount': p.get('hasDiscount', False),
            'duration': p.get('duration', '1 ماه'),
            'description': p['description'],
            'features': p['features'],
            'specifications': p['specifications'],
            'popular': p.get('popular', False)
        })
        
    json_str = json.dumps(formatted_prods, ensure_ascii=False, indent=2)
    # Replace asset placeholders
    json_str = re.sub(r'"__ASSET__(.*?)__ASSET__"', r"asset('\1')", json_str)
    
    ts_code += json_str + """;

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.popular === true);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(p => p.hasDiscount === true);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};

export const categoryLabels: Record<Product['category'], string> = {
  ai: 'هوش مصنوعی',
  music: 'موسیقی',
  devTools: 'ابزار توسعه',
  design: 'طراحی',
  media: 'رسانه',
  productivity: 'بهره‌وری',
};

export default products;
"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"✓ Updated frontend products file: {output_path}")


def write_frontend_articles_ts(articles: List[Dict], output_path: Path):
    ts_code = """import { asset } from '@/lib/assets';

/**
 * Article Data - Blog posts and guides for digital accounts and services
 */

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: 'guide' | 'tutorial' | 'news' | 'comparison';
  imagePath: string;
  imageBlurDataURL: string;
  readTime: number;
  publishDate: string;
  author: string;
  content: string;
  tags: string[];
}

export const articles: Article[] = """

    formatted_articles = []
    for a in articles:
        formatted_articles.append({
            'id': a['id'],
            'slug': a['slug'],
            'title': a['title'],
            'excerpt': a['excerpt'],
            'category': a['category'],
            'imagePath': f"__ASSET__{a['imagePath']}__ASSET__",
            'imageBlurDataURL': a['imageBlurDataURL'],
            'readTime': a['readTime'],
            'publishDate': a['publishDate'],
            'author': a['author'],
            'content': a['content'],
            'tags': a['tags']
        })

    json_str = json.dumps(formatted_articles, ensure_ascii=False, indent=2)
    json_str = re.sub(r'"__ASSET__(.*?)__ASSET__"', r"asset('\1')", json_str)
    
    ts_code += json_str + """;

export const getArticlesByCategory = (category: Article['category']): Article[] => {
  return articles.filter(a => a.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(a => a.slug === slug);
};

export const getRecentArticles = (count: number = 6): Article[] => {
  return articles
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery) ||
      a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const categoryLabels: Record<Article['category'], string> = {
  guide: 'راهنما',
  tutorial: 'آموزش',
  news: 'اخبار',
  comparison: 'مقایسه',
};

export default articles;
"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"✓ Updated frontend articles file: {output_path}")


def main():
    scraper_dir = Path(__file__).resolve().parent
    scripts_dir = scraper_dir.parent
    backend_dir = scripts_dir.parent
    root_dir = backend_dir.parent
    frontend_dir = root_dir / "frontend"
    
    # 1. Scrape Products
    products = scrape_products()
    products_json_path = scraper_dir / "scraped_products.json"
    with open(products_json_path, 'w', encoding='utf-8') as f:
        json.dump({'products': products, 'metadata': {'scraped_at': datetime.now().isoformat(), 'total': len(products)}}, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved scraped products to: {products_json_path}")
    
    # 2. Scrape Articles
    articles = scrape_articles()
    articles_json_path = scraper_dir / "scraped_articles.json"
    with open(articles_json_path, 'w', encoding='utf-8') as f:
        json.dump({'articles': articles, 'metadata': {'scraped_at': datetime.now().isoformat(), 'total': len(articles)}}, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved scraped articles to: {articles_json_path}")
    
    # 3. Update Frontend TS Files
    write_frontend_products_ts(products, frontend_dir / "data/products.ts")
    write_frontend_articles_ts(articles, frontend_dir / "data/articles.ts")
    
    print("\n" + "=" * 60)
    print(f"🎉 SCRAPING & WEBSITE SYNC COMPLETE!")
    print(f"  - Products: {len(products)}")
    print(f"  - Articles: {len(articles)}")
    print("=" * 60)


if __name__ == "__main__":
    main()
