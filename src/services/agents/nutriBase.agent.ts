import {
	nutriBaseAgentRequestSchema,
	nutriBaseAgentResponseSchema,
	type NutriBaseAgentRequest,
	type NutriBaseAgentResponse,
} from "@/types";
import { getBaseMenuForUser } from "@/services/menu.service";

/**
 * NutriBaseAgent - Agente Nutricional Base
 * Responsabilidade Única: Selecionar a estrutura de cardápio semanal base alinhada ao perfil do usuário.
 */
export class NutriBaseAgent {
	public async process(request: NutriBaseAgentRequest): Promise<NutriBaseAgentResponse> {
		// Validação estrita da entrada
		const parseResult = nutriBaseAgentRequestSchema.safeParse(request);
		if (!parseResult.success) {
			throw new Error(
				`[NutriBaseAgent] Erro de validação de entrada: ${parseResult.error.message}`,
			);
		}

		const { profile } = parseResult.data;

		try {
			// Execução do algoritmo determinístico / fallback de seleção base
			const baseMenu = getBaseMenuForUser(profile.morbidities ?? []);

			const response: NutriBaseAgentResponse = {
				baseMenu,
				source: "fallback",
			};

			// Validação estrita da saída do modelo
			return nutriBaseAgentResponseSchema.parse(response);
		} catch (error) {
			console.error("[NutriBaseAgent] Erro ao processar cardápio base:", error);
			throw new Error(
				`[NutriBaseAgent] Falha na geração do cardápio base: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
			);
		}
	}
}

export const nutriBaseAgent = new NutriBaseAgent();
