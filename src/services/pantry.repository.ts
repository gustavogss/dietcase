import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { PantryItem } from "@/types";

const pantryCollection = "pantryItems";

function requireAuthenticatedUser(): string {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("[PantryRepository] Usuário não autenticado");
  }
  return userId;
}

function toPantryItem(id: string, data: Omit<PantryItem, "id">): PantryItem {
  return { ...data, id };
}

export async function listPantryItems(): Promise<PantryItem[]> {
  const userId = requireAuthenticatedUser();
  const snapshot = await getDocs(
    query(collection(db, pantryCollection), where("userId", "==", userId)),
  );

  return snapshot.docs.map((item) =>
    toPantryItem(item.id, item.data() as Omit<PantryItem, "id">),
  );
}

export async function addPantryItem(
  item: Omit<PantryItem, "id" | "userId">,
): Promise<PantryItem> {
  const userId = requireAuthenticatedUser();
  const itemRef = doc(collection(db, pantryCollection));
  const data = { ...item, userId };

  await setDoc(itemRef, data);
  return toPantryItem(itemRef.id, data);
}

export async function updatePantryItem(
  itemId: string,
  item: Partial<Omit<PantryItem, "id" | "userId">>,
): Promise<void> {
  const userId = requireAuthenticatedUser();
  await updateDoc(doc(db, pantryCollection, itemId), {
    ...item,
    userId,
  });
}

export async function deletePantryItem(itemId: string): Promise<void> {
  requireAuthenticatedUser();
  await deleteDoc(doc(db, pantryCollection, itemId));
}
