import { describe, it, expect, vi } from "vitest";
import { userService } from "../services/userService";
import { nutritionalPlanService } from "../services/nutritionalPlanService";
import {
  addPantryItem,
  deletePantryItem,
  listPantryItems,
  updatePantryItem,
} from "../services/pantry.repository";
import {
  addRecipeFavorite,
  addMealFavorite,
  deleteRecipeFavorite,
  listMealFavorites,
  listRecipeFavorites,
  listRecipes,
} from "../services/recipe.repository";
import { weeklyMenus } from "../data/mocks";
import type { OrchestrationResponse } from "../types";

describe("Testes da Camada de Persistência e Backend (Etapa 06)", () => {
  describe("userService", () => {
    it("deve tentar interagir com a coleção de usuários no Firestore", async () => {
      // Sem usuário logado no auth do Firebase no ambiente de teste unitário
      await expect(
        userService.createUser({
          name: "Usuário Teste",
          email: "teste@email.com",
          plan: "TRIAL",
        }),
      ).rejects.toThrow("Usuário não autenticado");
    });

    it("deve impedir atualização de plano sem usuário autenticado", async () => {
      await expect(userService.updatePlan("ESSENCIAL")).rejects.toThrow(
        "Usuário não autenticado",
      );
    });

    it("deve impedir atualização de personalização sem usuário autenticado", async () => {
      await expect(
        userService.updatePersonalization({
          foodGoal: "Mais energia",
          dislikedFoods: ["Coentro"],
        }),
      ).rejects.toThrow("Usuário não autenticado");
    });

    it("deve impedir leitura do perfil atual sem usuário autenticado", async () => {
      await expect(userService.getCurrentUser()).rejects.toThrow(
        "Usuário não autenticado",
      );
    });
  });

  describe("nutritionalPlanService", () => {
    it("deve recusar salvar plano alimentar quando não houver usuário autenticado no Firebase", async () => {
      const dummyResult: OrchestrationResponse = {
        menu: weeklyMenus[0],
        auditLog: [],
        warnings: [],
        isFallback: false,
        generatedAt: new Date().toISOString(),
      };

      await expect(
        nutritionalPlanService.savePlan(dummyResult),
      ).rejects.toThrow("[NutritionalPlanService] Usuário não autenticado");
    });

    it("deve retornar null para requisições de plano mais recente sem userId", async () => {
      const result = await nutritionalPlanService.getUserLatestPlan("");
      expect(result).toBeNull();
    });

    it("deve retornar lista vazia para histórico de planos sem userId", async () => {
      const history = await nutritionalPlanService.getPlanHistory("");
      expect(history).toEqual([]);
    });
  });

  describe("pantryRepository", () => {
    it("deve rejeitar leitura sem usuário autenticado, sem usar mock como fallback", async () => {
      await expect(listPantryItems()).rejects.toThrow(
        "[PantryRepository] Usuário não autenticado",
      );
    });

    it("deve rejeitar criação sem usuário autenticado", async () => {
      await expect(
        addPantryItem({
          name: "Aveia",
          category: "graos",
          quantity: 1,
          unit: "pacote",
          expiryDate: "2026-10-01",
        }),
      ).rejects.toThrow("[PantryRepository] Usuário não autenticado");
    });

    it("deve rejeitar atualização sem usuário autenticado", async () => {
      await expect(
        updatePantryItem("item-sem-usuario", { quantity: 2 }),
      ).rejects.toThrow("[PantryRepository] Usuário não autenticado");
    });

    it("deve rejeitar exclusão sem usuário autenticado", async () => {
      await expect(deletePantryItem("item-sem-usuario")).rejects.toThrow(
        "[PantryRepository] Usuário não autenticado",
      );
    });
  });

  describe("recipeRepository", () => {
    it("deve rejeitar leitura, criação e exclusão de favoritos sem autenticação", async () => {
      await expect(listRecipeFavorites()).rejects.toThrow(
        "Usuário não autenticado",
      );
      await expect(listRecipes()).rejects.toThrow("Usuário não autenticado");
      await expect(addRecipeFavorite("recipe-1")).rejects.toThrow(
        "Usuário não autenticado",
      );
      await expect(deleteRecipeFavorite("favorite-1")).rejects.toThrow(
        "Usuário não autenticado",
      );
      await expect(listMealFavorites()).rejects.toThrow(
        "Usuário não autenticado",
      );
      await expect(
        addMealFavorite(
          weeklyMenus[0].monday.breakfast,
          "breakfast",
          "menu-1",
          "Menu",
        ),
      ).rejects.toThrow("Usuário não autenticado");
    });
  });
});
