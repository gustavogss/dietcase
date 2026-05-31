import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, TrendingUp } from "lucide-react";

export default function EstudosResumidos() {
	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Estudos Resumidos</h1>
				<p className="text-muted-foreground mt-2">
					Principais descobertas científicas em nutrição
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Dieta Mediterrânea e Longevidade</CardTitle>
						<CardDescription>
							<FileText className="h-4 w-4 mr-2" />
							Estudo publicado - Nature Medicine, 2024
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Pesquisa com 10 anos de acompanhamento mostra redução de 25% na mortalidade cardiovascular.
						</p>
						<div className="flex items-center gap-2 text-sm">
							<Clock className="h-4 w-4" />
							<span>Leitura: 8 min</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Jejum Intermitente e Metabolismo</CardTitle>
						<CardDescription>
							<FileText className="h-4 w-4 mr-2" />
							Revisão sistemática - Cell Metabolism, 2024
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Análise de 50 estudos confirma benefícios para sensibilidade à insulina e composição corporal.
						</p>
						<div className="flex items-center gap-2 text-sm">
							<Clock className="h-4 w-4" />
							<span>Leitura: 12 min</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
