import { useRef } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Download, Sparkles, Activity, TrendingUp, Lightbulb, BookOpen } from 'lucide-react';
import { landingData } from '@/data/landing-data';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

const iconMap = {
  FileText,
  Calendar,
  Download,
  Sparkles,
  Activity,
  TrendingUp,
  Lightbulb,
  BookOpen
};

export function Benefits() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Benefícios</h2>
          <p className="text-muted-foreground font-medium">Tudo que você precisa em um só lugar</p>
        </div>

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {landingData.benefits.map((benefit) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <Card key={benefit.title} className="text-center group border-none shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full">
                <CardHeader className="card-padding">
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5 transform transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-fluid-xl font-bold mb-2">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-fluid-sm text-muted-foreground leading-relaxed font-medium">
                    {benefit.description}
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
