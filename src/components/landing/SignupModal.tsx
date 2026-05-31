import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface SignupModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignupModal({ open, onOpenChange }: SignupModalProps) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!contentRef.current) return;

		if (open) {
			const tween = gsap.to(contentRef.current, {
				scale: 1.02,
				repeat: -1,
				yoyo: true,
				duration: 0.9,
				ease: "power1.inOut",
				boxShadow: "0 18px 40px rgba(250,169,23,0.12)",
			});
			return () => tween.kill();
		} else {
			gsap.killTweensOf(contentRef.current);
			gsap.to(contentRef.current, {
				scale: 1,
				boxShadow: "none",
				duration: 0.15,
			});
		}
	}, [open]);

	const handleGoogleSignup = async () => {
		setIsLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);

			// Mark as new user who needs to select a plan
			localStorage.setItem("dietcase-new-user", "true");

			toast({
				title: "Bem-vindo!",
				description: "Login realizado com sucesso via Google.",
			});

			onOpenChange(false);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error during Google login:", error);
			toast({
				title: "Erro no login",
				description: "Não foi possível entrar com sua conta Google.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				ref={contentRef}
				className="sm:max-w-[480px] border border-amber-200 bg-amber-50 ring-2 ring-amber-300/30"
			>
				<DialogHeader className="text-center">
					<DialogTitle className="text-center text-black dark:text-black">
						Começar agora
					</DialogTitle>
					<DialogDescription>
						Faça login com sua conta do Google para acessar todos os recursos do
						DietCase.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<Button
						type="button"
						onClick={handleGoogleSignup}
						disabled={isLoading}
						className="w-full flex items-center justify-center gap-3 dark:bg-orange-500 dark:hover:bg-orange-600 dark:text-white"
						size="lg"
					>
						<svg
							className="w-5 h-5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Google logo</title>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						{isLoading ? "Redirecionando…" : "Entrar com Google"}
					</Button>

					<p className="text-xs text-muted-foreground text-center leading-relaxed">
						Ao continuar, você concorda com nossos Termos de Serviço e Política
						de Privacidade.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
