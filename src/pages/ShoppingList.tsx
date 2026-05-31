import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ManagePlanModal } from "@/components/ManagePlanModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	ShoppingCart,
	Plus,
	Trash2,
	Share2,
	Printer,
	RefreshCw,
	Info,
	Crown,
} from "lucide-react";
import { mockUsers, weeklyMenus } from "@/data/mocks";
import { toast } from "@/hooks/use-toast";
import { useTrialRestrictions } from "@/hooks/useTrialRestrictions";
import { 
	generateShoppingListFromMenu, 
	ShoppingCategory 
} from "@/services/shopping-list.service";
import { 
	generateAdaptiveMenu, 
	getBaseMenuForUser, 
	generateMenuVariation 
} from "@/services/menu.service";
import type { UserProfile, PlanType, WeeklyMenu } from "@/types";

export default function ShoppingList() {
	const [currentUser, setCurrentUser] = useState<UserProfile>(mockUsers[0]);
	const [categories, setCategories] = useState<ShoppingCategory[]>([]);
	const [newItemName, setNewItemName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const { canShareRecipe } = useTrialRestrictions();

	const getSynchronizedMenu = (user: UserProfile): WeeklyMenu => {
		try {
			const stored = localStorage.getItem("dietcase-current-weekly-menu");
			if (stored) {
				const menu = JSON.parse(stored) as WeeklyMenu;
				const isPremium = ["TRANSFORMACAO", "Transformação"].includes(user.plan);
				
				// Se o menu já está adaptado para as condições certas, use-o
				const activeMorbidities = user.morbidities || [];
				const limitedMorbidities = isPremium ? activeMorbidities : activeMorbidities.slice(0, 1);
				
				const conditionsStr = limitedMorbidities.join(', ');
				if (menu.name.includes(`(Adaptado para: ${conditionsStr})`)) {
					return menu;
				}
			}
		} catch (e) {
			console.error("Erro ao ler cardápio", e);
		}

		// Se não tiver ou estiver desatualizado, gera um novo (fallback)
		const isPremium = ["TRANSFORMACAO", "Transformação"].includes(user.plan);
		const rawBaseMenu = getBaseMenuForUser(user.morbidities || []);
		const activeMorbidities = isPremium 
			? (user.morbidities || []) 
			: (user.morbidities || []).slice(0, 1);
		
		const adapted = generateAdaptiveMenu(rawBaseMenu, activeMorbidities);
		// Nota: Não temos o menuVariant aqui, então usamos 0 (padrão)
		const finalMenu = generateMenuVariation(adapted, 0);
		
		// Salva para persistir a sincronização
		localStorage.setItem("dietcase-current-weekly-menu", JSON.stringify(finalMenu));
		return finalMenu;
	};

	const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

	// Carrega perfil
	useEffect(() => {
		const handleProfileUpdate = () => {
			const savedProfile = localStorage.getItem("dietcase-user-profile");
			if (savedProfile) {
				try {
					setCurrentUser(JSON.parse(savedProfile));
				} catch (e) {
					console.error("Error parsing profile", e);
				}
			}
		};

		handleProfileUpdate();
		window.addEventListener("dietcase-profile-updated", handleProfileUpdate);
		return () =>
			window.removeEventListener(
				"dietcase-profile-updated",
				handleProfileUpdate,
			);
	}, []);

	const handleUpgradePlan = (newPlan: PlanType) => {
		setCurrentUser((prev) => {
			const updated = { ...prev, plan: newPlan };
			localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
			window.dispatchEvent(new Event("dietcase-profile-updated"));
			return updated;
		});
	};

	// Carrega lista inicial baseada no menu
	useEffect(() => {
		const generatedList = generateShoppingListFromMenu(getSynchronizedMenu(currentUser));
		setCategories(generatedList);
		if (generatedList.length > 0) {
			setSelectedCategory(generatedList[0].id);
		}
	}, []);

	const handleToggleItem = (categoryId: string, itemId: string) => {
		setCategories((prev) =>
			prev.map((cat) => {
				if (cat.id !== categoryId) return cat;
				return {
					...cat,
					items: cat.items.map((item) => {
						if (item.id !== itemId) return item;
						return { ...item, checked: !item.checked };
					}),
				};
			}),
		);
	};

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newItemName.trim() || !selectedCategory) return;

		setCategories((prev) =>
			prev.map((cat) => {
				if (cat.id !== selectedCategory) return cat;
				return {
					...cat,
					items: [
						...cat.items,
						{
							id: Date.now().toString(),
							name: newItemName,
							category: cat.name,
							checked: false,
						},
					],
				};
			}),
		);

		setNewItemName("");
		toast({
			title: "Item adicionado",
			description: "O item foi adicionado à sua lista.",
		});
	};

	const handleClearCompleted = () => {
		setCategories((prev) =>
			prev
				.map((cat) => ({
					...cat,
					items: cat.items.filter((item) => !item.checked),
				}))
				.filter((cat) => cat.items.length > 0),
		);

		toast({
			title: "Lista limpa",
			description: "Itens marcados foram removidos.",
		});
	};

	const handleRefreshList = () => {
		const generatedList = generateShoppingListFromMenu(
			getSynchronizedMenu(currentUser),
		);
		setCategories(generatedList);

		const activeMorbidities = currentUser.morbidities || [];
		const limitedMorbidities = canPrintOrShare
			? activeMorbidities
			: activeMorbidities.slice(0, 1);
		const formattedMorbidities = limitedMorbidities.join(", ");

		toast({
			title: "Lista atualizada",
			description: `Sincronizada para: ${formattedMorbidities || "Geral"}`,
		});
	};

	const calculateProgress = () => {
		const totalItems = categories.reduce(
			(acc, cat) => acc + cat.items.length,
			0,
		);
		if (totalItems === 0) return 0;
		const checkedItems = categories.reduce(
			(acc, cat) => acc + cat.items.filter((i) => i.checked).length,
			0,
		);
		return Math.round((checkedItems / totalItems) * 100);
	};

	const isPremium =
		currentUser.plan === "Transformação" || currentUser.plan === "TRANSFORMACAO";
	const isEssencial =
		currentUser.plan === "Essencial" || currentUser.plan === "ESSENCIAL";
	const canPrintOrShare = isPremium || isEssencial;

	const handlePremiumAction = (action: () => void) => {
		if (canPrintOrShare) {
			action();
		} else {
			setIsPlanModalOpen(true);
		}
	};

	const handleShare = async () => {
		// Check trial restrictions
		if (!canShareRecipe()) {
			return;
		}

		const listText = categories
			.map((cat) => {
				const items = cat.items
					.filter((i) => !i.checked)
					.map((i) => `- ${i.name}`)
					.join("\n");
				if (!items) return null;
				return `*${cat.name}*:\n${items}`;
			})
			.filter(Boolean)
			.join("\n\n");

		if (!listText) {
			toast({
				title: "Lista vazia",
				description:
					"Adicione itens ou desmarque os concluídos para compartilhar.",
				variant: "destructive",
			});
			return;
		}

		const activeMorbidities = currentUser.morbidities || [];
		const limitedMorbidities = canPrintOrShare
			? activeMorbidities
			: activeMorbidities.slice(0, 1);
		const disclaimer =
			limitedMorbidities.length > 0
				? `\n\n*Nota:* Esta lista de compras é adaptada para as seguintes morbidades e comorbidades que você selecionou: ${limitedMorbidities.join(", ")}.`
				: "";

		const shareData = {
			title: "Minha Lista de Compras - DietCase",
			text: `🛒 *Lista de Compras DietCase*\n\n${listText}${disclaimer}\n\n_Gerado por DietCase_`,
		};

		try {
			if (navigator.share && navigator.canShare(shareData)) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.text);
				toast({
					title: "Copiado!",
					description: "Lista copiada para a área de transferência.",
				});
			}
		} catch (error) {
			console.error("Error sharing:", error);
			toast({
				title: "Erro ao compartilhar",
				description: "Não foi possível compartilhar a lista.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 font-sans">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
						<ShoppingCart className="h-8 w-8" />
						Lista de Compras
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed break-words">
						Organize suas compras para a dieta semanal.
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Button variant="outline" size="sm" onClick={handleRefreshList} className="inline-flex items-center justify-center gap-2">
						<RefreshCw className="h-4 w-4 shrink-0" />
						Sincronizar
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePremiumAction(() => window.print())}
						className={!canPrintOrShare ? "opacity-75" : ""}
					>
						<Printer className="mr-2 h-4 w-4" />
						Imprimir
						{!canPrintOrShare && <Crown className="ml-1 h-3 w-3 text-amber-500" />}
					</Button>
					<Button
						size="sm"
						onClick={() => handlePremiumAction(handleShare)}
						className={!canPrintOrShare ? "opacity-75" : ""}
					>
						<Share2 className="mr-2 h-4 w-4" />
						Compartilhar
						{!canPrintOrShare && <Crown className="ml-1 h-3 w-3" />}
					</Button>
				</div>
			</div>

			<Alert className="bg-blue-50 border-blue-200">
				<Info className="h-4 w-4 text-blue-600" />
				<AlertTitle className="text-blue-800 font-semibold">
					Sincronização Automática
				</AlertTitle>
				<AlertDescription className="text-blue-700">
					Esta lista é gerada automaticamente com base no seu{" "}
					<strong>Cardápio Semanal</strong>. Se você gerar uma nova dieta ou
					alterar sua condição clínica (Morbidade), clique em{" "}
					<strong>Sincronizar</strong> para atualizar os ingredientes
					necessários.
				</AlertDescription>
			</Alert>

			<div className="grid gap-6 md:grid-cols-[2fr_1fr]">
				<div className="space-y-6">
					{/* Barra de Progresso */}
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="p-4 flex items-center justify-between">
							<span className="font-medium text-primary">Progresso</span>
							<span className="font-bold text-primary">
								{calculateProgress()}%
							</span>
						</CardContent>
						<div className="h-2 bg-primary/20 w-full rounded-b-lg overflow-hidden">
							<div
								className="h-full bg-primary transition-all duration-500"
								style={{ width: `${calculateProgress()}%` }}
							/>
						</div>
					</Card>

					{/* Categorias e Itens */}
					{categories.map((category) => (
						<Card key={category.id}>
							<CardHeader className="py-3 bg-muted/30">
								<CardTitle className="text-base font-semibold flex items-center justify-between">
									{category.name}
									<span className="text-xs font-normal text-muted-foreground bg-white px-2 py-1 rounded-full border">
										{category.items.filter((i) => i.checked).length}/
										{category.items.length}
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="py-2">
								<div className="space-y-1">
									{category.items.map((item) => (
										<div
											key={item.id}
											className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
												item.checked ? "bg-muted/50" : "hover:bg-muted/30"
											}`}
										>
											<Checkbox
												id={item.id}
												checked={item.checked}
												onCheckedChange={() =>
													handleToggleItem(category.id, item.id)
												}
											/>
											<label
												htmlFor={item.id}
												className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer ${
													item.checked
														? "line-through text-muted-foreground"
														: ""
												}`}
											>
												{item.name}
											</label>
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6 text-muted-foreground hover:text-red-500"
												onClick={() => {
													setCategories((prev) =>
														prev.map((c) => {
															if (c.id !== category.id) return c;
															return {
																...c,
																items: c.items.filter((i) => i.id !== item.id),
															};
														}),
													);
												}}
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}

					{categories.length === 0 && (
						<Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
							<ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
							<p>Sua lista está vazia.</p>
							<p className="text-sm">
								Os itens do seu cardápio aparecerão aqui.
							</p>
						</Card>
					)}
				</div>

				{/* Sidebar: Adicionar Item + Ações */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Adicionar Item</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleAddItem} className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Item</label>
									<Input
										placeholder="Ex: Leite, Maçã..."
										value={newItemName}
										onChange={(e) => setNewItemName(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Categoria</label>
									<select
										className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
									>
										<option value="" disabled>
											Selecione...
										</option>
										{categories.map((cat) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
										{!categories.some((c) => c.name === "Outros") && (
											<option value="outros">Outros</option>
										)}
									</select>
								</div>
								<Button type="submit" className="w-full inline-flex items-center justify-center gap-2">
									<Plus className="h-4 w-4 shrink-0" />
									Adicionar
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<Button
								variant="destructive"
								className="w-full inline-flex items-center justify-center gap-2"
								onClick={handleClearCompleted}
							>
								<Trash2 className="h-4 w-4 shrink-0" />
								Limpar Concluídos
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Disclaimer para Impressão - Visível apenas no print */}
			<div className="hidden print:block mt-8 pt-4 border-t text-sm text-muted-foreground italic">
				<p>
					Nota: Esta lista de compras é adaptada para as morbidades e
					comorbidades que você selecionou:{" "}
					{(canPrintOrShare
						? currentUser.morbidities || []
						: (currentUser.morbidities || []).slice(0, 1)
					).join(", ") || "Geral"}
					.
				</p>
				<p className="mt-1">Gerado por DietCase</p>
			</div>

			<ManagePlanModal
				open={isPlanModalOpen}
				onOpenChange={setIsPlanModalOpen}
				currentPlan={currentUser.plan}
				onUpgrade={handleUpgradePlan}
			/>
		</div>
	);
}
