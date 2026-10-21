import json
from pathlib import Path
from difflib import SequenceMatcher
from typing import List, Dict, Tuple
from dotenv import load_dotenv

# Load environment
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from app.db.client import execute  # noqa: E402


def load_scraped_products(json_path: Path) -> List[Dict]:
    """Load products from scraped JSON file"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get('products', [])


def load_current_products() -> List[Dict]:
    """Load current products from database"""
    rs = execute(
        """
        SELECT id, name, description, category, price, duration_days
        FROM products WHERE is_active=1
        """
    )
    
    products = []
    for row in rs.rows:
        products.append({
            'id': row.values[0],
            'name': row.values[1],
            'description': row.values[2],
            'category': row.values[3],
            'price': float(row.values[4]),
            'duration_days': row.values[5],
        })
    return products


def calculate_similarity(str1: str, str2: str) -> float:
    """Calculate similarity between two strings (0.0 to 1.0)"""
    return SequenceMatcher(None, str1.lower(), str2.lower()).ratio()


def find_best_match(product: Dict, candidates: List[Dict]) -> Tuple[Dict, float]:
    """Find best matching product from candidates
    
    Returns:
        (best_match, similarity_score)
    """
    best_match = None
    best_score = 0.0
    
    for candidate in candidates:
        # Match by name similarity
        name_score = calculate_similarity(product['name'], candidate['name'])
        
        # Bonus for matching category
        category_bonus = 0.2 if product['category'] == candidate['category'] else 0
        
        total_score = name_score + category_bonus
        
        if total_score > best_score:
            best_score = total_score
            best_match = candidate
    
    return best_match, best_score


def generate_comparison_report(current_products: List[Dict], scraped_products: List[Dict]) -> str:
    """Generate price comparison report"""
    report = []
    report.append("=" * 80)
    report.append("PRICE COMPARISON REPORT - FLUXO VS REFERENCE CATALOG")
    report.append("=" * 80)
    report.append(f"Fluxo Products: {len(current_products)}")
    report.append(f"Reference Products: {len(scraped_products)}")
    report.append("")
    
    # Find matches
    matches = []
    for current in current_products:
        best_match, score = find_best_match(current, scraped_products)
        if best_match and score > 0.5:  # Minimum 50% similarity
            matches.append({
                'fluxo': current,
                'reference': best_match,
                'similarity': score
            })
    
    report.append(f"Matched Products: {len(matches)}")
    report.append("")
    report.append("-" * 80)
    
    # Detailed comparison
    total_fluxo_price = 0
    total_reference_price = 0
    
    for i, match in enumerate(matches, 1):
        fluxo = match['fluxo']
        reference = match['reference']
        similarity = match['similarity']
        
        price_diff = fluxo['price'] - reference['price']
        price_diff_pct = (price_diff / reference['price'] * 100) if reference['price'] > 0 else 0
        
        total_fluxo_price += fluxo['price']
        total_reference_price += reference['price']
        
        report.append(f"\n{i}. MATCH (Similarity: {similarity*100:.1f}%)")
        report.append(f"   Fluxo:        {fluxo['name']}")
        report.append(f"   Reference:   {reference['name']}")
        report.append(f"   Category:     {fluxo['category']}")
        report.append(f"   ")
        report.append(f"   Fluxo Price:       {fluxo['price']:>15,.0f} تومان")
        report.append(f"   Reference Price:   {reference['price']:>15,.0f} تومان")
        report.append(f"   Difference:        {price_diff:>15,.0f} تومان ({price_diff_pct:+.1f}%)")
        
        if price_diff > 0:
            report.append(f"   Fluxo is MORE EXPENSIVE")
        elif price_diff < 0:
            report.append(f"   Fluxo is CHEAPER")
        else:
            report.append(f"   =  Same price")
        
        report.append("-" * 80)
    
    # Summary statistics
    report.append("")
    report.append("SUMMARY")
    report.append("=" * 80)
    if matches:
        avg_fluxo = total_fluxo_price / len(matches)
        avg_reference = total_reference_price / len(matches)
        avg_diff = avg_fluxo - avg_reference
        avg_diff_pct = (avg_diff / avg_reference * 100) if avg_reference > 0 else 0
        
        report.append(f"Average Fluxo Price:       {avg_fluxo:,.0f} تومان")
        report.append(f"Average Reference Price:   {avg_reference:,.0f} تومان")
        report.append(f"Average Difference:        {avg_diff:+,.0f} تومان ({avg_diff_pct:+.1f}%)")
        
        cheaper_count = sum(1 for m in matches if m['fluxo']['price'] < m['reference']['price'])
        same_count = sum(1 for m in matches if m['fluxo']['price'] == m['reference']['price'])
        expensive_count = len(matches) - cheaper_count - same_count
        
        report.append("")
        report.append(f"Fluxo is CHEAPER:  {cheaper_count} products ({cheaper_count/len(matches)*100:.1f}%)")
        report.append(f"Fluxo is SAME:     {same_count} products ({same_count/len(matches)*100:.1f}%)")
        report.append(f"Fluxo is PRICIER:  {expensive_count} products ({expensive_count/len(matches)*100:.1f}%)")
    
    report.append("=" * 80)
    
    return "\n".join(report)


def main():
    """Main entry point"""
    backend_dir = Path(__file__).parent.parent
    json_path = backend_dir / 'scripts/scraper/scraped_products.json'
    output_path = backend_dir / 'scripts/scraper/price_comparison.txt'
    
    print("Loading data...")
    
    try:
        # Load scraped products
        scraped_products = load_scraped_products(json_path)
        print(f"✓ Loaded {len(scraped_products)} scraped products")
        
        # Load current database products
        current_products = load_current_products()
        print(f"✓ Loaded {len(current_products)} current products from database")
        
        # Generate report
        print("\nGenerating comparison report...")
        report = generate_comparison_report(current_products, scraped_products)
        
        # Save to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"✓ Report saved to: {output_path}")
        print("\n" + report)
        
    except FileNotFoundError:
        print(f"✗ Error: Scraped products file not found")
        print("Hint: Run the private price sync command first")
    except Exception as e:
        print(f"✗ Error: {e}")


if __name__ == "__main__":
    main()
