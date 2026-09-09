import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/50">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A rota <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">{location.pathname}</code> não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" size="lg" className="inline-flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Voltar
          </Button>
          <Button asChild size="lg" className="inline-flex items-center justify-center gap-2">
            <Link to="/">
              <Home className="h-4 w-4 shrink-0" />
              Ir para o Início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
