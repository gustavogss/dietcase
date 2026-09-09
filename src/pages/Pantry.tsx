import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertCircle,
  PackageOpen,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserAccess } from "@/hooks/useUserAccess";
import {
  addPantryItem,
  deletePantryItem,
  listPantryItems,
  updatePantryItem,
} from "@/services/pantry.repository";
import { buildPantrySummary } from "@/services/pantry.service";
import type { PantryItem } from "@/types";

const categoryOptions: PantryItem["category"][] = [
  "frutas",
  "vegetais",
  "proteinas",
  "laticinios",
  "graos",
  "temperos",
  "outros",
];

export default function Pantry() {
  const { isAuthenticated } = useUserAccess();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PantryItem["category"]>("outros");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("unidade");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    PantryItem["category"] | "todas"
  >("todas");

  const loadPantry = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const storedItems = await listPantryItems();
      setItems(storedItems);
    } catch (error) {
      console.error("Erro ao carregar despensa do Firestore", error);
      setErrorMessage("Não foi possível carregar sua despensa agora.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) void loadPantry();
    else setIsLoading(false);
  }, [isAuthenticated, loadPantry]);

  const resetForm = () => {
    setEditingItemId(null);
    setName("");
    setQuantity("1");
    setUnit("unidade");
    setExpiryDate("");
    setCategory("outros");
  };

  const startEditing = (item: PantryItem) => {
    setEditingItemId(item.id);
    setName(item.name);
    setCategory(item.category);
    setQuantity(String(item.quantity));
    setUnit(item.unit);
    setExpiryDate(item.expiryDate);
  };

  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || Number(quantity) <= 0) return;

    try {
      const itemData = {
        name: name.trim(),
        category,
        quantity: Number(quantity),
        unit: unit.trim() || "unidade",
        expiryDate,
      };

      if (editingItemId) {
        await updatePantryItem(editingItemId, itemData);
      } else {
        await addPantryItem(itemData);
      }

      await loadPantry();
      resetForm();
    } catch (error) {
      console.error("Erro ao persistir item da despensa", error);
      setErrorMessage(
        editingItemId
          ? "Não foi possível atualizar o item agora."
          : "Não foi possível salvar o item agora.",
      );
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deletePantryItem(itemId);
      await loadPantry();
      if (editingItemId === itemId) resetForm();
    } catch (error) {
      console.error("Erro ao remover item da despensa", error);
      setErrorMessage("Não foi possível remover o item agora.");
    }
  };

  const summary = buildPantrySummary(items);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLocaleLowerCase()
      .includes(normalizedSearchTerm);
    const matchesCategory =
      categoryFilter === "todas" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const getExpiryLabel = (expiryDate?: string) => {
    if (!expiryDate) return "Validade não informada";
    const expiryTime = new Date(expiryDate).getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilExpiry = Math.ceil(
      (expiryTime - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilExpiry < 0) return "Vencido";
    if (daysUntilExpiry <= 5) return `Vence em ${daysUntilExpiry} dias`;
    return `Validade ${expiryDate}`;
  };
  const getExpiryClassName = (expiryDate?: string) => {
    if (!expiryDate) return "text-muted-foreground";
    const expiryTime = new Date(expiryDate).getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilExpiry = Math.ceil(
      (expiryTime - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilExpiry < 0) return "font-medium text-destructive";
    if (daysUntilExpiry <= 5) return "font-medium text-amber-600";
    return "text-muted-foreground";
  };
  let pantryContent: ReactNode;
  if (isLoading) {
    pantryContent = (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Carregando sua despensa...
        </CardContent>
      </Card>
    );
  } else if (items.length === 0) {
    pantryContent = (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Sua despensa está vazia.</h2>
          <p className="text-muted-foreground">
            Adicione seus primeiros alimentos para receber sugestões de
            receitas.
          </p>
        </CardContent>
      </Card>
    );
  } else if (filteredItems.length === 0) {
    pantryContent = (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          Nenhum alimento corresponde à pesquisa ou categoria selecionada.
        </CardContent>
      </Card>
    );
  } else {
    pantryContent = (
      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Itens cadastrados</p>
              <p className="text-2xl font-bold">{summary.totalItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Vencendo em breve</p>
              <p className="text-2xl font-bold">{summary.nearExpiryCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Vencidos</p>
              <p className="text-2xl font-bold">{summary.expiredCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Estoque baixo</p>
              <p className="text-2xl font-bold">{summary.lowStockCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit} ·{" "}
                    <span className={getExpiryClassName(item.expiryDate)}>
                      {getExpiryLabel(item.expiryDate)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    aria-label={`Editar ${item.name}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => startEditing(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    aria-label={`Remover ${item.name}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => void handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <main className="container mx-auto space-y-6 p-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          Despensa Inteligente
        </p>
        <h1 className="text-3xl font-bold">O que você tem em casa?</h1>
        <p className="mt-2 text-muted-foreground">
          Seus itens são carregados e salvos diretamente no Firestore.
        </p>
      </header>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {editingItemId ? "Editar alimento" : "Adicionar alimento"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-6" onSubmit={handleAddItem}>
            <Input
              aria-label="Nome do alimento"
              placeholder="Nome do alimento"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <select
              aria-label="Categoria"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as PantryItem["category"])
              }
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Input
              aria-label="Quantidade"
              type="number"
              min="1"
              placeholder="Quantidade"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />
            <Input
              aria-label="Unidade"
              placeholder="Unidade"
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              required
            />
            <Input
              aria-label="Validade"
              type="date"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
            />
            <Button type="submit">
              {editingItemId ? (
                <Pencil className="mr-2 h-4 w-4" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              {editingItemId ? "Salvar alteração" : "Adicionar"}
            </Button>
            {editingItemId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Pesquisar alimentos"
              className="pl-9"
              placeholder="Pesquisar alimentos"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <select
            aria-label="Filtrar por categoria"
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value as PantryItem["category"] | "todas",
              )
            }
          >
            <option value="todas">Todas as categorias</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {pantryContent}
    </main>
  );
}
