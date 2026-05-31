 import { useMemo } from 'react';
 import type { UserProfile, UserProgress, Goal, Recommendation } from '@/types';
 import { getRecommendations, filterRecommendationsByType } from '@/services/recommendation.service';
 
 interface UseRecommendationsProps {
   profile: UserProfile;
   progress: UserProgress;
   goals: Goal[];
   filterType?: string;
 }
 
 /**
  * Hook customizado para gerenciar recomendações
  */
 export function useRecommendations({
   profile,
   progress,
   goals,
   filterType,
 }: UseRecommendationsProps) {
   const recommendations = useMemo(() => {
     const allRecommendations = getRecommendations(profile, progress, goals);
     return filterRecommendationsByType(allRecommendations, filterType);
   }, [profile, progress, goals, filterType]);
 
   const highPriority = useMemo(
     () => recommendations.filter((rec) => rec.priority === 'Alta'),
     [recommendations]
   );
 
   const topRecommendations = useMemo(
     () => recommendations.slice(0, 3),
     [recommendations]
   );
 
   return {
     recommendations,
     highPriority,
     topRecommendations,
     total: recommendations.length,
   };
 }