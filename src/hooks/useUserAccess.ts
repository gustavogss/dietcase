import { useUserAccessContext } from "@/contexts/UserAccessContext";

/**
 * Hook de compatibilidade para acessar o contexto de usuário.
 * Mantém a mesma assinatura do hook original para evitar quebrar componentes existentes.
 */
export function useUserAccess() {
  return useUserAccessContext();
}
