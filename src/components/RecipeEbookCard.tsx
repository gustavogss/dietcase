import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EbookCollection } from "@/data/ebooks";
import { Download, FileText, Utensils, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { downloadEbookPdf } from "@/services/pdf.service";
import { useState } from "react";

interface RecipeEbookCardProps {
    collection: EbookCollection;
}

export function RecipeEbookCard({ collection }: RecipeEbookCardProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            toast.info(`Gerando PDF: ${collection.title}`, {
                description: "Por favor aguarde...",
            });

            await downloadEbookPdf(collection);

            toast.success(`Download concluído!`, {
                description: "O arquivo PDF foi gerado.",
            });
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar PDF", {
                description: "Tente novamente mais tarde.",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-primary/10">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 text-primary border-primary/20">
                        {collection.category}
                    </Badge>
                    {collection.phase && (
                        <Badge className="bg-primary text-white hover:bg-primary/90">
                            Fase {collection.phase}
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-xl text-primary font-bold">
                    {collection.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                    <Utensils className="w-4 h-4" />
                    <span>{collection.recipes.length} Receitas Exclusivas</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {collection.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="bg-secondary/30 p-3 rounded-lg mt-2">
                    <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Exemplos:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                        {collection.recipes.slice(0, 3).map(recipe => (
                            <li key={recipe.title} className="truncate">
                                {recipe.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold group"
                    onClick={handleDownload}
                    disabled={isDownloading}
                >
                    {isDownloading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    )}
                    {isDownloading ? "Gerando PDF..." : "Baixar Ebook PDF"}
                </Button>
            </CardFooter>
        </Card>
    );
}