import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TargetAudience } from "@/components/landing/TargetAudience";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { Stats } from "@/components/landing/Stats";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FAQ } from "@/components/landing/FAQ";
import { Contact } from "@/components/landing/Contact";

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <TargetAudience />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Stats />
      <FinalCTA />
      <FAQ />
      <Contact />
    </main>
  );
}
