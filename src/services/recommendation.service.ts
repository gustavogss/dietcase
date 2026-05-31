import type {
	UserProfile,
	UserProgress,
	Goal,
	Recommendation,
	PlanType,
} from "@/types";
import { predefinedRecommendations } from "@/data/mocks";

/**
 * Mapeamento de restrições alimentares por morbidade
 */
export const morbidityRestrictions: Record<
	string,
	{
		title: string;
		description: string;
		restrictedFoods: string[];
		allowedFoods: string[];
		icon: string;
	}
> = {
	diabetes: {
		title: "Restrições para Diabetes",
		description:
			"Evite: açúcares simples, doces, refrigerantes, sucos industrializados, farinha branca refinada, mel e melado. Prefira carboidratos complexos e alimentos com baixo índice glicêmico.",
		restrictedFoods: [
			"Açúcar branco, mascavo e refinado",
			"Doces, bolos, tortas e sobremesas açucaradas",
			"Refrigerantes e bebidas açucaradas",
			"Sucos de caixa e néctares industrializados",
			"Pão branco, massas e farinhas refinadas",
			"Mel, melado e xaropes",
			"Batata frita e salgadinhos",
			"Cereais açucarados",
		],
		allowedFoods: [
			"Vegetais não amiláceos (brócolis, couve-flor, espinafre)",
			"Proteínas magras (frango, peixe, tofu)",
			"Grãos integrais (aveia, quinoa, arroz integral)",
			"Leguminosas (lentilha, grão-de-bico)",
			"Nozes e sementes (amêndoas, chia, linhaça)",
			"Frutas com baixo índice glicêmico (morango, pêra, maçã)",
			"Gorduras saudáveis (azeite, abacate)",
		],
		icon: "Ban",
	},
	hipertensao: {
		title: "Restrições para Hipertensão",
		description:
			"Evite: sal em excesso, embutidos (salsicha, linguiça, presunto), alimentos processados, enlatados, temperos industrializados, fast food. Prefira temperos naturais e alimentos frescos.",
		restrictedFoods: [
			"Sal de cozinha em excesso",
			"Embutidos (salsicha, linguiça, mortadela, presunto)",
			"Bacon e carnes processadas",
			"Enlatados e conservas",
			"Caldos e temperos industrializados",
			"Fast food e comidas prontas",
			"Snacks salgados (chips, amendoim salgado)",
			"Molhos prontos (shoyu, inglês, ketchup)",
		],
		allowedFoods: [
			"Frutas frescas (banana, laranja, melancia)",
			"Vegetais frescos (todos os tipos)",
			"Carnes magras sem sal (frango, peixe grelhado)",
			"Grãos integrais (arroz integral, aveia)",
			"Temperos naturais (alho, cebola, ervas frescas)",
			"Azeite de oliva extra virgem",
			"Leite e iogurte desnatados",
			"Leguminosas (feijão, lentilha)",
		],
		icon: "Ban",
	},
	obesidade: {
		title: "Restrições para Obesidade",
		description:
			"Evite: alimentos ultraprocessados, frituras, fast food, bebidas açucaradas, guloseimas, massas em excesso. Prefira alimentos naturais, proteínas magras e vegetais.",
		restrictedFoods: [
			"Alimentos ultraprocessados e industrializados",
			"Frituras (batata frita, salgados fritos)",
			"Fast food (hambúrguer, pizza, cachorro-quente)",
			"Refrigerantes e sucos industrializados",
			"Doces, chocolates e guloseimas",
			"Massas em excesso (macarrão, lasanha)",
			"Bebidas alcoólicas",
			"Manteiga, margarina e cremes",
		],
		allowedFoods: [
			"Vegetais à vontade (folhas verdes, legumes)",
			"Proteínas magras (peito de frango, peixe, claras)",
			"Frutas com moderação (maçã, pêra, frutas vermelhas)",
			"Grãos integrais em porções controladas",
			"Ovos cozidos ou mexidos",
			"Iogurte natural desnatado",
			"Oleaginosas em pequenas porções",
			"Água, chás sem açúcar",
		],
		icon: "Ban",
	},
	colesterol: {
		title: "Restrições para Colesterol Alto",
		description:
			"Evite: gorduras trans, frituras, carnes gordas, manteiga, creme de leite, queijos amarelos, bacon, embutidos. Prefira peixes, azeite de oliva e gorduras insaturadas.",
		restrictedFoods: [
			"Gorduras trans (margarina, biscoitos recheados)",
			"Frituras em geral",
			"Carnes gordas (picanha, costela, cupim)",
			"Bacon, torresmo e linguiça",
			"Manteiga, creme de leite e nata",
			"Queijos amarelos (cheddar, prato, mussarela)",
			"Embutidos em geral",
			"Pele de frango",
			"Miúdos (fígado, coração)",
		],
		allowedFoods: [
			"Peixes ricos em ômega-3 (salmão, sardinha, atum)",
			"Azeite de oliva extra virgem",
			"Nozes, amêndoas e castanhas",
			"Aveia e farelo de aveia",
			"Frutas (especialmente maçã e frutas cítricas)",
			"Vegetais (todos os tipos)",
			"Leguminosas (feijão, lentilha, grão-de-bico)",
			"Abacate com moderação",
			"Leite desnatado e iogurte desnatado",
		],
		icon: "Ban",
	},
	gastrite: {
		title: "Restrições para Gastrite",
		description:
			"Evite: café em excesso, pimenta, alimentos muito ácidos (limão, laranja), bebidas alcoólicas, frituras, alimentos muito condimentados. Prefira refeições menores e leves.",
		restrictedFoods: [
			"Café em excesso (mais de 2 xícaras/dia)",
			"Pimenta e condimentos picantes",
			"Frutas ácidas (limão, laranja, abacaxi)",
			"Bebidas alcoólicas",
			"Frituras e alimentos gordurosos",
			"Alimentos muito condimentados",
			"Refrigerantes e bebidas gaseificadas",
			"Chocolate",
			"Tomate e molhos ácidos",
		],
		allowedFoods: [
			"Carnes magras bem cozidas",
			"Peixes grelhados ou cozidos",
			"Vegetais cozidos (cenoura, abóbora, chuchu)",
			"Frutas não ácidas (banana, mamão, melão)",
			"Arroz branco e macarrão",
			"Pão branco ou integral macio",
			"Ovos cozidos ou pochê",
			"Leite desnatado (se tolerado)",
			"Chás suaves (camomila, erva-doce)",
		],
		icon: "Ban",
	},
	anemia: {
		title: "Restrições para Anemia",
		description:
			"Evite consumir: café, chá preto e leite junto com refeições ricas em ferro (eles atrapalham a absorção). Prefira vitamina C junto com fontes de ferro para melhor absorção.",
		restrictedFoods: [
			"Café junto com refeições principais",
			"Chá preto e chá mate com refeições",
			"Leite e derivados junto com fontes de ferro",
			"Refrigerantes (principalmente cola)",
			"Alimentos ricos em cálcio junto com ferro",
			"Excesso de farelo de trigo",
		],
		allowedFoods: [
			"Carnes vermelhas magras (principal fonte de ferro)",
			"Fígado e miúdos",
			"Feijão, lentilha e grão-de-bico",
			"Vegetais verde-escuros (espinafre, couve, brócolis)",
			"Beterraba",
			"Frutas ricas em vitamina C (laranja, acerola, kiwi)",
			"Ovos",
			"Cereais fortificados com ferro",
			"Sementes de abóbora",
		],
		icon: "Ban",
	},
	"intolerancia-lactose": {
		title: "Restrições para Intolerância à Lactose",
		description:
			"Evite: leite de vaca, queijos frescos, iogurtes, sorvetes tradicionais, creme de leite, manteiga. Prefira leites vegetais (soja, amêndoas, aveia) e produtos sem lactose.",
		restrictedFoods: [
			"Leite de vaca integral, semi e desnatado",
			"Queijos frescos e cremosos",
			"Iogurtes tradicionais",
			"Sorvetes à base de leite",
			"Creme de leite e nata",
			"Manteiga convencional",
			"Requeijão",
			"Produtos que contenham leite na composição",
		],
		allowedFoods: [
			"Leite de amêndoas, soja, aveia, coco",
			"Iogurtes e queijos sem lactose",
			"Tofu e derivados de soja",
			"Carnes, peixes e ovos (naturalmente sem lactose)",
			"Frutas e vegetais (todos)",
			"Arroz, quinoa e outros grãos",
			"Leguminosas",
			"Azeite e óleos vegetais",
			'Produtos certificados "sem lactose"',
		],
		icon: "Ban",
	},
	"doenca-celiaca": {
		title: "Restrições para Doença Celíaca",
		description:
			"Evite: trigo, centeio, cevada, malte, qualquer produto com glúten (pães, massas, bolos tradicionais). Sempre leia rótulos. Prefira arroz, quinoa, tapioca e produtos sem glúten certificados.",
		restrictedFoods: [
			"Trigo e todos seus derivados",
			"Centeio, cevada e malte",
			"Pães, massas e bolos tradicionais",
			"Cerveja convencional",
			"Biscoitos e bolachas com glúten",
			"Salgadinhos e empanados tradicionais",
			"Molhos e temperos que contenham glúten",
			'Qualquer produto sem certificação "sem glúten"',
		],
		allowedFoods: [
			"Arroz (todos os tipos)",
			"Quinoa, amaranto, painço",
			"Milho e derivados (polenta, fubá)",
			"Tapioca e fécula de mandioca",
			"Batata, batata-doce, mandioca",
			"Carnes, peixes e ovos naturais",
			"Frutas e vegetais (todos)",
			"Leguminosas",
			'Produtos certificados "sem glúten"',
		],
		icon: "Ban",
	},
	"sindrome-intestino-irritavel": {
		title: "Restrições para Síndrome do Intestino Irritável",
		description:
			"Evite: alimentos FODMAPs (trigo, cebola, alho, leite, feijão, maçã), cafeína, bebidas gaseificadas, frituras. Prefira dieta low-FODMAP e identifique seus gatilhos pessoais.",
		restrictedFoods: [
			"Trigo, cebola e alho",
			"Leite e laticínios convencionais",
			"Feijão, lentilha e grão-de-bico",
			"Maçã, pêra e frutas com frutose",
			"Couve-flor, brócolis e repolho",
			"Bebidas gaseificadas",
			"Café e cafeína",
			"Frituras e alimentos gordurosos",
			"Adoçantes artificiais",
		],
		allowedFoods: [
			"Arroz branco e arroz integral",
			"Quinoa e aveia (pequenas porções)",
			"Carnes magras e peixes",
			"Ovos",
			"Cenoura, abobrinha, berinjela",
			"Banana, morango, melão, uva",
			"Leite sem lactose (pequenas porções)",
			"Azeite de oliva",
			"Chás de hortelã e gengibre",
		],
		icon: "Ban",
	},
	hipotireoidismo: {
		title: "Restrições para Hipotireoidismo",
		description:
			"Evite: soja crua em excesso, crucíferos crus em grande quantidade (couve, brócolis), alimentos bociogênicos. Prefira alimentos ricos em iodo e selênio, cozinhe os vegetais.",
		restrictedFoods: [
			"Soja crua e derivados não fermentados em excesso",
			"Crucíferos crus (couve, brócolis, repolho)",
			"Mandioca crua",
			"Rabanete e nabo crus",
			"Amendoim cru em grande quantidade",
			"Alimentos bociogênicos em excesso",
		],
		allowedFoods: [
			"Peixes e frutos do mar (ricos em iodo)",
			"Castanha-do-pará (selênio)",
			"Ovos",
			"Carnes magras",
			"Vegetais cozidos (brócolis, couve após cozimento)",
			"Frutas (todas)",
			"Grãos integrais",
			"Laticínios",
			"Sal iodado com moderação",
		],
		icon: "Ban",
	},
	"bariatrica-liquida": {
		title: "Restrições Pós-Bariátrica Fase Líquida",
		description:
			"Evite: qualquer alimento sólido, bebidas gaseificadas, açúcar, alimentos gordurosos. APENAS líquidos claros e proteínas líquidas em pequenos volumes. Siga rigorosamente a orientação médica.",
		restrictedFoods: [
			"QUALQUER alimento sólido",
			"Bebidas gaseificadas (refrigerantes, água com gás)",
			"Açúcar e doces",
			"Leite integral",
			"Sucos muito concentrados",
			"Café forte",
			"Bebidas alcoólicas",
			"Alimentos gordurosos",
		],
		allowedFoods: [
			"Água (principal bebida)",
			"Caldos coados e desengordur ados",
			"Gelatina diet",
			"Chás claros sem açúcar",
			"Suplementos proteicos líquidos prescritos",
			"Água de coco (se liberado pelo médico)",
			"Suco coado e diluído (se liberado)",
		],
		icon: "AlertTriangle",
	},
	"bariatrica-pastosa": {
		title: "Restrições Pós-Bariátrica Fase Pastosa",
		description:
			"Evite: alimentos sólidos, líquidos durante refeições, açúcar, frituras, alimentos fibrosos. Apenas alimentos pastosos, proteína em cada refeição, mastigar muito bem.",
		restrictedFoods: [
			"Alimentos sólidos e com textura",
			"Líquidos junto com refeições",
			"Açúcar e doces",
			"Frituras",
			"Alimentos muito fibrosos",
			"Pão, arroz e massas",
			"Carnes em pedaços",
			"Bebidas gaseificadas",
		],
		allowedFoods: [
			"Purês de carne magra (frango, peixe)",
			"Ovos mexidos bem cozidos",
			"Iogurte desnatado natural",
			"Queijo cottage batido",
			"Purê de batata (pequenas porções)",
			"Purê de legumes",
			"Vitaminas de frutas com proteína",
			"Sopas cremosas coadas",
		],
		icon: "AlertTriangle",
	},
	"bariatrica-solida": {
		title: "Restrições Pós-Bariátrica Fase Sólida",
		description:
			"Evite: açúcar, frituras, bebidas gaseificadas, comer rápido, líquidos junto com sólidos. Mastigue muito bem, proteína primeiro, porções pequenas e controladas.",
		restrictedFoods: [
			"Açúcar e doces concentrados",
			"Frituras e alimentos muito gordurosos",
			"Bebidas gaseificadas",
			"Líquidos junto com sólidos",
			"Alimentos muito secos ou duros",
			"Pão fresco e massas em excesso",
			"Comer rápido sem mastigar",
			"Porções grandes",
		],
		allowedFoods: [
			"Carnes magras bem cozidas (frango, peixe, carne moída)",
			"Ovos (preparações leves)",
			"Queijos magros",
			"Legumes cozidos macios",
			"Frutas macias sem casca",
			"Arroz integral bem cozido",
			"Feijão amassado",
			"Iogurte desnatado",
			"Proteínas em todas as refeições",
		],
		icon: "AlertTriangle",
	},
};

/**
 * Função pura que calcula recomendações baseadas no perfil do usuário
 */
export function getRecommendations(
	profile: UserProfile,
	progress: UserProgress,
	goals: Goal[],
): Recommendation[] {
	const recommendations: Recommendation[] = [];

	// REGRA 1: IMC > 30 → Controle calórico rigoroso
	if (profile.imc > 30) {
		recommendations.push({
			id: "imc-high",
			type: "Alimentação",
			title: "Controle calórico rigoroso recomendado",
			description:
				"Seu IMC está acima de 30. Reduza calorias e aumente atividade física.",
			priority: "Alta",
			icon: "AlertTriangle",
		});
	}

	// REGRA 2: IMC entre 25-30 → Dieta balanceada
	if (profile.imc >= 25 && profile.imc <= 30) {
		recommendations.push({
			id: "imc-medium",
			type: "Alimentação",
			title: "Mantenha uma dieta balanceada",
			description:
				"Seu IMC está levemente acima do ideal. Continue atento à alimentação.",
			priority: "Média",
			icon: "Scale",
		});
	}

	// REGRA 3: Metas não concluídas → Sugerir ajuste
	const incompleteGoals = goals.filter((g) => !g.completed);
	if (incompleteGoals.length > 0) {
		recommendations.push({
			id: "goals-incomplete",
			type: "Progresso",
			title: `${incompleteGoals.length} meta(s) pendente(s)`,
			description:
				"Revise suas metas e ajuste sua estratégia para alcançá-las.",
			priority: "Média",
			icon: "Target",
		});
	}

	// REGRA 4: Peso estagnado há 7+ dias → Sugerir nova dieta
	if (progress.lastWeightChange >= 7) {
		recommendations.push({
			id: "weight-stagnant",
			type: "Progresso",
			title: "Peso estagnado há 7 dias",
			description:
				"Considere ajustar sua dieta ou aumentar exercícios físicos.",
			priority: "Alta",
			icon: "TrendingDown",
		});
	}

	// REGRA 5: Múltiplas morbidades e plano Essencial → Recomendar Transformação
	if (profile.morbidities.length >= 2 && profile.plan === "Essencial") {
		recommendations.push({
			id: "multiple-morbidities-upgrade",
			type: "Plano",
			title: "Múltiplas condições detectadas",
			description:
				"O plano Transformação oferece suporte total para gerenciar várias morbidades simultaneamente.",
			priority: "Alta",
			icon: "Crown",
			actionLabel: "Ver Plano Transformação",
			actionUrl: "/planos",
		});
	}

	// REGRA 6: Plano Essencial → Recomendar Transformação
	if (profile.plan === "Essencial") {
		recommendations.push({
			id: "upgrade-premium",
			type: "Plano",
			title: "Personalize seus cardápios",
			description: "Faça upgrade para Transformação e customize suas dietas.",
			priority: "Média",
			icon: "Sparkles",
			actionLabel: "Ver Transformação",
			actionUrl: "/planos",
		});
	}

	// REGRA 7: (Removida) Restrições agora aparecem no Guia Alimentar Prioritário

	// REGRA 8: Progresso positivo → Parabenizar
	if (progress.weightHistory.length >= 2) {
		const firstWeight = progress.weightHistory[0].weight;
		const lastWeight =
			progress.weightHistory[progress.weightHistory.length - 1].weight;
		if (lastWeight < firstWeight) {
			recommendations.push({
				id: "progress-positive",
				type: "Progresso",
				title: "Parabéns pelo progresso!",
				description: `Você perdeu ${(firstWeight - lastWeight).toFixed(1)}kg. Continue assim!`,
				priority: "Baixa",
				icon: "Trophy",
			});
		}
	}

	// REGRA 9: Hábitos saudáveis gerais
	recommendations.push({
		id: "water-intake",
		type: "Hábitos",
		title: "Mantenha-se hidratado",
		description: "Beba pelo menos 2 litros de água por dia.",
		priority: "Média",
		icon: "Droplets",
	});

	// Ordenar por prioridade: Alta > Média > Baixa
	const priorityOrder = { Alta: 0, Média: 1, Baixa: 2 };
	recommendations.sort(
		(a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
	);

	return recommendations;
}

/**
 * Filtra recomendações por tipo
 */
export function filterRecommendationsByType(
	recommendations: Recommendation[],
	type?: string,
): Recommendation[] {
	if (!type || type === "Todos") return recommendations;
	return recommendations.filter((rec) => rec.type === type);
}
