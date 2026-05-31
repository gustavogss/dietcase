import type { WeeklyMenu, DayMenu, Meal, MealType } from '@/types';
import { weeklyMenus } from '@/data/mocks';

/**
 * Lógica de seleção de base de cardápio: Escolhe uma base adequada baseada nas morbidades
 */
export function getBaseMenuForUser(userMorbidities: string[]): WeeklyMenu {
    // Bariátrica tem prioridade de BASE pois muda a estrutura (líquida/pastosa)
    if (userMorbidities.includes("bariatrica-liquida")) {
        return (
            weeklyMenus.find((m) => m.id === "menu-bariatrica-liquida") ||
            weeklyMenus[0]
        );
    }
    if (userMorbidities.includes("bariatrica-pastosa")) {
        return (
            weeklyMenus.find((m) => m.id === "menu-bariatrica-pastosa") ||
            weeklyMenus[0]
        );
    }
    if (userMorbidities.includes("bariatrica-solida")) {
        return (
            weeklyMenus.find((m) => m.id === "menu-bariatrica-solida") ||
            weeklyMenus[0]
        );
    }

    return weeklyMenus[0];
}

/**
 * Função para gerar variações do cardápio (rotação de refeições)
 */
export function generateMenuVariation(
    baseMenu: WeeklyMenu,
    variant: number,
): WeeklyMenu {
    if (variant === 0) return baseMenu;

    // Criar uma cópia profunda do menu
    const newMenu = JSON.parse(JSON.stringify(baseMenu)) as WeeklyMenu;

    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ] as const;
    const mealTypes = [
        "breakfast",
        "morningSnack",
        "lunch",
        "afternoonSnack",
        "dinner",
        "supper",
    ] as const;

    // Para cada tipo de refeição, rotacionar entre os dias
    mealTypes.forEach((mealType) => {
        const meals: Meal[] = days.map((day) => baseMenu[day][mealType]);

        // Rotacionar as refeições baseado no variant
        const rotation = variant % days.length;
        const rotatedMeals = [
            ...meals.slice(rotation),
            ...meals.slice(0, rotation),
        ];

        // Aplicar as refeições rotacionadas
        days.forEach((day, index) => {
            newMenu[day][mealType] = rotatedMeals[index];
        });
    });

    return newMenu;
}

// Regras de substituição para cada condição
const ADAPTATION_RULES: Record<string, (text: string) => string> = {
    'hipertensao': (text) => {
        let adapted = text;
        // Substituições de sal
        adapted = adapted.replace(/\b(sal)\b/gi, 'sal de ervas');
        adapted = adapted.replace(/\b(molho de soja|shoyu)\b/gi, 'molho shoyu com baixo sódio');
        adapted = adapted.replace(/\b(caldo de carne|caldo de galinha|caldo de legumes)\b/gi, '$1 caseiro sem sal');

        // Adições de aviso (apenas se não tiver já)
        if (text.match(/\b(arroz|feijão|macarrão|carne|frango|peixe)\b/i) && !text.match(/sem sal|ervas/i)) {
            if (text.length < 50) { // Evita strings muito longas
                adapted = `${adapted} (preparo sem sal/ervas)`;
            }
        }
        return adapted;
    },

    'intolerancia-lactose': (text) => {
        let adapted = text;
        // Leites
        adapted = adapted.replace(/\b(leite)(?!\s+(de coco|amêndoas|vegetal|soja|sem lactose))\b/gi, 'leite vegetal ou zero lactose');
        // Queijos
        adapted = adapted.replace(/\b(queijo|requeijão|ricota|cottage|mussarela|minas)\b/gi, '$1 zero lactose');
        // Derivados
        adapted = adapted.replace(/\b(iogurte)(?!\s+(de coco|sem lactose))\b/gi, 'iogurte zero lactose');
        adapted = adapted.replace(/\b(manteiga)\b/gi, 'azeite ou óleo de coco');
        adapted = adapted.replace(/\b(creme de leite)\b/gi, 'creme de leite zero lactose ou soja');

        return adapted;
    },

    'diabetes': (text) => {
        let adapted = text;
        // Substituições de carboidratos simples
        adapted = adapted.replace(/\b(arroz)(?!\s+(integral|negro|vermelho))\b/gi, 'arroz integral');
        adapted = adapted.replace(/\b(macarrão)(?!\s+(integral))\b/gi, 'macarrão integral');
        adapted = adapted.replace(/\b(pão)(?!\s+(integral|centeio))\b/gi, 'pão 100% integral');
        adapted = adapted.replace(/\b(açúcar)\b/gi, 'adoçante natural (stévia/xilitol)');
        adapted = adapted.replace(/\b(mel)\b/gi, 'néctar de coco (baixo IG) ou adoçante');
        adapted = adapted.replace(/\b(batata)(?!\s+(doce|yacon))\b/gi, 'batata doce ou yacon');

        return adapted;
    },

    'hipotireoidismo': (text) => {
        let adapted = text;
        // Bociogênicos devem ser cozidos
        adapted = adapted.replace(/\b(couve|brócolis|repolho|couve-flor|espinafre)(?!\s+(cozido|refogado|vapor))\b/gi, '$1 cozido(a)');

        return adapted;
    },

    'colesterol': (text) => {
        let adapted = text;
        adapted = adapted.replace(/\b(manteiga|margarina)\b/gi, 'creme vegetal com fitosteróis');
        adapted = adapted.replace(/\b(frito|frita|fritura)\b/gi, 'assado(a) ou grelhado(a)');
        adapted = adapted.replace(/\b(gema)\b/gi, 'clara'); // Simplificação
        adapted = adapted.replace(/\b(queijo amarelo|parmesão|provolone)\b/gi, 'queijo branco magro');
        return adapted;
    },

    'gastrite': (text) => {
        let adapted = text;
        adapted = adapted.replace(/\b(café)\b/gi, 'café descafeinado');
        adapted = adapted.replace(/\b(pimenta|apimentado)\b/gi, 'ervas finas');
        adapted = adapted.replace(/\b(frito|frita)\b/gi, 'cozido(a)');
        adapted = adapted.replace(/\b(laranja|limão|abacaxi)\b/gi, 'melão ou mamão (frutas não ácidas)');
        return adapted;
    }
};

// Aplica regras a um texto
function applyAdaptations(text: string, conditions: string[]): string {
    let result = text;

    // Ordem importa: Lactose -> Diabetes -> Hipertensão (para não substituir "leite desnatado" por "leite vegetal" e depois tentar trocar açúcar do leite)
    const prioritizedConditions = [
        'intolerancia-lactose',
        'diabetes',
        'hipertensao',
        'hipotireoidismo',
        'colesterol',
        'gastrite'
    ];

    // Filtra condições ativas na ordem correta
    const activeConditions = prioritizedConditions.filter(c => conditions.includes(c));

    // Adiciona condições que não estavam na lista de prioridade (genéricas)
    conditions.forEach(c => {
        if (!prioritizedConditions.includes(c)) activeConditions.push(c);
    });

    activeConditions.forEach(condition => {
        const rule = ADAPTATION_RULES[condition];
        if (rule) {
            result = rule(result);
        }
    });

    return result;
}

// Deep clone para não mutar o objeto original
function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Função principal
export function generateAdaptiveMenu(baseMenu: WeeklyMenu, userConditions: string[]): WeeklyMenu {
    if (!userConditions || userConditions.length === 0) {
        return baseMenu;
    }

    const adaptedMenu = clone(baseMenu);

    // Adiciona sufixo ao nome do menu para identificar
    adaptedMenu.name += ` (Adaptado para: ${userConditions.join(', ')})`;

    // Itera sobre os dias
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

    days.forEach(day => {
        const dayMenu = adaptedMenu[day];

        // Itera sobre as refeições
        const meals = ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'supper'] as const;

        meals.forEach(mealType => {
            const meal = dayMenu[mealType];
            if (meal) {
                // Adapta nome
                meal.name = applyAdaptations(meal.name, userConditions);

                // Adapta ingredientes
                meal.ingredients = meal.ingredients.map(ing => applyAdaptations(ing, userConditions));

                // Adapta porções
                if (meal.portions) {
                    meal.portions = meal.portions.map(p => applyAdaptations(p, userConditions));
                }

                // Adapta preparo
                if (meal.preparation) {
                    meal.preparation = applyAdaptations(meal.preparation, userConditions);
                }
            }
        });
    });

    return adaptedMenu;
}
