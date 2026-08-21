import json
import sys
from pathlib import Path
import argparse
from typing import List, Dict

from dotenv import load_dotenv

# Load environment
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from app.db.client import execute, run_migrations  # noqa: E402


def load_scraped_products(json_path: Path) -> List[Dict]:
    if not json_path.exists():
        raise FileNotFoundError(f"Scraped products file not found: {json_path}")
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    return data.get('products', [])


def seed_benchmark_data(products: List[Dict], dry_run: bool = False):
    print("=" * 60)
    print("BENCHMARK SEED - PRODUCTS")
    print("=" * 60)
    print(f"Mode: {'DRY RUN (no changes)' if dry_run else 'LIVE (will modify database)'}")
    print(f"Total products to seed: {len(products)}")
    print()
    
    if dry_run:
        print("Preview of products to be seeded:")
        for i, product in enumerate(products[:10], 1):
            print(f"{i}. {product['name']}")
            print(f"   Price: {product['price']:,.0f} تومان | Category: {product['category']}")
            print(f"   Duration: {product['duration_days']} days")
        
        if len(products) > 10:
            print(f"... and {len(products) - 10} more products")
        
        print("\n✓ Dry run completed. Run without --dry-run to apply changes.")
        return
    
    # Confirm before proceeding
    print("⚠️  WARNING: This will DELETE all existing products and replace with benchmark data!")
    response = input("Continue? (yes/no): ").strip().lower()
    
    if response != 'yes':
        print("✗ Aborted by user")
        return
    
    print("\n→ Running migrations...")
    run_migrations()
    
    print("→ Clearing existing products...")
    execute("DELETE FROM products")
    
    print("→ Inserting benchmark products...")
    inserted = 0
    for product in products:
        try:
            execute(
                """
                INSERT INTO products
                  (name, description, category, price, duration_days,
                   activation_minutes, activation_type, is_active, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                [
                    product['name'],
                    product['description'],
                    product['category'],
                    product['price'],
                    product['duration_days'],
                    product['activation_minutes'],
                    product['activation_type'],
                    product['is_active'],
                    product['sort_order'],
                ],
            )
            inserted += 1
        except Exception as e:
            print(f"  ✗ Failed to insert: {product['name']} - {e}")
    
    print(f"\n✓ Successfully seeded {inserted}/{len(products)} benchmark products")
    
    # Show category breakdown
    categories = {}
    for product in products:
        cat = product['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nCategory breakdown:")
    for category, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"  {category}: {count} products")
    
    print("=" * 60)


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='Seed database with scraped products for benchmarking'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview products without modifying database'
    )
    parser.add_argument(
        '--input',
        type=str,
        default='scripts/scraper/scraped_products.json',
        help='Path to scraped products JSON file (relative to backend/)'
    )
    
    args = parser.parse_args()
    
    # Get absolute path
    backend_dir = Path(__file__).parent.parent
    json_path = backend_dir / args.input
    
    try:
        # Load scraped products
        products = load_scraped_products(json_path)
        
        if not products:
            print("✗ No products found in JSON file")
            sys.exit(1)
        
        # Seed database
        seed_benchmark_data(products, dry_run=args.dry_run)
        
    except FileNotFoundError as e:
        print(f"✗ Error: {e}")
        print(f"\nHint: Make sure the scraped products JSON file exists")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
