import { z } from "zod";

// ==========================================
// 1. ENUMS E TIPOS NORMALIZADOS DE PLANO
// ==========================================

export const STANDARD_PLANS = ["TRIAL", "ESSENCIAL", "TRANSFORMACAO"] as const;
export type StandardPlanType = (typeof STANDARD_PLANS)[number];

export const LEGACY_PLANS = ["Essencial", "Transformação", "Premium"] as const;

export const planTypeSchema = z.enum([
  "TRIAL",
  "ESSENCIAL",
  "TRANSFORMACAO",
  "Essencial",
  "Transformação",
  "Premium",
]);

/**
 * Mapeia qualquer variação de string de plano para um StandardPlanType ("TRIAL" | "ESSENCIAL" | "TRANSFORMACAO")
 */
export function normalizePlanType(plan?: string | null): StandardPlanType {
  if (!plan) return "TRIAL";
  const normalized = plan.trim().toUpperCase();
  if (normalized === "ESSENCIAL") return "ESSENCIAL";
  if (
    normalized === "TRANSFORMACAO" ||
    normalized === "TRANSFORMAÇÃO" ||
    normalized === "PREMIUM"
  ) {
    return "TRANSFORMACAO";
  }
  return "TRIAL";
}

// ==========================================
// 2. SCHEMAS DE VALIDAÇÃO DO DOMÍNIO
// ==========================================

export const userRestrictionSchema = z.object({
  ingredient: z.string().min(1),
  type: z.enum(["alergia", "nao-gosto", "restricao"]),
  addedAt: z.string(),
});

export const userProfileSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  avatarUrl: z.string().optional(),
  age: z.number().int().positive("Idade deve ser um número positivo"),
  weight: z.number().positive("Peso deve ser maior que 0"),
  height: z.number().positive("Altura deve ser maior que 0"),
  imc: z.number().positive("IMC deve ser um número positivo"),
  plan: planTypeSchema,
  morbidities: z.array(z.string()),
  createdAt: z.string(),
  exercises: z.boolean(),
  exerciseType: z.string().optional(),
  exerciseFrequency: z.number().optional(),
  foodGoal: z.string().optional(),
  dietaryPreferences: z.array(z.string()).optional(),
  restrictions: z.array(userRestrictionSchema).optional(),
  dislikedFoods: z.array(z.string()).optional(),
  favoriteFoods: z.array(z.string()).optional(),
  activityLevel: z
    .enum(["sedentario", "leve", "moderado", "intenso"])
    .optional(),
  mealsPerDay: z.number().int().min(1).max(8).optional(),
  mealSchedule: z
    .object({
      breakfast: z.string().optional(),
      lunch: z.string().optional(),
      dinner: z.string().optional(),
      snacks: z.array(z.string()).optional(),
    })
    .optional(),
  trialStartDate: z.string().optional(),
  trialExpiresAt: z.string().optional(),
});

export const morbiditySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  recommendations: z.array(z.string()),
  restrictedFoods: z.array(z.string()).optional(),
  allowedFoods: z.array(z.string()).optional(),
  priorityWeight: z.number().optional(),
});

export const macrosSchema = z.object({
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
});

export const mealSchema = z.object({
  name: z.string().min(1),
  ingredients: z.array(z.string()),
  calories: z.number().min(0),
  macros: macrosSchema,
  preparation: z.string().optional(),
  portions: z.array(z.string()).optional(),
});

export const dayMenuSchema = z.object({
  breakfast: mealSchema,
  morningSnack: mealSchema,
  lunch: mealSchema,
  afternoonSnack: mealSchema,
  dinner: mealSchema,
  supper: mealSchema,
});

export const weeklyMenuSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string(),
  monday: dayMenuSchema,
  tuesday: dayMenuSchema,
  wednesday: dayMenuSchema,
  thursday: dayMenuSchema,
  friday: dayMenuSchema,
  saturday: dayMenuSchema,
  sunday: dayMenuSchema,
});

// ==========================================
// 3. CONTRATOS DOS AGENTES E ORQUESTRADOR
// ==========================================

export const appliedSubstitutionSchema = z.object({
  originalFood: z.string(),
  substitutedFood: z.string(),
  reason: z.string(),
  morbidities: z.array(z.string()),
});
export type AppliedSubstitution = z.infer<typeof appliedSubstitutionSchema>;

// Contrato: NutriBaseAgent
export const nutriBaseAgentRequestSchema = z.object({
  profile: userProfileSchema,
});
export type NutriBaseAgentRequest = z.infer<typeof nutriBaseAgentRequestSchema>;

export const nutriBaseAgentResponseSchema = z.object({
  baseMenu: weeklyMenuSchema,
  source: z.enum(["ai", "fallback"]),
});
export type NutriBaseAgentResponse = z.infer<
  typeof nutriBaseAgentResponseSchema
>;

// Contrato: ComorbidityAgent
export const comorbidityAgentRequestSchema = z.object({
  baseMenu: weeklyMenuSchema,
  morbidities: z.array(z.string()),
  customRestrictions: z.array(userRestrictionSchema).optional(),
});
export type ComorbidityAgentRequest = z.infer<
  typeof comorbidityAgentRequestSchema
>;

export const comorbidityAgentResponseSchema = z.object({
  safeMenu: weeklyMenuSchema,
  auditLog: z.array(appliedSubstitutionSchema),
  warnings: z.array(z.string()),
  isSafe: z.boolean(),
  source: z.enum(["ai", "fallback"]),
});
export type ComorbidityAgentResponse = z.infer<
  typeof comorbidityAgentResponseSchema
>;

// Contrato: CaloricBalancerAgent
export const caloricBalancerAgentRequestSchema = z.object({
  menu: weeklyMenuSchema,
  targetCalories: z.number().positive(),
  targetMacros: macrosSchema.optional(),
});
export type CaloricBalancerAgentRequest = z.infer<
  typeof caloricBalancerAgentRequestSchema
>;

export const caloricBalancerAgentResponseSchema = z.object({
  balancedMenu: weeklyMenuSchema,
  totalDailyCalories: z.number(),
  source: z.enum(["ai", "fallback"]),
});
export type CaloricBalancerAgentResponse = z.infer<
  typeof caloricBalancerAgentResponseSchema
>;

// Contrato: VirtualNutriChatAgent
export const virtualNutriChatAgentRequestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1, "Mensagem não pode ser vazia"),
  userContext: z.object({
    name: z.string(),
    morbidities: z.array(z.string()),
    plan: planTypeSchema,
  }),
});
export type VirtualNutriChatAgentRequest = z.infer<
  typeof virtualNutriChatAgentRequestSchema
>;

export const virtualNutriChatAgentResponseSchema = z.object({
  responseText: z.string(),
  disclaimer: z.string(),
  source: z.enum(["ai", "fallback"]),
});
export type VirtualNutriChatAgentResponse = z.infer<
  typeof virtualNutriChatAgentResponseSchema
>;

// Contrato: Orquestrador de Comorbidades
export const orchestrationRequestSchema = z.object({
  userId: z.string(),
  profile: userProfileSchema,
  morbidities: z.array(z.string()),
  customRestrictions: z.array(userRestrictionSchema).optional(),
});
export type OrchestrationRequest = z.infer<typeof orchestrationRequestSchema>;

export const orchestrationResponseSchema = z.object({
  menu: weeklyMenuSchema,
  auditLog: z.array(appliedSubstitutionSchema),
  warnings: z.array(z.string()),
  isFallback: z.boolean(),
  generatedAt: z.string(),
});
export type OrchestrationResponse = z.infer<typeof orchestrationResponseSchema>;
