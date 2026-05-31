import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Zap, RefreshCw } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import type { PlanType } from "@/types";

export default function AjustesAutomaticos() {
	const { profile: currentUser } = useUserAccess();

	const handleUpgradePlan = (newPlan: PlanType) => {
		console.log(`Upgrade para plano: ${newPlan}`);
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
					<h1 className="text-3xl font-bold tracking-tight">Ajustes Automáticos</h1>
					<p className="text-muted-foreground mt-2">
						Recomendações inteligentes baseadas no seu progresso
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Ajustes Recomendados</CardTitle>
						<CardDescription>
							<Zap className="h-4 w-4 mr-2" />
							Based on your recent progress
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="font-medium text-blue-900 mb-2">Aumentar Proteína</h4>
							<p className="text-sm text-blue-700 mb-3">
								Seu treino aumentou 20% esta semana. Recomendamos aumentar 15g de proteína diária.
							</p>
							<button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
								Aplicar Ajuste
							</button>
						</div>

						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="font-medium text-green-900 mb-2">Reduzir Sódio</h4>
							<p className="text-sm text-green-700 mb-3">
								Pressão ligeiramente elevada. Reduza alimentos ricos em sódio.
							</p>
							<button className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
								Aplicar Ajuste
							</button>
						</div>

						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="font-medium text-orange-900 mb-2">Adicionar Fibras</h4>
							<p className="text-sm text-orange-700 mb-3">
								Digestão lenta. Adicione vegetais e grãos integrais.
							</p>
							<button className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
								Aplicar Ajuste
							</button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Histórico de Ajustes</CardTitle>
						<CardDescription>
							<RefreshCw className="h-4 w-4 mr-2" />
							Modificações anteriores no seu plano
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								{ data: '2024-01-15', ajuste: 'Aumento de carboidratos', motivo: 'Treino intenso' },
								{ data: '2024-01-10', ajuste: 'Redução de sódio', motivo: 'Pressão elevada' },
								{ data: '2024-01-05', ajuste: 'Aumento de proteína', motivo: 'Ganho muscular' }
							].map((item, index) => (
								<div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
									<div>
										<div className="text-sm font-medium">{item.ajuste}</div>
										<div className="text-xs text-muted-foreground">{item.data}</div>
									</div>
									<div className="text-xs text-muted-foreground">{item.motivo}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</LockedPageOverlay>
	);
}
