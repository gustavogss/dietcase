import { RecipeEbooksSection } from "@/components/RecipeEbooksSection";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { BackToHomeHint } from "@/components/BackToHomeHint";
import { useUserAccess } from "@/hooks/useUserAccess";

export default function Ebooks() {
	const { profile: currentUser, hasPermission } = useUserAccess();

	const handleUpgradePlan = (newPlan: PlanType) => {
		// Esta função pode ser implementada para upgrade de plano
		console.log(`Upgrade para plano: ${newPlan}`);
	};

	return (
		<LockedPageOverlay
			requiredPlan="TRANSFORMACAO"
			requiredPlanLabel="Essencial"
			userPlan={currentUser.plan}
			onUpgrade={handleUpgradePlan}
		>
			<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
				<BackToHomeHint />
				<RecipeEbooksSection />
			</div>
		</LockedPageOverlay>
	);
}
