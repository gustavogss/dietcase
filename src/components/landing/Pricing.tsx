import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { landingData } from "@/data/landing-data";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/data/mocks";
import type { PlanType, UserProfile } from "@/types";
import { useScrollTriggerReveal } from "@/hooks/useScrollTriggerReveal";
import {
  PROFILE_STORAGE_KEY,
  persistUserProfile,
  sanitizeUserProfileForStorage,
} from "@/lib/security";

export function Pricing() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  const navigate = useNavigate();

  const goToPlanDashboard = (plan: PlanType) => {
    const getBaseProfile = (): UserProfile => {
      const saved = sessionStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as UserProfile;
          return sanitizeUserProfileForStorage(parsed) as UserProfile;
        } catch {
          // fallthrough
        }
      }
      return mockUsers[0];
    };

    const base = getBaseProfile();
    const updated: UserProfile = { ...base, plan };
    persistUserProfile(updated);
    navigate("/dashboard");
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-padding bg-muted/30"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="section-heading">
          <h2 className="text-foreground">Planos e Preços</h2>
          <p className="text-muted-foreground font-medium">
            Escolha o plano ideal para você
          </p>
        </div>

        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-items-center"
        >
          {landingData.plans.map((plan) => (
            <Card
              key={plan.name}
              className={`group relative border-none shadow-sm hover:shadow-2xl transition-all duration-300 w-full ${plan.highlight ? "ring-2 ring-primary sm:scale-105 z-10" : "hover:-translate-y-1"}`}
              role="button"
              tabIndex={0}
              onClick={() => goToPlanDashboard(plan.name as PlanType)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  goToPlanDashboard(plan.name as PlanType);
              }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-6 py-1 font-bold shadow-lg">
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="card-padding pb-3">
                <CardTitle className="text-fluid-xl font-bold mb-3">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-fluid-4xl font-black text-foreground tracking-tighter">
                    R$ {plan.price}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    /mês
                  </span>
                </div>
              </CardHeader>

              <CardContent className="card-padding pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-primary/10 rounded-full p-0.5">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      </div>
                      <span className="text-fluid-sm text-muted-foreground font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="card-padding pt-0">
                <Button
                  className={`w-full py-5 text-fluid-base font-bold shadow-lg ${
                    plan.highlight
                      ? "text-white shadow-primary/20 hover:bg-accent hover:text-white hover:shadow-accent/30"
                      : "shadow-primary/20"
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  asChild
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPlanDashboard(plan.name as PlanType);
                    }}
                  >
                    Assinar Plano
                  </button>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
