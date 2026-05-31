 import { RecommendationsList } from '@/components/RecommendationsList';
 import { useRecommendations } from '@/hooks/useRecommendations';
 import { mockUsers, mockProgress, mockGoals } from '@/data/mocks';
 
 export default function Recommendations() {
   const currentUser = mockUsers[0];
   const { recommendations, total, highPriority } = useRecommendations({
     profile: currentUser,
     progress: mockProgress,
     goals: mockGoals,
   });
 
   return (
     <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight break-words">
          Recomendações Personalizadas
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed break-words">
           {total} recomendações ativas • {highPriority.length} de alta prioridade
         </p>
       </div>
 
       <RecommendationsList recommendations={recommendations} />
     </div>
   );
 }