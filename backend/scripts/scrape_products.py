import asyncio
import json
import argparse
from pathlib import Path
from datetime import datetime
import sys

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from scripts.scraper.web_scraper import WebScraper
from scripts.scraper.parser import ProductParser
from scripts.scraper.transformer import DataTransformer


async def scrape_and_parse(headless: bool = True, timeout: int = 30) -> dict:
    print("=" * 60)
    print("PRODUCT SCRAPER")
    print("=" * 60)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Step 1: Scrape HTML
    print("[1/4] Scraping website...")
    scraper = WebScraper(headless=headless, timeout=timeout * 1000)
    try:
        html = await scraper.scrape()
    except Exception as e:
        print(f"✗ Scraping failed: {e}")
        return {'products': [], 'metadata': {'error': str(e)}}
    
    print()
    
    # Step 2: Parse HTML
    print("[2/4] Parsing product data...")
    parser = ProductParser()
    raw_products = parser.parse_products(html)
    print()
    
    # Step 3: Transform to Subix schema
    print("[3/4] Transforming to Subix schema...")
    transformer = DataTransformer()
    transformed_products = transformer.transform_products(raw_products)
    print(f"✓ Transformed {len(transformed_products)} products")
    print()
    
    # Step 4: Create result
    result = {
        'products': transformed_products,
        'metadata': {
            'scraped_at': datetime.now().isoformat(),
            'source': 'external',
            'total_products': len(transformed_products),
            'categories': list(set(p['category'] for p in transformed_products)),
        }
    }
    
    return result


def save_to_json(data: dict, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved to: {output_path}")


def print_summary(data: dict):
    print()
    print("=" * 60)
    print("SCRAPING SUMMARY")
    print("=" * 60)
    
    products = data.get('products', [])
    metadata = data.get('metadata', {})
    
    print(f"Total products: {len(products)}")
    print(f"Scraped at: {metadata.get('scraped_at', 'Unknown')}")
    
    if products:
        print(f"\nCategories found: {', '.join(metadata.get('categories', []))}")
        
        # Price statistics
        prices = [p['price'] for p in products if p['price'] > 0]
        if prices:
            print(f"\nPrice range:")
            print(f"  Minimum: {min(prices):,.0f} تومان")
            print(f"  Maximum: {max(prices):,.0f} تومان")
            print(f"  Average: {sum(prices)/len(prices):,.0f} تومان")
        
        # Show first 5 products
        print(f"\nFirst 5 products:")
        for i, product in enumerate(products[:5], 1):
            print(f"  {i}. {product['name']}")
            print(f"     Price: {product['price']:,.0f} تومان | Category: {product['category']}")
    
    print("=" * 60)


async def main():
    parser = argparse.ArgumentParser(description='Scrape product data from website')
    parser.add_argument('--output', type=str, 
                       default='scripts/scraper/scraped_products.json',
                       help='Output JSON file path (relative to backend/)')
    parser.add_argument('--headless', type=bool, default=True,
                       help='Run browser in headless mode')
    parser.add_argument('--timeout', type=int, default=30,
                       help='Timeout in seconds for page loading')
    
    args = parser.parse_args()
    
    # Get absolute path
    backend_dir = Path(__file__).parent.parent
    output_path = backend_dir / args.output
    
    # Run scraper
    data = await scrape_and_parse(headless=args.headless, timeout=args.timeout)
    
    # Save results
    if data['products']:
        print("[4/4] Saving results...")
        save_to_json(data, output_path)
        print_summary(data)
        print("\n✓ Scraping completed successfully!")
        return 0
    else:
        print("\n✗ No products found or scraping failed")
        print(f"Error: {data['metadata'].get('error', 'Unknown error')}")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
