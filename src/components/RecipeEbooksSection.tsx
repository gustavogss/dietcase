import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeEbookCard } from "./RecipeEbookCard";
import { ebookCollections, Category } from "@/data/ebooks";
import { BookOpen, Scroll } from "lucide-react";

export function RecipeEbooksSection() {
    const categories: { id: string; label: string; value: Category | 'Bariatrica' }[] = [
        { id: 'bariatrica', label: 'Bariátrica', value: 'Bariatrica' },
        { id: 'diabetes', label: 'Diabetes', value: 'Diabetes' },
        { id: 'hipertensao', label: 'Hipertensão', value: 'Hipertensao' },
        { id: 'obesidade', label: 'Obesidade', value: 'Obesidade' },
        { id: 'hipo', label: 'Hipotireoidismo', value: 'Hipotiroidismo' },
        { id: 'divert', label: 'Diverticulite', value: 'Diverticulite' },
        { id: 'celiacos', label: 'Celíacos', value: 'Celiacos' },
        { id: 'lactose', label: 'Lactose', value: 'IntoleranciaLactose' },
        { id: 'idoso', label: 'Terceira Idade', value: 'TerceiraIdade' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary">Ebooks de Receitas Premium</h2>
                    <p className="text-muted-foreground">
                        Material exclusivo elaborado por nutricionistas para sua fase ou condição.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="bariatrica" className="w-full">
                {/* Scrollable Tabs List */}
                <div className="w-full overflow-x-auto pb-2 scrollbar-none">
                    <TabsList className="inline-flex w-auto h-auto p-1 bg-muted/50 rounded-xl gap-1">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="px-4 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                            >
                                {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {categories.map((cat) => {
                    const collections = ebookCollections.filter(c => c.category === cat.value);

                    return (
                        <TabsContent key={cat.id} value={cat.id} className="mt-6 animate-in fade-in-50 duration-300">
                            {collections.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {collections.map(collection => (
                                        <RecipeEbookCard key={collection.id} collection={collection} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-xl bg-muted/20">
                                    <div className="p-4 bg-muted rounded-full mb-4">
                                        <Scroll className="w-8 h-8 text-muted-foreground/50" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-muted-foreground">Em Breve</h3>
                                    <p className="text-sm text-muted-foreground/70">
                                        Estamos preparando receitas exclusivas para esta categoria.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
}