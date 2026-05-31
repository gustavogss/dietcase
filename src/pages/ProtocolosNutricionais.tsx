import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Target, Zap } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import { triggerConfetti } from "@/lib/confetti";
import type { PlanType } from "@/types";

export default function ProtocolosNutricionais() {
	const { profile: currentUser } = useUserAccess();

	const handleUpgradePlan = (newPlan: PlanType) => {
		const updated = { ...currentUser, plan: newPlan };
		localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
		window.dispatchEvent(new Event("dietcase-profile-updated"));
		triggerConfetti();
	};

	return (
		<LockedPageOverlay
			requiredPlan="TRANSFORMACAO"
			requiredPlanLabel="Transformação"
			userPlan={currentUser.plan}
			onUpgrade={handleUpgradePlan}
		>
			<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold tracking-tight">Protocolos Nutricionais</h1>
					<p className="text-muted-foreground mt-2">
						Estruturas alimentares baseadas em evidências
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Protocolo Low FODMAP</CardTitle>
							<CardDescription>
								<Activity className="h-4 w-4 mr-2" />
								Para síndrome do intestino irritável
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Eliminação gradual de fermentáveis para reduzir sintomas gastrointestinais.
							</p>
							<button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
								Iniciar Protocolo
							</button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Dieta Cetogênica Cíclica</CardTitle>
							<CardDescription>
								<Target className="h-4 w-4 mr-2" />
								Para otimização metabólica
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Alternância entre períodos cetogênicos e de recarga para performance.
							</p>
							<button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
								Iniciar Protocolo
							</button>
						</CardContent>
					</Card>
				</div>
			</div>
		</LockedPageOverlay>
	);
}
