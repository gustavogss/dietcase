import { useRef } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { UserPlus, ClipboardList, Calendar, TrendingUp } from 'lucide-react';
import { landingData } from '@/data/landing-data';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

const iconMap = {
  UserPlus,
  ClipboardList,
  Calendar,
  TrendingUp
};

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Como funciona</h2>
          <p className="text-muted-foreground font-medium">Simples, rápido e eficiente</p>
        </div>

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 justify-items-center">
          {landingData.howItWorks.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <Card key={step.step} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full text-center">
                <CardHeader className="card-padding flex flex-col items-center">
                  {/* Step badge — inline, not absolute */}
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-md mb-4">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-fluid-lg font-bold leading-tight">{step.title}</h3>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
