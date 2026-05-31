/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { Lock, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ManagePlanModal } from "@/components/ManagePlanModal";
import type { PlanType } from "@/types";

interface LockedPageOverlayProps {
	children: React.ReactNode;
	// Plan required for access (keeps permission logic)
	requiredPlan?: PlanType;
	// Optional label to display in the modal (visual only)
	requiredPlanLabel?: string;
	userPlan: PlanType;
	onUpgrade: (newPlan: PlanType) => void;
}

export function LockedPageOverlay({
	children,
	requiredPlan = "Transformação",
	requiredPlanLabel,
	userPlan,
	onUpgrade,
}: LockedPageOverlayProps) {
	const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

	// Plano Transformação pode vir como "TRANSFORMACAO" (tipo) ou "Transformação" (exibição)
	const hasRequiredPlan =
		requiredPlan === "TRANSFORMACAO" || requiredPlan === "Transformação"
			? userPlan === "TRANSFORMACAO" || userPlan === "Transformação"
			: userPlan === requiredPlan;
	const isLocked = !hasRequiredPlan;

	if (!isLocked) {
		return <>{children}</>;
	}

	const Icon = Sparkles;
	const displayPlan = requiredPlanLabel ?? requiredPlan;

	return (
		<div className="relative min-h-[400px] w-full">
			{/* Conteúdo Opaco */}
			<div className="opacity-10 pointer-events-none select-none blur-[2px]">
				{children}
			</div>

			{/* Camada de Bloqueio */}
			<div className="fixed inset-0 z-[5] flex flex-col items-center justify-center bg-background/20 backdrop-blur-[2px]">
				<div className="p-8 rounded-3xl bg-card border shadow-2xl flex flex-col items-center text-center max-w-md mx-4 animate-in fade-in zoom-in duration-300">
					<div className="p-4 rounded-full bg-primary/10 mb-6">
						<Lock className="h-12 w-12 text-primary animate-pulse" />
					</div>

					<h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
						<Icon className="h-7 w-7 text-primary" />
						Recurso Premium
					</h2>

					<p className="text-muted-foreground mb-8 text-lg">
						Esta funcionalidade está habilitada exclusivamente para assinantes
						do plano <strong>{displayPlan}</strong>.
					</p>

					<Button
						size="lg"
						className="w-full text-lg h-14 inline-flex items-center justify-center gap-2"
						onClick={() => setIsPlanModalOpen(true)}
					>
						<Icon className="h-5 w-5" />
						Assinar Plano {displayPlan}
					</Button>

					<p className="mt-4 text-xs text-muted-foreground italic">
						Potencialize sua saúde com recursos avançados de IA.
					</p>
				</div>
			</div>

			<ManagePlanModal
				open={isPlanModalOpen}
				onOpenChange={setIsPlanModalOpen}
				currentPlan={userPlan}
				onUpgrade={onUpgrade}
			/>
		</div>
	);
}
