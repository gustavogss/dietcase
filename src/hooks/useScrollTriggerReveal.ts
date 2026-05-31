import { useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPrefersReducedMotion, LANDING_ANIM } from "@/lib/landing-animations";

type Options = {
  start?: string;
};

/**
 * Lightweight reveal/stagger system for sections.
 * can accept a RefObject (preferred) or direct HTMLElement
 */
export function useScrollTriggerReveal(
  sectionRefOrEl: React.RefObject<HTMLElement> | HTMLElement | null,
  { start = LANDING_ANIM.start }: Options = {},
) {
  const prefersReducedMotion = useMemo(() => {
    return getPrefersReducedMotion();
  }, []);

  useEffect(() => {
    // Resolve element from ref or direct value
    const sectionEl =
      sectionRefOrEl && 'current' in sectionRefOrEl
        ? sectionRefOrEl.current
        : (sectionRefOrEl as HTMLElement | null);

    if (!sectionEl || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const revealBlocks = Array.from(sectionEl.querySelectorAll<HTMLElement>("[data-reveal]"));
      const staggerBlocks = Array.from(sectionEl.querySelectorAll<HTMLElement>("[data-stagger]"));

      revealBlocks.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: LANDING_ANIM.revealY },
          {
            opacity: 1,
            y: 0,
            duration: LANDING_ANIM.duration,
            ease: LANDING_ANIM.easeIn,
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
            },
          },
        );
      });

      staggerBlocks.forEach((container) => {
        const children = Array.from(container.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: LANDING_ANIM.revealY },
          {
            opacity: 1,
            y: 0,
            duration: LANDING_ANIM.duration,
            ease: LANDING_ANIM.easeIn,
            stagger: LANDING_ANIM.stagger,
            scrollTrigger: {
              trigger: container,
              start,
              once: true,
            },
          },
        );
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [prefersReducedMotion, sectionRefOrEl, start]);
}
