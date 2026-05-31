import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Play, BookOpen } from "lucide-react";

export default function EducacaoAlimentar() {
	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Educação Alimentar</h1>
				<p className="text-muted-foreground mt-2">
					Aprenda sobre nutrição de forma prática
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Leitura de Rótulos</CardTitle>
						<CardDescription>
							<BookOpen className="h-4 w-4 mr-2" />
							Aprenda a interpretar informações nutricionais
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Guia completo para entender rótulos e fazer escolhas mais saudáveis.
						</p>
						<button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
							<Play className="h-4 w-4 mr-2" />
							Iniciar Curso
						</button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Planejamento de Refeições</CardTitle>
						<CardDescription>
							<GraduationCap className="h-4 w-4 mr-2" />
							Técnicas para organizar sua alimentação semanal
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Aprenda a planejar refeições balanceadas e econômicas.
						</p>
						<button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
							<Play className="h-4 w-4 mr-2" />
							Iniciar Curso
						</button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
