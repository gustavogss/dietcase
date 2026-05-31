import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, ChefHat } from "lucide-react";

export default function PreferenciasNutricionais() {
	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Preferências Nutricionais</h1>
				<p className="text-muted-foreground mt-2">
					Personalize seu plano alimentar
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="h-5 w-5 text-primary" />
							Restrições Alimentares
						</CardTitle>
						<CardDescription>
							Alimentos que você não consome
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Adicione alergias, intolerâncias ou preferências pessoais.
						</p>
						<Button className="w-full inline-flex items-center justify-center gap-2">
							<Save className="h-4 w-4 shrink-0" />
							Gerenciar Restrições
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ChefHat className="h-5 w-5 text-primary" />
							Preferências de Sabor
						</CardTitle>
						<CardDescription>
							Suas preferências culinárias
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Indique seus sabores favoritos para recomendações personalizadas.
						</p>
						<Button className="w-full inline-flex items-center justify-center gap-2">
							<Save className="h-4 w-4 shrink-0" />
							Configurar Preferências
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
