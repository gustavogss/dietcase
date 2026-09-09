// Types for DietCase SaaS

export type PlanType =
  | "TRIAL"
  | "ESSENCIAL"
  | "TRANSFORMACAO"
  | "Essencial"
  | "Transformação"
  | "Premium";

export type FeatureType =
  | "dashboard"
  | "health_status"
  | "score_basico"
  | "cardapio_fixo"
  | "biblioteca"
  | "cardapio_semanal"
  | "receitas_personalizadas"
  | "receitas_morbidade"
  | "favoritar"
  | "lista_compras"
  | "download_pdf"
  | "compartilhar"
  | "relatorios"
  | "recursos_avancados_ia"
  | "orquestrador_comorbidades"
  | "score_risco_alimentar"
  | "ajustes_automaticos"
  | "checkin_diario"
  | "relatorios_avancados"
  | "monitoramento_intensivo";

export type RecommendationType =
  | "Alimentação"
  | "Hábitos"
  | "Progresso"
  | "Plano"
  | "Conteúdo";

export type Priority = "Alta" | "Média" | "Baixa";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  imc: number;
  plan: PlanType;
  morbidities: string[]; // IDs das morbidades
  createdAt: string;
  exercises: boolean;
  exerciseType?: string;
  exerciseFrequency?: number; // vezes por semana
  foodGoal?: string;
  dietaryPreferences?: string[];
  restrictions?: UserRestriction[];
  dislikedFoods?: string[];
  favoriteFoods?: string[];
  activityLevel?: "sedentario" | "leve" | "moderado" | "intenso";
  mealsPerDay?: number;
  mealSchedule?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string[];
  };
  trialStartDate?: string;
  trialExpiresAt?: string;
}

export interface Morbidity {
  id: string;
  name: string;
  description: string;
  recommendations: string[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
  createdAt: string;
}

export interface Meal {
  name: string;
  ingredients: string[];
  calories: number;
  macros: {
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
  preparation?: string;
  portions?: string[]; // Porções detalhadas com números e gramas
}

export interface DayMenu {
  breakfast: Meal;
  morningSnack: Meal;
  lunch: Meal;
  afternoonSnack: Meal;
  dinner: Meal;
  supper: Meal;
}

export interface WeeklyMenu {
  id: string;
  name: string;
  type: string; // Low Carb, Vegano, etc
  monday: DayMenu;
  tuesday: DayMenu;
  wednesday: DayMenu;
  thursday: DayMenu;
  friday: DayMenu;
  saturday: DayMenu;
  sunday: DayMenu;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: Priority;
  icon: string; // Lucide icon name
  actionLabel?: string;
  actionUrl?: string;
  restrictedFoods?: string[];
  allowedFoods?: string[];
}

export interface Plan {
  type: PlanType;
  description?: string;
  features: FeatureType[];
  price: number;
  pdfAvailable: boolean;
  extraPdfs: boolean;
  autoDietGeneration: boolean;
}

export interface WeightProgress {
  date: string;
  weight: number;
}

export interface UserProgress {
  userId: string;
  weightHistory: WeightProgress[];
  lastWeightChange: number; // dias
  goalsCompleted: number;
  goalsTotal: number;
}

export type MealType =
  | "breakfast"
  | "morningSnack"
  | "lunch"
  | "afternoonSnack"
  | "dinner"
  | "supper";

export interface FavoriteMeal {
  id: string;
  meal: Meal;
  mealType: MealType;
  menuId: string;
  menuName: string;
  addedAt: string;
}

export interface CustomDayMenu {
  breakfast?: FavoriteMeal;
  morningSnack?: FavoriteMeal;
  lunch?: FavoriteMeal;
  afternoonSnack?: FavoriteMeal;
  dinner?: FavoriteMeal;
  supper?: FavoriteMeal;
}

export interface IngredientSubstitution {
  original: string;
  substitutes: {
    name: string;
    reason: string;
    caloriesDiff: number; // Diferença em relação ao original
    proteinDiff: number;
    carbsDiff: number;
    fatDiff: number;
  }[];
}

export interface UserRestriction {
  ingredient: string;
  type: "alergia" | "nao-gosto" | "restricao";
  addedAt: string;
}

export interface DietAdherence {
  date: string; // YYYY-MM-DD
  followed: boolean;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  requirement: number; // Dias consecutivos ou total
  type: "consecutive" | "total" | "milestone";
  earned: boolean;
  earnedAt?: string;
}

export interface AdherenceStats {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  totalFollowed: number;
  adherenceRate: number; // Percentual
  badges: Badge[];
}

export interface PantryItem {
  id: string;
  userId?: string;
  name: string;
  category:
    | "frutas"
    | "vegetais"
    | "proteinas"
    | "laticinios"
    | "graos"
    | "temperos"
    | "outros";
  quantity: number;
  unit: string;
  expiryDate: string;
  minStock?: number;
  storage?: "geladeira" | "freezer" | "armario";
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  ingredients: string[];
  ingredientAmounts?: string[];
  mealType: "cafe-da-manha" | "lanche" | "almoco" | "jantar" | "sobremesa";
  tags: string[];
  prepTime: number;
  difficulty: "facil" | "medio" | "avancado";
  servings: number;
  yieldDescription?: string;
  instructions: string[];
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface RecipeFavorite {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: string;
  kind?: "recipe";
}

export interface PantrySummary {
  totalItems: number;
  expiringSoon: PantryItem[];
  expiredItems: PantryItem[];
  lowStockItems: PantryItem[];
  nearExpiryCount: number;
  expiredCount: number;
  lowStockCount: number;
}

export interface RecipeRecommendation {
  recipe: Recipe;
  matchScore: number;
  availableIngredients: string[];
  missingIngredients: string[];
}

// Firebase User Document
export interface FirebaseUser {
  name: string;
  email: string;
  plan: PlanType;
  trialStartDate?: string;
  trialExpiresAt?: string;
  createdAt: string;
}

// Re-exportação de Schemas Zod, Normalizadores e Contratos de Agentes
export * from "./schemas";
