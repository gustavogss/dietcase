import {
	doc,
	setDoc,
	getDoc,
	collection,
	query,
	where,
	orderBy,
	getDocs,
	serverTimestamp,
	limit,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { OrchestrationResponse, WeeklyMenu } from "@/types";

export interface PersistedPlanDocument {
	id: string;
	userId: string;
	menu: WeeklyMenu;
	auditLog: OrchestrationResponse["auditLog"];
	warnings: string[];
	isFallback: boolean;
	createdAt: unknown; // Timestamp do Firestore
}

class NutritionalPlanService {
	private readonly collectionName = "cardapios";

	/**
	 * Salva um plano alimentar gerado/orquestrado no Firestore para o usuário autenticado
	 */
	async savePlan(orchestrationResult: OrchestrationResponse): Promise<string> {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			throw new Error("[NutritionalPlanService] Usuário não autenticado");
		}

		const planDocRef = doc(collection(db, this.collectionName));

		const planData: PersistedPlanDocument = {
			id: planDocRef.id,
			userId: currentUser.uid,
			menu: orchestrationResult.menu,
			auditLog: orchestrationResult.auditLog,
			warnings: orchestrationResult.warnings,
			isFallback: orchestrationResult.isFallback,
			createdAt: serverTimestamp(),
		};

		await setDoc(planDocRef, planData);
		return planDocRef.id;
	}

	/**
	 * Recupera o plano alimentar mais recente do usuário no Firestore
	 */
	async getUserLatestPlan(userId: string): Promise<PersistedPlanDocument | null> {
		if (!userId) return null;

		try {
			const q = query(
				collection(db, this.collectionName),
				where("userId", "==", userId),
				orderBy("createdAt", "desc"),
				limit(1),
			);

			const snapshot = await getDocs(q);
			if (snapshot.empty) {
				return null;
			}

			const docData = snapshot.docs[0].data();
			return {
				id: snapshot.docs[0].id,
				userId: docData.userId,
				menu: docData.menu,
				auditLog: docData.auditLog || [],
				warnings: docData.warnings || [],
				isFallback: Boolean(docData.isFallback),
				createdAt: docData.createdAt,
			};
		} catch (error) {
			console.error("[NutritionalPlanService] Erro ao carregar plano recente:", error);
			return null;
		}
	}

	/**
	 * Recupera todo o histórico de planos alimentares salvos pelo usuário
	 */
	async getPlanHistory(userId: string): Promise<PersistedPlanDocument[]> {
		if (!userId) return [];

		try {
			const q = query(
				collection(db, this.collectionName),
				where("userId", "==", userId),
				orderBy("createdAt", "desc"),
			);

			const snapshot = await getDocs(q);
			return snapshot.docs.map((d) => {
				const data = d.data();
				return {
					id: d.id,
					userId: data.userId,
					menu: data.menu,
					auditLog: data.auditLog || [],
					warnings: data.warnings || [],
					isFallback: Boolean(data.isFallback),
					createdAt: data.createdAt,
				};
			});
		} catch (error) {
			console.error("[NutritionalPlanService] Erro ao carregar histórico de planos:", error);
			return [];
		}
	}
}

export const nutritionalPlanService = new NutritionalPlanService();
