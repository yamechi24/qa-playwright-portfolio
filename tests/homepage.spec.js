const {test, expect} = require ('@playwright/test');

test ('Verify homepage loads successfully', async ({ page }) => {
    await page.goto('https://example.com');
    
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');

});