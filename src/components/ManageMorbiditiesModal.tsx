import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { morbidities } from "@/data/mocks";
import { AlertCircle, Crown } from "lucide-react";
import type { PlanType } from "@/types";

interface ManageMorbiditiesModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedMorbidityIds: string[];
	userPlan: PlanType;
	onSave: (morbidityIds: string[]) => void;
	onUpgradeClick?: () => void;
}

const PLAN_LIMITS = {
	Essencial: 1,
	Transformação: 999, // Sem limite real na Transformação
};

export function ManageMorbiditiesModal({
	open,
	onOpenChange,
	selectedMorbidityIds,
	userPlan,
	onSave,
	onUpgradeClick,
}: ManageMorbiditiesModalProps) {
	const [selected, setSelected] = useState<string[]>(selectedMorbidityIds);
	const maxAllowed = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS] || 1;
	const isPremium = userPlan === "Transformação";

	const handleToggle = (morbidityId: string) => {
		setSelected((prev) => {
			const isCurrentlySelected = prev.includes(morbidityId);

			if (isCurrentlySelected) {
				// Sempre permite remover
				return prev.filter((id) => id !== morbidityId);
			} else {
				// Verifica limite ao adicionar
				if (prev.length >= maxAllowed) {
					toast({
						title: "Limite atingido",
						description: `Seu plano ${userPlan} permite até ${maxAllowed} ${maxAllowed === 1 ? "morbidade" : "morbidades"}. Faça upgrade para selecionar mais.`,
						variant: "destructive",
					});
					return prev;
				}
				return [...prev, morbidityId];
			}
		});
	};

	const handleSave = () => {
		onSave(selected);
		toast({
			title: "Condições atualizadas!",
			description: `${selected.length} ${selected.length === 1 ? "condição selecionada" : "condições selecionadas"}.`,
		});
		onOpenChange(false);
	};

	const handleCancel = () => {
		setSelected(selectedMorbidityIds);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Gerenciar Condições de Saúde</DialogTitle>
					<DialogDescription>
						Selecione suas condições de saúde para receber recomendações
						personalizadas.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Informações do Plano */}
					<div className="p-4 bg-muted rounded-lg space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">Seu Plano: {userPlan}</p>
							{isPremium && <Crown className="h-4 w-4 text-accent" />}
						</div>
						<p className="text-sm text-muted-foreground">
							{isPremium ? (
								<>✓ Sem limite de condições + Recomendações combinadas</>
							) : (
								<>
									Limite: {maxAllowed}{" "}
									{maxAllowed === 1 ? "condição" : "condições"}
								</>
							)}
						</p>
						<div className="flex items-center gap-2 text-sm">
							<span>
								Selecionadas: {selected.length} / {isPremium ? "∞" : maxAllowed}
							</span>
							{selected.length === maxAllowed && !isPremium && (
								<Badge variant="secondary" className="text-xs">
									Limite atingido
								</Badge>
							)}
						</div>
					</div>

					{/* Lista de Morbidades */}
					<div className="space-y-3">
						{morbidities.map((morbidity) => {
							const isSelected = selected.includes(morbidity.id);
							const isDisabled = !isSelected && selected.length >= maxAllowed;

							return (
								<div
									key={morbidity.id}
									className={`p-4 border rounded-lg transition-colors ${
										isSelected ? "border-primary bg-primary/5" : "border-border"
									} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-accent/50"}`}
									onClick={() => !isDisabled && handleToggle(morbidity.id)}
								>
									<div className="flex items-start gap-3">
										<Checkbox
											id={morbidity.id}
											checked={isSelected}
											disabled={isDisabled}
											onCheckedChange={() => handleToggle(morbidity.id)}
											className="mt-1"
										/>
										<div className="flex-1">
											<Label
												htmlFor={morbidity.id}
												className={`font-medium cursor-pointer ${isDisabled ? "cursor-not-allowed" : ""}`}
											>
												{morbidity.name}
											</Label>
											<p className="text-sm text-muted-foreground mt-1">
												{morbidity.description}
											</p>
											{isSelected && morbidity.recommendations.length > 0 && (
												<div className="mt-2 flex flex-wrap gap-1">
													{morbidity.recommendations
														.slice(0, 3)
														.map((rec, idx) => (
															<Badge
																key={idx}
																variant="outline"
																className="text-xs"
															>
																{rec}
															</Badge>
														))}
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Alerta de Upgrade */}
					{!isPremium && selected.length >= maxAllowed && (
						<div className="p-4 bg-accent/10 border border-accent rounded-lg flex items-start gap-3">
							<AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
							<div className="flex-1">
								<p className="font-medium text-sm">
									Quer selecionar mais condições?
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									Faça upgrade para Transformação e tenha acesso a condições
									ilimitadas + recomendações combinadas.
								</p>
								<Button
									variant="outline"
									size="sm"
									className="mt-2"
									onClick={() => {
										onOpenChange(false);
										if (onUpgradeClick) onUpgradeClick();
									}}
								>
									Fazer Upgrade
								</Button>
							</div>
						</div>
					)}

					{/* Benefício Transformação */}
					{isPremium && selected.length > 1 && (
						<div className="p-4 bg-primary/10 border border-primary rounded-lg flex items-start gap-3">
							<Crown className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<div className="flex-1">
								<p className="font-medium text-sm">Benefício VIP Ativo</p>
								<p className="text-sm text-muted-foreground mt-1">
									Recomendações combinadas considerando a interação entre suas{" "}
									{selected.length} condições selecionadas.
								</p>
							</div>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="button" onClick={handleSave}>
						Salvar Condições
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
