import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useUserAccess } from "@/hooks/useUserAccess";
import { mockProgress, mockGoals, morbidities } from "@/data/mocks";
import { Scale, Target, TrendingUp, AlertTriangle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { GoalsChart } from "@/components/GoalsChart";
import { AdherenceTracker } from "@/components/AdherenceTracker";
import { BadgesDisplay } from "@/components/BadgesDisplay";
import { FoodGuide } from "@/components/FoodGuide";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
	const {
		profile: currentUser,
		planDisplayInfo,
		isTrialExpired,
		trialDaysRemaining,
	} = useUserAccess();

	const { topRecommendations, total } = useRecommendations({
		profile: currentUser,
		progress: mockProgress,
		goals: mockGoals,
	});

	if (!currentUser || !currentUser.name) {
		return (
			<div className="flex h-[50vh] items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	const completedGoals = mockGoals.filter((g) => g.completed).length;
	const goalProgress = (completedGoals / mockGoals.length) * 100;

	const activeMorbidityNames = Array.isArray(currentUser?.morbidities)
		? currentUser.morbidities
				.map((id) => morbidities.find((m) => m.id === id)?.name)
				.filter(Boolean)
		: [];

	const formatPtList = (items: string[]) => {
		if (items.length === 1) return items[0];
		return `${items.slice(0, -1).join(", ")} e ${items.slice(-1)[0]}`;
	};

	const isPremium = currentUser?.plan === "TRANSFORMACAO";
	const isBasicPlan = currentUser?.plan === "ESSENCIAL";

	const guideTitle =
		activeMorbidityNames.length > 0
			? `Guia Alimentar para ${
					isPremium
						? formatPtList(activeMorbidityNames)
						: activeMorbidityNames[0]
				}`
			: null;

	const firstName = currentUser.name.split(" ")[0];

	return (
		<div className="w-full max-w-screen-xl mx-auto px-6 sm:px-8 py-8 space-y-10 sm:space-y-16 overflow-x-hidden">
			{/* Plano */}
			<div className="flex items-center justify-center sm:justify-between flex-wrap gap-4 reveal-brutalist">
				<div className="flex items-center gap-4 flex-wrap justify-center w-full sm:w-auto">
					{planDisplayInfo.showCountdown && (
						<Alert className="max-w-md mx-auto sm:mx-0 border-l-4 border-l-primary">
							<AlertTriangle className="h-4 w-4" />
							<AlertTitle className="text-sm sm:text-base font-bold">Teste Grátis Expirando</AlertTitle>
							<AlertDescription className="text-xs sm:text-sm">
								Seu teste expira em <strong>{trialDaysRemaining} dias</strong>.
								{isTrialExpired &&
									" Faça upgrade para continuar."}
							</AlertDescription>
						</Alert>
					)}
				</div>
			</div>

			{/* Boas-vindas - Asymmetric Tension */}
			<div className="space-y-4 text-center md:text-left md:pl-8 border-l-2 border-primary/20 reveal-brutalist stagger-1">
				<h1 className="text-fluid-4xl sm:text-fluid-5xl lg:text-[clamp(3.5rem,2rem+5vw,6rem)] text-foreground font-black leading-[0.9] tracking-tighter uppercase">
					<div className="mb-2">Olá, 👋</div>{firstName}!
				</h1>
				<p className="max-w-xl text-fluid-sm sm:text-fluid-base text-muted-foreground font-medium">
					Seu ecossistema de performance alimentar personalizada está pronto.
				</p>
			</div>

			{/* Guia Alimentar */}
			{guideTitle && (
				<section className="space-y-8 reveal-brutalist stagger-2">
					<div className="flex items-center justify-center">
						<h2 className="text-fluid-xl sm:text-fluid-3xl text-foreground leading-none font-bold uppercase tracking-tight text-center">
							{guideTitle}
						</h2>
					</div>
					<div className="translate-x-0 md:translate-x-4 transition-all duration-500">
						<FoodGuide morbidityIds={currentUser.morbidities} />
					</div>
				</section>
			)}

			{/* Alerta multi-condição */}
			{activeMorbidityNames.length > 1 && (
				<Alert className="border-amber-200 bg-amber-50 max-w-2xl mx-auto md:mx-0 reveal-brutalist stagger-3">
					<AlertTriangle className="h-4 w-4 text-amber-600" />
					<AlertTitle className="text-fluid-sm font-semibold">
						Múltiplas Condições Detectadas
					</AlertTitle>
					<AlertDescription className="text-fluid-xs text-amber-700">
						Seu perfil combina regras para{" "}
						<strong>{activeMorbidityNames.join(" + ")}</strong>.
					</AlertDescription>
				</Alert>
			)}

			{/* Métricas - Asymmetric Grid */}
			<div className="grid gap-6 grid-cols-1 md:grid-cols-12 items-start">
				<Card className="md:col-span-12 lg:col-span-7 border-none shadow-sm hover:shadow-2xl transition-all duration-500 reveal-brutalist stagger-3 bg-primary text-primary-foreground group overflow-hidden">
					<div className="absolute -right-4 -top-4 text-white/10 group-hover:scale-110 transition-transform duration-700">
						<Scale className="h-32 w-32" />
					</div>
					<CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
						<CardTitle className="text-[10px] sm:text-fluid-xs font-bold uppercase tracking-[0.2em] opacity-80">IMC Atual</CardTitle>
					</CardHeader>
					<CardContent className="text-center relative z-10">
						<div className="text-fluid-4xl sm:text-fluid-5xl font-black tracking-tighter mb-2">
							{currentUser.imc ? currentUser.imc.toFixed(1) : "--"}
						</div>
						<p className="text-fluid-xs sm:text-fluid-sm font-medium opacity-90">
							Bio-métricas: {currentUser.weight}kg | {currentUser.height}cm
						</p>
					</CardContent>
				</Card>

				<Card className="md:col-span-6 lg:col-span-5 border-none shadow-sm hover:shadow-xl transition-all duration-300 reveal-brutalist stagger-4 lg:translate-y-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-[10px] sm:text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">
							Metas de Performance
						</CardTitle>
						<Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-fluid-3xl sm:text-fluid-4xl font-black text-foreground tracking-tighter">{goalProgress.toFixed(0)}%</div>
						<p className="text-[10px] sm:text-fluid-xs text-muted-foreground font-medium mt-1">
							{completedGoals} de {mockGoals.length} objetivos batidos
						</p>
					</CardContent>
				</Card>

				<Card className="md:col-span-6 lg:col-span-4 lg:col-start-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 reveal-brutalist stagger-5 md:translate-y-4 lg:translate-y-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-[10px] sm:text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">
							Nutri-Ações
						</CardTitle>
						<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-fluid-3xl sm:text-fluid-4xl font-black text-foreground tracking-tighter">{total}</div>
						<p className="text-[10px] sm:text-fluid-xs text-muted-foreground font-medium mt-1">
							Sugestões inteligentes
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Gráfico */}
			<div className="w-full overflow-x-auto pb-4 reveal-brutalist stagger-5">
				<GoalsChart goals={mockGoals} />
			</div>

			{/* Gamificação */}
			<div className="space-y-6 sm:space-y-12 reveal-brutalist stagger-5">
				<AdherenceTracker />

				<div className="relative rounded-xl overflow-hidden border">
					{isBasicPlan && (
						<div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm text-center p-4">
							<div className="p-3 rounded-full bg-primary/10 mb-3">
								<Lock className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-fluid-base font-bold mb-1">Conquistas & Badges</h3>
							<p className="text-fluid-xs text-muted-foreground max-w-[250px]">
								Desbloqueie o sistema completo de gamificação com o plano
								Transformação.
							</p>
						</div>
					)}

					<div className={isBasicPlan ? "opacity-50 pointer-events-none" : ""}>
						<BadgesDisplay />
					</div>
				</div>
			</div>

			{/* Recomendações */}
			{topRecommendations.length > 0 && (
				<div className="space-y-8 reveal-brutalist stagger-5">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
						<h2 className="text-fluid-xl sm:text-fluid-3xl text-foreground font-black uppercase tracking-tight">
							Sugestões de Hábito
						</h2>
						<Button variant="outline" size="sm" className="font-bold w-full sm:w-auto uppercase tracking-widest border-2" asChild>
							<Link to="/recomendacoes">Ver Todas</Link>
						</Button>
					</div>

					<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{topRecommendations.map((rec, idx) => (
							<div key={rec.id} className={`reveal-brutalist stagger-${(idx % 5) + 1}`}>
								<RecommendationCard recommendation={rec} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
