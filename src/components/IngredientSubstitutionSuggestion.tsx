import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useState } from 'react';
import { useRestrictions } from '@/hooks/useRestrictions';
import { findSubstitutions, normalizeIngredientName } from '@/data/ingredient-substitutions';
import type { Meal } from '@/types';

interface IngredientSubstitutionSuggestionProps {
  meal: Meal;
}

export function IngredientSubstitutionSuggestion({ meal }: IngredientSubstitutionSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { hasRestriction, getRestriction } = useRestrictions();

  // Verificar se algum ingrediente da refeição tem restrição
  const restrictedIngredients = meal.ingredients.filter((ingredient) =>
    hasRestriction(ingredient)
  );

  if (restrictedIngredients.length === 0) {
    return null;
  }

  // Encontrar substituições para cada ingrediente restrito
  const substitutionsData = restrictedIngredients.map((ingredient) => {
    const normalized = normalizeIngredientName(ingredient);
    const substitutions = findSubstitutions(normalized);
    const restriction = getRestriction(ingredient);

    return {
      original: ingredient,
      restriction,
      substitutions: substitutions?.substitutes || [],
    };
  });

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">
            ⚠️ Esta refeição contém {restrictedIngredients.length} ingrediente(s) marcado(s) como restrição
          </p>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <span className="text-sm">
                  Ver sugestões de substituição
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 mt-3">
              {substitutionsData.map((data, index) => (
                <div key={index} className="space-y-2 p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="capitalize">
                      {data.restriction?.type?.replace('-', ' ') || 'restrição'}
                    </Badge>
                    <span className="font-medium text-sm">{data.original}</span>
                  </div>

                  {data.substitutions.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Substituições sugeridas:</p>
                      {data.substitutions.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="pl-3 border-l-2 border-primary space-y-1"
                        >
                          <p className="text-sm font-medium text-foreground">{sub.name}</p>
                          <p className="text-xs text-muted-foreground">{sub.reason}</p>

                          <div className="flex gap-2 flex-wrap">
                            {sub.caloriesDiff !== 0 && (
                              <Badge variant="outline" className="text-xs">
                                {sub.caloriesDiff > 0 ? '+' : ''}{sub.caloriesDiff} kcal
                              </Badge>
                            )}
                            {sub.proteinDiff !== 0 && (
                              <Badge variant="outline" className="text-xs">
                                {sub.proteinDiff > 0 ? '+' : ''}{sub.proteinDiff}g prot
                              </Badge>
                            )}
                            {sub.carbsDiff !== 0 && (
                              <Badge variant="outline" className="text-xs">
                                {sub.carbsDiff > 0 ? '+' : ''}{sub.carbsDiff}g carb
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Info className="h-3 w-3 mt-0.5" />
                      <span>Nenhuma substituição disponível no momento. Consulte um nutricionista.</span>
                    </div>
                  )}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </AlertDescription>
    </Alert>
  );
}