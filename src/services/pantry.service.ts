import type {
  PantryItem,
  PantrySummary,
  Recipe,
  RecipeRecommendation,
  UserProfile,
} from "@/types";

function normalizeIngredientName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function daysUntil(dateIso: string): number {
  const target = new Date(dateIso);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getExpiryStatus(
  expiryDate?: string,
): "expired" | "soon" | "ok" | "none" {
  if (!expiryDate) return "none";
  const delta = daysUntil(expiryDate);
  if (delta < 0) return "expired";
  if (delta <= 5) return "soon";
  return "ok";
}

export function buildPantrySummary(items: PantryItem[]): PantrySummary {
  const expiringSoon = items
    .filter((item) => getExpiryStatus(item.expiryDate) === "soon")
    .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));

  const expiredItems = items.filter(
    (item) => getExpiryStatus(item.expiryDate) === "expired",
  );

  const lowStockItems = items.filter((item) => {
    const threshold = item.minStock ?? 1;
    return item.quantity <= threshold;
  });

  return {
    totalItems: items.length,
    expiringSoon,
    expiredItems,
    lowStockItems,
    nearExpiryCount: expiringSoon.length,
    expiredCount: expiredItems.length,
    lowStockCount: lowStockItems.length,
  };
}

export function recommendRecipesFromPantry(
  items: PantryItem[],
  recipes: Recipe[],
): RecipeRecommendation[] {
  const pantryNames = new Map(
    items.map((item) => [normalizeIngredientName(item.name), item.name]),
  );

  return recipes
    .map((recipe) => {
      const availableIngredients = recipe.ingredients.filter((ingredient) =>
        pantryNames.has(normalizeIngredientName(ingredient)),
      );

      const missingIngredients = recipe.ingredients.filter(
        (ingredient) => !pantryNames.has(normalizeIngredientName(ingredient)),
      );

      const matchScore = recipe.ingredients.length
        ? Math.round(
            (availableIngredients.length / recipe.ingredients.length) * 100,
          )
        : 0;

      return {
        recipe,
        matchScore,
        availableIngredients,
        missingIngredients,
      };
    })
    .filter((result) => result.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function recommendRecipesForUser(
  items: PantryItem[],
  recipes: Recipe[],
  profile: Pick<
    UserProfile,
    "restrictions" | "dislikedFoods" | "favoriteFoods" | "foodGoal"
  >,
): RecipeRecommendation[] {
  const blockedIngredients = [
    ...(profile.restrictions ?? []).map(
      (restriction) => restriction.ingredient,
    ),
    ...(profile.dislikedFoods ?? []),
  ].map(normalizeIngredientName);

  const eligibleRecipes = recipes.filter(
    (recipe) =>
      !recipe.ingredients.some((ingredient) =>
        blockedIngredients.some((blocked) =>
          normalizeIngredientName(ingredient).includes(blocked),
        ),
      ),
  );

  return recommendRecipesFromPantry(items, eligibleRecipes);
}
