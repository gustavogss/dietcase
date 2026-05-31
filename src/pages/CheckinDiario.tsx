import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle, TrendingUp } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import type { PlanType } from "@/types";
import { triggerConfetti } from "@/lib/confetti";

export default function CheckinDiario() {
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
					<h1 className="text-3xl font-bold tracking-tight">Check-in Diário</h1>
					<p className="text-muted-foreground mt-2">
						Registre seu progresso diário
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Check-in de Hoje</CardTitle>
						<CardDescription>
							<Calendar className="h-4 w-4 mr-2" />
							Como está sua alimentação hoje?
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<label className="text-sm font-medium">Seguiu o plano?</label>
								<div className="flex gap-2 mt-2">
									<button className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
										Sim
									</button>
									<button className="px-4 py-2 bg-red-100 text-red-800 rounded-md">
										Não
									</button>
								</div>
							</div>
							<div>
								<label className="text-sm font-medium">Como se sente?</label>
								<select className="w-full px-3 py-2 border rounded-md mt-2">
									<option>Ótimo</option>
									<option>Bom</option>
									<option>Regular</option>
									<option>Péssimo</option>
								</select>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium">Observações</label>
							<textarea
								className="w-full px-3 py-2 border rounded-md mt-2"
								rows={4}
								placeholder="Descreva como foi seu dia..."
							></textarea>
						</div>

						<div className="flex justify-end">
							<button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
								Salvar Check-in
							</button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Histórico de Check-ins</CardTitle>
						<CardDescription>
							<TrendingUp className="h-4 w-4 mr-2" />
							Seu progresso ao longo do tempo
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-center py-8 text-muted-foreground">
							<CheckCircle className="h-12 w-12 mx-auto mb-4" />
							<p>Nenhum check-in registrado ainda</p>
							<p>Comece a registrar seu progresso diário!</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</LockedPageOverlay>
	);
}
