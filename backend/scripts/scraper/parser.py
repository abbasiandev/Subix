import re
from bs4 import BeautifulSoup
from typing import List, Dict, Optional


class ProductParser:
    def __init__(self):
        self.persian_to_english = str.maketrans('۰۱۲۳۴۵۶۷۸۹', '0123456789')
    
    def clean_price(self, text: str) -> int:
        """Convert Persian price string to integer
        Examples: '۱۹۰,۰۰۰ تومان' -> 190000
        """
        if not text:
            return 0
        
        # Convert Persian numbers to English
        text = text.translate(self.persian_to_english)
        
        # Remove non-numeric characters except comma
        text = re.sub(r'[^\d,]', '', text)
        
        # Remove commas
        text = text.replace(',', '')
        
        try:
            return int(text)
        except ValueError:
            return 0
    
    def extract_category(self, text: str) -> str:
        """Extract category from product name or description"""
        text_lower = text.lower()
        
        # Map keywords to categories
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
        }
        
        for keyword, category in category_map.items():
            if keyword in text_lower:
                return category
        
        return 'Other'
    
    def extract_product_card(self, element) -> Optional[Dict]:
        """Extract data from a single product card element"""
        try:
            # Try to find product name
            name = None
            for selector in ['h1', 'h2', 'h3', 'h4', 'h5', '.title', '.product-name', '[class*="title"]', '[class*="name"]']:
                name_elem = element.select_one(selector)
                if name_elem and name_elem.get_text(strip=True):
                    name = name_elem.get_text(strip=True)
                    break
            
            if not name:
                return None
            
            # Try to find price
            price = 0
            for selector in ['.price', '[class*="price"]', 'span', 'p']:
                price_elem = element.select_one(selector)
                if price_elem:
                    price_text = price_elem.get_text(strip=True)
                    if any(char in price_text for char in '۰۱۲۳۴۵۶۷۸۹0123456789'):
                        price = self.clean_price(price_text)
                        if price > 0:
                            break
            
            # Try to find description
            description = None
            for selector in ['.description', '[class*="desc"]', 'p', '.details']:
                desc_elem = element.select_one(selector)
                if desc_elem:
                    desc_text = desc_elem.get_text(strip=True)
                    if desc_text and desc_text != name and len(desc_text) > 10:
                        description = desc_text
                        break
            
            if not description:
                description = f"اشتراک {name}"
            
            # Extract category
            category = self.extract_category(name + ' ' + description)
            
            return {
                'name': name,
                'description': description,
                'price': price,
                'category': category
            }
            
        except Exception as e:
            print(f"Warning: Error extracting product card: {e}")
            return None
    
    def parse_products(self, html: str) -> List[Dict]:
        """Parse HTML and extract all products"""
        soup = BeautifulSoup(html, 'lxml')
        products = []
        
        # Try multiple selector strategies
        selectors = [
            'div[class*="product"]',
            'article',
            'div[class*="card"]',
            'div[class*="item"]',
            '[class*="grid"] > div',
            '.product-card',
            '.card',
        ]
        
        elements_found = []
        for selector in selectors:
            elements = soup.select(selector)
            if elements:
                print(f"✓ Found {len(elements)} elements with selector: {selector}")
                elements_found.extend(elements)
        
        # Remove duplicates based on text content
        seen_texts = set()
        unique_elements = []
        for elem in elements_found:
            text = elem.get_text(strip=True)[:100]  # First 100 chars as fingerprint
            if text not in seen_texts:
                seen_texts.add(text)
                unique_elements.append(elem)
        
        print(f"✓ Processing {len(unique_elements)} unique product elements")
        
        for element in unique_elements:
            product = self.extract_product_card(element)
            if product and product['price'] > 0:
                products.append(product)
        
        # Deduplicate products by name
        seen_names = set()
        unique_products = []
        for product in products:
            if product['name'] not in seen_names:
                seen_names.add(product['name'])
                unique_products.append(product)
        
        print(f"✓ Extracted {len(unique_products)} unique products")
        return unique_products


def main():
    """Demo: Test parser with sample HTML"""
    sample_html = """
    <div class="product-card">
        <h3>اشتراک ChatGPT Plus | ۱ ماه</h3>
        <p class="description">اختصاصی • فعال‌سازی ۳۰ دقیقه</p>
        <span class="price">۱۹۰,۰۰۰ تومان</span>
    </div>
    <div class="product-card">
        <h3>اشتراک Gemini Advanced | ۱ ماه</h3>
        <p class="description">دسترسی به هوش مصنوعی گوگل</p>
        <span class="price">۳۲۰,۰۰۰ تومان</span>
    </div>
    """
    
    parser = ProductParser()
    products = parser.parse_products(sample_html)
    
    print("\nParsed products:")
    for i, product in enumerate(products, 1):
        print(f"{i}. {product['name']} - {product['price']:,} تومان - {product['category']}")


if __name__ == "__main__":
    main()
