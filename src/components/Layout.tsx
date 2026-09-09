import { useMemo } from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Heart,
  TrendingUp,
  UtensilsCrossed,
  ShoppingCart,
  Lightbulb,
  Settings,
  Target,
  User,
  CreditCard,
  Crown,
  Menu,
  LogOut,
  Camera,
  PackageOpen,
  ChefHat,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserAccess } from "@/hooks/useUserAccess";

// Build grouped menu structure to reflect user journeys (visual only)
const overviewMenu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Status da Saúde", url: "/status-saude", icon: Heart },
  { title: "Score de Evolução", url: "/score-evolucao", icon: TrendingUp },
];

const pantryMenu = [
  { title: "Estoque", url: "/estoque", icon: PackageOpen },
  { title: "Lista de Compras", url: "/lista-compras", icon: ShoppingCart },
  {
    title: "Receitas Inteligentes",
    url: "/receitas-inteligentes",
    icon: ChefHat,
  },
  { title: "Receitas Favoritas", url: "/receitas-favoritas", icon: Heart },
];

const mealPlanMenu = [
  {
    title: "Cardápio Semanal",
    url: "/cardapio-semanal",
    icon: UtensilsCrossed,
  },
  { title: "Favoritos", url: "/favoritos", icon: Heart },
  { title: "Recomendações", url: "/recomendacoes", icon: Lightbulb },
  { title: "Menu Restaurante", url: "/menu-restaurante", icon: Camera },
];

const accountMenu = [
  { title: "Perfil", url: "/perfil", icon: User },
  {
    title: "Restrições Alimentares",
    url: "/restricoes-alimentares",
    icon: Heart,
  },
  {
    title: "Preferências Nutricionais",
    url: "/preferencias-nutricionais",
    icon: Settings,
  },
  { title: "Assinatura", url: "/assinatura", icon: CreditCard },
];

function AppSidebar() {
  const { open } = useSidebar();
  const { profile: accessProfile, accessLevel } = useUserAccess();

  const navigate = useNavigate();

  const handleVisitorClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (accessLevel === "VISITOR") {
      e.preventDefault();
      navigate("/auth");
    }
  };

  const handleLogout = () => {
    console.log("🔴 Botão Sair clicado - Iniciando logout completo...");

    // Limpar todos os dados do usuário
    const keysToRemove = [
      "dietcase-mock-auth",
      "dietcase-user-profile",
      "dietcase-user-plan",
      "dietcase-new-user",
    ];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
      console.log(`🗑️ Removido do localStorage: ${key}`);
    });

    // Limpar cookies relacionados à autenticação
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : "";
      if (
        name.includes("dietcase") ||
        name.includes("firebase") ||
        name.includes("auth")
      ) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        console.log(`🗑️ Cookie removido: ${name}`);
      }
    });

    // Limpar sessionStorage (usado pelo Firebase)
    sessionStorage.clear();
    console.log("🗑️ SessionStorage limpo");

    // Limpar cache do Firebase se disponível
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName).then(() => {
            console.log(`🗑️ Cache removido: ${cacheName}`);
          });
        });
      });
    }

    console.log(
      "🧹 Todos os dados de autenticação foram limpos - Usuário precisará fazer login novamente",
    );

    // Redirecionar para a landing page
    navigate("/");
  };

  const initials = useMemo(() => {
    const n = accessProfile.name?.trim();
    if (!n) return "U";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
  }, [accessProfile.name]);

  const avatarUrl = accessProfile.avatarUrl ?? null;
  const currentUser = accessProfile;

  const isTransformacao = currentUser.plan === "TRANSFORMACAO";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* 🧭 Visão Geral */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {open ? "Visão Geral" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={handleVisitorClick}
                      className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 🧺 Minha Despensa */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {open ? "Minha Despensa" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pantryMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={handleVisitorClick}
                      className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 🥗 Meu Plano Alimentar */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {open ? "Meu Plano Alimentar" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mealPlanMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={handleVisitorClick}
                      className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 👤 Conta */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {open ? "Conta" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={handleVisitorClick}
                      className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  {open && <span>Sair</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info at Bottom - REMOVIDO */}
      </SidebarContent>
    </Sidebar>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const { profile: accessProfile, planDisplayInfo } = useUserAccess();

  const initials = useMemo(() => {
    const n = accessProfile.name?.trim();
    if (!n) return "U";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
  }, [accessProfile.name]);

  const avatarUrl = accessProfile.avatarUrl ?? null;
  const currentUser = accessProfile;

  // Se estiver na landing page, não renderiza o layout com sidebar
  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-md px-4 sm:px-8 transition-all ease-linear shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Logo */}
            <div className="flex items-center gap-2 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="DietCase Logo"
                className="h-8 w-8 object-contain rounded-full shrink-0"
              />
              <span className="font-bold text-lg truncate min-w-[80px]">
                DietCase
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-[10px]" />

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Informações do usuário */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 shrink-0">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={currentUser.name} />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
              <div className="hidden lg:flex flex-col items-start overflow-hidden">
                <span className="text-sm font-medium truncate max-w-[100px]">
                  {currentUser.name}
                </span>
              </div>

              {/* Badge do plano */}
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-[10px] sm:text-xs font-semibold bg-orange-500 text-white ml-2 hover:bg-orange-600 transition-colors border-none shadow-sm shrink-0 whitespace-nowrap"
              >
                {planDisplayInfo.label}
              </Badge>
            </div>

            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 w-full overflow-x-hidden">
          <div className="w-full max-w-screen-xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
