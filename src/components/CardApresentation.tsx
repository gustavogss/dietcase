import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function CardApresentation() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		try {
			console.log("Iniciando login com Google...");
			console.log("Auth object:", auth);
			
			const provider = new GoogleAuthProvider();
			// Forçar seleção de conta para permitir escolher outra conta
			provider.setCustomParameters({
				prompt: 'select_account'
			});
			console.log("Provider criado:", provider);
			
			const result = await signInWithPopup(auth, provider);
			console.log("Login successful:", result);

			// Mark as new user who needs to select a plan
			localStorage.setItem("dietcase-new-user", "true");

			toast({
				title: "Bem-vindo!",
				description: "Login realizado com sucesso via Google.",
			});

			navigate("/dashboard");
		} catch (error) {
			console.error("Error during Google login:", error);
			console.error("Error code:", error.code);
			console.error("Error message:", error.message);
			console.error("Full error object:", JSON.stringify(error, null, 2));
			
			let errorMessage = "Não foi possível entrar com sua conta Google.";
			
			if (error.code === 'auth/popup-closed-by-user') {
				errorMessage = "Login cancelado pelo usuário.";
			} else if (error.code === 'auth/popup-blocked') {
				errorMessage = "Popup bloqueado pelo navegador. Permita popups para este site.";
			} else if (error.code === 'auth/unauthorized-domain') {
				errorMessage = "Domínio não autorizado no Firebase. Verifique as configurações do Firebase.";
			} else if (error.code === 'auth/api-key-not-allowed') {
				errorMessage = "Chave de API não permitida. Verifique as configurações do Firebase.";
			}
			
			toast({
				title: "Erro no login",
				description: errorMessage,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center py-10 px-4 bg-background">
			<div className="w-full max-w-md">
				<Card className="w-full shadow-lg border-none">
					<CardContent className="space-y-4 p-6">
				<div className="space-y-2">
					<h3 className="text-xl font-semibold">Bem-vindo ao DietCase</h3>

					<p className="text-sm text-muted-foreground">
						Plataforma inteligente de orientação alimentar focada em morbidades
						e comorbidades, baseada em diretrizes científicas e pesquisas
						acadêmicas especializadas.
					</p>
				</div>

				<div className="text-sm space-y-3 text-center">
					<p>🥗 Planos personalizados para sua condição de saúde</p>
					<p>🤖 Acompanhamento inteligente com análise de progresso</p>
					<p>📊 Monitoramento contínuo para melhorar sua qualidade de vida</p>
				</div>

				<Button
					onClick={handleGoogleLogin}
					disabled={isLoading}
					className="w-full flex items-center justify-center gap-3"
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

				<div className="pt-2">
					<p className="text-xs text-muted-foreground bg-cyan-950 p-5 text-slate-50 rounded-lg">
						O DietCase não substitui acompanhamento médico ou nutricional. Atua
						como ferramenta de orientação e apoio à adesão alimentar.
					</p>
				</div>

				<p className="text-xs text-muted-foreground text-center leading-relaxed">
					Ao continuar, você concorda com nossos Termos de Serviço e Política
					de Privacidade.
				</p>
			</CardContent>
		</Card>
	</div>
	</div>
	);
}
