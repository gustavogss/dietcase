 import { useState, useEffect, useMemo } from 'react';
 import type { DietAdherence, Badge, AdherenceStats } from '@/types';
 import { format, startOfDay, differenceInDays, subDays } from 'date-fns';
 
 const STORAGE_KEY = 'dietcase-adherence';
 
 /**
  * Definição de badges disponíveis
  */
 const availableBadges: Omit<Badge, 'earned' | 'earnedAt'>[] = [
   {
     id: 'first-day',
     name: 'Primeiro Passo',
     description: 'Marcou seu primeiro dia seguindo a dieta',
     icon: 'Footprints',
     requirement: 1,
     type: 'total',
   },
   {
     id: 'streak-3',
     name: 'Em Sequência',
     description: '3 dias consecutivos seguindo a dieta',
     icon: 'Flame',
     requirement: 3,
     type: 'consecutive',
   },
   {
     id: 'streak-7',
     name: 'Uma Semana',
     description: '7 dias consecutivos seguindo a dieta',
     icon: 'Award',
     requirement: 7,
     type: 'consecutive',
   },
   {
     id: 'streak-14',
     name: 'Duas Semanas',
     description: '14 dias consecutivos seguindo a dieta',
     icon: 'Medal',
     requirement: 14,
     type: 'consecutive',
   },
   {
     id: 'streak-30',
     name: 'Um Mês',
     description: '30 dias consecutivos seguindo a dieta',
     icon: 'Trophy',
     requirement: 30,
     type: 'consecutive',
   },
   {
     id: 'total-10',
     name: 'Persistente',
     description: '10 dias seguindo a dieta (não consecutivos)',
     icon: 'Target',
     requirement: 10,
     type: 'total',
   },
   {
     id: 'total-30',
     name: 'Dedicado',
     description: '30 dias seguindo a dieta (não consecutivos)',
     icon: 'Star',
     requirement: 30,
     type: 'total',
   },
   {
     id: 'total-60',
     name: 'Comprometido',
     description: '60 dias seguindo a dieta (não consecutivos)',
     icon: 'Sparkles',
     requirement: 60,
     type: 'total',
   },
   {
     id: 'total-90',
     name: 'Mestre da Disciplina',
     description: '90 dias seguindo a dieta (não consecutivos)',
     icon: 'Crown',
     requirement: 90,
     type: 'total',
   },
 ];
 
 /**
  * Hook para gerenciar aderência à dieta
  */
 export function useAdherence() {
   const [adherenceData, setAdherenceData] = useState<DietAdherence[]>(() => {
     const saved = localStorage.getItem(STORAGE_KEY);
     if (saved) {
       try {
         return JSON.parse(saved);
       } catch {
         return [];
       }
     }
     return [];
   });
 
   // Persiste no localStorage
   useEffect(() => {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(adherenceData));
   }, [adherenceData]);
 
   // Calcula estatísticas e badges
   const stats: AdherenceStats = useMemo(() => {
     const sortedData = [...adherenceData].sort(
       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
     );
 
     const followedDays = sortedData.filter((d) => d.followed);
     const totalFollowed = followedDays.length;
     const totalDays = adherenceData.length;
 
     // Calcula sequência atual
     let currentStreak = 0;
     const today = startOfDay(new Date());
     let checkDate = today;
 
     while (true) {
       const dateStr = format(checkDate, 'yyyy-MM-dd');
       const dayData = adherenceData.find((d) => d.date === dateStr);
 
       if (dayData && dayData.followed) {
         currentStreak++;
         checkDate = subDays(checkDate, 1);
       } else if (dayData && !dayData.followed) {
         break;
       } else {
         // Dia não registrado - permite pular dias não registrados
         break;
       }
     }
 
     // Calcula maior sequência
     let longestStreak = 0;
     let tempStreak = 0;
 
     for (let i = 0; i < sortedData.length; i++) {
       if (sortedData[i].followed) {
         tempStreak++;
         if (tempStreak > longestStreak) {
           longestStreak = tempStreak;
         }
       } else {
         tempStreak = 0;
       }
     }
 
     // Calcula taxa de aderência
     const adherenceRate = totalDays > 0 ? (totalFollowed / totalDays) * 100 : 0;
 
     // Calcula badges conquistados
     const badges: Badge[] = availableBadges.map((badge) => {
       let earned = false;
 
       if (badge.type === 'consecutive') {
         earned = longestStreak >= badge.requirement;
       } else if (badge.type === 'total') {
         earned = totalFollowed >= badge.requirement;
       }
 
       // Se conquistou, busca data aproximada
       let earnedAt: string | undefined;
       if (earned) {
         if (badge.type === 'total' && followedDays[badge.requirement - 1]) {
           earnedAt = followedDays[badge.requirement - 1].date;
         } else if (badge.type === 'consecutive') {
           // Encontra a primeira vez que atingiu a sequência
           let streak = 0;
           for (let i = 0; i < sortedData.length; i++) {
             if (sortedData[i].followed) {
               streak++;
               if (streak === badge.requirement) {
                 earnedAt = sortedData[i].date;
                 break;
               }
             } else {
               streak = 0;
             }
           }
         }
       }
 
       return {
         ...badge,
         earned,
         earnedAt,
       };
     });
 
     return {
       currentStreak,
       longestStreak,
       totalDays,
       totalFollowed,
       adherenceRate,
       badges,
     };
   }, [adherenceData]);
 
   /**
    * Marca um dia como seguido ou não
    */
   const markDay = (date: Date, followed: boolean, notes?: string) => {
     const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
 
     setAdherenceData((prev) => {
       const existing = prev.find((d) => d.date === dateStr);
 
       if (existing) {
         return prev.map((d) =>
           d.date === dateStr ? { ...d, followed, notes } : d
         );
       }
 
       return [...prev, { date: dateStr, followed, notes }];
     });
   };
 
   /**
    * Verifica se um dia foi marcado e qual o status
    */
   const getDayStatus = (date: Date): DietAdherence | undefined => {
     const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
     return adherenceData.find((d) => d.date === dateStr);
   };
 
   /**
    * Retorna dados de um período específico
    */
   const getDataForPeriod = (startDate: Date, endDate: Date): DietAdherence[] => {
     return adherenceData.filter((d) => {
       const date = new Date(d.date);
       return date >= startOfDay(startDate) && date <= startOfDay(endDate);
     });
   };
 
   return {
     adherenceData,
     stats,
     markDay,
     getDayStatus,
     getDataForPeriod,
   };
 }