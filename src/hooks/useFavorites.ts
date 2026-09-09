import { useState, useEffect } from "react";
import type { FavoriteMeal, Meal, MealType } from "@/types";
import {
  addMealFavorite,
  deleteRecipeFavorite,
  listMealFavorites,
} from "@/services/recipe.repository";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);

  useEffect(() => {
    let isMounted = true;
    void listMealFavorites()
      .then((storedFavorites) => {
        if (isMounted) setFavorites(storedFavorites);
      })
      .catch((error) => console.error("Erro ao carregar favoritos", error));
    return () => {
      isMounted = false;
    };
  }, []);

  const addFavorite = (
    meal: Meal,
    mealType: MealType,
    menuId: string,
    menuName: string,
  ) => {
    void addMealFavorite(meal, mealType, menuId, menuName)
      .then((newFavorite) =>
        setFavorites((current) => [...current, newFavorite]),
      )
      .catch((error) => console.error("Erro ao salvar favorito", error));
  };

  const removeFavorite = (id: string) => {
    const handleRemoved = () => {
      setFavorites((current) =>
        current.filter((favorite) => favorite.id !== id),
      );
    };

    void deleteRecipeFavorite(id)
      .then(handleRemoved)
      .catch((error) => console.error("Erro ao remover favorito", error));
  };

  const isFavorite = (meal: Meal, mealType: MealType, menuId: string) => {
    return favorites.some(
      (f) =>
        f.meal.name === meal.name &&
        f.mealType === mealType &&
        f.menuId === menuId,
    );
  };

  const getFavoritesByType = (mealType: MealType) => {
    return favorites.filter((f) => f.mealType === mealType);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType,
  };
}
