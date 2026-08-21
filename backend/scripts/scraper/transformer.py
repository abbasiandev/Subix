import re
from typing import Dict, List


class DataTransformer:
    def __init__(self):
        self.persian_to_english = str.maketrans('۰۱۲۳۴۵۶۷۸۹', '0123456789')
    
    def infer_duration_days(self, name: str, description: str = "") -> int:
        """Extract duration from product name/description
        Examples:
        - '۱ ماه' -> 30
        - '۳ ماهه' -> 90
        - '۱ سال' -> 365
        - '۶ ماه' -> 180
        """
        text = (name + ' ' + description).translate(self.persian_to_english)
        
        # Look for month patterns
        month_match = re.search(r'(\d+)\s*ماه', text)
        if month_match:
            months = int(month_match.group(1))
            return months * 30
        
        # Look for year patterns
        year_match = re.search(r'(\d+)\s*سال', text)
        if year_match:
            years = int(year_match.group(1))
            return years * 365
        
        # Look for day patterns
        day_match = re.search(r'(\d+)\s*روز', text)
        if day_match:
            return int(day_match.group(1))
        
        # Default to 30 days (1 month)
        return 30
    
    def map_category(self, category: str) -> str:
        """Normalize category names to match Subix conventions"""
        category_map = {
            'chatgpt': 'ChatGPT',
            'gpt': 'ChatGPT',
            'gemini': 'Gemini',
            'claude': 'Claude',
            'cursor': 'Cursor',
            'spotify': 'Spotify',
            'github': 'GitHub',
            'copilot': 'GitHub',
            'midjourney': 'Midjourney',
            'canva': 'Canva',
            'youtube': 'YouTube',
            'netflix': 'Netflix',
            'microsoft': 'Microsoft',
            'office': 'Microsoft',
            'adobe': 'Adobe',
        }
        
        category_lower = category.lower()
        return category_map.get(category_lower, category)
    
    def add_defaults(self) -> Dict:
        """Return default values for Subix schema fields"""
        return {
            'activation_minutes': 30,
            'activation_type': 'ready_email',
            'is_active': 1,
        }
    
    def transform_product(self, raw_product: Dict, sort_order: int) -> Dict:
        """Transform raw scraped product to Subix database schema
        
        Args:
            raw_product: Dict with keys: name, description, price, category
            sort_order: Integer for ordering products
            
        Returns:
            Dict matching Subix products table schema
        """
        defaults = self.add_defaults()
        
        # Extract duration from name/description
        duration_days = self.infer_duration_days(
            raw_product.get('name', ''),
            raw_product.get('description', '')
        )
        
        # Normalize category
        category = self.map_category(raw_product.get('category', 'Other'))
        
        return {
            'name': raw_product.get('name', 'Unknown Product'),
            'description': raw_product.get('description', ''),
            'category': category,
            'price': float(raw_product.get('price', 0)),
            'duration_days': duration_days,
            'activation_minutes': defaults['activation_minutes'],
            'activation_type': defaults['activation_type'],
            'is_active': defaults['is_active'],
            'sort_order': sort_order,
        }
    
    def transform_products(self, raw_products: List[Dict]) -> List[Dict]:
        """Transform list of raw products"""
        transformed = []
        for i, raw_product in enumerate(raw_products, start=1):
            transformed.append(self.transform_product(raw_product, sort_order=i))
        return transformed


def main():
    """Demo: Test transformer"""
    sample_products = [
        {
            'name': 'اشتراک ChatGPT Plus | ۱ ماه',
            'description': 'اختصاصی • فعال‌سازی ۳۰ دقیقه',
            'price': 190000,
            'category': 'ChatGPT'
        },
        {
            'name': 'اشتراک Gemini Advanced | ۱ سال',
            'description': 'دسترسی به هوش مصنوعی گوگل',
            'price': 870000,
            'category': 'Gemini'
        },
        {
            'name': 'اشتراک Spotify Premium | ۳ ماه',
            'description': 'موسیقی بی‌محدود',
            'price': 250000,
            'category': 'Spotify'
        }
    ]
    
    transformer = DataTransformer()
    transformed = transformer.transform_products(sample_products)
    
    print("\nTransformed products:")
    for product in transformed:
        print(f"\n{product['name']}")
        print(f"  Category: {product['category']}")
        print(f"  Price: {product['price']:,.0f} تومان")
        print(f"  Duration: {product['duration_days']} days")
        print(f"  Activation: {product['activation_minutes']} minutes ({product['activation_type']})")


if __name__ == "__main__":
    main()
