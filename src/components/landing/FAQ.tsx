import { useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { landingData } from '@/data/landing-data';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

export function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Perguntas Frequentes</h2>
          <p className="text-muted-foreground font-medium">Tire suas dúvidas</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4" data-stagger>
          {landingData.faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-muted/30 px-5 sm:px-6 rounded-xl overflow-hidden transition-all duration-300 hover:bg-muted/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5">
              <AccordionTrigger className="text-left text-fluid-lg font-bold hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-fluid-sm text-muted-foreground leading-relaxed pb-5 font-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}