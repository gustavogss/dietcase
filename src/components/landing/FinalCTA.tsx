import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useScrollTriggerReveal } from "@/hooks/useScrollTriggerReveal";

export function FinalCTA() {
	const { handleStartClick } = useAuthNavigation();
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollTriggerReveal(sectionRef);

	return (
		<section
			ref={sectionRef}
			className="section-padding bg-gradient-to-b from-primary/5 via-background to-background"
		>
			<div
				data-reveal
				className="w-full max-w-4xl mx-auto text-center space-y-8 px-4"
			>
				<h2 className="text-foreground leading-[1.1]">
					Estamos prontos para cuidar da sua alimentação
				</h2>
				<p className="max-w-xl mx-auto text-muted-foreground font-medium">
					Comece agora gratuitamente
				</p>
				<Button
					size="lg"
					className="mx-auto h-auto w-full max-w-[22rem] sm:max-w-none sm:w-auto px-12 py-6 text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
					asChild
				>
					<button
						onClick={handleStartClick}
						className="inline-flex items-center justify-center gap-2"
						type="button"
					>
						<span className="whitespace-normal text-center">
							Conheça nossa plataforma
						</span>
						<ArrowRight className="h-6 w-6 shrink-0" />
					</button>
				</Button>
			</div>
		</section>
	);
}
