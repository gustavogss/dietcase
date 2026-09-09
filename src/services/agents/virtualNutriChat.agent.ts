import {
	virtualNutriChatAgentRequestSchema,
	virtualNutriChatAgentResponseSchema,
	type VirtualNutriChatAgentRequest,
	type VirtualNutriChatAgentResponse,
} from "@/types";

/**
 * VirtualNutriChatAgent - Agente Nutricionista Virtual 24/7
 * Responsabilidade Única: Processar dúvidas nutricionais do chat com contexto do usuário e aviso de isenção médica.
 */
export class VirtualNutriChatAgent {
	private readonly DISCLAIMER =
		"Nota: Conteúdo informativo e educativo; não substitui o diagnóstico ou acompanhamento individualizado de um nutricionista ou médico.";

	public async process(
		request: VirtualNutriChatAgentRequest,
	): Promise<VirtualNutriChatAgentResponse> {
		// Validação estrita de entrada
		const parseResult = virtualNutriChatAgentRequestSchema.safeParse(request);
		if (!parseResult.success) {
			throw new Error(
				`[VirtualNutriChatAgent] Erro de validação de entrada: ${parseResult.error.message}`,
			);
		}

		const { message, userContext } = parseResult.data;

		try {
			// Construção de resposta inteligente baseada nas morbidades cadastradas no contexto do usuário
			let responseText = `Olá, ${userContext.name}! `;

			const lowerMsg = message.toLowerCase();

			if (lowerMsg.includes("tapioca")) {
				if (userContext.morbidities.includes("diabetes")) {
					responseText +=
						"A tapioca possui alto índice glicêmico. Se você possui diabetes, a recomendação é associá-la a fibras (como chia ou linhaça) e proteínas (como ovos) para reduzir o impacto na glicemia.";
				} else {
					responseText +=
						"A tapioca é uma excelente fonte de carboidratos sem glúten, ótima para o pré-treino quando combinada com proteínas.";
				}
			} else if (lowerMsg.includes("fruta") || lowerMsg.includes("açúcar")) {
				responseText +=
					"Frutas como morango, abacate, kiwi e maçã possuem menor teor de açúcar e baixo índice glicêmico, sendo ótimas escolhas diárias.";
			} else if (lowerMsg.includes("pão") || lowerMsg.includes("substituir")) {
				responseText +=
					"Você pode substituir o pão branco por pão 100% integral, aveia, ovos mexidos ou batata-doce cozida para mais fibras e saciedade.";
			} else {
				responseText += `Entendi sua dúvida sobre "${message}". Para o seu perfil (${userContext.morbidities.length > 0 ? "com foco em " + userContext.morbidities.join(", ") : "alimentação saudável"}), mantenha o foco em alimentos in natura, boa hidratação e porções adequadas.`;
			}

			const response: VirtualNutriChatAgentResponse = {
				responseText,
				disclaimer: this.DISCLAIMER,
				source: "fallback",
			};

			// Validação estrita da saída do modelo
			return virtualNutriChatAgentResponseSchema.parse(response);
		} catch (error) {
			console.error("[VirtualNutriChatAgent] Erro ao processar mensagem do chat:", error);
			throw new Error(
				`[VirtualNutriChatAgent] Falha no processamento de chat: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
			);
		}
	}
}

export const virtualNutriChatAgent = new VirtualNutriChatAgent();
