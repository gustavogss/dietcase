import { useEffect, useState } from "react";
import type { UserRestriction } from "@/types";
import { userService } from "@/services/userService";

export function useRestrictions() {
  const [restrictions, setRestrictions] = useState<UserRestriction[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadRestrictions() {
      try {
        const user = await userService.getCurrentUser();
        if (isMounted) setRestrictions(user?.restrictions ?? []);
      } catch (error) {
        console.error("Erro ao carregar restrições do Firestore", error);
      }
    }

    void loadRestrictions();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveRestrictions = async (newRestrictions: UserRestriction[]) => {
    await userService.updatePersonalization({ restrictions: newRestrictions });
    setRestrictions(newRestrictions);
  };

  const addRestriction = async (
    ingredient: string,
    type: UserRestriction["type"],
  ) => {
    const normalizedIngredient = ingredient.trim().toLowerCase();
    const exists = restrictions.some(
      (restriction) => restriction.ingredient === normalizedIngredient,
    );

    if (!exists) {
      await saveRestrictions([
        ...restrictions,
        {
          ingredient: normalizedIngredient,
          type,
          addedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const removeRestriction = async (ingredient: string) => {
    await saveRestrictions(
      restrictions.filter(
        (restriction) => restriction.ingredient !== ingredient.toLowerCase(),
      ),
    );
  };

  const hasRestriction = (ingredient: string): boolean => {
    return restrictions.some((restriction) =>
      ingredient.toLowerCase().includes(restriction.ingredient),
    );
  };

  const getRestriction = (ingredient: string): UserRestriction | undefined => {
    return restrictions.find((restriction) =>
      ingredient.toLowerCase().includes(restriction.ingredient),
    );
  };

  return {
    restrictions,
    addRestriction,
    removeRestriction,
    hasRestriction,
    getRestriction,
  };
}
