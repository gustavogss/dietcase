import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Flame, Heart, Activity, Droplet, Wheat } from "lucide-react";
import { comorbidityCombinations, type ComorbidityCombination, type ComorbidityRecipe } from "@/data/comorbidity-recipes";
import { useUserAccess } from "@/hooks/useUserAccess";

export default function ReceitasParaComorbidades() {
	const { profile: currentUser } = useUserAccess();
	const [selectedCombination, setSelectedCombination] = useState<string>("obesidade-hipertensao");

	const isTransformacao = currentUser.plan === "Transformação";

	const getCombinationIcon = (iconName: string) => {
		switch (iconName) {
			case "Heart": return <Heart className="h-5 w-5" />;
			case "Users": return <Users className="h-5 w-5" />;
			case "Activity": return <Activity className="h-5 w-5" />;
			case "Droplet": return <Droplet className="h-5 w-5" />;
			case "Wheat": return <Wheat className="h-5 w-5" />;
			default: return <Activity className="h-5 w-5" />;
		}
	};

	const RecipeCard = ({ recipe }: { recipe: ComorbidityRecipe }) => (
		<Card className="mb-4">
			<CardHeader>
				<CardTitle className="text-lg">{recipe.title}</CardTitle>
				<p className="text-sm text-muted-foreground">{recipe.description}</p>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-4 mb-4">
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Clock className="h-4 w-4" />
						{recipe.prepTime}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Users className="h-4 w-4" />
						{recipe.servings}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Flame className="h-4 w-4" />
						{recipe.calories} cal
					</div>
				</div>
				
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Ingredientes:</h4>
						<ul className="list-disc list-inside space-y-1 text-sm">
							{recipe.ingredients.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</div>
					
					<div>
						<h4 className="font-semibold mb-2">Modo de Preparo:</h4>
						<ol className="list-decimal list-inside space-y-2 text-sm">
							{recipe.instructions.map((instruction, index) => (
								<li key={index}>{instruction}</li>
							))}
						</ol>
					</div>
					
					<div>
						<h4 className="font-semibold mb-2">Benefícios:</h4>
						<div className="flex flex-wrap gap-2">
							{recipe.benefits.map((benefit, index) => (
								<Badge key={index} variant="secondary" className="text-xs">
									{benefit}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);

	if (!isTransformacao) {
		return (
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="text-center space-y-4 mb-8">
					<Heart className="h-16 w-16 mx-auto text-muted-foreground" />
					<h1 className="text-3xl font-bold">Receitas para Comorbidades</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Receitas especializadas para múltiplas condições de saúde, 
						desenvolvidas para trabalhar de forma integrada no seu tratamento.
					</p>
					<div className="bg-muted/50 border rounded-lg p-6 max-w-md mx-auto">
						<h3 className="font-semibold mb-2">Plano Transformação Necessário</h3>
						<p className="text-sm text-muted-foreground">
							Para acessar as receitas combinadas para comorbidades, 
							é necessário ter o plano Transformação.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const currentCombination = comorbidityCombinations.find(c => c.id === selectedCombination);

	return (
		<div className="container mx-auto max-w-6xl px-4 py-8">
			<div className="text-center space-y-4 mb-8">
				<Heart className="h-16 w-16 mx-auto text-primary" />
				<h1 className="text-3xl font-bold">Receitas para Comorbidades</h1>
				<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
					Receitas especializadas para múltiplas condições de saúde, 
					desenvolvidas para trabalhar de forma integrada no seu tratamento.
				</p>
			</div>

			<Tabs value={selectedCombination} onValueChange={setSelectedCombination} className="w-full">
				<TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
					{comorbidityCombinations.map((combination) => (
						<TabsTrigger key={combination.id} value={combination.id} className="text-sm">
							<div className="flex items-center gap-2">
								{getCombinationIcon(combination.icon)}
								<span className="hidden sm:inline">{combination.name.split(' + ')[0]}</span>
							</div>
						</TabsTrigger>
					))}
				</TabsList>

				{comorbidityCombinations.map((combination) => (
					<TabsContent key={combination.id} value={combination.id} className="mt-6">
						<div className="space-y-6">
							<div className="text-center space-y-2">
								<div className="flex items-center justify-center gap-3">
									{getCombinationIcon(combination.icon)}
									<h2 className="text-2xl font-bold">{combination.name}</h2>
								</div>
								<p className="text-muted-foreground max-w-2xl mx-auto">
									{combination.description}
								</p>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								{combination.recipes.map((recipe) => (
									<RecipeCard key={recipe.id} recipe={recipe} />
								))}
							</div>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
