import { describe, it, expect, vi } from "vitest";
import { comorbidityOrchestrator } from "../services/orchestrator.service";
import { conflictResolver } from "../services/orchestrator/conflictResolver";
import { comorbidityAgent } from "../services/agents/comorbidity.agent";
import { mockUsers, weeklyMenus } from "../data/mocks";
import type { OrchestrationRequest } from "../types";

describe("Testes do Orquestrador de Comorbidades (Etapa 05)", () => {
	const validRequest: OrchestrationRequest = {
		userId: "user-1",
		profile: mockUsers[0],
		morbidities: ["diabetes", "hipertensao"],
		customRestrictions: [
			{
				ingredient: "Camarão",
				type: "alergia",
				addedAt: new Date().toISOString(),
			},
		],
	};

	it("1. Fluxo Normal: deve orquestrar com sucesso e retornar o plano consolidado", async () => {
		const response = await comorbidityOrchestrator.orchestrate(validRequest);
		expect(response).toBeDefined();
		expect(response.menu).toBeDefined();
		expect(response.auditLog).toBeDefined();
		expect(response.generatedAt).toBeDefined();
		expect(Array.isArray(response.warnings)).toBe(true);
	});

	it("2. Resolução de Conflitos: deve detectar e resolver conflitos de múltiplas morbidades simultâneas", async () => {
		const conflictRequest: OrchestrationRequest = {
			...validRequest,
			morbidities: [
				"bariatrica-liquida",
				"bariatrica-pastosa",
				"diabetes",
				"intolerancia-lactose",
				"gastrite",
				"hipertensao",
			],
		};

		const response = await comorbidityOrchestrator.orchestrate(conflictRequest);
		expect(response).toBeDefined();

		const conflictWarnings = response.warnings.filter((w) =>
			w.includes("[Conflito Detectado]") || w.includes("[Conflito Resolvido]")
		);
		expect(conflictWarnings.length).toBeGreaterThan(0);
	});

	it("3. Resiliência a Erro de Agente: deve lidar com falha em um agente sem interromper a resposta", async () => {
		// Mock temporário do ComorbidityAgent para simular exceção de execução
		const spy = vi.spyOn(comorbidityAgent, "process").mockRejectedValueOnce(
			new Error("Falha temporária de conexão com o agente"),
		);

		const response = await comorbidityOrchestrator.orchestrate(validRequest);
		expect(response).toBeDefined();
		expect(response.isFallback).toBe(true);
		expect(response.warnings.some((w) => w.includes("Falha ao aplicar auditoria"))).toBe(true);

		spy.mockRestore();
	});

	it("4. Validação de Entrada: deve rejeitar solicitações com contexto de usuário inválido", async () => {
		const invalidRequest = {
			...validRequest,
			profile: { ...mockUsers[0], age: -10 },
		};

		await expect(comorbidityOrchestrator.orchestrate(invalidRequest)).rejects.toThrow(
			"[ComorbidityOrchestrator] Erro de validação de entrada",
		);
	});

	it("5. Teste Direto do ConflictResolver: deve priorizar corretamente fases médicas de maior peso", () => {
		const result = conflictResolver.resolve(
			weeklyMenus[0],
			[],
			["bariatrica-pastosa", "bariatrica-liquida", "diabetes"],
		);

		expect(result.conflictWarnings.some((w) => w.includes("bariatrica-liquida"))).toBe(true);
	});
});
