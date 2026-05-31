import type { DayMenu, MealType, WeeklyMenu } from '@/types';

export interface ShoppingItem {
    id: string;
    name: string;
    category: string;
    checked: boolean;
    quantity?: string; // Simplificado para v1
}

export interface ShoppingCategory {
    id: string;
    name: string;
    items: ShoppingItem[];
}

// Mapa de palavras-chave para categorias
const CATEGORY_MAP: Record<string, string[]> = {
    'Hortifruti': ['banana', 'maçã', 'pera', 'mamão', 'uva', 'laranja', 'limão', 'abacate', 'alface', 'tomate', 'cenoura', 'batata', 'abóbora', 'brócolis', 'couve', 'espinafre', 'rúcula', 'pepino', 'frutas', 'legumes', 'verduras', 'salada', 'sopa de legumes', 'suco', 'gengibre', 'hortelã'],
    'Carnes e Proteínas': ['peito de frango', 'frango', 'carne', 'patinho', 'peixe', 'tilápia', 'salmão', 'atum', 'sardinha', 'ovo', 'ovos', 'omelete'],
    'Mercearia': ['arroz', 'feijão', 'macarrão', 'aveia', 'chia', 'linhaça', 'quinoa', 'azeite', 'oleaginosas', 'castanha', 'nozes', 'pão', 'torrada', 'biscoito', 'tapioca', 'café', 'chá', 'mel', 'açúcar', 'adoçante', 'sal'],
    'Laticínios e Refrigerados': ['leite', 'iogurte', 'queijo', 'requeijão', 'manteiga', 'ricota', 'cottage'],
};

// Função auxiliar para determinar categoria
function getCategory(itemName: string): string {
    const lowerItem = itemName.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
        if (keywords.some(k => lowerItem.includes(k))) {
            return category;
        }
    }

    return 'Outros';
}

export function generateShoppingListFromMenu(menu: WeeklyMenu): ShoppingCategory[] {
    const allItems: ShoppingItem[] = [];
    let idCounter = 1;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
    const mealTypes: MealType[] = ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'supper'];

    // Itera sobre todos os dias e refeições e extrai ingredientes reais
    days.forEach((day) => {
        const dayMenu: DayMenu | undefined = menu?.[day];
        if (!dayMenu) return;

        mealTypes.forEach((mealType) => {
            const meal = dayMenu[mealType];
            if (!meal) return;

            (meal.ingredients || [])
                .filter((ing) => typeof ing === 'string' && ing.trim().length > 0)
                .forEach((ing) => {
                    const normalized = ing.trim();
                    const existing = allItems.find(i => i.name.toLowerCase() === normalized.toLowerCase());
                    if (existing) return;

                    allItems.push({
                        id: `auto-${idCounter++}`,
                        name: normalized,
                        category: getCategory(normalized),
                        checked: false,
                    });
                });
        });
    });

    // Agrupa por categoria
    const categoriesMap = new Map<string, ShoppingItem[]>();

    // Categorias padrão para ordem
    const defaultCategories = ['Hortifruti', 'Carnes e Proteínas', 'Laticínios e Refrigerados', 'Mercearia', 'Outros'];
    defaultCategories.forEach(c => categoriesMap.set(c, []));

    allItems.forEach(item => {
        const list = categoriesMap.get(item.category) || [];
        list.push(item);
        categoriesMap.set(item.category, list);
    });

    // Converte para array de categorias, removendo as vazias
    return Array.from(categoriesMap.entries())
        .map(([name, items]) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
            items
        }))
        .filter(cat => cat.items.length > 0);
}
