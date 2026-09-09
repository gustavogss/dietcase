import { describe, it, expect } from "vitest";
import {
	normalizePlanType,
	userProfileSchema,
	morbiditySchema,
	mealSchema,
	weeklyMenuSchema,
	userRestrictionSchema,
	appliedSubstitutionSchema,
	nutriBaseAgentRequestSchema,
	nutriBaseAgentResponseSchema,
	comorbidityAgentRequestSchema,
	comorbidityAgentResponseSchema,
	caloricBalancerAgentRequestSchema,
	caloricBalancerAgentResponseSchema,
	virtualNutriChatAgentRequestSchema,
	virtualNutriChatAgentResponseSchema,
	orchestrationRequestSchema,
	orchestrationResponseSchema,
} from "../types";
import { mockUsers, weeklyMenus } from "../data/mocks";

describe("Domain Models & Schemas Validation (Etapa 03)", () => {
	describe("normalizePlanType", () => {
		it("deve mapear planos minúsculos/legados para os enums padrão", () => {
			expect(normalizePlanType("Essencial")).toBe("ESSENCIAL");
			expect(normalizePlanType("Transformação")).toBe("TRANSFORMACAO");
			expect(normalizePlanType("Transformacao")).toBe("TRANSFORMACAO");
			expect(normalizePlanType("Premium")).toBe("TRANSFORMACAO");
			expect(normalizePlanType("TRIAL")).toBe("TRIAL");
		});

		it("deve usar 'TRIAL' como fallback para entradas inválidas ou nulas", () => {
			expect(normalizePlanType(null)).toBe("TRIAL");
			expect(normalizePlanType(undefined)).toBe("TRIAL");
			expect(normalizePlanType("desconhecido")).toBe("TRIAL");
		});
	});

	describe("userProfileSchema", () => {
		it("deve validar com sucesso um perfil de usuário válido", () => {
			const validUser = mockUsers[0];
			const result = userProfileSchema.safeParse(validUser);
			expect(result.success).toBe(true);
		});

		it("deve rejeitar perfil de usuário com idade ou peso inválidos", () => {
			const invalidUser = { ...mockUsers[0], age: -5, weight: 0 };
			const result = userProfileSchema.safeParse(invalidUser);
			expect(result.success).toBe(false);
		});
	});

	describe("morbiditySchema", () => {
		it("deve validar uma comorbidade com campos adicionais de segurança", () => {
			const morbidityData = {
				id: "diabetes",
				name: "Diabetes",
				description: "Controle de glicose",
				recommendations: ["Reduzir açúcar"],
				restrictedFoods: ["Açúcar branco", "Refrigerante"],
				allowedFoods: ["Frutas baixo IG", "Aveia"],
				priorityWeight: 1,
			};
			const result = morbiditySchema.safeParse(morbidityData);
			expect(result.success).toBe(true);
		});
	});

	describe("weeklyMenuSchema e mealSchema", () => {
		it("deve validar um menu semanal completo", () => {
			const result = weeklyMenuSchema.safeParse(weeklyMenus[0]);
			expect(result.success).toBe(true);
		});
	});

	describe("userRestrictionSchema", () => {
		it("deve validar restrições do usuário", () => {
			const restriction = {
				ingredient: "Amendoim",
				type: "alergia" as const,
				addedAt: new Date().toISOString(),
			};
			const result = userRestrictionSchema.safeParse(restriction);
			expect(result.success).toBe(true);
		});
	});

	describe("Contratos dos Agentes e Orquestrador", () => {
		it("deve validar o contrato do NutriBaseAgent", () => {
			const req = { profile: mockUsers[0] };
			const reqParsed = nutriBaseAgentRequestSchema.safeParse(req);
			expect(reqParsed.success).toBe(true);

			const res = { baseMenu: weeklyMenus[0], source: "fallback" as const };
			const resParsed = nutriBaseAgentResponseSchema.safeParse(res);
			expect(resParsed.success).toBe(true);
		});

		it("deve validar o contrato do ComorbidityAgent e log de auditoria", () => {
			const substitution = {
				originalFood: "Açúcar",
				substitutedFood: "Adoçante stévia",
				reason: "Controle glicêmico",
				morbidities: ["diabetes"],
			};
			expect(appliedSubstitutionSchema.safeParse(substitution).success).toBe(true);

			const res = {
				safeMenu: weeklyMenus[0],
				auditLog: [substitution],
				warnings: ["Atenção ao consumo de sódio"],
				isSafe: true,
				source: "ai" as const,
			};
			expect(comorbidityAgentResponseSchema.safeParse(res).success).toBe(true);
		});

		it("deve validar o contrato do CaloricBalancerAgent", () => {
			const req = { menu: weeklyMenus[0], targetCalories: 2000 };
			expect(caloricBalancerAgentRequestSchema.safeParse(req).success).toBe(true);

			const res = {
				balancedMenu: weeklyMenus[0],
				totalDailyCalories: 1980,
				source: "fallback" as const,
			};
			expect(caloricBalancerAgentResponseSchema.safeParse(res).success).toBe(true);
		});

		it("deve validar o contrato do VirtualNutriChatAgent", () => {
			const req = {
				message: "Posso comer maçã?",
				userContext: {
					name: "Maria",
					morbidities: ["diabetes"],
					plan: "TRANSFORMACAO" as const,
				},
			};
			expect(virtualNutriChatAgentRequestSchema.safeParse(req).success).toBe(true);

			const res = {
				responseText: "Sim, a maçã possui baixo índice glicêmico.",
				disclaimer: "Conteúdo educativo.",
				source: "ai" as const,
			};
			expect(virtualNutriChatAgentResponseSchema.safeParse(res).success).toBe(true);
		});

		it("deve validar o contrato do Orquestrador", () => {
			const req = {
				userId: "user-123",
				profile: mockUsers[0],
				morbidities: ["diabetes", "hipertensao"],
			};
			expect(orchestrationRequestSchema.safeParse(req).success).toBe(true);

			const res = {
				menu: weeklyMenus[0],
				auditLog: [],
				warnings: [],
				isFallback: false,
				generatedAt: new Date().toISOString(),
			};
			expect(orchestrationResponseSchema.safeParse(res).success).toBe(true);
		});
	});
});
