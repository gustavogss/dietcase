import { ReactNode } from "react";
import { useUserAccess } from "@/hooks/useUserAccess";
import type { FeatureType } from "@/types";
import { Lock, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PermissionGateProps {
  feature: FeatureType;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradeButton?: boolean;
  upgradeText?: string;
}

export function PermissionGate({ 
  feature, 
  children, 
  fallback,
  showUpgradeButton = true,
  upgradeText = "Faça upgrade para acessar esta funcionalidade"
}: PermissionGateProps) {
  const { hasPermission, planDisplayInfo, isAuthenticated } = useUserAccess();
  const navigate = useNavigate();

  // Se tem permissão, renderiza o conteúdo
  if (hasPermission(feature)) {
    return <>{children}</>;
  }

  // Se não tem permissão e não tem fallback, renderiza o padrão
  if (!fallback) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          {planDisplayInfo.label === "Plano Transformação" ? (
            <Crown className="h-12 w-12 text-purple-500" />
          ) : planDisplayInfo.label === "Plano Essencial" ? (
            <Lock className="h-12 w-12 text-blue-500" />
          ) : (
            <Zap className="h-12 w-12 text-orange-500" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          Funcionalidade {planDisplayInfo.label.toLowerCase()}
        </h3>
        
        <p className="text-muted-foreground mb-4 max-w-md">
          {upgradeText}
        </p>
        
        {showUpgradeButton && (
          <Button 
            onClick={() => navigate("/planos")}
            className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2"
          >
            <Crown className="h-4 w-4 shrink-0" />
            Ver Planos
          </Button>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          Plano atual: <span className={`font-medium ${planDisplayInfo.textColor}`}>
            {planDisplayInfo.label}
          </span>
        </div>
      </div>
    );
  }

  // Se tem fallback personalizado
  return <>{fallback}</>;
}

// Componente para bloquear funcionalidades específicas
interface FeatureBlockProps {
  feature: FeatureType;
  title?: string;
  description?: string;
  className?: string;
}

export function FeatureBlock({ 
  feature, 
  title = "Funcionalidade Premium", 
  description = "Esta funcionalidade requer um plano superior.",
  className = ""
}: FeatureBlockProps) {
  const { hasPermission, planDisplayInfo } = useUserAccess();

  if (hasPermission(feature)) {
    return null;
  }

  return (
    <div className={`border rounded-lg p-4 bg-muted/30 ${className}`}>
      <div className="flex items-center gap-3">
        <Lock className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${planDisplayInfo.borderColor} ${planDisplayInfo.textColor}`}>
              {planDisplayInfo.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para badge de funcionalidade
interface FeatureBadgeProps {
  feature: FeatureType;
  children: ReactNode;
}

export function FeatureBadge({ feature, children }: FeatureBadgeProps) {
  const { hasPermission } = useUserAccess();

  if (hasPermission(feature)) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full p-1">
        <Lock className="h-3 w-3" />
      </div>
    </div>
  );
}
