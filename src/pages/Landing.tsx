import { Link } from 'react-router-dom';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { TargetAudience } from '@/components/landing/TargetAudience';
import { Benefits } from '@/components/landing/Benefits';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { Stats } from '@/components/landing/Stats';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FAQ } from '@/components/landing/FAQ';
import { Contact } from '@/components/landing/Contact';
import { Footer } from '@/components/landing/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Landing() {
  const { handleStartClick } = useAuthNavigation();

  return (
    <div className="min-h-screen">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b w-full overflow-hidden">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 hover:opacity-80 transition-opacity shrink-0">
              <img src="/logo.png" alt="DietCase" className="h-8 w-8 rounded-full shrink-0" />
              <span className="text-lg sm:text-xl font-bold truncate">DietCase</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <ThemeToggle />
              <Button variant="ghost" className="h-9 px-4 text-sm sm:text-base rounded-full" asChild>
                <button onClick={handleStartClick}>Entrar</button>
              </Button>
              {/* Ícones sociais: escondidos no mobile para não estourar o header */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-transparent text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-transparent text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-transparent text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Youtube className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo com margem para compensar header fixo */}
      <main className="pt-16 overflow-x-hidden">
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

      <Footer />
    </div>
  );
}