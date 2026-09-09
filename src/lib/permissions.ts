import type { PlanType, FeatureType } from "@/types";

// Matriz de permissões por plano
export const PLAN_PERMISSIONS: Record<PlanType, FeatureType[]> = {
  TRIAL: [
    "dashboard",
    "health_status",
    "score_basico",
    "cardapio_fixo",
    "biblioteca",
    "favoritar",
  ],

  ESSENCIAL: [
    "dashboard",
    "health_status",
    "score_basico",
    "cardapio_fixo",
    "biblioteca",
    "cardapio_semanal",
    "receitas_personalizadas",
    "receitas_morbidade",
    "favoritar",
    "lista_compras",
    "download_pdf",
    "compartilhar",
    "relatorios",
  ],

  TRANSFORMACAO: [
    "dashboard",
    "health_status",
    "score_basico",
    "cardapio_fixo",
    "biblioteca",
    "cardapio_semanal",
    "receitas_personalizadas",
    "favoritar",
    "lista_compras",
    "download_pdf",
    "compartilhar",
    "relatorios",
    "recursos_avancados_ia",
    "orquestrador_comorbidades",
    "score_risco_alimentar",
    "ajustes_automaticos",
    "checkin_diario",
    "relatorios_avancados",
    "monitoramento_intensivo",
  ],
};

// Normaliza plano (ex.: "Transformação" / "Essencial" vindos do perfil) para chave do mapa
function normalizePlanKey(plan: PlanType): PlanType {
  const p = String(plan);
  if (p === "Transformação" || p === "TRANSFORMACAO") return "TRANSFORMACAO";
  if (p === "Essencial" || p === "ESSENCIAL") return "ESSENCIAL";
  if (p === "TRIAL") return "TRIAL";
  return "TRIAL";
}

// Função central de verificação de permissões
export function hasPermission(plan: PlanType, feature: FeatureType): boolean {
  const key = normalizePlanKey(plan);
  return PLAN_PERMISSIONS[key]?.includes(feature) || false;
}

// Helper functions para verificações específicas
export function canGenerateWeeklyMenu(plan: PlanType): boolean {
  return hasPermission(plan, "cardapio_semanal");
}

export function canAccessComorbidityOrchestrator(plan: PlanType): boolean {
  return hasPermission(plan, "orquestrador_comorbidades");
}

export function canGenerateCustomRecipes(plan: PlanType): boolean {
  return hasPermission(plan, "receitas_personalizadas");
}

export function canDownloadPDF(plan: PlanType): boolean {
  return hasPermission(plan, "download_pdf");
}

export function canShare(plan: PlanType): boolean {
  return hasPermission(plan, "compartilhar");
}

export function canGenerateReports(plan: PlanType): boolean {
  return hasPermission(plan, "relatorios");
}

export function canAccessAdvancedAI(plan: PlanType): boolean {
  return hasPermission(plan, "recursos_avancados_ia");
}

export function canAccessRiskScore(plan: PlanType): boolean {
  return hasPermission(plan, "score_risco_alimentar");
}

export function canAccessAutoAdjustments(plan: PlanType): boolean {
  return hasPermission(plan, "ajustes_automaticos");
}

export function canAccessDailyCheckin(plan: PlanType): boolean {
  return hasPermission(plan, "checkin_diario");
}

export function canAccessAdvancedReports(plan: PlanType): boolean {
  return hasPermission(plan, "relatorios_avancados");
}

export function canAccessIntensiveMonitoring(plan: PlanType): boolean {
  return hasPermission(plan, "monitoramento_intensivo");
}

// Verificação de trial expirado
export function isTrialExpired(trialExpiresAt?: string): boolean {
  if (!trialExpiresAt) return true;
  return new Date() > new Date(trialExpiresAt);
}

// Dias restantes do trial
export function getTrialDaysRemaining(trialExpiresAt?: string): number {
  if (!trialExpiresAt) return 0;
  const now = new Date();
  const expiry = new Date(trialExpiresAt);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// Status do plano para exibição
export function getPlanDisplayInfo(plan: PlanType, trialExpiresAt?: string) {
  const key = normalizePlanKey(plan);
  switch (key) {
    case "TRIAL": {
      const daysRemaining = getTrialDaysRemaining(trialExpiresAt);
      return {
        label: "Teste Gratuito",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        borderColor: "border-orange-200",
        showCountdown: true,
        daysRemaining,
      };
    }

    case "ESSENCIAL":
      return {
        label: "Plano Essencial",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        showCountdown: false,
      };

    case "TRANSFORMACAO":
      return {
        label: "Plano Transformação",
        color: "bg-purple-500",
        textColor: "text-purple-600",
        borderColor: "border-purple-200",
        showCountdown: false,
      };

    default:
      return {
        label: "Plano Desconhecido",
        color: "bg-gray-500",
        textColor: "text-gray-600",
        borderColor: "border-gray-200",
        showCountdown: false,
      };
  }
}
