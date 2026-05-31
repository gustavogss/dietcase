import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
	test("exibe botão de login com Google", async ({ page }) => {
		await page.goto("/auth");

		// Verifica título
		await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();

		// Verifica descrição menciona Google
		await expect(
			page.getByText("Faça login com sua conta do Google"),
		).toBeVisible();

		// Verifica presença do botão com Google
		const googleButton = page.getByRole("button", {
			name: /Entrar com Google/i,
		});
		await expect(googleButton).toBeVisible();

		// Verifica que o botão contém o ícone SVG do Google
		const svg = googleButton.locator("svg");
		await expect(svg).toBeVisible();
	});

	test("não exibe campos de email e senha", async ({ page }) => {
		await page.goto("/auth");

		// Verifica que NÃO há campos de email/senha
		await expect(page.getByLabel("Email")).not.toBeVisible();
		await expect(page.getByLabel("Senha")).not.toBeVisible();

		const emailInputs = page.locator('input[type="email"]');
		const passwordInputs = page.locator('input[type="password"]');

		await expect(emailInputs).toHaveCount(0);
		await expect(passwordInputs).toHaveCount(0);
	});

	test("não exibe opção de criar conta tradicional", async ({ page }) => {
		await page.goto("/auth");

		// Verifica que NÃO há link/botão "Criar conta"
		const createAccountButton = page.getByRole("button", {
			name: "Criar conta",
		});
		await expect(createAccountButton).not.toBeVisible();
	});

	test("exibe termos de serviço e política de privacidade", async ({
		page,
	}) => {
		await page.goto("/auth");

		// Verifica texto sobre termos
		await expect(
			page.getByText(/Termos de Serviço e Política de Privacidade/i),
		).toBeVisible();
	});

	// Nota: Testes de fluxo OAuth completo não podem ser automatizados facilmente
	// porque requerem:
	// 1. Configuração real do Google Cloud Console
	// 2. Credenciais OAuth configuradas no Supabase
	// 3. Interação com a página de login do Google (fora do controle do teste)
	//
	// Esses testes devem ser realizados manualmente conforme descrito no
	// plano de verificação (implementation_plan.md).
	//
	// Para ambientes de CI/CD, considere:
	// - Mockar o provider OAuth em ambiente de teste
	// - Usar contas de teste do Google (se disponível)
	// - Testar apenas a UI e não o fluxo completo
});
