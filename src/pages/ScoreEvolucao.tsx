import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Award, Calendar, FileDown, GitCompare } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { PermissionGate } from "@/components/PermissionGate";

export default function ScoreEvolucao() {
	const { hasPermission } = useUserAccess();

	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Score de Evolução</h1>
				<p className="text-muted-foreground mt-2">
					Acompanhe seu progresso e alcance de metas
				</p>
			</div>

			{/* Score Principal */}
			<Card className="mb-6">
				<CardHeader>
					<CardTitle className="text-lg">Seu Score Atual</CardTitle>
					<CardDescription>
						Pontuação baseada na sua aderência e progresso
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center">
						<div className="text-center">
							<div className="text-6xl font-bold text-primary">78</div>
							<div className="text-sm text-muted-foreground">pontos</div>
							<div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
								+12 esta semana
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Métricas Detalhadas */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Aderência</CardTitle>
						<Target className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">85%</div>
						<p className="text-xs text-muted-foreground">
							Excelente
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Consistência</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">92%</div>
						<p className="text-xs text-muted-foreground">
							Muito boa
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Metas</CardTitle>
						<Award className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">8/10</div>
						<p className="text-xs text-muted-foreground">
							Concluídas
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Sequência</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">15 dias</div>
						<p className="text-xs text-muted-foreground">
							Consecutivos
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Gráfico de Evolução */}
			<Card>
				<CardHeader>
					<CardTitle>Evolução Mensal</CardTitle>
					<CardDescription>
						Seu progresso ao longo do tempo
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 flex items-center justify-center bg-muted rounded-lg">
						<p className="text-muted-foreground">Gráfico de evolução será implementado aqui</p>
					</div>
				</CardContent>
			</Card>

			{/* Recursos Avançados */}
			<PermissionGate feature="relatorios_avancados">
				<Card>
					<CardHeader>
						<CardTitle>Relatórios Detalhados</CardTitle>
						<CardDescription>
							Análise profunda do seu progresso
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
								<FileDown className="h-4 w-4 shrink-0" />
								Exportar Relatório PDF
							</Button>
							<Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
								<GitCompare className="h-4 w-4 shrink-0" />
								Comparar Períodos
							</Button>
						</div>
					</CardContent>
				</Card>
			</PermissionGate>
		</div>
	);
}
