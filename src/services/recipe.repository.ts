import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type {
  FavoriteMeal,
  Meal,
  MealType,
  Recipe,
  RecipeFavorite,
} from "@/types";

const favoritesCollection = "favoritos";
const recipesCollection = "recipes";

function requireUserId(): string {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("[RecipeRepository] Usuário não autenticado");
  return userId;
}

export async function listRecipes(): Promise<Recipe[]> {
  requireUserId();
  const snapshot = await getDocs(collection(db, recipesCollection));
  return snapshot.docs.map((recipe) => ({
    id: recipe.id,
    ...(recipe.data() as Omit<Recipe, "id">),
  }));
}

export async function listRecipeFavorites(): Promise<RecipeFavorite[]> {
  const userId = requireUserId();
  const snapshot = await getDocs(
    query(collection(db, favoritesCollection), where("userId", "==", userId)),
  );
  return snapshot.docs
    .filter((favorite) => Boolean(favorite.data().recipeId))
    .map((favorite) => ({
      id: favorite.id,
      ...(favorite.data() as Omit<RecipeFavorite, "id">),
    }));
}

export async function addRecipeFavorite(
  recipeId: string,
): Promise<RecipeFavorite> {
  const userId = requireUserId();
  const favoriteRef = doc(collection(db, favoritesCollection));
  const favorite = {
    userId,
    recipeId,
    kind: "recipe" as const,
    createdAt: new Date().toISOString(),
  };
  await setDoc(favoriteRef, favorite);
  return { id: favoriteRef.id, ...favorite };
}

export async function deleteRecipeFavorite(favoriteId: string): Promise<void> {
  requireUserId();
  await deleteDoc(doc(db, favoritesCollection, favoriteId));
}

export async function listMealFavorites(): Promise<FavoriteMeal[]> {
  const userId = requireUserId();
  const snapshot = await getDocs(
    query(collection(db, favoritesCollection), where("userId", "==", userId)),
  );
  return snapshot.docs
    .filter((favorite) => favorite.data().kind === "meal")
    .map((favorite) => favorite.data() as FavoriteMeal);
}

export async function addMealFavorite(
  meal: Meal,
  mealType: MealType,
  menuId: string,
  menuName: string,
): Promise<FavoriteMeal> {
  const userId = requireUserId();
  const favoriteRef = doc(collection(db, favoritesCollection));
  const favorite: FavoriteMeal & { userId: string; kind: "meal" } = {
    id: favoriteRef.id,
    userId,
    kind: "meal",
    meal,
    mealType,
    menuId,
    menuName,
    addedAt: new Date().toISOString(),
  };
  await setDoc(favoriteRef, favorite);
  return favorite;
}
