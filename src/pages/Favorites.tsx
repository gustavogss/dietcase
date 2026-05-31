import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { Flame, Trash2, Coffee, Apple, Drumstick, Star } from 'lucide-react';
import type { MealType, CustomDayMenu } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const mealTypeLabels: Record<MealType, string> = {
  breakfast: 'Café da Manhã',
  morningSnack: 'Lanche da Manhã',
  lunch: 'Almoço',
  afternoonSnack: 'Lanche da Tarde',
  dinner: 'Jantar',
  supper: 'Ceia',
};

const mealTypeIcons: Record<MealType, React.ReactNode> = {
  breakfast: <Coffee className="h-5 w-5 text-primary" />,
  morningSnack: <Apple className="h-5 w-5 text-primary" />,
  lunch: <Drumstick className="h-5 w-5 text-primary" />,
  afternoonSnack: <Apple className="h-5 w-5 text-primary" />,
  dinner: <Drumstick className="h-5 w-5 text-primary" />,
  supper: <Coffee className="h-5 w-5 text-primary" />,
};

export default function Favorites() {
  const { favorites, removeFavorite, getFavoritesByType } = useFavorites();
  const [customMenu, setCustomMenu] = useState<CustomDayMenu>({});
  const [isCreatingMenu, setIsCreatingMenu] = useState(false);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    toast({
      title: 'Favorito removido',
      description: 'A refeição foi removida dos seus favoritos.',
    });
  };

  const addToCustomMenu = (mealType: MealType) => {
    const favoritesForType = getFavoritesByType(mealType);
    if (favoritesForType.length === 0) {
      toast({
        title: 'Nenhum favorito',
        description: `Você não tem favoritos salvos para ${mealTypeLabels[mealType]}.`,
        variant: 'destructive',
      });
      return;
    }

    // Por simplicidade, vamos pegar o primeiro favorito. Em uma versão mais complexa,
    // poderíamos abrir um modal para o usuário escolher
    setCustomMenu({
      ...customMenu,
      [mealType]: favoritesForType[0],
    });

    toast({
      title: 'Adicionado ao cardápio',
      description: `${favoritesForType[0].meal.name} foi adicionado ao seu cardápio personalizado.`,
    });
  };

  const clearCustomMenu = () => {
    setCustomMenu({});
    toast({
      title: 'Cardápio limpo',
      description: 'Seu cardápio personalizado foi limpo.',
    });
  };

  const customMenuMealCount = Object.keys(customMenu).length;
  const totalCalories = Object.values(customMenu).reduce(
    (sum, favMeal) => sum + (favMeal?.meal.calories || 0),
    0
  );

  return (
    <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight break-words">Refeições Favoritas</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed break-words">
            {favorites.length} {favorites.length === 1 ? 'favorito salvo' : 'favoritos salvos'}
          </p>
        </div>

          <Dialog open={isCreatingMenu} onOpenChange={setIsCreatingMenu}>
          <DialogTrigger asChild>
              <Button variant="default" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              <Star className="h-4 w-4 shrink-0" />
              Criar Cardápio Personalizado
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Meu Cardápio Personalizado</DialogTitle>
              <DialogDescription>
                Selecione suas refeições favoritas para cada período do dia
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {customMenuMealCount > 0 && (
                <Alert>
                  <AlertDescription className="flex items-center justify-between">
                    <span>
                      <strong>{customMenuMealCount}</strong> refeições • <strong>{totalCalories}</strong> kcal total
                    </span>
                    <Button variant="outline" size="sm" onClick={clearCustomMenu}>
                      Limpar tudo
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {Object.entries(mealTypeLabels).map(([key, label]) => {
                const mealType = key as MealType;
                const selectedMeal = customMenu[mealType];
                const availableFavorites = getFavoritesByType(mealType);

                return (
                  <Card key={mealType}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {mealTypeIcons[mealType]}
                        {label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedMeal ? (
                        <div className="space-y-2">
                          <p className="font-medium">{selectedMeal.meal.name}</p>
                          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                            <Flame className="h-3 w-3" />
                            {selectedMeal.meal.calories} kcal
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newMenu = { ...customMenu };
                              delete newMenu[mealType];
                              setCustomMenu(newMenu);
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addToCustomMenu(mealType)}
                          disabled={availableFavorites.length === 0}
                        >
                          {availableFavorites.length === 0
                            ? 'Nenhum favorito disponível'
                            : `Adicionar (${availableFavorites.length} ${availableFavorites.length === 1 ? 'opção' : 'opções'})`}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {favorites.length === 0 ? (
        <Alert>
          <AlertDescription>
            Você ainda não tem favoritos. Explore os cardápios e clique no ícone de coração para adicionar refeições aos favoritos!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <Card key={favorite.id}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {mealTypeIcons[favorite.mealType]}
                    {mealTypeLabels[favorite.mealType]}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemove(favorite.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardTitle>
                <CardDescription>{favorite.meal.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  De: {favorite.menuName}
                </div>
                {favorite.meal.portions && favorite.meal.portions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Porções:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {favorite.meal.portions.slice(0, 3).map((portion, i) => (
                        <li key={i}>• {portion}</li>
                      ))}
                      {favorite.meal.portions.length > 3 && (
                        <li className="text-xs">+ {favorite.meal.portions.length - 3} mais...</li>
                      )}
                    </ul>
                  </div>
                )}
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  <Flame className="h-3 w-3" />
                  {favorite.meal.calories} kcal
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}