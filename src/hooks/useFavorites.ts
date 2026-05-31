import { useState, useEffect } from 'react';
import type { FavoriteMeal, Meal, MealType } from '@/types';

const FAVORITES_KEY = 'dietcase-favorite-meals';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteMeal[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addFavorite = (
    meal: Meal,
    mealType: MealType,
    menuId: string,
    menuName: string
  ) => {
    const newFavorite: FavoriteMeal = {
      id: `${menuId}-${mealType}-${Date.now()}`,
      meal,
      mealType,
      menuId,
      menuName,
      addedAt: new Date().toISOString(),
    };
    saveFavorites([...favorites, newFavorite]);
  };

  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter((f) => f.id !== id));
  };

  const isFavorite = (meal: Meal, mealType: MealType, menuId: string) => {
    return favorites.some(
      (f) => f.meal.name === meal.name && f.mealType === mealType && f.menuId === menuId
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