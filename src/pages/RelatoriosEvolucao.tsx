import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, Calendar } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import type { PlanType } from "@/types";

export default function RelatoriosEvolucao() {
	const { profile: currentUser } = useUserAccess();

	const handleUpgradePlan = (newPlan: PlanType) => {
		console.log(`Upgrade para plano: ${newPlan}`);
	};

	return (
		<LockedPageOverlay
			requiredPlan="TRANSFORMACAO"
			requiredPlanLabel="Transformação"
			userPlan={currentUser.plan}
			onUpgrade={handleUpgradePlan}
		>
			<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold tracking-tight">Relatórios de Evolução</h1>
					<p className="text-muted-foreground mt-2">
						Análise detalhada do seu progresso
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Relatório Mensal</CardTitle>
							<CardDescription>
								<FileText className="h-4 w-4 mr-2" />
								Análise completa do período
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="text-sm font-medium">Mês</label>
									<select className="w-full px-3 py-2 border rounded-md">
										<option>Janeiro 2024</option>
										<option>Fevereiro 2024</option>
									</select>
								</div>
								<div>
									<label className="text-sm font-medium">Tipo</label>
									<select className="w-full px-3 py-2 border rounded-md">
										<option>Completo</option>
										<option>Resumido</option>
									</select>
								</div>
							</div>
							<div className="flex gap-2">
								<Button className="flex-1 inline-flex items-center justify-center gap-2">
									<FileText className="h-4 w-4 shrink-0" />
									Gerar Relatório
								</Button>
								<Button variant="outline" size="icon">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Estatísticas</CardTitle>
							<CardDescription>
								<TrendingUp className="h-4 w-4 mr-2" />
								Métricas de progresso
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm">Taxa de Aderência</span>
									<span className="text-sm font-medium">78%</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Dias Consecutivos</span>
									<span className="text-sm font-medium">12</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Meta Mensal</span>
									<span className="text-sm font-medium">85%</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Comparativo de Períodos</CardTitle>
						<CardDescription>
							<TrendingUp className="h-4 w-4 mr-2" />
							Compare diferentes períodos
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<label className="text-sm font-medium">Período 1</label>
								<select className="w-full px-3 py-2 border rounded-md">
									<option>Dez/2023</option>
									<option>Novembro/2023</option>
								</select>
							</div>
							<div>
								<label className="text-sm font-medium">Período 2</label>
								<select className="w-full px-3 py-2 border rounded-md">
									<option>Dez/2023</option>
									<option>Novembro/2023</option>
								</select>
							</div>
						</div>
						<button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
							<TrendingUp className="h-4 w-4 mr-2" />
							Comparar Períodos
						</button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Relatórios Recentes</CardTitle>
						<CardDescription>
							<Calendar className="h-4 w-4 mr-2" />
							Seu histórico de relatórios
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								{ nome: 'Relatório Janeiro 2024', data: '2024-01-31', tipo: 'Completo' },
								{ nome: 'Relatório Dezembro 2023', data: '2023-12-31', tipo: 'Resumido' },
								{ nome: 'Comparativo Q4/2023', data: '2023-12-15', tipo: 'Comparativo' }
							].map((relatorio, index) => (
								<div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
									<div>
										<div className="text-sm font-medium">{relatorio.nome}</div>
										<div className="text-xs text-muted-foreground">{relatorio.data}</div>
									</div>
									<div className="flex gap-2">
										<span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
											{relatorio.tipo}
										</span>
										<button className="px-2 py-1 text-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded">
											<Download className="h-3 w-3" />
										</button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</LockedPageOverlay>
	);
}
