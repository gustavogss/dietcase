import {
	caloricBalancerAgentRequestSchema,
	caloricBalancerAgentResponseSchema,
	type CaloricBalancerAgentRequest,
	type CaloricBalancerAgentResponse,
	type WeeklyMenu,
	type DayMenu,
} from "@/types";

/**
 * CaloricBalancerAgent - Agente de Balanço Calórico e Macronutrientes
 * Responsabilidade Única: Ajustar porções, calorias e macronutrientes do cardápio para atingir as metas calóricas.
 */
export class CaloricBalancerAgent {
	public async process(request: CaloricBalancerAgentRequest): Promise<CaloricBalancerAgentResponse> {
		// Validação estrita da entrada
		const parseResult = caloricBalancerAgentRequestSchema.safeParse(request);
		if (!parseResult.success) {
			throw new Error(
				`[CaloricBalancerAgent] Erro de validação de entrada: ${parseResult.error.message}`,
			);
		}

		const { menu, targetCalories } = parseResult.data;

		try {
			// Calcular calorias totais diárias atuais (usando a Segunda-Feira como referência)
			const currentCalories = this.calculateDailyCalories(menu.monday);

			// Se a caloria atual for 0 ou praticamente igual ao alvo, retorna o menu clonado
			if (currentCalories === 0 || Math.abs(currentCalories - targetCalories) < 50) {
				const response: CaloricBalancerAgentResponse = {
					balancedMenu: menu,
					totalDailyCalories: currentCalories,
					source: "fallback",
				};
				return caloricBalancerAgentResponseSchema.parse(response);
			}

			// Calcular fator de escala
			const scaleFactor = targetCalories / currentCalories;

			// Clonar o menu e ajustar calorias/macros
			const balancedMenu: WeeklyMenu = JSON.parse(JSON.stringify(menu));
			const days: (keyof WeeklyMenu)[] = [
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
				"sunday",
			];

			const mealKeys = [
				"breakfast",
				"morningSnack",
				"lunch",
				"afternoonSnack",
				"dinner",
				"supper",
			] as const;

			for (const day of days) {
				if (typeof balancedMenu[day] === "object" && balancedMenu[day] !== null) {
					const dayObj = balancedMenu[day] as DayMenu;
					for (const mealKey of mealKeys) {
						const meal = dayObj[mealKey];
						if (meal) {
							meal.calories = Math.round(meal.calories * scaleFactor);
							meal.macros = {
								protein: Math.round(meal.macros.protein * scaleFactor),
								carbs: Math.round(meal.macros.carbs * scaleFactor),
								fat: Math.round(meal.macros.fat * scaleFactor),
							};
						}
					}
				}
			}

			const finalDailyCalories = this.calculateDailyCalories(balancedMenu.monday);

			const response: CaloricBalancerAgentResponse = {
				balancedMenu,
				totalDailyCalories: finalDailyCalories,
				source: "fallback",
			};

			return caloricBalancerAgentResponseSchema.parse(response);
		} catch (error) {
			console.error("[CaloricBalancerAgent] Erro ao balancear calorias:", error);
			throw new Error(
				`[CaloricBalancerAgent] Falha no balanceamento calórico: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
			);
		}
	}

	private calculateDailyCalories(day: DayMenu): number {
		const mealKeys = [
			"breakfast",
			"morningSnack",
			"lunch",
			"afternoonSnack",
			"dinner",
			"supper",
		] as const;

		return mealKeys.reduce((acc, key) => {
			return acc + (day[key]?.calories || 0);
		}, 0);
	}
}

export const caloricBalancerAgent = new CaloricBalancerAgent();
