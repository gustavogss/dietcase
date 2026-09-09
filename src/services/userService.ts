import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { FirebaseUser, PlanType } from "@/types";

class UserService {
  private readonly usersCollection = "users";

  // Criar novo usuário no Firestore
  async createUser(userData: Omit<FirebaseUser, "createdAt">): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado");
    }

    const userDoc: Omit<FirebaseUser, "createdAt"> & { createdAt: unknown } = {
      ...userData,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, this.usersCollection, auth.currentUser.uid), userDoc);
  }

  // Obter dados do usuário
  async getUser(userId: string): Promise<FirebaseUser | null> {
    const userDoc = await getDoc(doc(db, this.usersCollection, userId));

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as FirebaseUser;
  }

  async getCurrentUser(): Promise<FirebaseUser | null> {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado");
    }

    return this.getUser(auth.currentUser.uid);
  }

  // Atualizar plano do usuário
  async updatePlan(plan: PlanType): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado");
    }

    const updateData: Partial<FirebaseUser> = { plan };

    // Se for plano TRIAL, adicionar datas
    if (plan === "TRIAL") {
      const now = new Date();
      const trialExpires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias

      updateData.trialStartDate = now.toISOString();
      updateData.trialExpiresAt = trialExpires.toISOString();
    }

    await updateDoc(
      doc(db, this.usersCollection, auth.currentUser.uid),
      updateData,
    );
  }

  // Verificar se usuário existe
  async userExists(userId: string): Promise<boolean> {
    const userDoc = await getDoc(doc(db, this.usersCollection, userId));
    return userDoc.exists();
  }

  // Criar usuário com trial automático
  async createUserWithTrial(
    userData: Omit<
      FirebaseUser,
      "plan" | "createdAt" | "trialStartDate" | "trialExpiresAt"
    >,
  ): Promise<void> {
    const now = new Date();
    const trialExpires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias

    await this.createUser({
      ...userData,
      plan: "TRIAL",
      trialStartDate: now.toISOString(),
      trialExpiresAt: trialExpires.toISOString(),
    });
  }

  // Obter todos os usuários (admin)
  async getAllUsers(): Promise<FirebaseUser[]> {
    const usersQuery = query(collection(db, this.usersCollection));
    const querySnapshot = await getDocs(usersQuery);

    return querySnapshot.docs.map((doc) => doc.data() as FirebaseUser);
  }

  // Atualizar dados básicos do usuário
  async updateUser(
    userData: Partial<Omit<FirebaseUser, "createdAt" | "plan">>,
  ): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado");
    }

    await updateDoc(
      doc(db, this.usersCollection, auth.currentUser.uid),
      userData,
    );
  }

  async updatePersonalization(
    data: Partial<Omit<FirebaseUser, "createdAt" | "plan" | "email">>,
  ): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado");
    }

    await updateDoc(doc(db, this.usersCollection, auth.currentUser.uid), data);
  }
}

export const userService = new UserService();
