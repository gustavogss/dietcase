import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { PermissionGate } from "@/components/PermissionGate";

export default function StatusSaude() {
	const { hasPermission } = useUserAccess();

	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Status da Saúde</h1>
				<p className="text-muted-foreground mt-2">
					Acompanhe seus indicadores de saúde e bem-estar
				</p>
			</div>

			{/* Cards Principais */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pressão Arterial</CardTitle>
						<Heart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">120/80</div>
						<p className="text-xs text-muted-foreground">
							Normal
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Glicemia</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">92 mg/dL</div>
						<p className="text-xs text-muted-foreground">
							Controlada
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">IMC</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24.5</div>
						<p className="text-xs text-muted-foreground">
							Sobrepeso
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Nível de Estresse</CardTitle>
						<AlertTriangle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">Moderado</div>
						<p className="text-xs text-muted-foreground">
							Atenção recomendada
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Análise Detalhada */}
			<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Análise Geral</CardTitle>
						<CardDescription>
							Visão completa dos seus indicadores de saúde
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Status Geral</span>
							<span className="text-sm font-medium text-green-600">Bom</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Riscos Identificados</span>
							<span className="text-sm font-medium text-orange-600">2 Moderados</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Recomendações</span>
							<span className="text-sm font-medium">5 Ativas</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Histórico</CardTitle>
						<CardDescription>
							Evolução dos seus indicadores ao longo do tempo
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-sm">
							<p className="font-medium mb-2">Últimas medições:</p>
							<div className="space-y-2 text-muted-foreground">
								<p>• Pressão: 118/82 (2 dias atrás)</p>
								<p>• Glicemia: 95 mg/dL (1 dia atrás)</p>
								<p>• Peso: 78.5 kg (3 dias atrás)</p>
								<p>• IMC: 24.8 (1 semana atrás)</p>
							</div>
						</div>
						<Button variant="outline" className="w-full mt-4 inline-flex items-center justify-center gap-2">
							Ver Histórico Completo
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Recomendações Personalizadas */}
			<PermissionGate feature="recursos_avancados_ia">
				<Card>
					<CardHeader>
						<CardTitle>Recomendações da IA</CardTitle>
						<CardDescription>
							Análise inteligente baseada nos seus dados
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="p-4 bg-blue-50 rounded-lg">
							<div className="flex items-start gap-3">
								<Activity className="h-5 w-5 text-blue-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-blue-900">
										Atenção à Hidratação
									</p>
									<p className="text-sm text-blue-700 mt-1">
										Baixo consumo de água detectado. Aumente para 2-3L por dia.
									</p>
								</div>
							</div>
						</div>
						<Button className="w-full inline-flex items-center justify-center gap-2">
							Ver Todas as Recomendações
						</Button>
					</CardContent>
				</Card>
			</PermissionGate>
		</div>
	);
}
