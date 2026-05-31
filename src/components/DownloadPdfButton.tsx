import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTrialRestrictions } from "@/hooks/useTrialRestrictions";
import type {
	UserProfile,
	WeeklyMenu,
	Recommendation,
	PlanType,
} from "@/types";
import { downloadPdf, validatePdfDownload } from "@/services/pdf.service";
import { UpgradeModal } from "./UpgradeModal";

interface DownloadPdfButtonProps {
	profile: UserProfile;
	menu: WeeklyMenu;
	recommendations: Recommendation[];
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "lg";
	onUpgrade?: (newPlan: PlanType) => void;
}

export function DownloadPdfButton({
	profile,
	menu,
	recommendations,
	variant = "default",
	size = "default",
	onUpgrade,
}: DownloadPdfButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const { canDownloadPdf } = useTrialRestrictions();

	const validation = validatePdfDownload(profile.plan);

	const handleDownload = async () => {
		// Check trial restrictions first
		if (!canDownloadPdf()) {
			return;
		}

		if (!validation.canDownload) {
			setShowUpgradeModal(true);
			return;
		}

		setIsLoading(true);

		try {
			await downloadPdf(profile, menu, recommendations);
			toast({
				title: "PDF gerado com sucesso!",
				description: "Sua dieta foi baixada.",
			});
		} catch (error) {
			toast({
				title: "Erro ao gerar PDF",
				description: "Tente novamente mais tarde.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const button = (
		<Button
			variant={variant}
			size={size}
			onClick={handleDownload}
			disabled={isLoading}
			className="inline-flex items-center justify-center gap-2"
		>
			{isLoading ? (
				<Loader2 className="h-4 w-4 animate-spin shrink-0" />
			) : (
				<Download className="h-4 w-4 shrink-0" />
			)}
			{isLoading ? "Gerando..." : "Baixar PDF"}
		</Button>
	);

	if (!validation.canDownload && validation.message) {
		return (
			<>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>{button}</TooltipTrigger>
						<TooltipContent>
							<p>{validation.message}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<UpgradeModal
					open={showUpgradeModal}
					onOpenChange={setShowUpgradeModal}
					onUpgrade={onUpgrade}
				/>
			</>
		);
	}

	return <>{button}</>;
}
