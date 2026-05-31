/**
 * Landing page animation tokens (GSAP + ScrollTrigger).
 * Centralize aqui para manter consistência e facilitar ajustes globais.
 */

export const LANDING_ANIM = {
  /** Default ScrollTrigger start point for reveal animations */
  start: "top 80%",

  /** Distance used for reveal slide-up */
  revealY: 16,

  /** Default entrance duration */
  duration: 0.6,

  /** Default easing for entrances */
  easeIn: "power2.out",

  /** Default stagger for grouped content */
  stagger: 0.08,

  /** Stats section count-up duration */
  statCountDuration: 1.2,
} as const;

export function getPrefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}
