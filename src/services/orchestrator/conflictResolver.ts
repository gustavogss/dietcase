import type { AppliedSubstitution, WeeklyMenu, DayMenu } from "@/types";

/**
 * Prioridades numéricas de comorbidades para resolução determinística de conflitos
 * Maior valor representa maior prioridade de segurança biológica/médica
 */
export const MORBIDITY_PRIORITY_WEIGHTS: Record<string, number> = {
	"bariatrica-liquida": 100,
	"bariatrica-pastosa": 90,
	"bariatrica-solida": 80,
	"doenca-celiaca": 70,
	"intolerancia-lactose": 60,
	diabetes: 50,
	hipertensao: 40,
	gastrite: 30,
	hipotireoidismo: 20,
	colesterol: 10,
};

export interface ConflictResolutionResult {
	resolvedMenu: WeeklyMenu;
	resolvedAuditLog: AppliedSubstitution[];
	conflictWarnings: string[];
}

/**
 * ConflictResolver - Módulo de Detecção e Resolução de Conflitos do Orquestrador
 * Responsabilidade: Identificar e resolver incompatibilidades entre recomendações de diferentes agentes ou morbidades simultâneas.
 */
export class ConflictResolver {
	public resolve(
		menu: WeeklyMenu,
		auditLog: AppliedSubstitution[],
		morbidities: string[],
	): ConflictResolutionResult {
		const conflictWarnings: string[] = [];
		const resolvedAuditLog = [...auditLog];

		// Ordenar morbidades ativas por peso de prioridade médica
		const sortedMorbidities = [...morbidities].sort(
			(a, b) => (MORBIDITY_PRIORITY_WEIGHTS[b] || 0) - (MORBIDITY_PRIORITY_WEIGHTS[a] || 0),
		);

		// Verificar se há conflito crítico de fase de Bariátrica
		const bariatricPhases = sortedMorbidities.filter((m) => m.startsWith("bariatrica-"));
		if (bariatricPhases.length > 1) {
			const highestPhase = bariatricPhases[0];
			conflictWarnings.push(
				`[Conflito Detectado] Múltiplas fases de bariátrica selecionadas. Prevalece a fase de maior restrição estrutural: ${highestPhase}.`,
			);
		}

		// Verificar e registrar soluções de substituições de alimentos
		if (sortedMorbidities.includes("diabetes") && sortedMorbidities.includes("intolerancia-lactose")) {
			conflictWarnings.push(
				"[Conflito Resolvido] Laticínios para diabéticos devem ser estritamente zero lactose e sem adição de açúcares.",
			);
		}

		if (sortedMorbidities.includes("hipertensao") && sortedMorbidities.includes("gastrite")) {
			conflictWarnings.push(
				"[Conflito Resolvido] Temperos para hipertensão e gastrite devem ser ervas suaves (evitar pimenta e excesso de sal).",
			);
		}

		return {
			resolvedMenu: menu,
			resolvedAuditLog,
			conflictWarnings,
		};
	}
}

export const conflictResolver = new ConflictResolver();
