import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Share2 } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import { triggerConfetti } from "@/lib/confetti";
import type { PlanType } from "@/types";

export default function GuiasCientificos() {
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
					<h1 className="text-3xl font-bold tracking-tight">Guias Alimentares Científicos</h1>
					<p className="text-muted-foreground mt-2">
						Baseado em evidências científicas para sua saúde
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Guia de Antioxidantes</CardTitle>
							<CardDescription>
								Compostos e fontes naturais
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Guia completo sobre alimentos ricos em antioxidantes e seus benefícios para prevenção de doenças crônicas.
							</p>
							<div className="flex gap-2">
								<Button size="sm" className="inline-flex items-center justify-center gap-2">
									<BookOpen className="h-4 w-4 shrink-0" />
									Ler Guia
								</Button>
								<Button size="sm" variant="outline" className="inline-flex items-center justify-center gap-2">
									<Download className="h-4 w-4 shrink-0" />
									Baixar PDF
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Protocolo Anti-inflamatório</CardTitle>
							<CardDescription>
								Alimentos que reduzem inflamação
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Estrutura alimentar para reduzir marcadores inflamatórios e melhorar a saúde geral.
							</p>
							<div className="flex gap-2">
								<Button size="sm" className="inline-flex items-center justify-center gap-2">
									<BookOpen className="h-4 w-4 shrink-0" />
									Ler Guia
								</Button>
								<Button size="sm" variant="outline" className="inline-flex items-center justify-center gap-2">
									<Download className="h-4 w-4 shrink-0" />
									Baixar PDF
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</LockedPageOverlay>
	);
}
