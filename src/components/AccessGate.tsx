import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserAccess } from "@/hooks/useUserAccess";

const VISITOR_ALLOWED_PATHS = new Set([
  "/",
  "/auth",
  "/login",
  "/planos"
]);

export function AccessGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { accessLevel, isLoading } = useUserAccess();

  console.log("AccessGate:", { path: location.pathname, accessLevel, isLoading });

  // Se for uma rota pública permitida, renderiza imediatamente sem esperar auth
  if (VISITOR_ALLOWED_PATHS.has(location.pathname)) {
    return <>{children}</>;
  }

  // evita flicker enquanto checa sessão
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (accessLevel === "VISITOR") {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
