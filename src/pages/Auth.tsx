import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserAccess } from "@/hooks/useUserAccess";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardApresentation } from "@/components/CardApresentation";

export default function Auth() {
	const navigate = useNavigate();
	const location = useLocation();
	const { toast } = useToast();
	const { accessLevel } = useUserAccess();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (accessLevel === "USER") {
			// Não redirecionar automaticamente - mostrar opção de logout
			// navigate("/dashboard");
		}
	}, [accessLevel, navigate]);

	const handleGoogleLogin = async () => {
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

			// Redirect to the page they were trying to access, or dashboard
			const from = location.state?.from || "/dashboard";
			navigate(from);
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

	const handleLogout = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem("dietcase-mock-auth");
			localStorage.removeItem("dietcase-user-profile");
			localStorage.removeItem("dietcase-user-plan");
			localStorage.removeItem("dietcase-new-user");
			
			toast({
				title: "Logout realizado",
				description: "Você foi deslogado com sucesso.",
			});
			
			// Permanecer na mesma página /auth para mostrar o card de login
			// navigate("/");
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
			toast({
				title: "Erro no logout",
				description: "Não foi possível fazer logout.",
				variant: "destructive",
			});
		}
	};

	// Se for visitante, mostra apenas o formulário de login
	if (accessLevel === "VISITOR") {
		return <CardApresentation />;
	}

	// Se for usuário logado, mostra mensagem de logout
	return (
		<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardContent className="space-y-6 p-6">
					<div className="text-center space-y-4">
						<div className="space-y-2">
							<h3 className="text-xl font-semibold">Você já está logado!</h3>
							<p className="text-muted-foreground">
								Para usar outra conta, faça logout primeiro.
							</p>
						</div>
						
						<div className="space-y-2">
							<Button onClick={handleLogout} variant="outline" className="w-full">
								Sair e fazer login com outra conta
							</Button>
						</div>
						
						<div className="space-y-2">
							<Button onClick={() => navigate("/dashboard")} variant="default" className="w-full">
								Voltar para o Dashboard
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
