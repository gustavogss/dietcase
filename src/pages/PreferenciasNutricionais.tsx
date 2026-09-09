import { useEffect, useState } from "react";
import { ChefHat, Save, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUserAccess } from "@/hooks/useUserAccess";
import { userService } from "@/services/userService";
import type { UserProfile } from "@/types";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value?: string[]): string {
  return value?.join(", ") ?? "";
}

export default function PreferenciasNutricionais() {
  const { profile } = useUserAccess();
  const { toast } = useToast();
  const [foodGoal, setFoodGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [dislikedFoods, setDislikedFoods] = useState("");
  const [favoriteFoods, setFavoriteFoods] = useState("");
  const [activityLevel, setActivityLevel] =
    useState<NonNullable<UserProfile["activityLevel"]>>("sedentario");
  const [mealsPerDay, setMealsPerDay] = useState("3");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFoodGoal(profile.foodGoal ?? "");
    setDietaryPreferences(joinList(profile.dietaryPreferences));
    setDislikedFoods(joinList(profile.dislikedFoods));
    setFavoriteFoods(joinList(profile.favoriteFoods));
    setActivityLevel(profile.activityLevel ?? "sedentario");
    setMealsPerDay(String(profile.mealsPerDay ?? 3));
    setBreakfast(profile.mealSchedule?.breakfast ?? "");
    setLunch(profile.mealSchedule?.lunch ?? "");
    setDinner(profile.mealSchedule?.dinner ?? "");
  }, [profile]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await userService.updatePersonalization({
        foodGoal: foodGoal.trim(),
        dietaryPreferences: splitList(dietaryPreferences),
        dislikedFoods: splitList(dislikedFoods),
        favoriteFoods: splitList(favoriteFoods),
        activityLevel,
        mealsPerDay: Number(mealsPerDay),
        mealSchedule: {
          breakfast: breakfast || undefined,
          lunch: lunch || undefined,
          dinner: dinner || undefined,
        },
      });
      toast({
        title: "Preferências salvas",
        description: "Seu contexto alimentar foi atualizado no Firestore.",
      });
    } catch (error) {
      console.error("Erro ao salvar preferências no Firestore", error);
      toast({
        title: "Não foi possível salvar",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="container mx-auto max-w-screen-xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Preferências Nutricionais
        </h1>
        <p className="mt-2 text-muted-foreground">
          Personalize seu contexto alimentar para futuras recomendações e
          planos.
        </p>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Objetivo e rotina
              </CardTitle>
              <CardDescription>
                Essas informações orientam a personalização alimentar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-goal">Objetivo alimentar</Label>
                <Input
                  id="food-goal"
                  placeholder="Ex.: melhorar energia, controlar peso"
                  value={foodGoal}
                  onChange={(event) => setFoodGoal(event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="activity-level">Nível de atividade</Label>
                  <select
                    id="activity-level"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={activityLevel}
                    onChange={(event) =>
                      setActivityLevel(
                        event.target.value as NonNullable<
                          UserProfile["activityLevel"]
                        >,
                      )
                    }
                  >
                    <option value="sedentario">Sedentário</option>
                    <option value="leve">Leve</option>
                    <option value="moderado">Moderado</option>
                    <option value="intenso">Intenso</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meals-per-day">Refeições por dia</Label>
                  <Input
                    id="meals-per-day"
                    type="number"
                    min="1"
                    max="8"
                    value={mealsPerDay}
                    onChange={(event) => setMealsPerDay(event.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                Preferências alimentares
              </CardTitle>
              <CardDescription>
                Separe os alimentos por vírgula. Restrições médicas podem ser
                gerenciadas no Perfil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dietary-preferences">
                  Preferências de alimentação
                </Label>
                <Input
                  id="dietary-preferences"
                  placeholder="Ex.: comida caseira, baixo sódio"
                  value={dietaryPreferences}
                  onChange={(event) =>
                    setDietaryPreferences(event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favorite-foods">Alimentos preferidos</Label>
                <Input
                  id="favorite-foods"
                  placeholder="Ex.: arroz, frango, banana"
                  value={favoriteFoods}
                  onChange={(event) => setFavoriteFoods(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disliked-foods">Alimentos que não gosta</Label>
                <Input
                  id="disliked-foods"
                  placeholder="Ex.: coentro, pimentão"
                  value={dislikedFoods}
                  onChange={(event) => setDislikedFoods(event.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Horários preferidos</CardTitle>
            <CardDescription>
              Opcional. Ajuda a organizar futuras refeições do plano.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="breakfast-time">Café da manhã</Label>
              <Input
                id="breakfast-time"
                type="time"
                value={breakfast}
                onChange={(event) => setBreakfast(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lunch-time">Almoço</Label>
              <Input
                id="lunch-time"
                type="time"
                value={lunch}
                onChange={(event) => setLunch(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dinner-time">Jantar</Label>
              <Input
                id="dinner-time"
                type="time"
                value={dinner}
                onChange={(event) => setDinner(event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Salvando..." : "Salvar preferências"}
        </Button>
      </form>
    </main>
  );
}
