import { useEffect, useMemo, useState } from "react";
import { Bot, HeartPulse, Send } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useUserAccess } from "@/hooks/useUserAccess";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { morbidities } from "@/data/mocks";
import { morbidityRestrictions } from "@/services/recommendation.service";
import { PlanType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { db, auth } from "@/lib/firebase";
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
	addDoc,
	serverTimestamp,
	doc,
	updateDoc,
	getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type ChatMsg = { role: "user" | "assistant"; content: string };

type Conversation = { id: string; title: string | null; updated_at: string };

const QUICK_ACTIONS = [
	"Posso comer tapioca hoje?",
	"Qual fruta tem menos açúcar?",
	"Substituir pão por o quê?",
] as const;

export default function VirtualNutri() {
	const navigate = useNavigate();
	const { accessLevel, effectivePlan, profile, isAuthenticated } =
		useUserAccess();

	const [conversationId, setConversationId] = useState<string | null>(null);
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [isLoadingHistory, setIsLoadingHistory] = useState(false);

	const [messages, setMessages] = useState<ChatMsg[]>([]);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isCreatingConversation, setIsCreatingConversation] = useState(false);

	const isVisitor = accessLevel === "VISITOR" || !isAuthenticated;
	const isPremium = effectivePlan === "Transformação";
	const canChat = !isVisitor && isPremium;

	const morbidityNames = useMemo(() => {
		const map = new Map(morbidities.map((m) => [m.id, m.name] as const));
		return (profile.morbidities ?? [])
			.map((id) => map.get(id))
			.filter(Boolean) as string[];
	}, [profile.morbidities]);

	const restrictedFoods = useMemo(() => {
		const foods = new Set<string>();
		for (const id of profile.morbidities ?? []) {
			const r = morbidityRestrictions[id];
			// biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
			r?.restrictedFoods?.slice(0, 8).forEach((f) => foods.add(f));
		}
		return Array.from(foods);
	}, [profile.morbidities]);

	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUserId(user ? user.uid : null);
		});
		return () => unsubscribe();
	}, []);

	const loadMessagesForConversation = async (convId: string) => {
		const q = query(
			collection(db, "nutri_messages"),
			where("conversationId", "==", convId),
			orderBy("createdAt", "asc"),
		);

		const snapshot = await getDocs(q);
		const msgs = snapshot.docs.map((doc) => doc.data() as ChatMsg);
		setMessages(
			msgs.length > 0
				? msgs
				: [
					{
						role: "assistant",
						content: "Olá! Como posso ajudar na sua nutrição hoje?",
					},
				],
		);
	};

	useEffect(() => {
		if (!canChat || !userId) return;

		setIsLoadingHistory(true);
		const q = query(
			collection(db, "nutri_conversations"),
			where("userId", "==", userId),
			orderBy("updatedAt", "desc"),
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const convs = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Conversation[];
			setConversations(convs);
			setIsLoadingHistory(false);
		});

		return () => unsubscribe();
	}, [canChat, userId]);

	const ensureConversation = async (uid: string, firstTitle?: string) => {
		if (conversationId) return conversationId;

		const docRef = await addDoc(collection(db, "nutri_conversations"), {
			userId: uid,
			title: firstTitle?.slice(0, 80) ?? "Nova conversa",
			updatedAt: serverTimestamp(),
		});

		setConversationId(docRef.id);
		return docRef.id;
	};

	const sendMessage = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || isSending || !userId) return;

		if (!canChat) {
			return;
		}

		const newUserMsg: ChatMsg = { role: "user", content: trimmed };
		setMessages((prev) => [...prev, newUserMsg]);
		setInput("");
		setIsSending(true);

		try {
			const convId = await ensureConversation(userId, trimmed);

			await addDoc(collection(db, "nutri_messages"), {
				conversationId: convId,
				role: "user",
				content: trimmed,
				createdAt: serverTimestamp(),
			});

			await updateDoc(doc(db, "nutri_conversations", convId), {
				updatedAt: serverTimestamp(),
			});

			/*
						const chat = geminiModel.startChat({
							history: messages.map((m) => ({
								role: m.role === "assistant" ? "model" : "user",
								parts: [{ text: m.content }],
							})),
							generationConfig: {
								maxOutputTokens: 1000,
							},
						});
			
						const result = await chat.sendMessage(trimmed);
						const responseText = result.response.text();
			*/
			const responseText = "IA Temporariamente desativada para manutenção.";

			const assistantMsg: ChatMsg = {
				role: "assistant",
				content: responseText,
			};

			await addDoc(collection(db, "nutri_messages"), {
				conversationId: convId,
				role: "assistant",
				content: responseText,
				createdAt: serverTimestamp(),
			});

			setMessages((prev) => [...prev, assistantMsg]);
		} catch (e) {
			console.error("Chat error:", e);
			toast({
				title: "Erro no chat",
				description: "Não foi possível processar sua mensagem.",
				variant: "destructive",
			});
		} finally {
			setIsSending(false);
		}
	};

	const handleQuickAction = (q: string) => {
		void sendMessage(q);
	};

	const handleSelectConversation = async (convId: string) => {
		if (!canChat || isSending || isLoadingHistory) return;
		if (convId === conversationId) return;

		setIsLoadingHistory(true);
		try {
			setConversationId(convId);
			await loadMessagesForConversation(convId);
		} catch {
			// ignore
		} finally {
			setIsLoadingHistory(false);
		}
	};

	const handleNewConversation = async () => {
		if (!canChat || isCreatingConversation || isSending) return;

		setIsCreatingConversation(true);
		try {
			setConversationId(null);
			setMessages([
				{
					role: "assistant",
					content: "Olá! Como posso ajudar na sua nutrição hoje?",
				},
			]);
			setInput("");
		} finally {
			setIsCreatingConversation(false);
		}
	};

	const handleUpgradePlan = (newPlan: PlanType) => {
		localStorage.setItem(
			"dietcase-user-profile",
			JSON.stringify({ ...profile, plan: newPlan }),
		);
		window.dispatchEvent(new Event("dietcase-profile-updated"));
	};

	const emptyStateText =
		messages.length === 0 ? "Nenhuma conversa ativa no momento…" : "";

	return (
		<LockedPageOverlay
			requiredPlan="Transformação"
			userPlan={effectivePlan}
			onUpgrade={handleUpgradePlan}
		>
			<div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
				<div className="text-center sm:text-left">
					<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight break-words">
						Assistente Nutricional
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed break-words">
						Atendimento especializado via IA 24/7
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<Card className="md:col-span-2 min-h-[500px] flex flex-col">
						<CardHeader className="border-b">
							<CardTitle className="flex items-center gap-2">
								<Bot className="h-5 w-5 text-primary" />
								Chat Integrado
							</CardTitle>
							<CardDescription>
								Educativo e genérico. Não prescreve dietas nem substitui
								profissionais.
							</CardDescription>
						</CardHeader>

						<CardContent className="flex-1 p-0">
							<ScrollArea className="h-[380px] px-4 py-4">
								{isLoadingHistory && messages.length === 0 ? (
									<div className="h-full flex items-center justify-center text-muted-foreground italic">
										Carregando histórico...
									</div>
								) : emptyStateText ? (
									<div className="h-full flex items-center justify-center text-muted-foreground italic">
										{emptyStateText}
									</div>
								) : (
									<div className="space-y-3">
										{messages.map((m, idx) => (
											<div
												key={idx}
												className={
													m.role === "user"
														? "ml-auto max-w-[85%] rounded-2xl bg-primary/10 border border-primary/10 px-4 py-3"
														: "mr-auto max-w-[85%] rounded-2xl bg-muted/50 border border-border px-4 py-3"
												}
											>
												<p className="text-sm leading-relaxed whitespace-pre-wrap">
													{m.content}
												</p>
											</div>
										))}
									</div>
								)}
							</ScrollArea>
						</CardContent>

						<div className="p-4 border-t bg-muted/50">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									void sendMessage(input);
								}}
								className="flex items-center gap-2"
							>
								<Input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Digite sua dúvida aqui…"
									disabled={isSending}
								/>
								<Button
									type="submit"
									disabled={isSending || !input.trim()}
									aria-label="Enviar"
								>
									<Send className="h-4 w-4" />
								</Button>
							</form>
						</div>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle className="text-lg">Conversas</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={handleNewConversation}
									disabled={!canChat || isCreatingConversation}
								>
									Nova conversa
								</Button>
							</CardHeader>
							<CardContent className="p-0">
								<ScrollArea className="max-h-[220px] px-3 pb-3">
									{conversations.length === 0 ? (
										<p className="px-1 pt-2 text-xs text-muted-foreground">
											{canChat
												? "Você ainda não tem conversas."
												: "Disponível apenas em planos pagos."}
										</p>
									) : (
										<div className="space-y-1 pt-2">
											{conversations.map((c, idx) => {
												const label = c.title?.trim()
													? c.title.trim()
													: `Conversa ${conversations.length - idx}`;
												const selected = c.id === conversationId;
												return (
													<Button
														key={c.id}
														type="button"
														variant="ghost"
														className={
															"w-full justify-start truncate " +
															(selected
																? "bg-accent text-accent-foreground"
																: "")
														}
														onClick={() => void handleSelectConversation(c.id)}
														disabled={!canChat}
														aria-current={selected ? "page" : undefined}
													>
														{label}
													</Button>
												);
											})}
										</div>
									)}
								</ScrollArea>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Atendimento Rápido</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{QUICK_ACTIONS.map((q) => (
									<Button
										key={q}
										type="button"
										variant="outline"
										className="w-full justify-start whitespace-normal h-auto py-3"
										onClick={() => handleQuickAction(q)}
										disabled={!canChat}
									>
										{q}
									</Button>
								))}
							</CardContent>
						</Card>

						<Card className="bg-primary/5 border-primary/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-primary">
									<HeartPulse className="h-5 w-5" />
									Dica do Dia
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm italic">
									"Beber um copo de água morna com limão pela manhã ajuda na
									digestão e equilíbrio do pH."
								</p>
								<p className="text-xs text-muted-foreground mt-3">
									Conteúdo educativo; em caso de dúvidas de saúde, procure
									acompanhamento profissional.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</LockedPageOverlay>
	);
}
