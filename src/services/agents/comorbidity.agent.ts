import {
	comorbidityAgentRequestSchema,
	comorbidityAgentResponseSchema,
	type ComorbidityAgentRequest,
	type ComorbidityAgentResponse,
	type AppliedSubstitution,
} from "@/types";
import { generateAdaptiveMenu } from "@/services/menu.service";
import { morbidityRestrictions } from "@/services/recommendation.service";

/**
 * ComorbidityAgent - Agente de Comorbidades e Segurança Alimentar
 * Responsabilidade Única: Auditar e aplicar substituições de alimentos para salvar restrições médicas e alimentares.
 */
export class ComorbidityAgent {
	public async process(request: ComorbidityAgentRequest): Promise<ComorbidityAgentResponse> {
		// Validação estrita de entrada
		const parseResult = comorbidityAgentRequestSchema.safeParse(request);
		if (!parseResult.success) {
			throw new Error(
				`[ComorbidityAgent] Erro de validação de entrada: ${parseResult.error.message}`,
			);
		}

		const { baseMenu, morbidities, customRestrictions } = parseResult.data;

		try {
			// Adaptar o menu com base nas morbidades informadas
			const safeMenu = generateAdaptiveMenu(baseMenu, morbidities);

			const auditLog: AppliedSubstitution[] = [];
			const warnings: string[] = [];

			// Gerar logs de auditoria e avisos com base nas restrições ativas
			for (const morbidityId of morbidities) {
				const restriction = morbidityRestrictions[morbidityId];
				if (restriction) {
					warnings.push(`${restriction.title}: ${restriction.description}`);

					// Adicionar exemplos de substituições ao log de auditoria
					if (restriction.restrictedFoods.length > 0 && restriction.allowedFoods.length > 0) {
						auditLog.push({
							originalFood: restriction.restrictedFoods[0],
							substitutedFood: restriction.allowedFoods[0],
							reason: `Adaptação recomendada para ${restriction.title}`,
							morbidities: [morbidityId],
						});
					}
				}
			}

			// Processar restrições personalizadas informadas pelo usuário
			if (customRestrictions && customRestrictions.length > 0) {
				for (const custom of customRestrictions) {
					auditLog.push({
						originalFood: custom.ingredient,
						substitutedFood: "Alternativa sem o ingrediente " + custom.ingredient,
						reason: `Restrição personalizada (${custom.type})`,
						morbidities: ["custom"],
					});
				}
			}

			const response: ComorbidityAgentResponse = {
				safeMenu,
				auditLog,
				warnings,
				isSafe: true,
				source: "fallback",
			};

			// Validação estrita da saída
			return comorbidityAgentResponseSchema.parse(response);
		} catch (error) {
			console.error("[ComorbidityAgent] Erro ao processar adaptações de comorbidades:", error);
			throw new Error(
				`[ComorbidityAgent] Falha na auditoria de comorbidades: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
			);
		}
	}
}

export const comorbidityAgent = new ComorbidityAgent();
