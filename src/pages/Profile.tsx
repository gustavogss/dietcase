import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockUsers, morbidities } from "@/data/mocks";
import {
	User,
	Mail,
	Calendar,
	Activity,
	Heart,
	Edit,
	AlertCircle,
	Crown,
	Sparkles,
	CreditCard,
} from "lucide-react";
import { EditProfileModal } from "@/components/EditProfileModal";
import { ManageMorbiditiesModal } from "@/components/ManageMorbiditiesModal";
import { ManagePlanModal } from "@/components/ManagePlanModal";
import { ManageRestrictionsModal } from "@/components/ManageRestrictionsModal";
import type { UserProfile, PlanType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useUserAccess } from "@/hooks/useUserAccess";
import { BackToHomeHint } from "@/components/BackToHomeHint";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Profile() {
	// useUserAccess handles auth state and visitor mode
	const { profile: currentUser, accessLevel } = useUserAccess();
	const [authUserId, setAuthUserId] = useState<string | null>(null);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isMorbiditiesModalOpen, setIsMorbiditiesModalOpen] = useState(false);
	const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
	const [isRestrictionsModalOpen, setIsRestrictionsModalOpen] = useState(false);

	// Sync authUserId when currentUser changes (if authenticated)
	useEffect(() => {
		if (accessLevel === "USER" && currentUser.id) {
			setAuthUserId(currentUser.id);
		} else {
			setAuthUserId(null);
		}
	}, [accessLevel, currentUser.id]);

	const userMorbidities = morbidities.filter(
		(m) =>
			Array.isArray(currentUser?.morbidities) &&
			currentUser.morbidities.includes(m.id),
	);

	const handleSaveProfile = async (updatedData: Partial<UserProfile>) => {
		const updated = { ...currentUser, ...updatedData };
		localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
		window.dispatchEvent(new Event("dietcase-profile-updated"));

		if (authUserId) {
			await setDoc(doc(db, "profiles", authUserId), updated, { merge: true });
		}
	};

	const handleSaveMorbidities = async (morbidityIds: string[]) => {
		const updated = { ...currentUser, morbidities: morbidityIds };
		localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
		window.dispatchEvent(new Event("dietcase-profile-updated"));

		if (authUserId) {
			await setDoc(
				doc(db, "profiles", authUserId),
				{ morbidities: morbidityIds },
				{ merge: true },
			);
		}
	};

	const handleUpgradePlan = async (newPlan: PlanType) => {
		const updated = { ...currentUser, plan: newPlan };
		localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
		window.dispatchEvent(new Event("dietcase-profile-updated"));

		if (authUserId) {
			await setDoc(
				doc(db, "profiles", authUserId),
				{ plan: newPlan },
				{ merge: true },
			);
		}
	};

	const imcLabel = (imc: number) => {
		if (!Number.isFinite(imc) || imc <= 0) return null;
		if (imc < 18.5) return "Abaixo do peso";
		if (imc < 25) return "Peso normal";
		return "Acima do peso";
	};

	const imcStatus = imcLabel(currentUser.imc);

	return (
		<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
			<div>
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
					<div className="text-center sm:text-left">
						<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
							Meu Perfil
						</h1>
						<p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed break-words">
							Gerencie suas informações pessoais
						</p>
					</div>
					<Button
						onClick={() => setIsEditModalOpen(true)}
						className="w-full max-w-xs sm:w-auto"
					>
						<Edit className="mr-2 h-4 w-4" />
						Editar Perfil
					</Button>
				</div>
			</div>
			<BackToHomeHint />

			<div className="grid gap-6 md:grid-cols-2">
				{/* Informações Básicas */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Informações Básicas
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div>
							<p className="text-sm text-muted-foreground">Nome Completo</p>
							<p className="font-medium">{currentUser.name}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Email</p>
							<p className="font-medium flex items-center gap-2">
								<Mail className="h-4 w-4" />
								{currentUser.email}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Idade</p>
							<p className="font-medium">{currentUser.age} anos</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Membro desde</p>
							<p className="font-medium flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								{new Date(currentUser.createdAt).toLocaleDateString("pt-BR")}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Métricas de Saúde */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							Métricas de Saúde
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div>
							<p className="text-sm text-muted-foreground">Peso Atual</p>
							<p className="font-medium text-2xl">
								{currentUser.weight || 0} kg
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Altura</p>
							<p className="font-medium text-2xl">
								{currentUser.height || 0} cm
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">IMC</p>
							<p className="font-medium text-2xl">
								{(currentUser.imc || 0).toFixed(1)}
							</p>
							{imcStatus && (
								<div className="mt-2 flex items-center gap-2">
									<p className="text-sm text-muted-foreground">
										Classificação:
									</p>
									<Badge variant="secondary">{imcStatus}</Badge>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Atividade Física */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							Atividade Física
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div>
							<p className="text-sm text-muted-foreground">
								Pratica Exercícios?
							</p>
							<Badge
								variant={currentUser.exercises ? "default" : "secondary"}
								className="mt-1"
							>
								{currentUser.exercises ? "Sim" : "Não"}
							</Badge>
						</div>
						{currentUser.exercises && (
							<>
								<div>
									<p className="text-sm text-muted-foreground">Modalidade</p>
									<p className="font-medium capitalize">
										{currentUser.exerciseType}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Frequência</p>
									<p className="font-medium">
										{currentUser.exerciseFrequency}x por semana
									</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>

				{/* Plano Atual */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Plano Atual
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Badge
							variant={
								currentUser.plan === "Transformação" ? "default" : "secondary"
							}
							className="text-lg px-4 py-1"
						>
							{currentUser.plan}
						</Badge>
						<p className="text-sm text-muted-foreground">
							{currentUser.plan === "Essencial" &&
								"Acesso aos recursos essenciais"}
							{currentUser.plan === "Transformação" &&
								"Acesso completo a todos os recursos exclusivos"}
						</p>

						{/* Recursos Premium Ativos */}
						{currentUser.plan === "Transformação" && (
							<div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg space-y-2">
								<p className="text-sm font-semibold text-primary">
									Recursos Premium Ativos:
								</p>
								<ul className="text-xs space-y-1 text-primary/80 font-medium">
									<li className="flex items-center gap-2">
										<div className="h-1 w-1 rounded-full bg-primary" />
										Morbidades ilimitadas
									</li>
									<li className="flex items-center gap-2">
										<div className="h-1 w-1 rounded-full bg-primary" />
										Assistente Nutricional 24/7
									</li>
									<li className="flex items-center gap-2">
										<div className="h-1 w-1 rounded-full bg-primary" />
										Scanner de calorias por foto
									</li>
									<li className="flex items-center gap-2">
										<div className="h-1 w-1 rounded-full bg-primary" />
										Gerador de dietas automático
									</li>
								</ul>
							</div>
						)}

						<Button
							variant="outline"
							className="w-full inline-flex items-center justify-center gap-2"
							onClick={() => setIsPlanModalOpen(true)}
						>
							<CreditCard className="h-4 w-4 shrink-0" />
							Trocar plano
						</Button>
					</CardContent>
				</Card>

				{/* Condições de Saúde */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Heart className="h-5 w-5" />
							Condições de Saúde
						</CardTitle>
						<CardDescription>Morbidades registradas</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						{userMorbidities.length > 0 ? (
							userMorbidities.map((m) => (
								<div key={m.id} className="p-3 border rounded-lg">
									<p className="font-medium">{m.name}</p>
									<p className="text-sm text-muted-foreground">
										{m.description}
									</p>
								</div>
							))
						) : (
							<p className="text-muted-foreground">
								Nenhuma condição registrada
							</p>
						)}
						<Button
							variant="outline"
							className="w-full mt-2 inline-flex items-center justify-center gap-2"
							onClick={() => setIsMorbiditiesModalOpen(true)}
						>
							<Heart className="h-4 w-4 shrink-0" />
							Gerenciar Condições
						</Button>
					</CardContent>
				</Card>

				{/* Restrições Alimentares */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<AlertCircle className="h-5 w-5" />
							Restrições Alimentares
						</CardTitle>
						<CardDescription>Ingredientes restritos</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Gerencie suas alergias, intolerâncias e preferências. O sistema
							sugerirá substituições automaticamente.
						</p>
						<Button
							variant="outline"
							className="w-full inline-flex items-center justify-center gap-2"
							onClick={() => setIsRestrictionsModalOpen(true)}
						>
							<AlertCircle className="h-4 w-4 shrink-0" />
							Gerenciar Restrições
						</Button>
					</CardContent>
				</Card>
			</div>

			<EditProfileModal
				open={isEditModalOpen}
				onOpenChange={setIsEditModalOpen}
				profile={currentUser}
				onSave={handleSaveProfile}
			/>

			<ManageMorbiditiesModal
				open={isMorbiditiesModalOpen}
				onOpenChange={setIsMorbiditiesModalOpen}
				selectedMorbidityIds={currentUser.morbidities}
				userPlan={currentUser.plan}
				onSave={handleSaveMorbidities}
				onUpgradeClick={() => setIsPlanModalOpen(true)}
			/>

			<ManagePlanModal
				open={isPlanModalOpen}
				onOpenChange={setIsPlanModalOpen}
				currentPlan={currentUser.plan}
				onUpgrade={handleUpgradePlan}
			/>

			<ManageRestrictionsModal
				open={isRestrictionsModalOpen}
				onOpenChange={setIsRestrictionsModalOpen}
			/>
		</div>
	);
}
