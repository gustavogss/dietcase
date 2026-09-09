import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import {
  weeklyMenus,
  predefinedRecommendations,
  morbidities,
} from "@/data/mocks";
import { Flame, Drumstick } from "lucide-react";
import type { DayMenu, WeeklyMenu, Meal, PlanType } from "@/types";
import { Coffee, Apple, RefreshCw, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { NutritionalSummary } from "@/components/NutritionalSummary";
import { IngredientSubstitutionSuggestion } from "@/components/IngredientSubstitutionSuggestion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { triggerConfetti } from "@/lib/confetti";
import { persistUserProfile } from "@/lib/security";
import {
  generateAdaptiveMenu,
  getBaseMenuForUser,
  generateMenuVariation,
} from "@/services/menu.service";
import { comorbidityOrchestrator } from "@/services/orchestrator.service";
import { nutritionalPlanService } from "@/services/nutritionalPlanService";
import type { OrchestrationResponse } from "@/types";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useNavigate } from "react-router-dom";
import { ManagePlanModal } from "@/components/ManagePlanModal";
import { Crown } from "lucide-react";

const daysOfWeek = [
  { key: "monday", label: "Segunda" },
  { key: "tuesday", label: "Terça" },
  { key: "wednesday", label: "Quarta" },
  { key: "thursday", label: "Quinta" },
  { key: "friday", label: "Sexta" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
] as const;

function MealCard({
  meal,
  mealType,
  mealTypeKey,
  icon,
  menuId,
  menuName,
}: {
  meal: DayMenu["breakfast"];
  mealType: string;
  mealTypeKey:
    | "breakfast"
    | "morningSnack"
    | "lunch"
    | "afternoonSnack"
    | "dinner"
    | "supper";
  icon?: React.ReactNode;
  menuId: string;
  menuName: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {icon || <Drumstick className="h-5 w-5 text-primary" />}
            {mealType}
          </div>
          <FavoriteButton
            meal={meal}
            mealType={mealTypeKey}
            menuId={menuId}
            menuName={menuName}
          />
        </CardTitle>
        <CardDescription>{meal.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {meal.portions && meal.portions.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Porções:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {meal.portions.map((portion, i) => (
                <li key={i}>• {portion}</li>
              ))}
            </ul>
          </div>
        )}
        <IngredientSubstitutionSuggestion meal={meal} />
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {meal.calories} kcal
          </Badge>
        </div>
        {meal.preparation && (
          <div>
            <p className="text-sm font-medium mb-1">Preparo:</p>
            <p className="text-sm text-muted-foreground">{meal.preparation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Menu() {
  const navigate = useNavigate();
  const { profile: currentUser, accessLevel } = useUserAccess();

  const [selectedDay, setSelectedDay] = useState("monday");
  const [menuVariant, setMenuVariant] = useState(0);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const isVisitor = accessLevel === "VISITOR";
  const isPremiumUser = ["TRANSFORMACAO", "Transformação"].includes(
    currentUser.plan,
  );
  const isEssencialUser = ["ESSENCIAL", "Essencial"].includes(currentUser.plan);

  const handleUpgradePlan = (newPlan: PlanType) => {
    if (isVisitor) {
      navigate("/auth");
      return;
    }

    const updated = { ...currentUser, plan: newPlan };
    persistUserProfile(updated);
    window.dispatchEvent(new Event("dietcase-profile-updated"));
    triggerConfetti();
  };

  // 1. Memoize base menu selection to prevent recalculation on every render
  const rawBaseMenu = useMemo(() => {
    return getBaseMenuForUser(currentUser.morbidities || []);
  }, [currentUser.morbidities]);

  // 2. Memoize active morbidities
  const activeMorbidities = useMemo(() => {
    const rawMorbidities = Array.isArray(currentUser.morbidities)
      ? currentUser.morbidities
      : [];
    return isPremiumUser ? rawMorbidities : rawMorbidities.slice(0, 1);
  }, [currentUser.morbidities, isPremiumUser]);

  const [orchestrationResult, setOrchestrationResult] =
    useState<OrchestrationResponse | null>(null);
  const [isOrchestrating, setIsOrchestrating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const runOrchestration = async () => {
      setIsOrchestrating(true);
      try {
        const result = await comorbidityOrchestrator.orchestrate({
          userId: currentUser.id || "guest",
          profile: currentUser,
          morbidities: activeMorbidities,
        });
        if (isMounted) {
          setOrchestrationResult(result);
        }
        if (!isVisitor && currentUser.id) {
          void nutritionalPlanService.savePlan(result);
        }
      } catch (error) {
        console.error("Orchestration error:", error);
      } finally {
        if (isMounted) {
          setIsOrchestrating(false);
        }
      }
    };
    void runOrchestration();
    return () => {
      isMounted = false;
    };
  }, [currentUser, activeMorbidities, isVisitor]);

  // 3. Memoize adaptive menu generation
  const adaptedMenu = useMemo(() => {
    if (orchestrationResult?.menu) return orchestrationResult.menu;
    return rawBaseMenu
      ? generateAdaptiveMenu(rawBaseMenu, activeMorbidities)
      : null;
  }, [orchestrationResult, rawBaseMenu, activeMorbidities]);

  // 4. Memoize final current menu (rotation)
  const currentMenu = useMemo(() => {
    return adaptedMenu ? generateMenuVariation(adaptedMenu, menuVariant) : null;
  }, [adaptedMenu, menuVariant]);

  // Persist the current weekly menu so other pages (ex: Lista de Compras) can sync from it
  useEffect(() => {
    if (currentMenu) {
      try {
        localStorage.setItem(
          "dietcase-current-weekly-menu",
          JSON.stringify(currentMenu),
        );
      } catch {
        // ignore storage errors
      }
    }
  }, [currentMenu]);

  const dayMenu = useMemo(() => {
    return currentMenu
      ? (currentMenu[selectedDay as keyof typeof currentMenu] as DayMenu)
      : null;
  }, [currentMenu, selectedDay]);

  // Verificar quais morbidades o usuário tem (respeitando o limite do plano para exibição de alertas)
  const userMorbiditiesNames = useMemo(() => {
    return Array.isArray(activeMorbidities)
      ? activeMorbidities
          .map((id) => morbidities.find((m) => m.id === id)?.name)
          .filter(Boolean)
      : [];
  }, [activeMorbidities]);

  if (!currentMenu || !dayMenu) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">
          Carregando seu cardápio personalizado...
        </p>
      </div>
    );
  }

  const canShareOrDownload = isPremiumUser || isEssencialUser;
  const isDemoOrVisitor = isVisitor;

  // Função para gerar novo cardápio (rotacionar variações)
  const handleGenerateNewMenu = () => {
    setMenuVariant((prev) => prev + 1);
    toast({
      title: "Novo cardápio gerado! 🎉",
      description: "Seu cardápio foi atualizado com novas opções de refeições.",
    });
  };

  const handleBlockedAction = () => {
    if (isVisitor) {
      toast({
        title: "Acesso Restrito",
        description: "Entre na sua conta para liberar mais recursos.",
        variant: "destructive",
      });
      return;
    }
    setIsPlanModalOpen(true);
  };

  // Funções de compartilhamento
  const handleShareWhatsApp = () => {
    if (isDemoOrVisitor) return;
    const message = `🥗 Confira meu cardápio semanal personalizado DietCase!\n\n*${currentMenu.name}*\n\n👉 Aproveite para criar o seu também: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    toast({
      title: "Compartilhando no WhatsApp",
      description: "Abrindo WhatsApp para compartilhar seu cardápio.",
    });
  };

  const handleShareFacebook = () => {
    if (isDemoOrVisitor) return;
    const text = `🥗 Confira meu cardápio semanal personalizado DietCase! ${currentMenu.name}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "width=600,height=400");
    toast({
      title: "Compartilhando no Facebook",
      description: "Abrindo Facebook para compartilhar seu cardápio.",
    });
  };

  const handleShareTelegram = () => {
    if (isDemoOrVisitor) return;
    const message = `🥗 Confira meu cardápio semanal personalizado DietCase! ${currentMenu.name}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    toast({
      title: "Compartilhando no Telegram",
      description: "Abrindo Telegram para compartilhar seu cardápio.",
    });
  };

  const handleCopyLink = () => {
    if (isDemoOrVisitor) return;
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description:
        "O link do seu cardápio foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {userMorbiditiesNames.length > 0 && (
        <Alert className="bg-green-50 border-green-200">
          <Info className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Cardápio adaptado :{" "}
            <strong>{userMorbiditiesNames.join(" + ")}</strong>
          </AlertDescription>
        </Alert>
      )}

      {orchestrationResult?.warnings &&
        orchestrationResult.warnings.length > 0 && (
          <Alert className="bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-xs sm:text-sm">
              <strong>Alertas de Segurança Alimentar:</strong>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                {orchestrationResult.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Cardápio Semanal
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {(isPremiumUser || isEssencialUser) && (
            <Button
              variant="outline"
              onClick={handleGenerateNewMenu}
              className="inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar Novo Cardápio
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center gap-2"
                onClick={() => {
                  if (!canShareOrDownload) handleBlockedAction();
                }}
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
                {!canShareOrDownload && (
                  <Crown className="h-3 w-3 text-amber-500 shrink-0" />
                )}
              </Button>
            </DropdownMenuTrigger>
            {canShareOrDownload && (
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleShareWhatsApp}
                  className="gap-2 cursor-pointer"
                >
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleShareFacebook}
                  className="gap-2 cursor-pointer"
                >
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleShareTelegram}
                  className="gap-2 cursor-pointer"
                >
                  Telegram
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleCopyLink}
                  className="gap-2 cursor-pointer"
                >
                  Copiar Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {!canShareOrDownload ? (
            <Button
              variant="default"
              className="inline-flex items-center justify-center gap-2"
              onClick={handleBlockedAction}
            >
              <Crown className="h-4 w-4" />
              Download PDF
            </Button>
          ) : (
            <DownloadPdfButton
              profile={currentUser}
              menu={currentMenu}
              recommendations={predefinedRecommendations}
              onUpgrade={handleUpgradePlan}
            />
          )}
        </div>
      </div>

      <ManagePlanModal
        open={isPlanModalOpen}
        onOpenChange={setIsPlanModalOpen}
        currentPlan={currentUser.plan}
        onUpgrade={handleUpgradePlan}
      />

      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {daysOfWeek.map((day) => (
            <TabsTrigger key={day.key} value={day.key}>
              {day.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedDay} className="mt-6 space-y-4">
          <MealCard
            meal={dayMenu.breakfast}
            mealType="Café da Manhã"
            mealTypeKey="breakfast"
            icon={<Coffee className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />
          <MealCard
            meal={dayMenu.morningSnack}
            mealType="Lanche da Manhã"
            mealTypeKey="morningSnack"
            icon={<Apple className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />
          <MealCard
            meal={dayMenu.lunch}
            mealType="Almoço"
            mealTypeKey="lunch"
            icon={<Drumstick className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />
          <MealCard
            meal={dayMenu.afternoonSnack}
            mealType="Lanche da Tarde"
            mealTypeKey="afternoonSnack"
            icon={<Apple className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />
          <MealCard
            meal={dayMenu.dinner}
            mealType="Jantar"
            mealTypeKey="dinner"
            icon={<Drumstick className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />
          <MealCard
            meal={dayMenu.supper}
            mealType="Ceia"
            mealTypeKey="supper"
            icon={<Coffee className="h-5 w-5 text-primary" />}
            menuId={currentMenu.id}
            menuName={currentMenu.name}
          />

          <NutritionalSummary dayMenu={dayMenu} userProfile={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
