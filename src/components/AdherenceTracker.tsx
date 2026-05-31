 import { useState } from 'react';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Calendar } from '@/components/ui/calendar';
 import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
 import { Textarea } from '@/components/ui/textarea';
 import { Badge } from '@/components/ui/badge';
 import { useAdherence } from '@/hooks/useAdherence';
 import { CalendarIcon, Check, X, Flame, TrendingUp } from 'lucide-react';
 import { format, startOfDay, isToday, isFuture } from 'date-fns';
 import { ptBR } from 'date-fns/locale';
 import { cn } from '@/lib/utils';
 import { toast } from '@/hooks/use-toast';
 
 export function AdherenceTracker() {
   const { stats, markDay, getDayStatus } = useAdherence();
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [notes, setNotes] = useState('');
   const [isOpen, setIsOpen] = useState(false);
 
   const dayStatus = getDayStatus(selectedDate);
 
   const handleMarkDay = (followed: boolean) => {
     if (isFuture(startOfDay(selectedDate))) {
       toast({
         title: 'Data inválida',
         description: 'Não é possível marcar dias futuros.',
         variant: 'destructive',
       });
       return;
     }
 
     markDay(selectedDate, followed, notes);
     setNotes('');
     setIsOpen(false);
 
     toast({
       title: followed ? 'Dia marcado! 🎉' : 'Dia registrado',
       description: followed
         ? 'Continue assim! Sua sequência está crescendo.'
         : 'Não desanime! Amanhã é um novo dia.',
     });
   };
 
   return (
    <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="p-4 sm:p-8 pb-4 text-center">
          <CardTitle className="flex flex-col items-center gap-3 text-fluid-xl font-bold">
            <CalendarIcon className="h-6 w-6 text-primary shrink-0" />
            Aderência à Dieta
          </CardTitle>
          <CardDescription className="text-fluid-sm font-medium">Marque os dias que seguiu suas restrições alimentares</CardDescription>
        </CardHeader>
       <CardContent className="space-y-6">
         {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
            <div className="space-y-1 text-center">
              <p className="text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">Sequência Atual</p>
              <div className="flex items-center justify-center gap-2">
                <Flame className="h-5 w-5 text-accent" />
                <p className="text-fluid-3xl font-black text-foreground tracking-tighter">{stats.currentStreak}</p>
              </div>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">Maior Sequência</p>
              <p className="text-fluid-3xl font-black text-foreground tracking-tighter">{stats.longestStreak}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">Total de Dias</p>
              <p className="text-fluid-3xl font-black text-foreground tracking-tighter">{stats.totalFollowed}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-fluid-xs font-bold uppercase tracking-wider text-muted-foreground">Taxa de Aderência</p>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <p className="text-fluid-3xl font-black text-foreground tracking-tighter">{stats.adherenceRate.toFixed(0)}%</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 p-4 sm:p-8 pt-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-auto py-4 flex-col sm:flex-row justify-center text-center font-bold text-fluid-base rounded-xl shadow-sm hover:shadow-md transition-all gap-3">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                    {format(selectedDate, 'PPP', { locale: ptBR })}
                  </div>
                  {dayStatus && (
                    <Badge variant={dayStatus.followed ? 'default' : 'secondary'} className="px-4 py-1">
                      {dayStatus.followed ? 'Seguiu' : 'Não seguiu'}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
             <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                 mode="single"
                 selected={selectedDate}
                 onSelect={(date) => date && setSelectedDate(date)}
                 disabled={(date) => isFuture(startOfDay(date))}
                 initialFocus
                 className={cn('p-3 pointer-events-auto')}
                 modifiers={{
                   followed: (date) => {
                     const status = getDayStatus(date);
                     return status?.followed === true;
                   },
                   notFollowed: (date) => {
                     const status = getDayStatus(date);
                     return status?.followed === false;
                   },
                 }}
                 modifiersStyles={{
                   followed: {
                     backgroundColor: 'hsl(var(--success))',
                     color: 'white',
                     fontWeight: 'bold',
                   },
                   notFollowed: {
                     backgroundColor: 'hsl(var(--destructive))',
                     color: 'white',
                     opacity: 0.7,
                   },
                 }}
               />
             </PopoverContent>
           </Popover>
 
           {/* Status do dia selecionado */}
           {dayStatus && (
             <div className="p-4 border rounded-lg space-y-2 text-center">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                 <p className="font-medium">
                   {isToday(new Date(dayStatus.date)) ? 'Hoje' : format(new Date(dayStatus.date), 'dd/MM/yyyy')}
                 </p>
                 <Badge variant={dayStatus.followed ? 'default' : 'secondary'}>
                   {dayStatus.followed ? 'Seguiu a dieta' : 'Não seguiu'}
                 </Badge>
               </div>
               {dayStatus.notes && (
                 <p className="text-fluid-xs text-muted-foreground">{dayStatus.notes}</p>
               )}
             </div>
           )}
 
           {/* Ações */}
           {!isFuture(startOfDay(selectedDate)) && (
             <div className="space-y-4">
               <Textarea
                 placeholder="Adicione uma nota sobre este dia (opcional)"
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 rows={2}
                 className="text-fluid-sm"
               />
               <div className="flex flex-col sm:flex-row gap-3">
                 <Button onClick={() => handleMarkDay(true)} className="flex-1 gap-2 h-14 text-fluid-sm font-bold">
                   <Check className="h-4 w-4" />
                   Segui a Dieta
                 </Button>
                 <Button
                   onClick={() => handleMarkDay(false)}
                   variant="outline"
                   className="flex-1 gap-2 h-14 text-fluid-sm font-bold border-2"
                 >
                   <X className="h-4 w-4" />
                   Não Segui
                 </Button>
               </div>
             </div>
           )}
         </div>
       </CardContent>
     </Card>
   );
 }