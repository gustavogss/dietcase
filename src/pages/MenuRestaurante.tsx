import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertCircle, CheckCircle2, Flame, Loader2, RefreshCw, X, Image as ImageIcon } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import { toast } from "sonner";
import { triggerConfetti } from "@/lib/confetti";

export default function MenuRestaurante() {
	const { profile: currentUser } = useUserAccess();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [analysisResult, setAnalysisResult] = useState<{
		isIdeal: boolean;
		calories: number;
		ingredients: { name: string; calories: number }[];
		feedback: string;
		substitutions: string[];
	} | null>(null);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const streamRef = useRef<MediaStream | null>(null);

	const stopCamera = useCallback(() => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
			streamRef.current = null;
		}
		setIsCameraActive(false);
	}, []);

	useEffect(() => {
		return () => {
			stopCamera();
		};
	}, [stopCamera]);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ 
				video: { facingMode: "environment" } 
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				// Precisa chamar play() explicitamente em alguns navegadores iOS Safari
				await videoRef.current.play(); 
			}
			streamRef.current = stream;
			setIsCameraActive(true);
		} catch (err) {
			console.error("Erro ao acessar câmera:", err);
			toast.error("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
		}
	};

	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const context = canvas.getContext('2d');
			if (context) {
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
				const imageDataUrl = canvas.toDataURL('image/jpeg');
				setSelectedImage(imageDataUrl);
				stopCamera();
			}
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result as string);
				setAnalysisResult(null);
			};
			reader.readAsDataURL(file);
		}
	};

	const analyzeMeal = () => {
		if (!selectedImage) return;

		setIsAnalyzing(true);
		
		setTimeout(() => {
			const hasHypertension = currentUser.morbidities.includes("hipertensao");
			const hasDiabetes = currentUser.morbidities.includes("diabetes");

			setIsAnalyzing(false);

			if (hasHypertension || hasDiabetes) {
				setAnalysisResult({
					isIdeal: false,
					calories: 850,
					ingredients: [
						{ name: "Pão de Hambúrguer", calories: 200 },
						{ name: "Carne Bovina Processada", calories: 350 },
						{ name: "Queijo Cheddar Derretido", calories: 150 },
						{ name: "Bacon", calories: 150 }
					],
					feedback: hasHypertension 
						? "Atenção: Esta refeição aparenta ter alto teor de sódio e carboidratos refinados, o que não é ideal para sua hipertensão."
						: "Atenção: Esta refeição possui alta carga glicêmica e gorduras saturadas, inadequada para seu quadro de diabetes.",
					substitutions: [
						"Substitua o hambúrguer processado por um blend de carne magra caseiro (patinho) ou frango grelhado.",
						"Troque o pão branco por uma opção 100% integral para diminuir absorção glicêmica.",
						"Substitua o queijo cheddar por queijo minas frescal ou ricota.",
						"Adicione uma porção generosa de salada crua para ajudar na saciedade e no controle metabólico."
					]
				});
			} else {
				setAnalysisResult({
					isIdeal: true,
					calories: 410,
					ingredients: [
						{ name: "Peito de Frango Grelhado", calories: 165 },
						{ name: "Arroz Integral", calories: 110 },
						{ name: "Feijão Carioca", calories: 95 },
						{ name: "Salada de Folhas Verdes", calories: 40 }
					],
					feedback: "Excelente escolha! Esta refeição está bem equilibrada, rica em nutrientes e totalmente de acordo com seu perfil metabólico.",
					substitutions: []
				});
			}
		}, 3000);
	};

	const resetAnalysis = () => {
		setSelectedImage(null);
		setAnalysisResult(null);
		setIsCameraActive(false);
	};

	return (
		<LockedPageOverlay
			requiredPlan="TRANSFORMACAO"
			requiredPlanLabel="Transformação"
			userPlan={currentUser.plan}
			onUpgrade={(newPlan) => {
				const updated = { ...currentUser, plan: newPlan };
				localStorage.setItem("dietcase-user-profile", JSON.stringify(updated));
				window.dispatchEvent(new Event("dietcase-profile-updated"));
				triggerConfetti();
			}}
		>
			<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
				<div className="text-center sm:text-left">
					<h1 className="text-3xl font-bold tracking-tight">Menu Restaurante</h1>
					<p className="text-muted-foreground mt-2">
						Use a câmera ou envie uma foto do seu prato para a IA analisar se ele é seguro e ideal para você.
					</p>
				</div>

				<div className="grid gap-6 md:max-w-3xl mx-auto">
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Camera className="h-5 w-5" />
								Foto da Refeição ou Cardápio
							</CardTitle>
							<CardDescription>
								Tire uma foto agora mesmo ou envie da sua galeria.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 flex flex-col items-center justify-center space-y-4">
							{/* Esconde a área de upload/camera quando uma imagem já está selecionada */}
							{!selectedImage ? (
								<>
									{!isCameraActive ? (
										<div className="grid grid-cols-2 gap-4 w-full">
											{/* Opção Tirar Foto */}
											<Button 
												variant="outline" 
												className="h-24 flex flex-col items-center justify-center gap-2 border-dashed border-2 hover:bg-muted/50"
												onClick={startCamera}
											>
												<Camera className="h-6 w-6 text-muted-foreground" />
												<span className="font-medium text-muted-foreground text-sm">Tirar Foto</span>
											</Button>

											{/* Opção Enviar Foto */}
											<label className="h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
												<Upload className="h-6 w-6 text-muted-foreground mb-1" />
												<span className="font-medium text-muted-foreground text-sm">Enviar foto</span>
												<input 
													type="file" 
													className="hidden" 
													accept="image/*"
													onChange={handleImageUpload}
												/>
											</label>
										</div>
									) : (
										<div className="w-full space-y-4 animate-in fade-in duration-300">
											<div className="relative w-full rounded-xl overflow-hidden shadow-inner border bg-black/10 aspect-[4/3] flex items-center justify-center">
												<video 
													ref={videoRef}
													autoPlay 
													playsInline
													muted
													className="w-full h-full object-cover"
												/>
												<canvas ref={canvasRef} className="hidden" />
											</div>
											<div className="flex gap-2">
												<Button 
													className="flex-1" 
													onClick={capturePhoto} 
												>
													<Camera className="mr-2 h-4 w-4" />
													Tirar Foto
												</Button>
												<Button variant="outline" size="icon" onClick={stopCamera}>
													<X className="h-4 w-4" />
												</Button>
											</div>
										</div>
									)}
								</>
							) : (
								<div className="w-full space-y-4 animate-in zoom-in-95 duration-300">
									<div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner border bg-black/5">
										<img 
											src={selectedImage} 
											alt="Refeição Capturada" 
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex gap-2">
										<Button 
											className="flex-1" 
											onClick={analyzeMeal} 
											disabled={isAnalyzing || analysisResult !== null}
										>
											{isAnalyzing ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Analisando...
												</>
											) : (
												<>
													<ImageIcon className="mr-2 h-4 w-4" />
													Analisar Refeição
												</>
											)}
										</Button>
										<Button variant="outline" size="icon" onClick={resetAnalysis} disabled={isAnalyzing}>
											<RefreshCw className="h-4 w-4" />
										</Button>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					<Card className={`flex flex-col transition-opacity duration-500 max-h-min ${!analysisResult ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CheckCircle2 className="h-5 w-5" />
								Resultado da Análise
							</CardTitle>
							<CardDescription>
								Parecer nutricional adaptado às suas morbidades.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 space-y-6">
							{!analysisResult && !isAnalyzing && (
								<div className="h-full flex items-center justify-center text-muted-foreground text-sm py-12">
									Aguardando foto para iniciar a análise...
								</div>
							)}
							
							{isAnalyzing && (
								<div className="h-full flex flex-col items-center justify-center space-y-4 py-12">
									<Loader2 className="h-10 w-10 text-primary animate-spin" />
									<p className="text-sm font-medium animate-pulse text-muted-foreground text-center">
										Processando ingredientes e restrições com a IA...
									</p>
								</div>
							)}

							{analysisResult && (
								<div className="space-y-6 animate-in fade-in zoom-in duration-300">
									<div className={`p-4 rounded-lg flex items-start gap-4 ${
										analysisResult.isIdeal ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
									}`}>
										{analysisResult.isIdeal ? (
											<CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
										) : (
											<AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
										)}
										<div>
											<h3 className={`font-semibold ${analysisResult.isIdeal ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
												{analysisResult.isIdeal ? "Refeição Liberada!" : "Atenção Necessária"}
											</h3>
											<p className={`text-sm mt-1 leading-relaxed ${analysisResult.isIdeal ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
												{analysisResult.feedback}
											</p>
										</div>
									</div>

									<div className="flex flex-col gap-3 p-4 border rounded-lg bg-card shadow-sm">
										<div className="flex items-center gap-2 mb-2">
											<div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 shrink-0">
												<Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
											</div>
											<h4 className="font-semibold">Ingredientes e Composição</h4>
										</div>

										<div className="space-y-3">
											{analysisResult.ingredients.map((ing, idx) => (
												<div key={idx} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
													<span className="text-muted-foreground font-medium">{ing.name}</span>
													<span className="font-semibold text-foreground shrink-0">{ing.calories} kcal</span>
												</div>
											))}
										</div>
										
										<div className="flex items-center justify-between pt-4 mt-2 border-t">
											<p className="font-bold text-muted-foreground uppercase text-xs tracking-wider">Total Estimado</p>
											<p className="text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-400">
												{analysisResult.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span>
											</p>
										</div>
									</div>

									{!analysisResult.isIdeal && analysisResult.substitutions.length > 0 && (
										<div className="space-y-3">
											<h4 className="font-semibold flex items-center gap-2">
												<RefreshCw className="h-4 w-4" />
												Sugestões de Substituição
											</h4>
											<ul className="space-y-2">
												{analysisResult.substitutions.map((sub, idx) => (
													<li key={idx} className="text-sm bg-muted/50 p-3 rounded-md border-l-2 border-l-primary flex gap-2">
														<span className="text-primary font-bold mt-0.5">•</span> 
														<span>{sub}</span>
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</LockedPageOverlay>
	);
}
