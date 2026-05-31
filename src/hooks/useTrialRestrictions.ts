import { useCallback } from "react";
import { useUserAccess } from "./useUserAccess";
import { toast } from "./use-toast";

export function useTrialRestrictions() {
	const { profile } = useUserAccess();

	const isTrialUser = profile.isTrialUser === true;
	const isTrialExpired =
		isTrialUser && profile.trialEndDate
			? new Date(profile.trialEndDate) < new Date()
			: false;

	const getRemainingTrialDays = useCallback(() => {
		if (!isTrialUser || !profile.trialEndDate) return 0;

		const endDate = new Date(profile.trialEndDate);
		const now = new Date();
		const diffTime = endDate.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return Math.max(0, diffDays);
	}, [isTrialUser, profile.trialEndDate]);

	const canDownloadPdf = useCallback(() => {
		if (isTrialUser) {
			toast({
				title: "📋 Recurso Bloqueado",
				description:
					"Download de PDFs não está disponível no plano de teste. Faça upgrade para acessar.",
				variant: "destructive",
			});
			return false;
		}
		return true;
	}, [isTrialUser]);

	const canShareRecipe = useCallback(() => {
		if (isTrialUser) {
			toast({
				title: "📋 Recurso Bloqueado",
				description:
					"Compartilhamento não está disponível no plano de teste. Faça upgrade para acessar.",
				variant: "destructive",
			});
			return false;
		}
		return true;
	}, [isTrialUser]);

	return {
		isTrialUser,
		isTrialExpired,
		getRemainingTrialDays,
		canDownloadPdf,
		canShareRecipe,
	};
}
