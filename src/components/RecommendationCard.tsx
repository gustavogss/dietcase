import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Recommendation } from "@/types";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecommendationCardProps {
	recommendation: Recommendation;
}

const priorityColors = {
	Alta: "destructive",
	Média: "default",
	Baixa: "secondary",
} as const;

export function RecommendationCard({
	recommendation,
}: RecommendationCardProps) {
	const navigate = useNavigate();
	const IconComponent =
		(Icons[recommendation.icon as keyof typeof Icons] as LucideIcon) ||
		Icons.Info;
	const CheckIcon = Icons.CheckCircle2;
	const XIcon = Icons.XCircle;

	const handleActionClick = () => {
		if (recommendation.actionUrl) {
			navigate(recommendation.actionUrl);
		}
	};

	return (
		<Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1 overflow-hidden">
			<CardHeader className="p-8 pb-4 text-center">
				<div className="flex flex-col items-center gap-6">
					<div className="p-4 rounded-2xl bg-primary/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0">
						<IconComponent className="h-7 w-7 text-primary" />
					</div>
					<div className="space-y-2">
						<CardTitle className="text-xl font-bold leading-tight">{recommendation.title}</CardTitle>
						<div className="flex justify-center">
							<Badge
								variant={priorityColors[recommendation.priority]}
								className="px-3 py-1 font-bold"
							>
								{recommendation.priority}
							</Badge>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col p-8 pt-0 items-center text-center">
				<CardDescription className="text-base font-medium text-muted-foreground leading-relaxed mb-6">
					{recommendation.description}
				</CardDescription>

				{recommendation.restrictedFoods &&
					recommendation.restrictedFoods.length > 0 && (
						<>
							<Separator className="my-6" />
							<div className="space-y-4 w-full">
								<div className="flex flex-col items-center gap-3">
									<XIcon className="h-5 w-5 text-destructive shrink-0" />
									<h4 className="font-bold text-sm uppercase tracking-wider">
										Alimentos que Devem ser Evitados
									</h4>
								</div>
								<ul className="space-y-2 flex flex-col items-center">
									{recommendation.restrictedFoods.map((food, index) => (
										<li key={index} className="flex items-center gap-3 text-sm text-center">
											<span className="text-destructive font-bold hidden sm:inline">✕</span>
											<span className="text-muted-foreground font-medium">{food}</span>
										</li>
									))}
								</ul>
							</div>
						</>
					)}

				{recommendation.allowedFoods &&
					recommendation.allowedFoods.length > 0 && (
						<>
							<Separator className="my-6" />
							<div className="space-y-4 w-full">
								<div className="flex flex-col items-center gap-3">
									<CheckIcon className="h-5 w-5 text-success shrink-0" />
									<h4 className="font-bold text-sm uppercase tracking-wider">
										Alimentos Permitidos
									</h4>
								</div>
								<ul className="space-y-2 flex flex-col items-center">
									{recommendation.allowedFoods.map((food, index) => (
										<li key={index} className="flex items-center gap-3 text-sm text-center">
											<span className="text-success font-bold hidden sm:inline">•</span>
											<span className="text-muted-foreground font-medium">{food}</span>
										</li>
									))}
								</ul>
							</div>
						</>
					)}

				{recommendation.actionLabel && (
					<Button
						variant="outline"
						size="lg"
						onClick={handleActionClick}
						className="mt-10 w-full py-7 font-black text-base shadow-sm hover:shadow-xl transition-all rounded-2xl border-2 hover:bg-primary hover:text-primary-foreground"
					>
						{recommendation.actionLabel}
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
