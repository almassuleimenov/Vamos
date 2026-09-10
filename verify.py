import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Test mobile
        page_mobile = await browser.new_page(viewport={"width": 375, "height": 812})
        await page_mobile.goto("http://localhost:3000")
        await page_mobile.wait_for_timeout(3000) # wait for animations
        await page_mobile.screenshot(path="mobile.png", full_page=True)

        # Test tablet
        page_tablet = await browser.new_page(viewport={"width": 768, "height": 1024})
        await page_tablet.goto("http://localhost:3000")
        await page_tablet.wait_for_timeout(3000)
        await page_tablet.screenshot(path="tablet.png", full_page=True)

        await browser.close()

asyncio.run(main())
