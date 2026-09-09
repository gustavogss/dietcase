import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Brain, TrendingUp, Zap } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { mockUsers } from "@/data/mocks";
import type { UserProfile, PlanType } from "@/types";
import { triggerConfetti } from "@/lib/confetti";
import { persistUserProfile, readStoredUserProfile } from "@/lib/security";

export default function IAAnalysis() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUsers[0]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      const savedProfile = readStoredUserProfile<UserProfile>();
      if (savedProfile) {
        setCurrentUser(savedProfile);
      }
    };

    handleProfileUpdate();
    window.addEventListener("dietcase-profile-updated", handleProfileUpdate);
    return () =>
      window.removeEventListener(
        "dietcase-profile-updated",
        handleProfileUpdate,
      );
  }, []);

  const handleUpgradePlan = (newPlan: PlanType) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, plan: newPlan };
      persistUserProfile(updated);
      window.dispatchEvent(new Event("dietcase-profile-updated"));
      triggerConfetti();
      return updated;
    });
  };

  return (
    <LockedPageOverlay
      requiredPlan="Transformação"
      userPlan={currentUser.plan}
      onUpgrade={handleUpgradePlan}
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight break-words">
            Análise de Progresso IA
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed break-words">
            Visão preditiva e profunda sobre seus resultados
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Tendências de Saúde
              </CardTitle>
              <CardDescription>
                Análise baseada em seu histórico de aderência e peso
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/30">
              <div className="text-center space-y-2">
                <Activity className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground font-medium">
                  Processando métricas avançadas...
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Previsão 30 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">-2.4kg</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Baseado na sua aderência atual de 85%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Nível Metabólico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500 font-mono">
                  OTIMIZADO
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sua queima calórica está 12% acima da média
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LockedPageOverlay>
  );
}
