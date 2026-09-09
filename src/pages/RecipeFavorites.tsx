import { useCallback, useEffect, useMemo, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserAccess } from "@/hooks/useUserAccess";
import {
  deleteRecipeFavorite,
  listRecipes,
  listRecipeFavorites,
} from "@/services/recipe.repository";
import type { Recipe, RecipeFavorite } from "@/types";

export default function RecipeFavorites() {
  const { isAuthenticated } = useUserAccess();
  const [favorites, setFavorites] = useState<RecipeFavorite[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [storedFavorites, storedRecipes] = await Promise.all([
        listRecipeFavorites(),
        listRecipes(),
      ]);
      setFavorites(storedFavorites);
      setRecipes(storedRecipes);
    } catch (error) {
      console.error("Erro ao carregar receitas favoritas", error);
      setErrorMessage(
        "Não foi possível carregar suas receitas favoritas agora.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) void loadFavorites();
    else setIsLoading(false);
  }, [isAuthenticated, loadFavorites]);

  const favoriteRecipes = useMemo(() => {
    const recipesById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
    return favorites
      .map((favorite) => ({
        favorite,
        recipe: recipesById.get(favorite.recipeId),
      }))
      .filter((item): item is { favorite: RecipeFavorite; recipe: Recipe } =>
        Boolean(item.recipe),
      );
  }, [favorites, recipes]);

  const handleRemove = async (favoriteId: string) => {
    try {
      await deleteRecipeFavorite(favoriteId);
      setFavorites((current) =>
        current.filter((favorite) => favorite.id !== favoriteId),
      );
    } catch (error) {
      console.error("Erro ao remover receita favorita", error);
      setErrorMessage("Não foi possível remover esta receita dos favoritos.");
    }
  };

  return (
    <main className="container mx-auto max-w-screen-xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          Receitas Favoritas
        </p>
        <h1 className="text-3xl font-bold">Suas receitas salvas</h1>
        <p className="mt-2 text-muted-foreground">
          Aqui aparecem somente as receitas persistidas no Firestore para sua
          conta.
        </p>
      </header>

      {errorMessage && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            Carregando receitas favoritas...
          </CardContent>
        </Card>
      ) : favoriteRecipes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <Heart className="h-10 w-10 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              Você ainda não tem receitas favoritas.
            </h2>
            <p className="text-muted-foreground">
              Favorite uma receita em Receitas Inteligentes para encontrá-la
              aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteRecipes.map(({ favorite, recipe }) => (
            <Card key={favorite.id}>
              <img
                src={recipe.imageUrl ?? "/logo.png"}
                alt={recipe.name}
                className="h-48 w-full rounded-t-lg object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/logo.png";
                }}
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {recipe.description}
                    </CardDescription>
                  </div>
                  <Button
                    aria-label={`Remover ${recipe.name} dos favoritos`}
                    size="icon"
                    variant="ghost"
                    onClick={() => void handleRemove(favorite.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{recipe.prepTime} min</Badge>
                  <Badge variant="secondary">{recipe.servings} porções</Badge>
                  <Badge variant="outline">{recipe.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Salva em{" "}
                  {new Date(favorite.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
