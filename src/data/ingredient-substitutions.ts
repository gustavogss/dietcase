import type { IngredientSubstitution } from '@/types';

// Base de dados de substituições inteligentes
export const ingredientSubstitutions: IngredientSubstitution[] = [
  {
    original: 'Leite',
    substitutes: [
      {
        name: 'Leite de amêndoas',
        reason: 'Sem lactose, menos calorias',
        caloriesDiff: -30,
        proteinDiff: -5,
        carbsDiff: 0,
        fatDiff: 0,
      },
      {
        name: 'Leite de aveia',
        reason: 'Sem lactose, rica em fibras',
        caloriesDiff: -10,
        proteinDiff: -3,
        carbsDiff: 5,
        fatDiff: -2,
      },
      {
        name: 'Leite sem lactose',
        reason: 'Mesmo sabor, sem lactose',
        caloriesDiff: 0,
        proteinDiff: 0,
        carbsDiff: 0,
        fatDiff: 0,
      },
    ],
  },
  {
    original: 'Queijo',
    substitutes: [
      {
        name: 'Queijo vegano',
        reason: 'Sem lactose, origem vegetal',
        caloriesDiff: -20,
        proteinDiff: -3,
        carbsDiff: 2,
        fatDiff: -2,
      },
      {
        name: 'Tofu temperado',
        reason: 'Alto em proteína, sem lactose',
        caloriesDiff: -40,
        proteinDiff: 0,
        carbsDiff: 1,
        fatDiff: -5,
      },
    ],
  },
  {
    original: 'Ovos',
    substitutes: [
      {
        name: 'Tofu mexido',
        reason: 'Vegano, rica em proteína',
        caloriesDiff: -20,
        proteinDiff: -2,
        carbsDiff: 1,
        fatDiff: -3,
      },
      {
        name: 'Chia com água (gel)',
        reason: 'Vegano, rica em ômega-3',
        caloriesDiff: -50,
        proteinDiff: -5,
        carbsDiff: 8,
        fatDiff: -3,
      },
    ],
  },
  {
    original: 'Frango',
    substitutes: [
      {
        name: 'Peito de peru',
        reason: 'Menos gordura, mesma proteína',
        caloriesDiff: -10,
        proteinDiff: 0,
        carbsDiff: 0,
        fatDiff: -2,
      },
      {
        name: 'Tofu firme',
        reason: 'Vegano, boa proteína',
        caloriesDiff: -60,
        proteinDiff: -8,
        carbsDiff: 2,
        fatDiff: -5,
      },
      {
        name: 'Grão de bico',
        reason: 'Vegano, rico em fibras',
        caloriesDiff: 20,
        proteinDiff: -10,
        carbsDiff: 15,
        fatDiff: -3,
      },
    ],
  },
  {
    original: 'Carne',
    substitutes: [
      {
        name: 'Cogumelo portobello',
        reason: 'Textura similar, menos calorias',
        caloriesDiff: -150,
        proteinDiff: -20,
        carbsDiff: 5,
        fatDiff: -15,
      },
      {
        name: 'Lentilha',
        reason: 'Rica em proteína vegetal e fibras',
        caloriesDiff: -80,
        proteinDiff: -10,
        carbsDiff: 20,
        fatDiff: -12,
      },
      {
        name: 'Proteína de soja texturizada',
        reason: 'Alto teor proteico, vegano',
        caloriesDiff: -50,
        proteinDiff: -5,
        carbsDiff: 10,
        fatDiff: -10,
      },
    ],
  },
  {
    original: 'Peixe',
    substitutes: [
      {
        name: 'Tofu marinado',
        reason: 'Vegano, absorve sabores',
        caloriesDiff: -40,
        proteinDiff: -15,
        carbsDiff: 2,
        fatDiff: -5,
      },
      {
        name: 'Grão de bico temperado',
        reason: 'Ômega-3 vegetal, rico em proteína',
        caloriesDiff: 0,
        proteinDiff: -10,
        carbsDiff: 15,
        fatDiff: -5,
      },
    ],
  },
  {
    original: 'Pão',
    substitutes: [
      {
        name: 'Pão sem glúten',
        reason: 'Para celíacos',
        caloriesDiff: 10,
        proteinDiff: -1,
        carbsDiff: 5,
        fatDiff: 1,
      },
      {
        name: 'Tapioca',
        reason: 'Sem glúten, leve',
        caloriesDiff: -20,
        proteinDiff: -2,
        carbsDiff: 0,
        fatDiff: -1,
      },
      {
        name: 'Batata doce',
        reason: 'Carboidrato natural, rica em fibras',
        caloriesDiff: -30,
        proteinDiff: -1,
        carbsDiff: 5,
        fatDiff: -2,
      },
    ],
  },
  {
    original: 'Arroz',
    substitutes: [
      {
        name: 'Quinoa',
        reason: 'Mais proteína, sem glúten',
        caloriesDiff: 20,
        proteinDiff: 5,
        carbsDiff: -5,
        fatDiff: 2,
      },
      {
        name: 'Couve-flor ralada',
        reason: 'Baixo carboidrato, mais fibras',
        caloriesDiff: -150,
        proteinDiff: -2,
        carbsDiff: -35,
        fatDiff: -1,
      },
      {
        name: 'Arroz de couve-flor',
        reason: 'Low carb, menos calorias',
        caloriesDiff: -120,
        proteinDiff: -2,
        carbsDiff: -30,
        fatDiff: 0,
      },
    ],
  },
  {
    original: 'Macarrão',
    substitutes: [
      {
        name: 'Abobrinha em espiral',
        reason: 'Low carb, rica em vitaminas',
        caloriesDiff: -180,
        proteinDiff: -5,
        carbsDiff: -38,
        fatDiff: -1,
      },
      {
        name: 'Macarrão integral',
        reason: 'Mais fibras, índice glicêmico menor',
        caloriesDiff: -10,
        proteinDiff: 2,
        carbsDiff: -5,
        fatDiff: 0,
      },
      {
        name: 'Palmito pupunha em fios',
        reason: 'Low carb, textura similar',
        caloriesDiff: -160,
        proteinDiff: -4,
        carbsDiff: -35,
        fatDiff: 0,
      },
    ],
  },
  {
    original: 'Açúcar',
    substitutes: [
      {
        name: 'Stevia',
        reason: 'Zero calorias, natural',
        caloriesDiff: -16,
        proteinDiff: 0,
        carbsDiff: -4,
        fatDiff: 0,
      },
      {
        name: 'Mel',
        reason: 'Natural, mais nutrientes',
        caloriesDiff: 8,
        proteinDiff: 0,
        carbsDiff: 2,
        fatDiff: 0,
      },
      {
        name: 'Xilitol',
        reason: 'Baixo índice glicêmico',
        caloriesDiff: -6,
        proteinDiff: 0,
        carbsDiff: -1,
        fatDiff: 0,
      },
    ],
  },
];

// Função para encontrar substituições de um ingrediente
export function findSubstitutions(ingredient: string): IngredientSubstitution | undefined {
  return ingredientSubstitutions.find(
    (sub) => sub.original.toLowerCase() === ingredient.toLowerCase()
  );
}

// Função para normalizar nome de ingredientes (remover quantidade)
export function normalizeIngredientName(ingredient: string): string {
  // Remove números, unidades de medida comuns, etc.
  return ingredient
    .replace(/\d+/g, '')
    .replace(/g\b|ml\b|kg\b|l\b|colher|xícara|unidade|fatia/gi, '')
    .trim()
    .toLowerCase();
}