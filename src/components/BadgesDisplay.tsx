import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { useAdherence } from '@/hooks/useAdherence';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function BadgesDisplay() {
  const { stats } = useAdherence();

  const earnedBadges = stats.badges.filter((b) => b.earned);
  const notEarnedBadges = stats.badges.filter((b) => !b.earned);

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="p-8 pb-4 text-center">
        <CardTitle className="flex flex-col items-center justify-center gap-3 text-xl font-bold">
          <Icons.Award className="h-6 w-6 text-primary shrink-0" />
          Conquistas
        </CardTitle>
        <CardDescription className="text-base font-medium">
          {earnedBadges.length} de {stats.badges.length} badges conquistados
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        {/* Badges Conquistados */}
        {earnedBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground text-center">Conquistados 🎉</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnedBadges.map((badge) => {
                const IconComponent =
                  (Icons[badge.icon as keyof typeof Icons] as LucideIcon) || Icons.Award;

                return (
                  <div
                    key={badge.id}
                    className="p-6 border rounded-2xl bg-primary/5 border-primary/10 transition-colors hover:bg-primary/10"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="font-bold text-lg">{badge.name}</div>
                        <p className="text-sm text-muted-foreground font-medium">{badge.description}</p>
                        {badge.earnedAt && (
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wide">
                            Conquistado em {format(new Date(badge.earnedAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Badges Bloqueados */}
        {notEarnedBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground text-center">A Conquistar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notEarnedBadges.map((badge) => {
                const IconComponent =
                  (Icons[badge.icon as keyof typeof Icons] as LucideIcon) || Icons.Award;

                // Calcula progresso
                let progress = 0;
                if (badge.type === 'consecutive') {
                  progress = Math.min((stats.currentStreak / badge.requirement) * 100, 100);
                } else if (badge.type === 'total') {
                  progress = Math.min((stats.totalFollowed / badge.requirement) * 100, 100);
                }

                return (
                  <div
                    key={badge.id}
                    className="p-6 border rounded-2xl opacity-60 hover:opacity-100 transition-all hover:bg-muted/30"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-3 rounded-xl bg-muted">
                        <IconComponent className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0 w-full">
                        <div className="font-bold text-lg flex flex-col items-center justify-center gap-2">
                          {badge.name}
                          <BadgeUI variant="secondary" className="text-[10px] uppercase font-bold px-2">
                            Bloqueado
                          </BadgeUI>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">{badge.description}</p>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-muted-foreground font-bold uppercase tracking-wider">Progresso</span>
                            <span className="font-black text-primary">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-primary transition-all duration-1000"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {earnedBadges.length === 0 && (
          <div className="text-center py-8">
            <Icons.Lock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Comece a marcar seus dias para conquistar badges!
          </p>
           </div>
         )}
    </CardContent>
     </Card >
   );
}