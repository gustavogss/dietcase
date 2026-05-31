import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { plans } from "@/data/mocks";
import { Check, Crown, Zap } from "lucide-react";
import type { PlanType } from "@/types";
import { useNavigate } from "react-router-dom";

const PLAN_DISPLAY: Record<string, { icon: typeof Zap; label: string }> = {
	Essencial: { icon: Zap, label: "Essencial" },
	Transformação: { icon: Crown, label: "Transformação" },
	TRIAL: { icon: Zap, label: "Trial" },
	ESSENCIAL: { icon: Zap, label: "Essencial" },
	TRANSFORMACAO: { icon: Crown, label: "Transformação" },
};

interface ManagePlanModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	currentPlan: PlanType | string;
	onUpgrade: (newPlan: PlanType) => void;
}

export function ManagePlanModal({
	open,
	onOpenChange,
	currentPlan,
	onUpgrade,
}: ManagePlanModalProps) {
	const navigate = useNavigate();

	const handleSelectPlan = (planType: PlanType | string) => {
		onUpgrade(planType as PlanType);
		onOpenChange(false);
	};

	const isCurrentPlan = (planType: string) =>
		String(currentPlan).toUpperCase() === planType.toUpperCase() ||
		currentPlan === planType;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Escolha seu plano</DialogTitle>
					<DialogDescription>
						Atualize seu plano para desbloquear mais recursos.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3 py-2">
					{plans.map((plan) => {
						const info =
							PLAN_DISPLAY[plan.type] ?? {
								icon: Zap,
								label: String(plan.type),
							};
						const Icon = info.icon;
						const current = isCurrentPlan(plan.type);

						return (
							<Card
								key={plan.type}
								className={`cursor-pointer transition-colors hover:border-primary/50 ${
									current ? "border-primary ring-2 ring-primary/20" : ""
								}`}
							>
								<CardContent className="p-4 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-primary/10">
											<Icon className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="font-semibold">{info.label}</p>
											<p className="text-sm text-muted-foreground">
												R$ {plan.price.toFixed(2).replace(".", ",")}/mês
											</p>
										</div>
									</div>
									{current ? (
										<Check className="h-5 w-5 text-primary shrink-0" />
									) : (
										<Button
											size="sm"
											className="inline-flex items-center justify-center gap-2"
											onClick={() => handleSelectPlan(plan.type as PlanType)}
										>
											Selecionar
										</Button>
									)}
								</CardContent>
							</Card>
						);
					})}
				</div>
				<p className="text-xs text-muted-foreground text-center">
					Prefere ver todos os detalhes?{" "}
					<button
						type="button"
						className="underline hover:text-foreground"
						onClick={() => {
							onOpenChange(false);
							navigate("/planos");
						}}
					>
						Ver página de planos
					</button>
				</p>
			</DialogContent>
		</Dialog>
	);
}
