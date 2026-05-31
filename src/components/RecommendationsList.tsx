 import { useState } from 'react';
 import { RecommendationCard } from './RecommendationCard';
 import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 import type { Recommendation, RecommendationType } from '@/types';
 
 interface RecommendationsListProps {
   recommendations: Recommendation[];
 }
 
 const recommendationTypes: (RecommendationType | 'Todos')[] = [
   'Todos',
   'Alimentação',
   'Hábitos',
   'Progresso',
   'Plano',
 ];
 
 export function RecommendationsList({ recommendations }: RecommendationsListProps) {
   const [selectedType, setSelectedType] = useState<string>('Todos');
 
   const filteredRecommendations =
     selectedType === 'Todos'
       ? recommendations
       : recommendations.filter((rec) => rec.type === selectedType);
 
   if (recommendations.length === 0) {
     return (
       <div className="text-center py-12">
         <p className="text-muted-foreground">Nenhuma recomendação disponível no momento.</p>
       </div>
     );
   }
 
   return (
     <div className="space-y-6">
       <Tabs value={selectedType} onValueChange={setSelectedType}>
         <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1 rounded-xl">
           {recommendationTypes.map((type) => (
             <TabsTrigger key={type} value={type} className="rounded-lg data-[state=active]:shadow-sm">
               {type}
             </TabsTrigger>
           ))}
         </TabsList>
 
         <TabsContent value={selectedType} className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {filteredRecommendations.map((rec) => (
               <RecommendationCard key={rec.id} recommendation={rec} />
             ))}
           </div>
           {filteredRecommendations.length === 0 && (
             <p className="text-center text-muted-foreground py-8">
               Nenhuma recomendação deste tipo.
             </p>
           )}
         </TabsContent>
       </Tabs>
     </div>
   );
 }