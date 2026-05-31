import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import type { UserProfile } from "@/types";

const profileSchema = z
	.object({
		name: z.string(), // Read-only
		email: z.string(), // Read-only
		age: z
			.number()
			.min(1, { message: "Idade deve ser maior que 0" })
			.max(150, { message: "Idade deve ser menor que 150" }),
		weight: z
			.number()
			.min(1, { message: "Peso deve ser maior que 0" })
			.max(500, { message: "Peso deve ser menor que 500kg" }),
		height: z
			.number()
			.min(50, { message: "Altura deve ser maior que 50cm" })
			.max(300, { message: "Altura deve ser menor que 300cm" }),
		exercises: z.boolean(),
		exerciseType: z.string().optional(),
		exerciseFrequency: z.number().min(1).max(7).optional(),
	})
	.refine(
		(data) => {
			if (data.exercises) {
				return !!data.exerciseType && !!data.exerciseFrequency;
			}
			return true;
		},
		{
			message: "Se você pratica exercícios, preencha o tipo e a frequência.",
			path: ["exerciseType"], // Aponta o erro para o campo de tipo
		},
	);

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	profile: UserProfile;
	onSave: (data: Partial<UserProfile>) => void;
}

export function EditProfileModal({
	open,
	onOpenChange,
	profile,
	onSave,
}: EditProfileModalProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: profile.name,
			email: profile.email,
			age: profile.age,
			weight: profile.weight,
			height: profile.height,
			exercises: profile.exercises || false,
			exerciseType: profile.exerciseType || "",
			exerciseFrequency: profile.exerciseFrequency || 3,
		},
	});

	// Watch for external profile updates to reset form
	useEffect(() => {
		if (open) {
			reset({
				name: profile.name,
				email: profile.email,
				age: profile.age,
				weight: profile.weight,
				height: profile.height,
				exercises: profile.exercises || false,
				exerciseType: profile.exerciseType || "",
				exerciseFrequency: profile.exerciseFrequency || 3,
			});
		}
	}, [profile, open, reset]);

	const exercises = watch("exercises");

	const onSubmit = async (data: ProfileFormData) => {
		setIsSubmitting(true);

		try {
			// Calcula o novo IMC
			const heightInMeters = data.height / 100;
			const imc = data.weight / (heightInMeters * heightInMeters);

			// Atualiza o perfil
			onSave({
				// Name and Email are NOT updated here as they are read-only
				age: data.age,
				weight: data.weight,
				height: data.height,
				imc: parseFloat(imc.toFixed(1)),
				exercises: data.exercises,
				exerciseType: data.exercises ? data.exerciseType : undefined,
				exerciseFrequency: data.exercises ? data.exerciseFrequency : undefined,
			});

			toast({
				title: "Perfil atualizado!",
				description: "Suas informações foram atualizadas com sucesso.",
			});

			onOpenChange(false);
		} catch (error) {
			toast({
				title: "Erro ao atualizar",
				description: "Não foi possível atualizar o perfil. Tente novamente.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		reset();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Editar Perfil</DialogTitle>
					<DialogDescription>
						Mantenha suas métricas atualizadas para melhores recomendações.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Read-only Fields */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nome (Conta Google)</Label>
							<Input
								id="name"
								value={profile.name}
								disabled={true}
								className="bg-muted cursor-not-allowed opacity-70"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email (Conta Google)</Label>
							<Input
								id="email"
								value={profile.email}
								disabled={true}
								className="bg-muted cursor-not-allowed opacity-70"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="age">Idade</Label>
							<Input
								id="age"
								type="number"
								{...register("age", { valueAsNumber: true })}
								disabled={isSubmitting}
							/>
							{errors.age && (
								<p className="text-sm text-destructive">{errors.age.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="height">Altura (cm)</Label>
							<Input
								id="height"
								type="number"
								{...register("height", { valueAsNumber: true })}
								disabled={isSubmitting}
							/>
							{errors.height && (
								<p className="text-sm text-destructive">
									{errors.height.message}
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="weight">Peso (kg)</Label>
						<Input
							id="weight"
							type="number"
							step="0.1"
							{...register("weight", { valueAsNumber: true })}
							disabled={isSubmitting}
						/>
						{errors.weight && (
							<p className="text-sm text-destructive">
								{errors.weight.message}
							</p>
						)}
					</div>

					<div className="pt-4 border-t space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="exercises" className="text-base">
								Pratica exercícios físicos?
							</Label>
							<Controller
								control={control}
								name="exercises"
								render={({ field }) => (
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={isSubmitting}
									/>
								)}
							/>
						</div>

						{exercises && (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
								<div className="space-y-2">
									<Label htmlFor="exerciseType">Tipo de Exercício</Label>
									<Input
										id="exerciseType"
										placeholder="Ex: Musculação, Corrida..."
										{...register("exerciseType")}
										disabled={isSubmitting}
									/>
									{errors.exerciseType && (
										<p className="text-sm text-destructive">
											{errors.exerciseType.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="exerciseFrequency">Frequência Semanal</Label>
									<Controller
										control={control}
										name="exerciseFrequency"
										render={({ field }) => (
											<Select
												onValueChange={(val) => field.onChange(parseInt(val))}
												defaultValue={field.value?.toString()}
												disabled={isSubmitting}
											>
												<SelectTrigger>
													<SelectValue placeholder="Selecione" />
												</SelectTrigger>
												<SelectContent>
													{[1, 2, 3, 4, 5, 6, 7].map((num) => (
														<SelectItem key={num} value={num.toString()}>
															{num}x por semana
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
									{errors.exerciseFrequency && (
										<p className="text-sm text-destructive">
											{errors.exerciseFrequency.message}
										</p>
									)}
								</div>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isSubmitting}
						>
							Cancelar
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Salvando..." : "Salvar Alterações"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
