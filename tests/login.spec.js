const {test, expect} = require ('@playwright/test');

test ('Verify login page loads successfully', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect (page.getByPlaceholder('Username')).toBeVisible();
    await expect (page.getByPlaceholder('Password')).toBeVisible();
    await expect (page.getByRole('button', { name: 'Login' })).toBeVisible();

});

test ('Verify successful login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const productsLabel = page.getByText('Products', { exact: true });

    await expect(productsLabel).toBeVisible();
    await expect(productsLabel).toHaveText('Products');
   
});

test('Verify login fails with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    await expect(page.getByPlaceholder('Password')).toHaveValue('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const errorMsg = page.getByText(
        'Epic sadface: Username and password do not match any user in this service', {exact: true }
    );

    await expect(errorMsg).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
    
});

test('Verify login fails with empty credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await expect(page.getByPlaceholder('Username')).toHaveValue('');
    await expect(page.getByPlaceholder('Password')).toHaveValue('');

    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();
    
    await loginButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginButton).toBeVisible();

    const errorMsg = page.getByText(
        'Epic sadface: Username is required', 
        {exact: true }
    );

    await expect(errorMsg).toHaveText('Epic sadface: Username is required');
   
});

test('Verify login fails with empty username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByPlaceholder('Username')).toHaveValue('');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');

    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginButton).toBeVisible();

    const errorMsg = page.getByText(
        'Epic sadface: Username is required', 
        {exact: true }
    );

    await expect(errorMsg).toHaveText('Epic sadface: Username is required');

});

test('Verify login fails with empty password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    await expect(page.getByPlaceholder('Password')).toHaveValue('');

    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const errorMsg = page.getByText(
        'Epic sadface: Password is required', 
        {exact: true }
    );

    await expect(errorMsg).toHaveText('Epic sadface: Password is required');

});

test('Verify locked out user cannot login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('locked_out_user');
    await expect(page.getByPlaceholder('Username')).toHaveValue('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');

    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const errorMsg = page.getByText(
        'Epic sadface: Sorry, this user has been locked out.', 
        {exact: true }
    );

    await expect(errorMsg).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );

});

test ('Verify add to cart buttons are displayed', async ({ page}) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Add to cart' })
    ).toHaveCount(6);

    const backpackAddToCart = page.locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to cart' });
    
    await expect(backpackAddToCart).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Add to cart' }).nth(2)
    ).toBeVisible();

})