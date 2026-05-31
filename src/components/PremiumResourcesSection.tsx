import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeEbooksSection } from "@/components/RecipeEbooksSection";
import { BookOpen, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PremiumResourcesSection() {
    const [showEbooks, setShowEbooks] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Recursos Premium</h2>
                <p className="text-muted-foreground">
                    Ferramentas exclusivas para acelerar seus resultados.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Card 1: Lista de Compras */}
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/10 group">
                    <CardHeader className="pb-3">
                        <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
                            <ShoppingCart className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Lista de Compras</CardTitle>
                        <CardDescription>Gera lista automática baseada na sua dieta.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full" variant="outline">
                            <Link to="/lista-compras">Acessar Lista</Link>
                        </Button>
                    </CardContent>
                </Card>


                {/* Card 3: Ebooks de Receitas */}
                <Card
                    className={cn(
                        "hover:shadow-md transition-all cursor-pointer border-primary/10 group",
                        showEbooks ? "ring-2 ring-primary ring-offset-2" : ""
                    )}
                    onClick={() => setShowEbooks(!showEbooks)}
                >
                    <CardHeader className="pb-3">
                        <div className="p-2 w-fit rounded-lg bg-accent/10 mb-2 group-hover:bg-accent/20 transition-colors">
                            <BookOpen className="w-6 h-6 text-accent" />
                        </div>
                        <CardTitle className="text-lg">Ebooks de Receitas</CardTitle>
                        <CardDescription>Receitas exclusivas para sua fase ou condição.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant={showEbooks ? "default" : "outline"} className="w-full">
                            {showEbooks ? (
                                <>
                                    <ChevronUp className="w-4 h-4 mr-2" /> Ocultar Receitas
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4 mr-2" /> Ver Receitas
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Conteúdo Expansível de Ebooks */}
            {showEbooks && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <RecipeEbooksSection />
                    </div>
                </div>
            )}
        </div>
    );
}
