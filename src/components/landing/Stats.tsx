import { useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { landingData } from "@/data/landing-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPrefersReducedMotion, LANDING_ANIM } from "@/lib/landing-animations";

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMemo(() => {
    return getPrefersReducedMotion();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const numbers = Array.from(el.querySelectorAll<HTMLElement>("[data-stat-value]"));
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-stat-card]"));

    const run = () => {
      // Entrance animation for cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: LANDING_ANIM.revealY },
        {
          opacity: 1,
          y: 0,
          duration: LANDING_ANIM.duration,
          ease: LANDING_ANIM.easeIn,
          stagger: LANDING_ANIM.stagger,
        },
      );

      // Count-up animation
      numbers.forEach((node) => {
        const targetRaw = node.getAttribute("data-stat-value") ?? "0";
        const match = targetRaw.match(/(\d+)/);
        const target = match ? Number(match[1]) : 0;
        const hasPlus = targetRaw.trim().startsWith("+");
        const hasPercent = targetRaw.includes("%");

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: LANDING_ANIM.statCountDuration,
          ease: LANDING_ANIM.easeIn,
          onUpdate: () => {
            const rounded = Math.round(obj.val);
            node.textContent = `${hasPlus ? "+" : ""}${rounded}${hasPercent ? "%" : ""}`;
          },
        });
      });
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: run,
    });

    return () => st.kill();
  }, [prefersReducedMotion]); // Ref is stable, no need to depend on it.

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-primary text-primary-foreground"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="section-heading">
          <h2 className="text-primary-foreground">Resultados Reais</h2>
          <p className="text-primary-foreground/90 font-medium">Dados baseados em nossa comunidade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {landingData.stats.map((stat) => (
            <Card
              key={stat.label}
              data-stat-card
              className="bg-primary-foreground/5 border-none backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-primary-foreground/10 w-full"
            >
              <CardContent className="card-padding py-10 sm:py-14 text-center space-y-3">
                <div
                  data-stat-value={stat.value}
                  className="text-fluid-4xl sm:text-5xl md:text-6xl font-black text-primary-foreground leading-none tracking-tighter"
                >
                  0%
                </div>
                <p className="text-fluid-base font-medium text-primary-foreground/90">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}