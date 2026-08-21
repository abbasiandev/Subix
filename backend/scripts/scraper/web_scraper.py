import asyncio
from playwright.async_api import async_playwright, Browser, Page, TimeoutError as PlaywrightTimeout


class WebScraper:
    def __init__(self, headless: bool = True, timeout: int = 30000):
        self.headless = headless
        self.timeout = timeout
        self.browser = None
        self.playwright = None
        
    async def launch_browser(self) -> Browser:
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            args=['--no-sandbox', '--disable-setuid-sandbox']
        )
        return self.browser
    
    async def navigate_to_products(self, page: Page) -> None:
        await page.set_extra_http_headers({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        
        try:
            await page.goto('https://faralicense.ir/', timeout=self.timeout)
            print("✓ Navigated to target website")
        except PlaywrightTimeout:
            raise Exception("Timeout while loading target website")
    
    async def wait_for_products(self, page: Page) -> None:
        # Wait for common product container selectors
        selectors = [
            'div[class*="product"]',
            'div[class*="card"]',
            'article',
            '[class*="grid"]',
            '[class*="item"]'
        ]
        
        for selector in selectors:
            try:
                await page.wait_for_selector(selector, timeout=10000)
                print(f"✓ Products loaded (found: {selector})")
                return
            except PlaywrightTimeout:
                continue
        
        # If no specific selector found, just wait for network idle
        await page.wait_for_load_state('networkidle', timeout=self.timeout)
        print("✓ Page fully loaded (network idle)")
    
    async def get_product_html(self, page: Page) -> str:
        html = await page.content()
        return html
    
    async def scrape(self) -> str:
        try:
            await self.launch_browser()
            page = await self.browser.new_page()
            
            # Navigate and wait for content
            await self.navigate_to_products(page)
            await self.wait_for_products(page)
            
            # Add delay to be respectful
            await asyncio.sleep(2)
            
            # Get HTML
            html = await self.get_product_html(page)
            
            # Get page title for verification
            title = await page.title()
            print(f"✓ Page title: {title}")
            print(f"✓ HTML length: {len(html)} characters")
            
            await page.close()
            return html
            
        except Exception as e:
            print(f"✗ Error during scraping: {str(e)}")
            raise
        finally:
            await self.close()
    
    async def close(self):
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()


async def main():
    scraper = WebScraper(headless=True)
    html = await scraper.scrape()
    print(f"\n✓ Successfully scraped {len(html)} characters")
    return html


if __name__ == "__main__":
    asyncio.run(main())
