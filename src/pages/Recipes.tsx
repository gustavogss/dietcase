import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Clock3, Heart, Search, ShoppingBasket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserAccess } from "@/hooks/useUserAccess";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listPantryItems } from "@/services/pantry.repository";
import {
  addRecipeFavorite,
  deleteRecipeFavorite,
  listRecipes,
  listRecipeFavorites,
} from "@/services/recipe.repository";
import { recommendRecipesForUser } from "@/services/pantry.service";
import type { PantryItem, Recipe, RecipeFavorite } from "@/types";
import { downloadRecipePdf, printRecipe } from "@/services/pdf.service";

const mealTypeLabels: Record<Recipe["mealType"], string> = {
  "cafe-da-manha": "Café da manhã",
  lanche: "Lanche",
  almoco: "Almoço",
  jantar: "Jantar",
  sobremesa: "Sobremesa",
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function Recipes() {
  const { isAuthenticated, profile } = useUserAccess();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<RecipeFavorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mealType, setMealType] = useState<Recipe["mealType"] | "todos">(
    "todos",
  );
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const loadRecipeContext = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [storedPantry, storedFavorites, storedRecipes] = await Promise.all([
        listPantryItems(),
        listRecipeFavorites(),
        listRecipes(),
      ]);
      setPantryItems(storedPantry);
      setFavorites(storedFavorites);
      setRecipes(storedRecipes);
    } catch (error) {
      console.error("Erro ao carregar contexto de receitas", error);
      setErrorMessage("Não foi possível carregar suas receitas agora.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) void loadRecipeContext();
    else setIsLoading(false);
  }, [isAuthenticated, loadRecipeContext]);

  const recommendations = useMemo(
    () => recommendRecipesForUser(pantryItems, recipes, profile),
    [pantryItems, recipes, profile],
  );
  const recommendationById = useMemo(
    () => new Map(recommendations.map((item) => [item.recipe.id, item])),
    [recommendations],
  );
  const filteredRecipes = recipes.filter((recipe) => {
    const query = normalize(searchTerm.trim());
    const searchable = normalize(
      `${recipe.name} ${recipe.ingredients.join(" ")} ${recipe.tags.join(" ")}`,
    );
    const matchesSearch = !query || searchable.includes(query);
    const matchesMealType =
      mealType === "todos" || recipe.mealType === mealType;
    const recommendation = recommendationById.get(recipe.id);
    const matchesAvailability =
      !onlyAvailable ||
      Boolean(recommendation && recommendation.matchScore >= 75);
    return matchesSearch && matchesMealType && matchesAvailability;
  });

  const favoriteIds = new Set(favorites.map((favorite) => favorite.recipeId));
  const toggleFavorite = async (recipeId: string) => {
    try {
      const favorite = favorites.find((item) => item.recipeId === recipeId);
      if (favorite) {
        await deleteRecipeFavorite(favorite.id);
        setFavorites((current) =>
          current.filter((item) => item.id !== favorite.id),
        );
      } else {
        const created = await addRecipeFavorite(recipeId);
        setFavorites((current) => [...current, created]);
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito de receita", error);
      const errorCode =
        error instanceof Error && "code" in error
          ? String((error as Error & { code?: string }).code)
          : "";
      setErrorMessage(
        errorCode === "permission-denied"
          ? "Seu acesso de favorito foi recusado pelo Firestore. Atualize as Security Rules publicadas."
          : "Não foi possível atualizar o favorito agora.",
      );
    }
  };

  const handleDownloadRecipe = async () => {
    if (!selectedRecipe) return;
    setIsGeneratingPdf(true);
    try {
      await downloadRecipePdf(selectedRecipe);
    } catch (error) {
      console.error("Erro ao gerar PDF da receita", error);
      setErrorMessage("Não foi possível abrir o PDF desta receita.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintRecipe = async () => {
    if (!selectedRecipe) return;
    setIsGeneratingPdf(true);
    try {
      await printRecipe(selectedRecipe);
    } catch (error) {
      console.error("Erro ao imprimir receita", error);
      setErrorMessage("Não foi possível imprimir esta receita.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShareRecipe = () => {
    if (!selectedRecipe) return;
    const text = `${selectedRecipe.name}\n\nIngredientes: ${selectedRecipe.ingredients.join(", ")}\n\nModo de preparo: ${selectedRecipe.instructions.join(" ")}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  let recipesContent: ReactNode;
  if (isLoading) {
    recipesContent = (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          Carregando receitas e sua despensa...
        </CardContent>
      </Card>
    );
  } else if (filteredRecipes.length === 0) {
    recipesContent = (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          Nenhuma receita corresponde aos filtros selecionados.
        </CardContent>
      </Card>
    );
  } else {
    recipesContent = (
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredRecipes.map((recipe) => {
          const recommendation = recommendationById.get(recipe.id);
          const availableIngredients =
            recommendation?.availableIngredients ?? [];
          const missingIngredients =
            recommendation?.missingIngredients ?? recipe.ingredients;
          const isFavorite = favoriteIds.has(recipe.id);
          return (
            <Card
              key={recipe.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img
                src={recipe.imageUrl ?? "/logo.png"}
                alt={recipe.name}
                className="h-52 w-full rounded-t-lg object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/logo.png";
                }}
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {recipe.description}
                    </CardDescription>
                  </div>
                  <Button
                    aria-label={
                      isFavorite
                        ? `Remover ${recipe.name} dos favoritos`
                        : `Favoritar ${recipe.name}`
                    }
                    size="icon"
                    variant="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      void toggleFavorite(recipe.id);
                    }}
                  >
                    <Heart
                      className={
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }
                    />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">
                    <Clock3 className="mr-1 h-3 w-3" />
                    {recipe.prepTime} min
                  </Badge>
                  <Badge variant="secondary">
                    <Users className="mr-1 h-3 w-3" />
                    {recipe.servings} porções
                  </Badge>
                  <Badge variant="outline">{recipe.difficulty}</Badge>
                  <Badge variant="outline">
                    {mealTypeLabels[recipe.mealType]}
                  </Badge>
                  <Badge variant="outline">
                    {recipe.yieldDescription ??
                      `Rende ${recipe.servings} porções`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-primary">
                  Clique para abrir a receita completa
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {availableIngredients.length} de {recipe.ingredients.length}{" "}
                  ingredientes disponíveis
                </p>
                {missingIngredients.length > 0 && (
                  <p className="mt-1 text-sm text-amber-600">
                    Faltando: {missingIngredients.join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-screen-xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          Receitas Inteligentes
        </p>
        <h1 className="text-3xl font-bold">Prepare com o que você tem</h1>
        <p className="mt-2 text-muted-foreground">
          As sugestões consideram sua despensa real e mostram o que ainda falta.
        </p>
      </header>
      {errorMessage && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Pesquisar receitas"
              className="pl-9"
              placeholder="Pesquisar receitas ou ingredientes"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <select
            aria-label="Filtrar por tipo de refeição"
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={mealType}
            onChange={(event) =>
              setMealType(event.target.value as Recipe["mealType"] | "todos")
            }
          >
            <option value="todos">Todas as refeições</option>
            {Object.entries(mealTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant={onlyAvailable ? "default" : "outline"}
            onClick={() => setOnlyAvailable((value) => !value)}
          >
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Principalmente da despensa
          </Button>
        </CardContent>
      </Card>
      {recipesContent}
      {!isLoading && pantryItems.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Sua despensa está vazia; nenhuma receita será marcada como disponível.
        </p>
      )}

      <Dialog
        open={Boolean(selectedRecipe)}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selectedRecipe && (
            <>
              <img
                src={selectedRecipe.imageUrl ?? "/logo.png"}
                alt={selectedRecipe.name}
                className="h-56 w-full rounded-lg object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/logo.png";
                }}
              />
              <DialogHeader>
                <DialogTitle>{selectedRecipe.name}</DialogTitle>
                <DialogDescription>
                  {selectedRecipe.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {selectedRecipe.prepTime} min
                  </Badge>
                  <Badge variant="secondary">
                    {selectedRecipe.servings} porções
                  </Badge>
                  <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
                </div>
                <section>
                  <h2 className="font-semibold">Ingredientes</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={ingredient}>
                        {selectedRecipe.ingredientAmounts?.[index]
                          ? `${selectedRecipe.ingredientAmounts[index]} de ${ingredient}`
                          : ingredient}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {selectedRecipe.yieldDescription ??
                      `Rende ${selectedRecipe.servings} porções`}
                  </p>
                </section>
                <section>
                  <h2 className="font-semibold">Modo de preparo</h2>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {selectedRecipe.instructions.map((instruction) => (
                      <li key={instruction}>{instruction}</li>
                    ))}
                  </ol>
                </section>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={() => void handleDownloadRecipe()}
                    disabled={isGeneratingPdf}
                  >
                    {isGeneratingPdf ? "Abrindo..." : "Salvar PDF"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => void handlePrintRecipe()}
                    disabled={isGeneratingPdf}
                  >
                    Imprimir receita
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareRecipe}
                    disabled={isGeneratingPdf}
                  >
                    Compartilhar no WhatsApp
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Na tela de impressão, escolha “Salvar como PDF” para guardar
                  no computador ou celular.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
