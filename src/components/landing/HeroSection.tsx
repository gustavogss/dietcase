import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { landingData } from "@/data/landing-data";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import heroImage from "@/assets/hero-elderly.jpg";
import { useScrollTriggerReveal } from "@/hooks/useScrollTriggerReveal";
import { SignupModal } from "@/components/landing/SignupModal";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const navigate = useNavigate();
	const { handleStartClick } = useAuthNavigation();
	const [signupOpen, setSignupOpen] = useState(false);

	// Pass ref object, not .current (which is null at render)
	useScrollTriggerReveal(sectionRef, { start: "top 85%" });

	return (
		<section
			ref={sectionRef}
			className="section-padding relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background"
		>
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<div data-reveal className="flex flex-col items-center lg:items-start text-center lg:text-left">
						<div className="space-y-8 mb-8 lg:mb-12">
							<h1 className="leading-[1.1] tracking-tight text-foreground">
								{landingData.hero.headline}
							</h1>
							<p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
								{landingData.hero.subheadline}
							</p>
						</div>

						{/* Imagem Mobile - Aparece entre o texto e os botões */}
						<div className="lg:hidden w-full max-w-sm mx-auto mb-12 relative group">
							<div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
							<div className="relative aspect-square rounded-2xl bg-muted overflow-hidden shadow-2xl ring-1 ring-primary/10">
								<img
									src={heroImage}
									alt={landingData.hero.heroImageAlt}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4 w-full sm:w-auto">
							<Button
								size="lg"
								className="h-auto w-full px-8 py-6 text-base sm:w-auto sm:px-6 sm:py-3 sm:text-lg inline-flex items-center justify-center gap-2"
								asChild
							>
								<button
									onClick={handleStartClick}
									className="inline-flex items-center justify-center gap-2"
									type="button"
								>
									<span className="whitespace-normal text-center">
										{landingData.hero.ctaPrimary}
									</span>
									<ArrowRight className="h-5 w-5 shrink-0" />
								</button>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="h-auto w-full px-8 py-6 text-base sm:w-auto sm:px-6 sm:py-3 sm:text-lg inline-flex items-center justify-center gap-2"
								asChild
							>
								<a
									href="#pricing"
									className="inline-flex items-center justify-center gap-2"
								>
									{landingData.hero.ctaSecondary}
								</a>
							</Button>
						</div>
					</div>

					<div data-reveal className="relative group hidden lg:block">
						<div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
						<div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl bg-muted overflow-hidden shadow-2xl ring-1 ring-primary/10">
							<img
								src={heroImage}
								alt={landingData.hero.heroImageAlt}
								loading="eager"
								className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
							/>
						</div>
					</div>
				</div>
			</div>
			<SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
		</section>
	);
}
