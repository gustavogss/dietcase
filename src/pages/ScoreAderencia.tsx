import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Award, TrendingUp, Calendar } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { PermissionGate } from "@/components/PermissionGate";

export default function ScoreAderencia() {
	const { hasPermission } = useUserAccess();

	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Score de Aderência</h1>
				<p className="text-muted-foreground mt-2">
					Monitore sua consistência e disciplina
				</p>
			</div>

			<PermissionGate feature="monitoramento_intensivo">
				{/* Score Principal */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Seu Score de Aderência</CardTitle>
						<CardDescription>
							<Target className="h-4 w-4 mr-2" />
							Baseado na sua consistência diária
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center">
							<div className="text-center">
								<div className="text-6xl font-bold text-primary">92</div>
								<div className="text-sm text-muted-foreground">pontos</div>
								<div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
									Excelente
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">15 dias</div>
							<p className="text-xs text-muted-foreground">
								Consecutivos
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Melhor Sequência</CardTitle>
							<Award className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">28 dias</div>
							<p className="text-xs text-muted-foreground">
								Consecutivos
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Taxa Mensal</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">87%</div>
							<p className="text-xs text-muted-foreground">
								Aderência
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total de Dias</CardTitle>
							<Target className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">243</div>
							<p className="text-xs text-muted-foreground">
								Registrados
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Gráfico de Aderência */}
				<Card>
					<CardHeader>
						<CardTitle>Evolução da Aderência</CardTitle>
						<CardDescription>
							Seu progresso ao longo do tempo
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-64 flex items-center justify-center bg-muted rounded-lg">
							<p className="text-muted-foreground">Gráfico de aderência será implementado aqui</p>
						</div>
					</CardContent>
				</Card>

				{/* Conquistas e Badges */}
				<Card>
					<CardHeader>
						<CardTitle>Conquistas</CardTitle>
						<CardDescription>
							<Award className="h-4 w-4 mr-2" />
							Badges earned por sua consistência
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ nome: 'Iniciante', descricao: 'Primeiro check-in', conquistado: true },
								{ nome: 'Consistente', descricao: '7 dias seguidos', conquistado: true },
								{ nome: 'Dedicado', descricao: '30 dias no mês', conquistado: true },
								{ nome: 'Mestre', descricao: '90% aderência', conquistado: false },
								{ nome: 'Lendário', descricao: '180 dias seguidos', conquistado: false }
							].map((badge, index) => (
								<div key={index} className={`p-3 rounded-lg border ${
									badge.conquistado 
										? 'bg-green-50 border-green-200' 
										: 'bg-gray-50 border-gray-200'
								}`}>
									<div className="flex items-center gap-2">
										<Award className={`h-5 w-5 ${
											badge.conquistado ? 'text-green-600' : 'text-gray-400'
										}`} />
										<div>
											<div className="text-sm font-medium">{badge.nome}</div>
											<div className="text-xs text-muted-foreground">{badge.descricao}</div>
										</div>
									</div>
									{badge.conquistado && (
										<div className="text-xs text-green-600 font-medium">✓ Conquistado</div>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</PermissionGate>
		</div>
	);
}
