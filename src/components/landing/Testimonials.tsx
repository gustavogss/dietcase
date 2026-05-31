import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { landingData } from '@/data/landing-data';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Depoimentos</h2>
          <p className="text-muted-foreground font-medium">Exemplos de relatos por morbidade</p>
        </div>

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {landingData.testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="card-padding flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={testimonial.photo.src}
                    alt={testimonial.photo.alt}
                    loading="lazy"
                    className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover ring-4 ring-background shadow-lg"
                  />
                </div>
                <p className="text-fluid-sm text-muted-foreground italic mb-6 leading-relaxed text-center font-medium">
                  "{testimonial.text}"
                </p>
                <div className="text-center space-y-1">
                  <p className="text-fluid-lg font-bold">{testimonial.name}</p>
                  <p className="text-fluid-xs font-semibold text-primary">
                    {testimonial.age} anos • {testimonial.condition}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}