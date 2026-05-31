import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Páginas existentes
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Plans from "./pages/Plans";
import Subscription from "./pages/Subscription";
import ShoppingList from "./pages/ShoppingList";
import Ebooks from "./pages/Ebooks";
import VirtualNutri from "./pages/VirtualNutri";
import IAAnalysis from "./pages/IAAnalysis";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Novas páginas para implementar
import StatusSaude from "./pages/StatusSaude";
import ScoreEvolucao from "./pages/ScoreEvolucao";
import GuiasCientificos from "./pages/GuiasCientificos";
import EstudosResumidos from "./pages/EstudosResumidos";
import ProtocolosNutricionais from "./pages/ProtocolosNutricionais";
import EducacaoAlimentar from "./pages/EducacaoAlimentar";
import PreferenciasNutricionais from "./pages/PreferenciasNutricionais";
import CheckinDiario from "./pages/CheckinDiario";
import AjustesAutomaticos from "./pages/AjustesAutomaticos";
import RelatoriosEvolucao from "./pages/RelatoriosEvolucao";
import ScoreAderencia from "./pages/ScoreAderencia";
import MenuRestaurante from "./pages/MenuRestaurante";

import { AccessGate } from "@/components/AccessGate";
import { UserAccessProvider } from "@/contexts/UserAccessContext";

const queryClient = new QueryClient();

const App = () => {
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<TooltipProvider>
						<UserAccessProvider>
							<Toaster />
							<Sonner />
							<BrowserRouter>
								<Layout>
									<AccessGate>
										<Routes>
											{/* Página inicial */}
											<Route path="/" element={<Landing />} />

											{/* Autenticação */}
											<Route path="/auth" element={<Auth />} />
											<Route path="/login" element={<Auth />} />

											{/* Visão Geral */}
											<Route path="/dashboard" element={<Dashboard />} />
											<Route path="/status-saude" element={<StatusSaude />} />
											<Route path="/score-evolucao" element={<ScoreEvolucao />} />

											{/* Meu Plano Alimentar */}
											<Route path="/cardapio" element={<Menu />} />
											<Route path="/favoritos" element={<Favorites />} />
											<Route path="/lista-compras" element={<ShoppingList />} />
											<Route
												path="/recomendacoes"
												element={<Recommendations />}
											/>

											{/* Acompanhamento Inteligente */}
											<Route path="/chat-nutri" element={<VirtualNutri />} />
											<Route path="/progresso-ia" element={<IAAnalysis />} />
											<Route path="/checkin-diario" element={<CheckinDiario />} />
											<Route
												path="/ajustes-automaticos"
												element={<AjustesAutomaticos />}
											/>
											<Route
												path="/menu-restaurante"
												element={<MenuRestaurante />}
											/>
											<Route
												path="/relatorios-evolucao"
												element={<RelatoriosEvolucao />}
											/>
											<Route
												path="/score-aderencia"
												element={<ScoreAderencia />}
											/>

											{/* Biblioteca */}
											<Route path="/ebooks" element={<Ebooks />} />
											<Route
												path="/guias-cientificos"
												element={<GuiasCientificos />}
											/>
											<Route
												path="/estudos-resumidos"
												element={<EstudosResumidos />}
											/>
											<Route
												path="/protocolos-nutricionais"
												element={<ProtocolosNutricionais />}
											/>
											<Route
												path="/educacao-alimentar"
												element={<EducacaoAlimentar />}
											/>

											{/* Conta */}
											<Route path="/perfil" element={<Profile />} />
											<Route
												path="/preferencias-nutricionais"
												element={<PreferenciasNutricionais />}
											/>
											<Route path="/assinatura" element={<Subscription />} />
											<Route path="/planos" element={<Plans />} />

											{/* Página não encontrada */}
											<Route path="*" element={<NotFound />} />
										</Routes>
									</AccessGate>
								</Layout>
							</BrowserRouter>
						</UserAccessProvider>
					</TooltipProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

export default App;
