import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";
import { plans } from "@/data/mocks";
import type { PlanType } from "@/types";

interface UpgradeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpgrade?: (newPlan: PlanType) => void;
}

export function UpgradeModal({
	open,
	onOpenChange,
	onUpgrade,
}: UpgradeModalProps) {
	const handleUpgrade = (planType: PlanType) => {
		if (onUpgrade) {
			onUpgrade(planType);
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl flex items-center gap-2">
						<Sparkles className="h-6 w-6 text-primary" />
						Faça Upgrade do Seu Plano
					</DialogTitle>
					<DialogDescription>
						Desbloqueie todos os recursos e tenha acesso completo ao DietCase
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-6 md:grid-cols-2 mt-6 max-w-2xl mx-auto">
					{plans.map((plan) => (
						<div
							key={plan.type}
							className={`rounded-lg border-2 p-6 ${
								plan.type === "Transformação"
									? "border-primary bg-primary/5"
									: "border-border"
							}`}
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-bold">{plan.type}</h3>
								{plan.type === "Transformação" && (
									<Crown className="h-5 w-5 text-primary" />
								)}
							</div>

							<div className="mb-6">
								<span className="text-3xl font-bold">
									{plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2)}`}
								</span>
								{plan.price > 0 && (
									<span className="text-muted-foreground">/mês</span>
								)}
							</div>

							<ul className="space-y-3 mb-6">
								{plan.features.map((feature, index) => (
									<li key={index} className="flex items-start gap-2">
										<Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>

							<Button
								className="w-full"
								variant={plan.type === "Transformação" ? "default" : "outline"}
								disabled={plan.type === "Essencial"}
								onClick={() => handleUpgrade(plan.type as PlanType)}
							>
								{plan.type === "Essencial" ? "Plano Atual" : "Escolher Plano"}
							</Button>
						</div>
					))}
				</div>

				<div className="mt-6 p-4 bg-muted rounded-lg">
					<p className="text-sm text-center text-muted-foreground">
						💳 Formas de pagamento aceitas: Cartão de Crédito, PIX e Boleto
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
