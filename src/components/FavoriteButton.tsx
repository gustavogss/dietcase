import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import type { Meal, MealType } from '@/types';
import { toast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  meal: Meal;
  mealType: MealType;
  menuId: string;
  menuName: string;
}

export function FavoriteButton({ meal, mealType, menuId, menuName }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite, favorites } = useFavorites();
  const isCurrentlyFavorite = isFavorite(meal, mealType, menuId);

  const handleToggle = () => {
    if (isCurrentlyFavorite) {
      const favorite = favorites.find(
        (f) => f.meal.name === meal.name && f.mealType === mealType && f.menuId === menuId
      );
      if (favorite) {
        removeFavorite(favorite.id);
        toast({
          title: 'Removido dos favoritos',
          description: `${meal.name} foi removido dos seus favoritos.`,
        });
      }
    } else {
      addFavorite(meal, mealType, menuId, menuName);
      toast({
        title: 'Adicionado aos favoritos',
        description: `${meal.name} foi adicionado aos seus favoritos.`,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="h-8 w-8"
      aria-label={isCurrentlyFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={`h-5 w-5 ${isCurrentlyFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
      />
    </Button>
  );
}