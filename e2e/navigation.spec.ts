import { test, expect } from '@playwright/test';

test.describe('Navegação pública', () => {
  test('visitante é redirecionado de /dashboard para /planos', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/planos/);
  });

  test('home -> entrar leva para /auth (quando não logado)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page).toHaveURL(/\/auth/);
    await expect(page.getByRole('heading', { name: /Entrar|Criar conta/i })).toBeVisible();
  });
});
