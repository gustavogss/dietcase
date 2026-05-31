import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import type { DayMenu, UserProfile } from '@/types';

interface NutritionalSummaryProps {
  dayMenu: DayMenu;
  userProfile: UserProfile;
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Função para calcular metas diárias baseadas no perfil do usuário
function calculateDailyGoals(profile: UserProfile): DailyGoals {
  const { weight, imc, morbidities } = profile;

  // Cálculo base de calorias (TMB - Taxa Metabólica Basal simplificada)
  let baseCalories = weight * 24; // Simplificado

  // Ajustar baseado no IMC
  if (imc < 18.5) {
    baseCalories *= 1.2; // Aumentar para ganho de peso
  } else if (imc > 25) {
    baseCalories *= 0.85; // Reduzir para perda de peso
  }

  // Ajustar baseado nas morbidades
  if (morbidities.includes('diabetes')) {
    baseCalories *= 0.95;
  }
  if (morbidities.includes('obesidade')) {
    baseCalories *= 0.8;
  }

  // Calcular macros (% das calorias)
  const proteinCalories = baseCalories * 0.25; // 25% proteína
  const carbsCalories = baseCalories * 0.45; // 45% carboidratos
  const fatCalories = baseCalories * 0.30; // 30% gordura

  return {
    calories: Math.round(baseCalories),
    protein: Math.round(proteinCalories / 4), // 4 cal/g
    carbs: Math.round(carbsCalories / 4), // 4 cal/g
    fat: Math.round(fatCalories / 9), // 9 cal/g
  };
}

// Calcular totais do dia
function calculateDayTotals(dayMenu: DayMenu) {
  const meals = [
    dayMenu.breakfast,
    dayMenu.morningSnack,
    dayMenu.lunch,
    dayMenu.afternoonSnack,
    dayMenu.dinner,
    dayMenu.supper,
  ];

  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.macros.protein,
      carbs: totals.carbs + meal.macros.carbs,
      fat: totals.fat + meal.macros.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function NutritionalSummary({ dayMenu, userProfile }: NutritionalSummaryProps) {
  const goals = calculateDailyGoals(userProfile);
  const totals = calculateDayTotals(dayMenu);

  const getPercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getStatusColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90 && percentage <= 110) return 'text-green-600';
    if (percentage >= 80 && percentage <= 120) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90 && percentage <= 110) {
      return <Badge variant="default">Ideal</Badge>;
    }
    if (percentage >= 80 && percentage <= 120) {
      return <Badge variant="secondary">Atenção</Badge>;
    }
    if (percentage > 120) {
      return <Badge variant="destructive">Acima</Badge>;
    }
    return <Badge variant="outline">Abaixo</Badge>;
  };

  const macros = [
    {
      name: 'Calorias',
      icon: Flame,
      current: totals.calories,
      goal: goals.calories,
      unit: 'kcal',
      color: 'text-orange-500',
    },
    {
      name: 'Proteínas',
      icon: Beef,
      current: totals.protein,
      goal: goals.protein,
      unit: 'g',
      color: 'text-red-500',
    },
    {
      name: 'Carboidratos',
      icon: Wheat,
      current: totals.carbs,
      goal: goals.carbs,
      unit: 'g',
      color: 'text-amber-500',
    },
    {
      name: 'Gorduras',
      icon: Droplet,
      current: totals.fat,
      goal: goals.fat,
      unit: 'g',
      color: 'text-blue-500',
    },
  ];

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="p-8 pb-4 text-center sm:text-left">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 text-xl font-bold">
          <Flame className="h-6 w-6 text-primary shrink-0" />
          Resumo Nutricional do Dia
        </CardTitle>
        <CardDescription className="text-base font-medium">
          Total de nutrientes das 6 refeições do dia
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        {macros.map((macro) => {
          const Icon = macro.icon;
          const percentage = getPercentage(macro.current, macro.goal);

          return (
            <div key={macro.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-muted/50 ${macro.color.replace('text-', 'bg-').replace('500', '50/20')}`}>
                    <Icon className={`h-5 w-5 ${macro.color}`} />
                  </div>
                  <span className="text-lg font-bold">{macro.name}</span>
                </div>
                {getStatusBadge(macro.current, macro.goal)}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xl font-black tracking-tighter ${getStatusColor(macro.current, macro.goal)}`}>
                  {macro.current} <span className="text-sm font-medium text-muted-foreground uppercase">{macro.unit}</span>
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Meta: {macro.goal} {macro.unit}
                </span>
              </div>

              <Progress value={percentage} className="h-3 rounded-full bg-muted shadow-inner" />

              <div className="text-right">
                <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-bold text-muted-foreground">
                  {percentage}% da meta
                </span>
              </div>
            </div>
          );
        })}

        <div className="pt-6 border-t border-dashed">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            <strong>Nota:</strong> As metas são calculadas baseadas no seu peso ({userProfile.weight || 0}kg),
            IMC ({(userProfile.imc || 0).toFixed(1)}) e condições de saúde registradas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}