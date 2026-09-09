import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackToHomeHint } from "@/components/BackToHomeHint";
import { plans } from "@/data/mocks";
import { Check, Crown, Zap } from "lucide-react";
import type { PlanType } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useUserAccess } from "@/hooks/useUserAccess";
import { triggerConfetti } from "@/lib/confetti";
import { persistUserProfile } from "@/lib/security";

export default function Plans() {
  const navigate = useNavigate();
  const { profile: currentUser, accessLevel } = useUserAccess();
  const isVisitor = accessLevel === "VISITOR";

  const getPlanIcon = (planType: PlanType) => {
    switch (planType) {
      case "Essencial":
        return <Zap className="h-6 w-6" />;
      case "Transformação":
        return <Crown className="h-6 w-6" />;
    }
  };

  const getPlanColor = (planType: PlanType) => {
    switch (planType) {
      case "Essencial":
        return "border-muted";
      case "Transformação":
        return "border-primary";
    }
  };

  const handleUpgrade = (newPlan: PlanType) => {
    if (isVisitor) {
      navigate("/auth");
      return;
    }

    const updatedUser = { ...currentUser, plan: newPlan };
    persistUserProfile(updatedUser);
    window.dispatchEvent(new Event("dietcase-profile-updated"));

    triggerConfetti();

    toast({
      title: "Plano atualizado! 🎉",
      description: `Você agora está no plano ${newPlan}. Aproveite os novos recursos!`,
    });

    setTimeout(() => {
      navigate("/perfil");
    }, 1500);
  };

  const isCurrentPlan = (planType: PlanType) => currentUser.plan === planType;

  const canUpgrade = (planType: PlanType) => {
    const planOrder: PlanType[] = ["Essencial", "Transformação"];
    const currentIndex = planOrder.indexOf(currentUser.plan);
    const targetIndex = planOrder.indexOf(planType);
    return targetIndex > currentIndex;
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {isVisitor ? "Planos" : "Escolha seu Plano"}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          {isVisitor
            ? "Você está navegando como visitante. Entre para ativar um plano."
            : "Personalize sua experiência com dietas sob medida"}
        </p>
        {currentUser.plan && (
          <Badge variant="outline" className="text-sm">
            Plano Atual: {currentUser.plan}
          </Badge>
        )}
      </div>
      <BackToHomeHint />

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 max-w-4xl mx-auto mb-20 justify-items-center">
        {plans.map((plan) => {
          const Icon = getPlanIcon(plan.type);
          const isCurrent = isCurrentPlan(plan.type);
          const canUpgradeToPlan = canUpgrade(plan.type);

          return (
            <Card
              key={plan.type}
              className={`relative w-full max-w-md ${getPlanColor(plan.type)} ${
                plan.type === "Transformação"
                  ? "border-2 shadow-lg md:scale-105"
                  : ""
              }`}
            >
              {plan.type === "Transformação" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">Mais Vantajoso</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  {Icon}
                </div>
                <CardTitle className="text-2xl">{plan.type}</CardTitle>
                {plan.description && (
                  <CardDescription className="mt-2 text-sm text-balance">
                    {plan.description}
                  </CardDescription>
                )}
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Grátis" : `R$ ${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/mês</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm break-words">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button className="w-full" disabled>
                    Plano Atual
                  </Button>
                ) : canUpgradeToPlan ? (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(plan.type)}
                    variant={
                      plan.type === "Transformação" ? "default" : "outline"
                    }
                  >
                    {plan.price === 0 ? "Selecionar" : "Fazer Upgrade"}
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    Plano Inferior
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seção de Comparação Detalhada */}
      <Card className="max-w-6xl mx-auto mt-12 sm:mt-20 mb-16 p-6 sm:p-10">
        <CardHeader>
          <CardTitle>Comparação Detalhada de Recursos</CardTitle>
          <CardDescription>
            Veja todos os benefícios de cada plano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-0 text-sm table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Recurso</th>
                  <th className="text-center py-4 px-4">Essencial</th>
                  <th className="text-center py-4 px-4">Transformação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4">Cardápio Semanal</td>
                  <td className="text-center py-4 px-4 text-sm text-muted-foreground">
                    Fixo para 1 morbidade
                  </td>
                  <td className="text-center py-4 px-4 text-sm font-medium">
                    Semanal para comorbidades
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Cardápios Favoritos</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Lista de Compras</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Recomendações Básicas</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Agentes Especialistas IA</td>
                  <td className="text-center py-4 px-4 text-sm font-medium">
                    1 Agente
                  </td>
                  <td className="text-center py-4 px-4 text-sm font-medium">
                    Múltiplos Agentes
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Score de Evolução</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">
                    Download e Compartilhamento de PDFs
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Orquestrador de conflitos</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Assistente Nutricional</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Análise de Progresso IA</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Check-in Diário</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Ajustes Automáticos</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Relatórios de Evolução</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Modo Restaurante</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Acesso a Bibliotecas</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">
                    -
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mt-20 mb-12 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Perguntas Frequentes
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Posso trocar de plano a qualquer momento?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sim! Você pode fazer upgrade a qualquer momento, não o downgrade.
              As alterações entram em vigor imediatamente.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              O que acontece com meus dados ao mudar de plano?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Todos os seus dados, incluindo histórico, preferências e
              progresso, são mantidos ao trocar de plano. Você terá acesso aos
              novos recursos imediatamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
