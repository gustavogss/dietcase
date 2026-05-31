import { useState, useEffect } from 'react';
import type { UserRestriction } from '@/types';

const RESTRICTIONS_KEY = 'dietcase-user-restrictions';

export function useRestrictions() {
  const [restrictions, setRestrictions] = useState<UserRestriction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(RESTRICTIONS_KEY);
    if (saved) {
      setRestrictions(JSON.parse(saved));
    }
  }, []);

  const saveRestrictions = (newRestrictions: UserRestriction[]) => {
    setRestrictions(newRestrictions);
    localStorage.setItem(RESTRICTIONS_KEY, JSON.stringify(newRestrictions));
  };

  const addRestriction = (ingredient: string, type: UserRestriction['type']) => {
    const newRestriction: UserRestriction = {
      ingredient: ingredient.toLowerCase(),
      type,
      addedAt: new Date().toISOString(),
    };
    
    // Evitar duplicatas
    const exists = restrictions.some(
      (r) => r.ingredient === newRestriction.ingredient
    );
    
    if (!exists) {
      saveRestrictions([...restrictions, newRestriction]);
    }
  };

  const removeRestriction = (ingredient: string) => {
    saveRestrictions(
      restrictions.filter((r) => r.ingredient !== ingredient.toLowerCase())
    );
  };

  const hasRestriction = (ingredient: string): boolean => {
    return restrictions.some(
      (r) => ingredient.toLowerCase().includes(r.ingredient)
    );
  };

  const getRestriction = (ingredient: string): UserRestriction | undefined => {
    return restrictions.find((r) => 
      ingredient.toLowerCase().includes(r.ingredient)
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