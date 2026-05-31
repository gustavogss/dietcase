import { useRef } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Droplet, Wheat, Nut, Milk, Heart, Weight, Users } from 'lucide-react';
import { landingData } from '@/data/landing-data';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

const iconMap = {
  Activity,
  Droplet,
  Wheat,
  Nut,
  Milk,
  Heart,
  Weight,
  Users
};

export function TargetAudience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-padding bg-muted/30">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Para quem é o DietCase</h2>
          <p className="text-muted-foreground font-medium">Soluções específicas para cada necessidade</p>
        </div>

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {landingData.targetAudience.map((audience) => {
            const Icon = iconMap[audience.icon as keyof typeof iconMap];
            return (
              <Card key={audience.title} className="group hover:shadow-2xl transition-all duration-300 border-none shadow-sm hover:-translate-y-1 w-full">
                <CardHeader className="card-padding flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-fluid-xl font-bold mb-2">
                    {audience.title}
                  </CardTitle>
                  <CardDescription className="text-fluid-sm text-muted-foreground leading-relaxed font-medium">
                    {audience.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
