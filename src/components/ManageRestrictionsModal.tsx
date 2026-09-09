import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestrictions } from "@/hooks/useRestrictions";
import { AlertCircle, X, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { UserRestriction } from "@/types";

interface ManageRestrictionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const restrictionTypeLabels: Record<
  UserRestriction["type"],
  { label: string; color: string }
> = {
  alergia: { label: "Alergia", color: "bg-red-500" },
  "nao-gosto": { label: "Não Gosto", color: "bg-yellow-500" },
  restricao: { label: "Restrição Médica", color: "bg-orange-500" },
};

export function ManageRestrictionsModal({
  open,
  onOpenChange,
}: ManageRestrictionsModalProps) {
  const { restrictions, addRestriction, removeRestriction } = useRestrictions();
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedType, setSelectedType] =
    useState<UserRestriction["type"]>("nao-gosto");

  const handleAdd = async () => {
    if (!newIngredient.trim()) {
      toast({
        title: "Campo vazio",
        description: "Digite o nome do ingrediente.",
        variant: "destructive",
      });
      return;
    }

    await addRestriction(newIngredient.trim(), selectedType);
    setNewIngredient("");

    toast({
      title: "Restrição adicionada",
      description: `${newIngredient} foi adicionado às suas restrições.`,
    });
  };

  const handleRemove = async (ingredient: string) => {
    await removeRestriction(ingredient);
    toast({
      title: "Restrição removida",
      description: "A restrição foi removida com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Gerenciar Restrições Alimentares
          </DialogTitle>
          <DialogDescription>
            Adicione ingredientes que você não pode ou não quer consumir. O
            sistema sugerirá substituições automaticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Formulário para adicionar nova restrição */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-medium">Adicionar Nova Restrição</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ingredient">Ingrediente</Label>
                <Input
                  id="ingredient"
                  placeholder="Ex: Leite, Ovos, Glúten..."
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAdd();
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Restrição</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) =>
                    setSelectedType(value as UserRestriction["type"])
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alergia">🚨 Alergia</SelectItem>
                    <SelectItem value="nao-gosto">😐 Não Gosto</SelectItem>
                    <SelectItem value="restricao">
                      ⚕️ Restrição Médica
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full inline-flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4 shrink-0" />
              Adicionar Restrição
            </Button>
          </div>

          {/* Lista de restrições atuais */}
          <div className="space-y-3">
            <h3 className="font-medium">
              Minhas Restrições ({restrictions.length})
            </h3>

            {restrictions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma restrição adicionada ainda.
              </p>
            ) : (
              <div className="space-y-2">
                {restrictions.map((restriction) => {
                  const typeInfo = restrictionTypeLabels[restriction.type];

                  return (
                    <div
                      key={restriction.ingredient}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${typeInfo.color}`}
                        />
                        <div>
                          <p className="font-medium capitalize">
                            {restriction.ingredient}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {typeInfo.label}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          void handleRemove(restriction.ingredient)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 bg-muted rounded-lg border">
            <p className="text-sm">
              <strong>💡 Dica:</strong> Após adicionar suas restrições, o
              sistema automaticamente sugerirá substituições inteligentes nas
              refeições que contenham esses ingredientes, mantendo valores
              nutricionais similares.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
