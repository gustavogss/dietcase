import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, TrendingUp } from "lucide-react";
import { LockedPageOverlay } from "@/components/LockedPageOverlay";
import { useUserAccess } from "@/hooks/useUserAccess";
import type { PlanType } from "@/types";
import { triggerConfetti } from "@/lib/confetti";
import { toast } from "@/hooks/use-toast";
import { persistUserProfile } from "@/lib/security";

interface CheckinItem {
  id: string;
  date: string;
  followed: boolean;
  feeling: string;
  notes: string;
}

export default function CheckinDiario() {
  const { profile: currentUser } = useUserAccess();

  const [followed, setFollowed] = useState<boolean>(true);
  const [feeling, setFeeling] = useState<string>("Ótimo");
  const [notes, setNotes] = useState<string>("");
  const [history, setHistory] = useState<CheckinItem[]>([
    {
      id: "checkin-demo",
      date: new Date().toLocaleDateString("pt-BR"),
      followed: true,
      feeling: "Ótimo",
      notes: "Refeições 100% alinhadas com o plano.",
    },
  ]);

  const handleUpgradePlan = (newPlan: PlanType) => {
    const updated = { ...currentUser, plan: newPlan };
    persistUserProfile(updated);
    window.dispatchEvent(new Event("dietcase-profile-updated"));
    triggerConfetti();
  };

  const handleSaveCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CheckinItem = {
      id: `checkin-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      followed,
      feeling,
      notes: notes.trim(),
    };

    setHistory((prev) => [newItem, ...prev]);
    setNotes("");

    toast({
      title: "Check-in Registrado! 🎉",
      description: "Seu progresso de hoje foi salvo com sucesso.",
    });

    triggerConfetti();
  };

  return (
    <LockedPageOverlay
      requiredPlan="TRANSFORMACAO"
      requiredPlanLabel="Transformação"
      userPlan={currentUser.plan}
      onUpgrade={handleUpgradePlan}
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Check-in Diário
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Registre seu progresso e disciplina nutricional diária
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Check-in de Hoje
            </CardTitle>
            <CardDescription>
              Como esteve sua alimentação e bem-estar hoje?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveCheckin} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Seguiu o plano?</label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={followed ? "default" : "outline"}
                      onClick={() => setFollowed(true)}
                      className="w-full sm:w-auto"
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant={!followed ? "destructive" : "outline"}
                      onClick={() => setFollowed(false)}
                      className="w-full sm:w-auto"
                    >
                      Não
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Como se sente?</label>
                  <select
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mt-2 bg-background text-foreground text-sm"
                  >
                    <option value="Ótimo">Ótimo</option>
                    <option value="Bom">Bom</option>
                    <option value="Regular">Regular</option>
                    <option value="Péssimo">Péssimo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Observações</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md mt-2 bg-background text-foreground text-sm"
                  rows={3}
                  placeholder="Descreva como foi seu dia e se fez alguma adaptação..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="default">
                  Salvar Check-in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Histórico de Check-ins
            </CardTitle>
            <CardDescription>
              Seu registro de disciplina e biofeedback ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Nenhum check-in registrado ainda</p>
                <p>Comece a registrar seu progresso diário!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-card gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {item.date}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            item.followed
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.followed ? "Seguiu o Plano" : "Fora do Plano"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • Sentimento: {item.feeling}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          "{item.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </LockedPageOverlay>
  );
}
