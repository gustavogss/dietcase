import { describe, it, expect } from "vitest";
import {
	nutriBaseAgent,
	comorbidityAgent,
	caloricBalancerAgent,
	virtualNutriChatAgent,
} from "../services/agents";
import { mockUsers, weeklyMenus } from "../data/mocks";

describe("Testes de Unidade dos Agentes de IA Especializados (Etapa 04)", () => {
	describe("NutriBaseAgent", () => {
		it("deve processar uma entrada válida e retornar a estrutura base do cardápio", async () => {
			const result = await nutriBaseAgent.process({ profile: mockUsers[0] });
			expect(result).toBeDefined();
			expect(result.baseMenu).toBeDefined();
			expect(result.baseMenu.id).toBeDefined();
			expect(result.source).toBe("fallback");
		});

		it("deve rejeitar uma entrada inválida e lançar erro com mensagem clara", async () => {
			const invalidProfile = { ...mockUsers[0], age: -10 };
			// @ts-expect-error testando entrada inválida no runtime
			await expect(nutriBaseAgent.process({ profile: invalidProfile })).rejects.toThrow(
				"[NutriBaseAgent] Erro de validação de entrada",
			);
		});
	});

	describe("ComorbidityAgent", () => {
		it("deve aplicar restrições de comorbidade e retornar o cardápio seguro com logs de auditoria", async () => {
			const request = {
				baseMenu: weeklyMenus[0],
				morbidities: ["diabetes", "hipertensao"],
				customRestrictions: [
					{
						ingredient: "Camarão",
						type: "alergia" as const,
						addedAt: new Date().toISOString(),
					},
				],
			};

			const result = await comorbidityAgent.process(request);
			expect(result).toBeDefined();
			expect(result.isSafe).toBe(true);
			expect(result.auditLog.length).toBeGreaterThan(0);
			expect(result.warnings.length).toBeGreaterThan(0);
			expect(result.safeMenu.name).toContain("Adaptado");
		});

		it("deve rejeitar solicitação sem menu base válido", async () => {
			// @ts-expect-error testando ausência de menu base
			await expect(comorbidityAgent.process({ morbidities: ["diabetes"] })).rejects.toThrow(
				"[ComorbidityAgent] Erro de validação de entrada",
			);
		});
	});

	describe("CaloricBalancerAgent", () => {
		it("deve ajustar proporcionalmente o balanço calórico do cardápio", async () => {
			const targetCalories = 2000;
			const result = await caloricBalancerAgent.process({
				menu: weeklyMenus[0],
				targetCalories,
			});

			expect(result).toBeDefined();
			expect(result.balancedMenu).toBeDefined();
			expect(result.totalDailyCalories).toBeGreaterThan(0);
		});

		it("deve rejeitar meta calórica negativa", async () => {
			await expect(
				caloricBalancerAgent.process({
					menu: weeklyMenus[0],
					targetCalories: -500,
				}),
			).rejects.toThrow("[CaloricBalancerAgent] Erro de validação de entrada");
		});
	});

	describe("VirtualNutriChatAgent", () => {
		it("deve responder a dúvidas nutricionais com aviso de isenção médica obrigatório", async () => {
			const request = {
				message: "Posso comer tapioca?",
				userContext: {
					name: "Maria",
					morbidities: ["diabetes"],
					plan: "TRANSFORMACAO" as const,
				},
			};

			const result = await virtualNutriChatAgent.process(request);
			expect(result.responseText).toContain("tapioca");
			expect(result.responseText).toContain("glicêmico");
			expect(result.disclaimer).toContain("não substitui o diagnóstico");
		});

		it("deve rejeitar mensagem vazia", async () => {
			const request = {
				message: "",
				userContext: {
					name: "Maria",
					morbidities: [],
					plan: "ESSENCIAL" as const,
				},
			};

			await expect(virtualNutriChatAgent.process(request)).rejects.toThrow(
				"[VirtualNutriChatAgent] Erro de validação de entrada",
			);
		});
	});
});
