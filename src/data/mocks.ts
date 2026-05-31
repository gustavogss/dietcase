import type {
	UserProfile,
	Morbidity,
	Goal,
	WeeklyMenu,
	Recommendation,
	Plan,
	UserProgress,
	DayMenu,
} from "@/types";

// ========== MORBIDADES ==========
export const morbidities: Morbidity[] = [
	{
		id: "diabetes",
		name: "Diabetes",
		description: "Controle de glicose sanguínea",
		recommendations: [
			"Reduzir açúcar",
			"Aumentar fibras",
			"Controlar carboidratos",
		],
	},
	{
		id: "hipertensao",
		name: "Hipertensão",
		description: "Pressão arterial elevada",
		recommendations: [
			"Reduzir sal",
			"Aumentar potássio",
			"Evitar gorduras saturadas",
		],
	},
	{
		id: "obesidade",
		name: "Obesidade",
		description: "IMC acima de 30",
		recommendations: [
			"Controle calórico",
			"Aumentar atividade física",
			"Dieta balanceada",
		],
	},
	{
		id: "colesterol",
		name: "Colesterol Alto",
		description: "Níveis elevados de LDL",
		recommendations: [
			"Evitar gorduras trans",
			"Aumentar ômega-3",
			"Mais fibras solúveis",
		],
	},
	{
		id: "gastrite",
		name: "Gastrite",
		description: "Inflamação do estômago",
		recommendations: ["Evitar picantes", "Refeições menores", "Reduzir café"],
	},
	{
		id: "anemia",
		name: "Anemia",
		description: "Deficiência de ferro",
		recommendations: ["Aumentar ferro", "Vitamina C", "Carnes magras"],
	},
	{
		id: "intolerancia-lactose",
		name: "Intolerância à Lactose",
		description: "Dificuldade em digerir lactose",
		recommendations: [
			"Evitar laticínios",
			"Alternativas vegetais",
			"Suplementar cálcio",
		],
	},
	{
		id: "doenca-celiaca",
		name: "Doença Celíaca",
		description: "Intolerância ao glúten",
		recommendations: ["Dieta sem glúten", "Ler rótulos", "Alimentos naturais"],
	},
	{
		id: "sindrome-intestino-irritavel",
		name: "Síndrome do Intestino Irritável",
		description: "Distúrbio gastrointestinal",
		recommendations: ["Dieta FODMAP", "Evitar gatilhos", "Aumentar fibras"],
	},
	{
		id: "hipotireoidismo",
		name: "Hipotireoidismo",
		description: "Tireoide pouco ativa",
		recommendations: ["Iodo adequado", "Selênio", "Evitar soja crua"],
	},
	{
		id: "bariatrica-liquida",
		name: "Pós-Bariátrica Fase Líquida",
		description: "Primeiros dias após cirurgia bariátrica",
		recommendations: [
			"Apenas líquidos",
			"Pequenos volumes",
			"Proteína líquida",
		],
	},
	{
		id: "bariatrica-pastosa",
		name: "Pós-Bariátrica Fase Pastosa",
		description: "Segunda fase após cirurgia bariátrica",
		recommendations: [
			"Alimentos pastosos",
			"Alto teor proteico",
			"Porções pequenas",
		],
	},
	{
		id: "bariatrica-solida",
		name: "Pós-Bariátrica Fase Sólida",
		description: "Fase de adaptação a alimentos sólidos",
		recommendations: [
			"Mastigar bem",
			"Proteína primeiro",
			"Porções controladas",
		],
	},
];

// ========== PLANOS ==========
export const plans: Plan[] = [
	{
		type: "Essencial",
		description: "Indicado para quem tem apenas 01 morbidade",
		features: [
			"Cardápio fixo gerado para 1 morbidade",
			"Cardápios favoritos",
			"Lista de compras",
			"Recomendações básicas",
			"01 Agente especialista",
			"Score de Evolução",
			"Download e Compartilhamento de PDFs",
		],
		price: 49.9,
		pdfAvailable: true,
		extraPdfs: false,
		autoDietGeneration: false,
	},
	{
		type: "Transformação",
		description: "Indicado para quem tem comorbidades e precisa de um melhor acompanhamento",
		features: [
			"Tudo do essencial +",
			"Cardápios semanais para comorbidades",
			"Multiplos Agentes",
			"Orquestrador de conflitos",
			"Assistente Nutricional",
			"Análise de Progresso IA",
			"Check-in Diário",
			"Ajustes Automáticos",
			"Menu Restaurante",
			"Relatórios de Evolução",
			"Acesso a Bibliotecas",
		],
		price: 99.9,
		pdfAvailable: true,
		extraPdfs: true,
		autoDietGeneration: true,
	},
];

// ========== PERFIS DE USUÁRIO ==========
export const mockUsers: UserProfile[] = [
	{
		id: "user-1",
		name: "Nutri",
		email: "nutri@email.com",
		age: 45,
		weight: 75,
		height: 165,
		imc: 27.5,
		plan: "TRIAL",
		morbidities: ["hipertensao"],
		createdAt: "2026-01-01",
		exercises: false,
		trialStartDate: "2026-03-23T00:00:00Z",
		trialExpiresAt: "2026-03-30T00:00:00Z",
	},
	{
		id: "user-2",
		name: "João Santos",
		email: "joao.santos@email.com",
		age: 52,
		weight: 95,
		height: 178,
		imc: 30.0,
		plan: "Transformação",
		morbidities: ["diabetes", "obesidade"],
		createdAt: "2025-12-15",
		exercises: true,
		exerciseType: "Caminhada",
		exerciseFrequency: 3,
	},
	{
		id: "user-3",
		name: "Ana Costa",
		email: "ana.costa@email.com",
		age: 38,
		weight: 68,
		height: 162,
		imc: 25.9,
		plan: "Premium",
		morbidities: ["colesterol", "gastrite", "intolerancia-lactose"],
		createdAt: "2025-11-20",
		exercises: true,
		exerciseType: "Pilates",
		exerciseFrequency: 2,
	},
];

// ========== METAS ==========
export const mockGoals: Goal[] = [
	{
		id: "goal-1",
		title: "Perder 5kg",
		description: "Atingir 70kg até o final do mês",
		completed: false,
		deadline: "2026-02-28",
		createdAt: "2026-01-01",
	},
	{
		id: "goal-2",
		title: "Beber 2L de água por dia",
		description: "Manter hidratação adequada",
		completed: true,
		deadline: "2026-01-31",
		createdAt: "2026-01-01",
	},
	{
		id: "goal-3",
		title: "Reduzir açúcar",
		description: "Eliminar açúcar refinado da dieta",
		completed: false,
		deadline: "2026-02-15",
		createdAt: "2026-01-05",
	},
	{
		id: "goal-4",
		title: "Caminhar 30min/dia",
		description: "Aumentar atividade física",
		completed: true,
		deadline: "2026-01-31",
		createdAt: "2026-01-01",
	},
	{
		id: "goal-5",
		title: "Comer 3 porções de vegetais",
		description: "Aumentar consumo de fibras",
		completed: false,
		deadline: "2026-02-28",
		createdAt: "2026-01-10",
	},
];

// ========== CARDÁPIOS SEMANAIS ==========
// SEGUNDA-FEIRA - LOW CARB
const mondayLowCarb: DayMenu = {
	breakfast: {
		name: "Ovos Mexidos com Abacate",
		ingredients: ["Ovos", "Queijo branco", "Abacate", "Café"],
		portions: [
			"2 ovos (120g)",
			"50g queijo branco",
			"½ abacate (80g)",
			"1 xícara café",
		],
		calories: 350,
		macros: { protein: 20, carbs: 8, fat: 25 },
	},
	morningSnack: {
		name: "Castanhas Mix",
		ingredients: ["Castanhas", "Amêndoas"],
		portions: ["30g castanhas", "20g amêndoas"],
		calories: 150,
		macros: { protein: 5, carbs: 5, fat: 12 },
	},
	lunch: {
		name: "Frango Grelhado com Legumes",
		ingredients: ["Frango", "Brócolis", "Couve-flor", "Azeite"],
		portions: [
			"150g frango",
			"100g brócolis",
			"100g couve-flor",
			"1 colher sopa azeite (10ml)",
		],
		calories: 450,
		macros: { protein: 40, carbs: 15, fat: 20 },
	},
	afternoonSnack: {
		name: "Iogurte Grego com Nozes",
		ingredients: ["Iogurte grego", "Nozes"],
		portions: ["150g iogurte grego", "15g nozes"],
		calories: 180,
		macros: { protein: 12, carbs: 8, fat: 10 },
	},
	dinner: {
		name: "Salmão com Aspargos",
		ingredients: ["Salmão", "Aspargos", "Limão", "Azeite"],
		portions: [
			"120g salmão",
			"150g aspargos",
			"1 limão",
			"1 colher sopa azeite (10ml)",
		],
		calories: 400,
		macros: { protein: 35, carbs: 10, fat: 22 },
	},
	supper: {
		name: "Chá com Queijo",
		ingredients: ["Chá verde", "Queijo minas"],
		portions: ["1 xícara chá", "40g queijo minas"],
		calories: 120,
		macros: { protein: 8, carbs: 2, fat: 8 },
	},
};

// TERÇA-FEIRA - LOW CARB
const tuesdayLowCarb: DayMenu = {
	breakfast: {
		name: "Omelete de Espinafre",
		ingredients: ["Ovos", "Espinafre", "Tomate", "Queijo"],
		portions: [
			"3 ovos (180g)",
			"50g espinafre",
			"1 tomate médio (100g)",
			"30g queijo",
		],
		calories: 320,
		macros: { protein: 22, carbs: 6, fat: 22 },
	},
	morningSnack: {
		name: "Abacate com Limão",
		ingredients: ["Abacate", "Limão"],
		portions: ["½ abacate (80g)", "1 limão"],
		calories: 130,
		macros: { protein: 2, carbs: 7, fat: 10 },
	},
	lunch: {
		name: "Carne Moída com Abobrinha",
		ingredients: ["Carne moída", "Abobrinha", "Cebola", "Tomate"],
		portions: [
			"150g carne moída",
			"200g abobrinha",
			"50g cebola",
			"100g tomate",
		],
		calories: 420,
		macros: { protein: 38, carbs: 12, fat: 24 },
	},
	afternoonSnack: {
		name: "Palitos de Pepino com Pasta",
		ingredients: ["Pepino", "Cream cheese"],
		portions: ["150g pepino", "30g cream cheese"],
		calories: 100,
		macros: { protein: 3, carbs: 5, fat: 7 },
	},
	dinner: {
		name: "Tilápia ao Forno",
		ingredients: ["Tilápia", "Vagens", "Cenoura", "Azeite"],
		portions: [
			"150g tilápia",
			"100g vagens",
			"80g cenoura",
			"1 colher sopa azeite (10ml)",
		],
		calories: 380,
		macros: { protein: 32, carbs: 14, fat: 18 },
	},
	supper: {
		name: "Gelatina com Coco",
		ingredients: ["Gelatina diet", "Coco ralado"],
		portions: ["1 porção gelatina (100g)", "10g coco ralado"],
		calories: 80,
		macros: { protein: 2, carbs: 3, fat: 6 },
	},
};

// QUARTA-FEIRA - LOW CARB
const wednesdayLowCarb: DayMenu = {
	breakfast: {
		name: "Panqueca de Banana Fit",
		ingredients: ["Banana", "Ovos", "Canela"],
		portions: ["1 banana (100g)", "2 ovos (120g)", "1 colher chá canela"],
		calories: 280,
		macros: { protein: 14, carbs: 28, fat: 12 },
	},
	morningSnack: {
		name: "Queijo com Tomate Cereja",
		ingredients: ["Queijo branco", "Tomate cereja"],
		portions: ["50g queijo branco", "100g tomate cereja"],
		calories: 110,
		macros: { protein: 8, carbs: 6, fat: 5 },
	},
	lunch: {
		name: "Peito de Peru com Salada",
		ingredients: ["Peito de peru", "Alface", "Rúcula", "Pepino"],
		portions: [
			"150g peito de peru",
			"100g alface",
			"50g rúcula",
			"100g pepino",
		],
		calories: 340,
		macros: { protein: 36, carbs: 10, fat: 16 },
	},
	afternoonSnack: {
		name: "Ovo Cozido",
		ingredients: ["Ovos cozidos"],
		portions: ["2 ovos (120g)"],
		calories: 140,
		macros: { protein: 12, carbs: 1, fat: 10 },
	},
	dinner: {
		name: "Frango Desfiado com Couve",
		ingredients: ["Frango", "Couve", "Alho", "Azeite"],
		portions: [
			"140g frango",
			"150g couve",
			"2 dentes alho",
			"1 colher sopa azeite (10ml)",
		],
		calories: 390,
		macros: { protein: 38, carbs: 8, fat: 22 },
	},
	supper: {
		name: "Chá com Amêndoas",
		ingredients: ["Chá de camomila", "Amêndoas"],
		portions: ["1 xícara chá", "20g amêndoas"],
		calories: 115,
		macros: { protein: 4, carbs: 4, fat: 9 },
	},
};

// QUINTA-FEIRA - LOW CARB
const thursdayLowCarb: DayMenu = {
	breakfast: {
		name: "Tapioca com Ovo",
		ingredients: ["Tapioca", "Ovo", "Queijo"],
		portions: ["30g tapioca", "1 ovo (60g)", "30g queijo"],
		calories: 260,
		macros: { protein: 14, carbs: 24, fat: 12 },
	},
	morningSnack: {
		name: "Morango com Iogurte",
		ingredients: ["Morango", "Iogurte natural"],
		portions: ["100g morango", "100g iogurte"],
		calories: 95,
		macros: { protein: 5, carbs: 12, fat: 2 },
	},
	lunch: {
		name: "Bife com Salada Mista",
		ingredients: ["Carne bovina", "Alface", "Tomate", "Cebola"],
		portions: ["150g carne", "100g alface", "100g tomate", "50g cebola"],
		calories: 410,
		macros: { protein: 42, carbs: 12, fat: 20 },
	},
	afternoonSnack: {
		name: "Mix de Sementes",
		ingredients: ["Chia", "Linhaça", "Gergelim"],
		portions: ["10g chia", "10g linhaça", "10g gergelim"],
		calories: 140,
		macros: { protein: 6, carbs: 8, fat: 10 },
	},
	dinner: {
		name: "Atum com Legumes",
		ingredients: ["Atum", "Berinjela", "Pimentão", "Azeite"],
		portions: [
			"120g atum",
			"150g berinjela",
			"80g pimentão",
			"1 colher sopa azeite (10ml)",
		],
		calories: 360,
		macros: { protein: 30, carbs: 14, fat: 20 },
	},
	supper: {
		name: "Leite com Cacau",
		ingredients: ["Leite desnatado", "Cacau em pó"],
		portions: ["200ml leite", "10g cacau"],
		calories: 110,
		macros: { protein: 8, carbs: 12, fat: 2 },
	},
};

// SEXTA-FEIRA - LOW CARB
const fridayLowCarb: DayMenu = {
	breakfast: {
		name: "Wrap de Ovo com Peito Peru",
		ingredients: ["Ovos", "Peito de peru", "Alface"],
		portions: ["2 ovos (120g)", "50g peito peru", "50g alface"],
		calories: 290,
		macros: { protein: 24, carbs: 4, fat: 18 },
	},
	morningSnack: {
		name: "Abacaxi com Hortelã",
		ingredients: ["Abacaxi", "Hortelã"],
		portions: ["100g abacaxi", "Folhas hortelã"],
		calories: 50,
		macros: { protein: 1, carbs: 13, fat: 0 },
	},
	lunch: {
		name: "Frango Assado com Brócolis",
		ingredients: ["Frango", "Brócolis", "Batata doce", "Azeite"],
		portions: [
			"150g frango",
			"150g brócolis",
			"80g batata doce",
			"1 colher sopa azeite (10ml)",
		],
		calories: 440,
		macros: { protein: 38, carbs: 22, fat: 20 },
	},
	afternoonSnack: {
		name: "Queijo Cottage com Pepino",
		ingredients: ["Queijo cottage", "Pepino"],
		portions: ["100g queijo cottage", "100g pepino"],
		calories: 120,
		macros: { protein: 12, carbs: 6, fat: 4 },
	},
	dinner: {
		name: "Camarão Grelhado",
		ingredients: ["Camarão", "Abobrinha", "Tomate", "Limão"],
		portions: ["150g camarão", "150g abobrinha", "100g tomate", "1 limão"],
		calories: 310,
		macros: { protein: 32, carbs: 12, fat: 14 },
	},
	supper: {
		name: "Shake Proteico",
		ingredients: ["Whey protein", "Água"],
		portions: ["30g whey", "200ml água"],
		calories: 120,
		macros: { protein: 24, carbs: 2, fat: 1 },
	},
};

// SÁBADO - LOW CARB
const saturdayLowCarb: DayMenu = {
	breakfast: {
		name: "Mingau de Aveia Proteico",
		ingredients: ["Aveia", "Whey", "Canela", "Leite"],
		portions: ["30g aveia", "15g whey", "1 colher chá canela", "200ml leite"],
		calories: 310,
		macros: { protein: 20, carbs: 32, fat: 8 },
	},
	morningSnack: {
		name: "Maçã com Pasta de Amendoim",
		ingredients: ["Maçã", "Pasta amendoim"],
		portions: ["1 maçã média (150g)", "15g pasta amendoim"],
		calories: 180,
		macros: { protein: 4, carbs: 24, fat: 8 },
	},
	lunch: {
		name: "Carne de Panela com Legumes",
		ingredients: ["Carne bovina", "Cenoura", "Vagem", "Cebola"],
		portions: ["150g carne", "100g cenoura", "100g vagem", "50g cebola"],
		calories: 460,
		macros: { protein: 40, carbs: 18, fat: 24 },
	},
	afternoonSnack: {
		name: "Vitamina de Frutas Vermelhas",
		ingredients: ["Morango", "Mirtilo", "Iogurte"],
		portions: ["50g morango", "50g mirtilo", "100g iogurte"],
		calories: 130,
		macros: { protein: 6, carbs: 18, fat: 3 },
	},
	dinner: {
		name: "Lombo Suíno com Ratatouille",
		ingredients: ["Lombo suíno", "Berinjela", "Abobrinha", "Tomate"],
		portions: ["140g lombo", "100g berinjela", "100g abobrinha", "80g tomate"],
		calories: 380,
		macros: { protein: 36, carbs: 14, fat: 20 },
	},
	supper: {
		name: "Chá com Biscoito Integral",
		ingredients: ["Chá", "Biscoito integral"],
		portions: ["1 xícara chá", "2 unidades biscoito (20g)"],
		calories: 90,
		macros: { protein: 2, carbs: 14, fat: 3 },
	},
};

// DOMINGO - LOW CARB
const sundayLowCarb: DayMenu = {
	breakfast: {
		name: "Crepioca com Recheio",
		ingredients: ["Ovo", "Tapioca", "Queijo", "Tomate"],
		portions: ["1 ovo (60g)", "20g tapioca", "40g queijo", "50g tomate"],
		calories: 270,
		macros: { protein: 16, carbs: 18, fat: 14 },
	},
	morningSnack: {
		name: "Coco Fresco",
		ingredients: ["Coco verde"],
		portions: ["100g polpa coco"],
		calories: 160,
		macros: { protein: 2, carbs: 7, fat: 15 },
	},
	lunch: {
		name: "Filé de Frango ao Molho",
		ingredients: ["Frango", "Molho tomate", "Espinafre", "Azeite"],
		portions: [
			"160g frango",
			"80g molho",
			"100g espinafre",
			"1 colher sopa azeite (10ml)",
		],
		calories: 420,
		macros: { protein: 42, carbs: 12, fat: 22 },
	},
	afternoonSnack: {
		name: "Iogurte com Granola",
		ingredients: ["Iogurte", "Granola"],
		portions: ["150g iogurte", "20g granola"],
		calories: 190,
		macros: { protein: 8, carbs: 24, fat: 6 },
	},
	dinner: {
		name: "Omelete de Forno",
		ingredients: ["Ovos", "Frango desfiado", "Queijo", "Brócolis"],
		portions: ["3 ovos (180g)", "80g frango", "30g queijo", "100g brócolis"],
		calories: 400,
		macros: { protein: 38, carbs: 8, fat: 24 },
	},
	supper: {
		name: "Sopa Detox",
		ingredients: ["Couve", "Gengibre", "Limão"],
		portions: ["1 xícara sopa (250ml)"],
		calories: 60,
		macros: { protein: 2, carbs: 10, fat: 1 },
	},
};

// ========== CARDÁPIO HIPERTENSÃO (BAIXO SÓDIO) ==========
const mondayHipertensao: DayMenu = {
	breakfast: {
		name: "Mingau de Aveia com Frutas",
		ingredients: ["Aveia", "Leite sem lactose", "Banana", "Mel"],
		portions: [
			"40g aveia",
			"200ml leite",
			"1 banana (100g)",
			"1 colher chá mel",
		],
		calories: 320,
		macros: { protein: 12, carbs: 48, fat: 8 },
		preparation:
			"Cozinhar aveia no leite sem adicionar sal. Servir com banana fatiada e mel.",
	},
	morningSnack: {
		name: "Frutas Frescas",
		ingredients: ["Maçã", "Pera"],
		portions: ["1 maçã (150g)", "1 pera (150g)"],
		calories: 120,
		macros: { protein: 1, carbs: 30, fat: 0 },
	},
	lunch: {
		name: "Frango Grelhado Sem Sal com Arroz Integral",
		ingredients: [
			"Frango",
			"Arroz integral",
			"Salada verde",
			"Azeite",
			"Limão",
		],
		portions: [
			"150g frango",
			"100g arroz cozido",
			"150g salada",
			"1 colher sopa azeite",
			"Limão a gosto",
		],
		calories: 480,
		macros: { protein: 42, carbs: 45, fat: 15 },
		preparation:
			"Temperar frango apenas com ervas naturais, alho e limão. NÃO usar sal ou temperos industrializados.",
	},
	afternoonSnack: {
		name: "Iogurte Natural com Granola",
		ingredients: ["Iogurte natural sem sódio", "Granola sem sal"],
		portions: ["150g iogurte", "20g granola"],
		calories: 180,
		macros: { protein: 8, carbs: 24, fat: 5 },
	},
	dinner: {
		name: "Peixe Assado com Legumes",
		ingredients: ["Tilápia", "Batata doce", "Brócolis", "Cenoura", "Ervas"],
		portions: [
			"140g tilápia",
			"100g batata doce",
			"100g brócolis",
			"80g cenoura",
		],
		calories: 420,
		macros: { protein: 38, carbs: 42, fat: 10 },
		preparation:
			"Assar peixe com ervas frescas, alho e limão. Legumes no vapor sem sal.",
	},
	supper: {
		name: "Chá de Ervas com Torrada Integral",
		ingredients: ["Chá de camomila", "Pão integral", "Geleia sem açúcar"],
		portions: ["1 xícara chá", "2 fatias pão (40g)", "1 colher sopa geleia"],
		calories: 140,
		macros: { protein: 4, carbs: 26, fat: 2 },
	},
};

// TERÇA-FEIRA - HIPERTENSÃO
const tuesdayHipertensao: DayMenu = {
	breakfast: {
		name: "Iogurte Natural com Granola Caseira",
		ingredients: ["Iogurte natural", "Granola sem sal", "Morango"],
		portions: ["200g iogurte", "30g granola", "100g morango"],
		calories: 280,
		macros: { protein: 15, carbs: 38, fat: 6 },
		preparation: "Granola preparada sem sal. Servir com morangos frescos.",
	},
	morningSnack: {
		name: "Melancia",
		ingredients: ["Melancia"],
		portions: ["200g melancia"],
		calories: 60,
		macros: { protein: 1, carbs: 15, fat: 0 },
	},
	lunch: {
		name: "Peixe ao Limão com Legumes",
		ingredients: ["Tilápia", "Limão", "Brócolis", "Batata doce", "Azeite"],
		portions: [
			"150g tilápia",
			"2 limões",
			"150g brócolis",
			"100g batata doce",
			"1 colher sopa azeite",
		],
		calories: 450,
		macros: { protein: 40, carbs: 40, fat: 12 },
		preparation: "Temperar peixe com limão, alho e ervas. Assar sem sal.",
	},
	afternoonSnack: {
		name: "Castanhas Sem Sal",
		ingredients: ["Castanhas", "Amêndoas"],
		portions: ["15g castanhas", "15g amêndoas"],
		calories: 100,
		macros: { protein: 4, carbs: 5, fat: 8 },
	},
	dinner: {
		name: "Omelete com Vegetais",
		ingredients: ["Ovos", "Tomate", "Cebola", "Espinafre"],
		portions: ["2 ovos (120g)", "100g tomate", "50g cebola", "50g espinafre"],
		calories: 320,
		macros: { protein: 18, carbs: 12, fat: 20 },
		preparation: "Preparar sem sal. Use ervas frescas para temperar.",
	},
	supper: {
		name: "Chá com Biscoito Integral Sem Sal",
		ingredients: ["Chá", "Biscoito integral sem sal"],
		portions: ["1 xícara chá", "2 unidades biscoito"],
		calories: 80,
		macros: { protein: 2, carbs: 14, fat: 2 },
	},
};

// QUARTA-FEIRA - HIPERTENSÃO
const wednesdayHipertensao: DayMenu = {
	breakfast: {
		name: "Tapioca com Ovo e Queijo",
		ingredients: ["Tapioca", "Ovo", "Queijo branco sem sal"],
		portions: ["30g tapioca", "1 ovo", "40g queijo"],
		calories: 290,
		macros: { protein: 16, carbs: 28, fat: 12 },
		preparation: "Queijo e ovo sem adição de sal.",
	},
	morningSnack: {
		name: "Mamão com Linhaça",
		ingredients: ["Mamão", "Linhaça"],
		portions: ["150g mamão", "10g linhaça"],
		calories: 90,
		macros: { protein: 2, carbs: 18, fat: 2 },
	},
	lunch: {
		name: "Carne Magra com Purê de Batata Doce",
		ingredients: ["Patinho", "Batata doce", "Cenoura", "Azeite"],
		portions: [
			"120g patinho",
			"150g batata doce",
			"100g cenoura",
			"1 colher sopa azeite",
		],
		calories: 460,
		macros: { protein: 38, carbs: 48, fat: 14 },
		preparation: "Temperar apenas com alho, cebola e ervas naturais.",
	},
	afternoonSnack: {
		name: "Abacaxi",
		ingredients: ["Abacaxi"],
		portions: ["150g abacaxi"],
		calories: 75,
		macros: { protein: 1, carbs: 19, fat: 0 },
	},
	dinner: {
		name: "Sopa de Legumes com Frango",
		ingredients: ["Frango", "Abóbora", "Cenoura", "Chuchu"],
		portions: ["100g frango", "100g abóbora", "80g cenoura", "80g chuchu"],
		calories: 280,
		macros: { protein: 28, carbs: 30, fat: 4 },
		preparation: "Sopa caseira sem sal. Use ervas para dar sabor.",
	},
	supper: {
		name: "Leite com Canela",
		ingredients: ["Leite desnatado", "Canela"],
		portions: ["200ml leite", "Canela a gosto"],
		calories: 90,
		macros: { protein: 7, carbs: 12, fat: 1 },
	},
};

const thursdayHipertensao: DayMenu = tuesdayHipertensao;
const fridayHipertensao: DayMenu = mondayHipertensao;
const saturdayHipertensao: DayMenu = wednesdayHipertensao;
const sundayHipertensao: DayMenu = tuesdayHipertensao;

// ========== CARDÁPIO BARIÁTRICA FASE LÍQUIDA ==========
const mondayBariatricaLiquida: DayMenu = {
	breakfast: {
		name: "Vitamina Líquida de Proteína",
		ingredients: ["Whey protein", "Leite desnatado", "Água"],
		portions: ["30g whey", "100ml leite", "100ml água"],
		calories: 160,
		macros: { protein: 28, carbs: 8, fat: 2 },
		preparation:
			"Bater todos os ingredientes no liquidificador até ficar homogêneo. Consumir devagar.",
	},
	morningSnack: {
		name: "Gelatina Diet",
		ingredients: ["Gelatina sem açúcar"],
		portions: ["1 porção (150g)"],
		calories: 10,
		macros: { protein: 2, carbs: 0, fat: 0 },
	},
	lunch: {
		name: "Caldo de Frango Coado",
		ingredients: ["Caldo de frango caseiro coado"],
		portions: ["200ml caldo"],
		calories: 80,
		macros: { protein: 8, carbs: 4, fat: 3 },
		preparation:
			"Caldo feito com frango e legumes, coado para remover sólidos. Consumir morno.",
	},
	afternoonSnack: {
		name: "Suco Natural Coado",
		ingredients: ["Laranja", "Água"],
		portions: ["150ml suco coado"],
		calories: 60,
		macros: { protein: 1, carbs: 14, fat: 0 },
	},
	dinner: {
		name: "Sopa Liquidificada e Coada",
		ingredients: ["Legumes", "Frango", "Água"],
		portions: ["200ml sopa coada"],
		calories: 100,
		macros: { protein: 10, carbs: 12, fat: 2 },
		preparation:
			"Cozinhar legumes com frango, liquidificar e coar. Apenas líquido.",
	},
	supper: {
		name: "Chá com Adoçante",
		ingredients: ["Chá de ervas", "Adoçante"],
		portions: ["200ml chá"],
		calories: 5,
		macros: { protein: 0, carbs: 1, fat: 0 },
	},
};

// TERÇA-FEIRA - BARIÁTRICA LÍQUIDA
const tuesdayBariatricaLiquida: DayMenu = {
	breakfast: {
		name: "Suco Verde Coado",
		ingredients: ["Couve", "Maçã", "Limão", "Água"],
		portions: ["200ml suco coado"],
		calories: 70,
		macros: { protein: 1, carbs: 17, fat: 0 },
		preparation: "Liquidificar e coar bem. Consumir devagar.",
	},
	morningSnack: {
		name: "Água de Coco",
		ingredients: ["Água de coco"],
		portions: ["200ml água de coco"],
		calories: 40,
		macros: { protein: 1, carbs: 9, fat: 0 },
	},
	lunch: {
		name: "Caldo de Carne Coado",
		ingredients: ["Caldo de carne caseiro"],
		portions: ["200ml caldo"],
		calories: 90,
		macros: { protein: 10, carbs: 3, fat: 4 },
		preparation: "Caldo coado sem sólidos. Temperatura morna.",
	},
	afternoonSnack: {
		name: "Chá com Mel",
		ingredients: ["Chá", "Mel"],
		portions: ["200ml chá", "5g mel"],
		calories: 20,
		macros: { protein: 0, carbs: 5, fat: 0 },
	},
	dinner: {
		name: "Vitamina de Whey Protein",
		ingredients: ["Whey", "Água", "Leite desnatado"],
		portions: ["20g whey", "100ml água", "100ml leite"],
		calories: 120,
		macros: { protein: 18, carbs: 8, fat: 1 },
		preparation: "Bater bem e consumir lentamente.",
	},
	supper: {
		name: "Caldo de Legumes Coado",
		ingredients: ["Caldo de legumes"],
		portions: ["150ml caldo"],
		calories: 30,
		macros: { protein: 1, carbs: 7, fat: 0 },
	},
};

const wednesdayBariatricaLiquida: DayMenu = mondayBariatricaLiquida;
const thursdayBariatricaLiquida: DayMenu = tuesdayBariatricaLiquida;
const fridayBariatricaLiquida: DayMenu = mondayBariatricaLiquida;
const saturdayBariatricaLiquida: DayMenu = tuesdayBariatricaLiquida;
const sundayBariatricaLiquida: DayMenu = mondayBariatricaLiquida;

// ========== CARDÁPIO BARIÁTRICA FASE PASTOSA ==========
const mondayBariatricaPastosa: DayMenu = {
	breakfast: {
		name: "Mingau Proteico Cremoso",
		ingredients: ["Aveia fina", "Whey protein", "Leite desnatado"],
		portions: ["20g aveia", "15g whey", "150ml leite"],
		calories: 200,
		macros: { protein: 20, carbs: 22, fat: 3 },
		preparation:
			"Cozinhar bem a aveia até ficar pastosa. Misturar o whey após esfriar um pouco.",
	},
	morningSnack: {
		name: "Iogurte Grego Natural",
		ingredients: ["Iogurte grego desnatado"],
		portions: ["100g iogurte"],
		calories: 60,
		macros: { protein: 10, carbs: 4, fat: 1 },
	},
	lunch: {
		name: "Purê de Frango com Legumes",
		ingredients: ["Frango desfiado", "Batata", "Cenoura", "Abobrinha"],
		portions: ["60g frango", "50g batata", "30g cenoura", "30g abobrinha"],
		calories: 180,
		macros: { protein: 18, carbs: 20, fat: 4 },
		preparation:
			"Cozinhar tudo muito bem e amassar até consistência pastosa. Pode adicionar um pouco de caldo.",
	},
	afternoonSnack: {
		name: "Vitamina de Frutas Amassada",
		ingredients: ["Banana", "Mamão", "Leite"],
		portions: ["½ banana (50g)", "50g mamão", "100ml leite"],
		calories: 110,
		macros: { protein: 4, carbs: 20, fat: 2 },
	},
	dinner: {
		name: "Omelete Cremoso com Ricota",
		ingredients: ["Ovo", "Ricota", "Leite"],
		portions: ["1 ovo (60g)", "30g ricota", "20ml leite"],
		calories: 150,
		macros: { protein: 14, carbs: 3, fat: 9 },
		preparation:
			"Bater bem e cozinhar em fogo baixo até ficar bem macio e cremoso.",
	},
	supper: {
		name: "Gelatina com Iogurte",
		ingredients: ["Gelatina diet", "Iogurte natural"],
		portions: ["100g gelatina", "50g iogurte"],
		calories: 50,
		macros: { protein: 6, carbs: 4, fat: 1 },
	},
};

// TERÇA-FEIRA - BARIÁTRICA PASTOSA
const tuesdayBariatricaPastosa: DayMenu = {
	breakfast: {
		name: "Vitamina de Banana Batida",
		ingredients: ["Banana", "Leite desnatado", "Aveia"],
		portions: ["½ banana", "150ml leite", "15g aveia"],
		calories: 180,
		macros: { protein: 8, carbs: 32, fat: 2 },
		preparation: "Bater bem até ficar cremoso.",
	},
	morningSnack: {
		name: "Iogurte Batido",
		ingredients: ["Iogurte grego"],
		portions: ["100g iogurte"],
		calories: 60,
		macros: { protein: 10, carbs: 4, fat: 1 },
	},
	lunch: {
		name: "Purê de Batata com Frango Desfiado",
		ingredients: ["Frango", "Batata", "Cenoura"],
		portions: ["50g frango", "60g batata", "40g cenoura"],
		calories: 170,
		macros: { protein: 16, carbs: 22, fat: 3 },
		preparation: "Amassar bem até consistência pastosa.",
	},
	afternoonSnack: {
		name: "Purê de Maçã",
		ingredients: ["Maçã cozida"],
		portions: ["100g purê"],
		calories: 80,
		macros: { protein: 0, carbs: 21, fat: 0 },
	},
	dinner: {
		name: "Sopa Cremosa de Legumes com Ricota",
		ingredients: ["Abóbora", "Ricota", "Caldo"],
		portions: ["100g abóbora", "40g ricota", "100ml caldo"],
		calories: 160,
		macros: { protein: 12, carbs: 16, fat: 6 },
		preparation: "Liquidificar até ficar bem cremoso.",
	},
	supper: {
		name: "Mingau de Aveia Ralo",
		ingredients: ["Aveia", "Leite"],
		portions: ["20g aveia", "150ml leite"],
		calories: 130,
		macros: { protein: 7, carbs: 20, fat: 3 },
	},
};

const wednesdayBariatricaPastosa: DayMenu = mondayBariatricaPastosa;
const thursdayBariatricaPastosa: DayMenu = tuesdayBariatricaPastosa;
const fridayBariatricaPastosa: DayMenu = mondayBariatricaPastosa;
const saturdayBariatricaPastosa: DayMenu = tuesdayBariatricaPastosa;
const sundayBariatricaPastosa: DayMenu = mondayBariatricaPastosa;

// ========== CARDÁPIO BARIÁTRICA FASE SÓLIDA ==========
const mondayBariatricaSolida: DayMenu = {
	breakfast: {
		name: "Ovo Mexido com Queijo Branco",
		ingredients: ["Ovo", "Queijo branco", "Pão integral"],
		portions: ["1 ovo (60g)", "30g queijo", "1 fatia pão (25g)"],
		calories: 220,
		macros: { protein: 16, carbs: 18, fat: 10 },
		preparation: "Comer devagar, mastigar muito bem. Porções pequenas.",
	},
	morningSnack: {
		name: "Frutas Picadas",
		ingredients: ["Mamão", "Melão"],
		portions: ["50g mamão", "50g melão"],
		calories: 50,
		macros: { protein: 1, carbs: 12, fat: 0 },
	},
	lunch: {
		name: "Frango Grelhado com Legumes Cozidos",
		ingredients: ["Frango", "Abobrinha", "Cenoura", "Vagem"],
		portions: ["80g frango", "40g abobrinha", "40g cenoura", "40g vagem"],
		calories: 240,
		macros: { protein: 28, carbs: 18, fat: 6 },
		preparation:
			"Porções pequenas. Mastigar muito bem cada pedaço. Parar ao menor sinal de saciedade.",
	},
	afternoonSnack: {
		name: "Iogurte com Granola",
		ingredients: ["Iogurte grego", "Granola"],
		portions: ["80g iogurte", "10g granola"],
		calories: 100,
		macros: { protein: 8, carbs: 12, fat: 2 },
	},
	dinner: {
		name: "Peixe com Purê de Batata Doce",
		ingredients: ["Tilápia", "Batata doce", "Brócolis"],
		portions: ["80g tilápia", "60g batata doce", "50g brócolis"],
		calories: 260,
		macros: { protein: 26, carbs: 28, fat: 5 },
		preparation:
			"Comer muito devagar. Proteína primeiro, depois os carboidratos.",
	},
	supper: {
		name: "Shake Proteico",
		ingredients: ["Whey protein", "Água"],
		portions: ["20g whey", "200ml água"],
		calories: 80,
		macros: { protein: 16, carbs: 2, fat: 1 },
	},
};

// TERÇA-FEIRA - BARIÁTRICA SÓLIDA
const tuesdayBariatricaSolida: DayMenu = {
	breakfast: {
		name: "Tapioca com Queijo",
		ingredients: ["Tapioca", "Queijo branco"],
		portions: ["25g tapioca", "40g queijo"],
		calories: 200,
		macros: { protein: 12, carbs: 24, fat: 6 },
		preparation: "Porções pequenas. Mastigar muito bem.",
	},
	morningSnack: {
		name: "Pera Picada",
		ingredients: ["Pera"],
		portions: ["50g pera"],
		calories: 30,
		macros: { protein: 0, carbs: 8, fat: 0 },
	},
	lunch: {
		name: "Peixe com Abobrinha",
		ingredients: ["Tilápia", "Abobrinha", "Tomate"],
		portions: ["80g tilápia", "60g abobrinha", "40g tomate"],
		calories: 220,
		macros: { protein: 26, carbs: 12, fat: 8 },
		preparation: "Comer devagar. Proteína primeiro.",
	},
	afternoonSnack: {
		name: "Queijo Cottage",
		ingredients: ["Queijo cottage"],
		portions: ["60g queijo"],
		calories: 70,
		macros: { protein: 10, carbs: 3, fat: 2 },
	},
	dinner: {
		name: "Omelete com Brócolis",
		ingredients: ["Ovo", "Brócolis", "Queijo"],
		portions: ["1 ovo", "60g brócolis", "20g queijo"],
		calories: 210,
		macros: { protein: 16, carbs: 8, fat: 14 },
		preparation: "Porção pequena. Mastigar cada pedaço 20 vezes.",
	},
	supper: {
		name: "Iogurte com Chia",
		ingredients: ["Iogurte natural", "Chia"],
		portions: ["80g iogurte", "5g chia"],
		calories: 70,
		macros: { protein: 6, carbs: 6, fat: 3 },
	},
};

const wednesdayBariatricaSolida: DayMenu = mondayBariatricaSolida;
const thursdayBariatricaSolida: DayMenu = tuesdayBariatricaSolida;
const fridayBariatricaSolida: DayMenu = mondayBariatricaSolida;
const saturdayBariatricaSolida: DayMenu = tuesdayBariatricaSolida;
const sundayBariatricaSolida: DayMenu = mondayBariatricaSolida;

export const weeklyMenus: WeeklyMenu[] = [
	{
		id: "menu-low-carb",
		name: "Dieta Low Carb",
		type: "Low Carb",
		monday: mondayLowCarb,
		tuesday: tuesdayLowCarb,
		wednesday: wednesdayLowCarb,
		thursday: thursdayLowCarb,
		friday: fridayLowCarb,
		saturday: saturdayLowCarb,
		sunday: sundayLowCarb,
	},
	{
		id: "menu-hipertensao",
		name: "Dieta para Hipertensão",
		type: "Baixo Sódio",
		monday: mondayHipertensao,
		tuesday: tuesdayHipertensao,
		wednesday: wednesdayHipertensao,
		thursday: thursdayHipertensao,
		friday: fridayHipertensao,
		saturday: saturdayHipertensao,
		sunday: sundayHipertensao,
	},
	{
		id: "menu-bariatrica-liquida",
		name: "Dieta Bariátrica - Fase Líquida",
		type: "Pós-Cirurgia Fase 1",
		monday: mondayBariatricaLiquida,
		tuesday: tuesdayBariatricaLiquida,
		wednesday: wednesdayBariatricaLiquida,
		thursday: thursdayBariatricaLiquida,
		friday: fridayBariatricaLiquida,
		saturday: saturdayBariatricaLiquida,
		sunday: sundayBariatricaLiquida,
	},
	{
		id: "menu-bariatrica-pastosa",
		name: "Dieta Bariátrica - Fase Pastosa",
		type: "Pós-Cirurgia Fase 2",
		monday: mondayBariatricaPastosa,
		tuesday: tuesdayBariatricaPastosa,
		wednesday: wednesdayBariatricaPastosa,
		thursday: thursdayBariatricaPastosa,
		friday: fridayBariatricaPastosa,
		saturday: saturdayBariatricaPastosa,
		sunday: sundayBariatricaPastosa,
	},
	{
		id: "menu-bariatrica-solida",
		name: "Dieta Bariátrica - Fase Sólida",
		type: "Pós-Cirurgia Fase 3",
		monday: mondayBariatricaSolida,
		tuesday: tuesdayBariatricaSolida,
		wednesday: wednesdayBariatricaSolida,
		thursday: thursdayBariatricaSolida,
		friday: fridayBariatricaSolida,
		saturday: saturdayBariatricaSolida,
		sunday: sundayBariatricaSolida,
	},
];

// ========== PROGRESSO ==========
export const mockProgress: UserProgress = {
	userId: "user-1",
	weightHistory: [
		{ date: "2026-01-01", weight: 78 },
		{ date: "2026-01-08", weight: 77 },
		{ date: "2026-01-15", weight: 76 },
		{ date: "2026-01-22", weight: 75 },
	],
	lastWeightChange: 7,
	goalsCompleted: 2,
	goalsTotal: 5,
};

// ========== RECOMENDAÇÕES PRÉ-DEFINIDAS ==========
export const predefinedRecommendations: Recommendation[] = [
	{
		id: "rec-1",
		type: "Alimentação",
		title: "Reduza o consumo de açúcar",
		description: "Seu IMC está acima do ideal. Reduzir açúcar pode ajudar.",
		priority: "Alta",
		icon: "Apple",
	},
	{
		id: "rec-2",
		type: "Alimentação",
		title: "Inclua mais fibras no almoço",
		description: "Fibras melhoram a digestão e saciedade.",
		priority: "Média",
		icon: "Wheat",
	},
	{
		id: "rec-3",
		type: "Hábitos",
		title: "Aumente a ingestão de água",
		description: "Meta: 2 litros por dia para melhor hidratação.",
		priority: "Alta",
		icon: "Droplets",
	},
	{
		id: "rec-4",
		type: "Progresso",
		title: "Seu IMC melhorou!",
		description: "Continue assim, você está no caminho certo.",
		priority: "Baixa",
		icon: "TrendingUp",
	},
	{
		id: "rec-5",
		type: "Plano",
		title: "Upgrade para Premium",
		description: "Desbloqueie cardápios personalizáveis.",
		priority: "Média",
		icon: "Crown",
		actionLabel: "Ver Planos",
		actionUrl: "/planos",
	},
	{
		id: "rec-6",
		type: "Conteúdo",
		title: "Novo guia disponível",
		description: "Guia de alimentação para hipertensão.",
		priority: "Baixa",
		icon: "BookOpen",
	},
	{
		id: "rec-7",
		type: "Alimentação",
		title: "Evite alimentos processados",
		description: "Prefira alimentos naturais e integrais.",
		priority: "Alta",
		icon: "ShoppingCart",
	},
	{
		id: "rec-8",
		type: "Hábitos",
		title: "Durma pelo menos 7 horas",
		description: "O sono adequado ajuda no controle de peso.",
		priority: "Média",
		icon: "Moon",
	},
	{
		id: "rec-9",
		type: "Progresso",
		title: "Peso estagnado há 7 dias",
		description: "Considere ajustar sua dieta ou exercícios.",
		priority: "Alta",
		icon: "AlertCircle",
	},
	{
		id: "rec-10",
		type: "Plano",
		title: "Experimente o plano VIP",
		description: "Geração automática de dietas e consultas.",
		priority: "Baixa",
		icon: "Sparkles",
		actionLabel: "Conhecer VIP",
		actionUrl: "/planos",
	},
];
