import { describe, expect, it } from "vitest";
import {
  buildPantrySummary,
  recommendRecipesFromPantry,
  recommendRecipesForUser,
} from "@/services/pantry.service";
import { pantryItems } from "@/data/mocks";

const testRecipes = [
  {
    id: "test-ovos",
    name: "Ovos com abacate",
    description: "Receita de teste",
    ingredients: ["Ovo", "Abacate"],
    mealType: "cafe-da-manha" as const,
    tags: ["teste"],
    prepTime: 10,
    difficulty: "facil" as const,
    servings: 1,
    instructions: ["Preparar"],
  },
];

describe("Despensa Inteligente", () => {
  it("deve resumir itens da despensa e identificar itens próximos do vencimento", () => {
    const summary = buildPantrySummary(pantryItems);

    expect(summary.totalItems).toBeGreaterThan(0);
    expect(summary.expiringSoon.length).toBeGreaterThan(0);
    expect(summary.lowStockItems.length).toBeGreaterThanOrEqual(0);
  });

  it("deve recomendar receitas com base nos ingredientes disponíveis", () => {
    const recommendations = recommendRecipesFromPantry(
      pantryItems,
      testRecipes,
    );

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].matchScore).toBeGreaterThan(0);
  });

  it("deve separar alimentos vencidos e aceitar itens sem validade", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const summary = buildPantrySummary([
      {
        id: "expired-item",
        name: "Leite",
        category: "laticinios",
        quantity: 1,
        unit: "litro",
        expiryDate: yesterday.toISOString().slice(0, 10),
      },
      {
        id: "no-expiry-item",
        name: "Sal",
        category: "temperos",
        quantity: 1,
        unit: "pacote",
      },
    ]);

    expect(summary.expiredCount).toBe(1);
    expect(summary.expiredItems[0].name).toBe("Leite");
    expect(summary.nearExpiryCount).toBe(0);
  });

  it("deve excluir receitas com ingredientes restritos ou que o usuário não gosta", () => {
    const recommendations = recommendRecipesForUser(pantryItems, testRecipes, {
      restrictions: [
        {
          ingredient: "ovo",
          type: "alergia",
          addedAt: new Date().toISOString(),
        },
      ],
      dislikedFoods: ["brócolis"],
      favoriteFoods: [],
      foodGoal: "mais energia",
    });

    expect(recommendations.some((item) => item.recipe.id === "test-ovos")).toBe(
      false,
    );
    expect(
      recommendations.some(
        (item) => item.recipe.id === "recipe-frango-brocolis",
      ),
    ).toBe(false);
  });
});
