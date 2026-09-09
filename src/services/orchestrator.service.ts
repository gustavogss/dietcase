import {
	orchestrationRequestSchema,
	orchestrationResponseSchema,
	type OrchestrationRequest,
	type OrchestrationResponse,
	type WeeklyMenu,
	type AppliedSubstitution,
} from "@/types";
import { nutriBaseAgent } from "@/services/agents/nutriBase.agent";
import { comorbidityAgent } from "@/services/agents/comorbidity.agent";
import { caloricBalancerAgent } from "@/services/agents/caloricBalancer.agent";
import { conflictResolver } from "@/services/orchestrator/conflictResolver";
import { getBaseMenuForUser } from "@/services/menu.service";

/**
 * ComorbidityOrchestrator - Orquestrador Principal do DietCase
 * Responsabilidade: Coordenar sequencialmente os agentes de IA especializados,
 * validar saídas, resolver conflitos e consolidar o plano alimentar final.
 */
export class ComorbidityOrchestrator {
	public async orchestrate(
		request: OrchestrationRequest,
	): Promise<OrchestrationResponse> {
		// 1 & 2. Receber e validar rigorosamente a solicitação de entrada
		const inputValidation = orchestrationRequestSchema.safeParse(request);
		if (!inputValidation.success) {
			throw new Error(
				`[ComorbidityOrchestrator] Erro de validação de entrada: ${inputValidation.error.message}`,
			);
		}

		const { profile, morbidities, customRestrictions } = inputValidation.data;

		let isFallback = false;
		let auditLog: AppliedSubstitution[] = [];
		const warnings: string[] = [];

		try {
			// 3. Preparar o contexto (estimativa de meta calórica com base na fórmula Harris-Benedict simplificada)
			const targetCalories = this.calculateTargetCalories(profile);

			// 4 & 5. Executar e validar NutriBaseAgent
			let baseMenu: WeeklyMenu;
			try {
				const nutriBaseRes = await nutriBaseAgent.process({ profile });
				baseMenu = nutriBaseRes.baseMenu;
				if (nutriBaseRes.source === "fallback") isFallback = true;
			} catch (error) {
				console.warn("[ComorbidityOrchestrator] Falha no NutriBaseAgent, ativando fallback de menu base:", error);
				baseMenu = getBaseMenuForUser(morbidities);
				isFallback = true;
			}

			// 4 & 5. Executar e validar ComorbidityAgent
			let safeMenu: WeeklyMenu = baseMenu;
			try {
				const comorbidityRes = await comorbidityAgent.process({
					baseMenu,
					morbidities,
					customRestrictions,
				});
				safeMenu = comorbidityRes.safeMenu;
				auditLog = comorbidityRes.auditLog;
				warnings.push(...comorbidityRes.warnings);
				if (comorbidityRes.source === "fallback") isFallback = true;
			} catch (error) {
				console.warn("[ComorbidityOrchestrator] Falha no ComorbidityAgent, mantendo menu base:", error);
				warnings.push("Aviso: Falha ao aplicar auditoria avançada de comorbidades. Aplicando dieta preventiva base.");
				isFallback = true;
			}

			// 6 & 7. Detecção e Resolução de Conflitos entre morbidades e restrições
			const conflictResult = conflictResolver.resolve(safeMenu, auditLog, morbidities);
			safeMenu = conflictResult.resolvedMenu;
			auditLog = conflictResult.resolvedAuditLog;
			warnings.push(...conflictResult.conflictWarnings);

			// 4 & 5. Executar e validar CaloricBalancerAgent
			let finalMenu: WeeklyMenu = safeMenu;
			try {
				const balancerRes = await caloricBalancerAgent.process({
					menu: safeMenu,
					targetCalories,
				});
				finalMenu = balancerRes.balancedMenu;
			} catch (error) {
				console.warn("[ComorbidityOrchestrator] Falha no CaloricBalancerAgent, mantendo calorias padrão:", error);
			}

			// 8 & 9. Consolidar e validar a resposta estruturada final
			const response: OrchestrationResponse = {
				menu: finalMenu,
				auditLog,
				warnings,
				isFallback,
				generatedAt: new Date().toISOString(),
			};

			return orchestrationResponseSchema.parse(response);
		} catch (criticalError) {
			console.error("[ComorbidityOrchestrator] Erro crítico durante orquestração:", criticalError);

			// Resiliência de Emergência: Caso ocorra um erro fatal não previsto
			const fallbackMenu = getBaseMenuForUser(morbidities);
			const fallbackResponse: OrchestrationResponse = {
				menu: fallbackMenu,
				auditLog: [],
				warnings: ["Alerta: Ocorreu uma falha inesperada na orquestração. O sistema gerou um plano alimentar seguro de contingência."],
				isFallback: true,
				generatedAt: new Date().toISOString(),
			};

			return orchestrationResponseSchema.parse(fallbackResponse);
		}
	}

	/**
	 * Calcula estimativa de meta calórica baseada em TDEE simplificado
	 */
	private calculateTargetCalories(profile: OrchestrationRequest["profile"]): number {
		// Fórmula BMR simplificada: 10 * peso + 6.25 * altura - 5 * idade + 5
		const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
		const multiplier = profile.exercises ? 1.375 : 1.2;
		let target = Math.round(bmr * multiplier);

		// Ajuste por objetivo (se IMC > 25 -> déficit de 15%)
		if (profile.imc > 25) {
			target = Math.round(target * 0.85);
		}

		return Math.max(1200, Math.min(3500, target));
	}
}

export const comorbidityOrchestrator = new ComorbidityOrchestrator();
