import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
                    <div className="max-w-md space-y-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-10 w-10 text-destructive" />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">Algo deu errado!</h1>

                        <p className="text-muted-foreground">
                            Desculpe, ocorreu um erro inesperado. Nossa equipe já foi notificada.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Tentar Novamente
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/'}
                            >
                                Voltar ao Início
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
