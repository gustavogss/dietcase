import { useUserAccess } from "@/hooks/useUserAccess";
import { plans } from "@/data/mocks";
import { BackToHomeHint } from "@/components/BackToHomeHint";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CreditCard, Check, X } from "lucide-react";
import { useState } from "react";

interface Invoice {
	id: string;
	created: Date;
	amount_paid: number;
	payment_method: "card" | "pix" | "unknown";
	status: "paid" | "pending" | "failed";
}

export default function Subscription() {
	const { profile: currentUser } = useUserAccess();
	const [autoRenewal, setAutoRenewal] = useState(true);

	// Obter preço do plano do usuário
	const currentPlanData = plans.find((p) => p.type === currentUser.plan);
	const planPrice = currentPlanData?.price || 0;

	// TODO: Integrar com Stripe subscription object
	const subscription = {
		status: "active" as const,
		current_period_start: new Date("2026-01-18"),
		current_period_end: new Date("2026-02-18"),
		cancel_at_period_end: !autoRenewal,
		payment_method: "card",
	};

	// TODO: Conectar invoices do Stripe
	// Gerar invoices dinâmicos baseado no plano do usuário
	const invoices: Invoice[] = [
		{
			id: "inv_001",
			created: new Date("2026-01-18"),
			amount_paid: planPrice,
			payment_method: "card",
			status: "paid",
		},
		{
			id: "inv_002",
			created: new Date("2025-12-18"),
			amount_paid: planPrice,
			payment_method: "card",
			status: "paid",
		},
		{
			id: "inv_003",
			created: new Date("2025-11-18"),
			amount_paid: planPrice,
			payment_method: "card",
			status: "paid",
		},
	];

	const getStatusBadge = (status: string) => {
		const statusMap: Record<
			string,
			{
				label: string;
				variant: "default" | "secondary" | "destructive" | "outline";
			}
		> = {
			active: { label: "Ativa", variant: "default" },
			trial: { label: "Trial", variant: "secondary" },
			past_due: { label: "Vencida", variant: "destructive" },
			cancelled: { label: "Cancelada", variant: "destructive" },
			expired: { label: "Expirada", variant: "destructive" },
		};
		const config = statusMap[status] || {
			label: status,
			variant: "outline" as const,
		};
		return <Badge variant={config.variant}>{config.label}</Badge>;
	};

	const getPaymentMethodLabel = (method: string) => {
		const methods: Record<string, string> = {
			card: "Cartão de Crédito",
			pix: "Pix",
			unknown: "Desconhecido",
		};
		return methods[method] || method;
	};

	const getInvoiceStatusIcon = (status: string) => {
		switch (status) {
			case "paid":
				return <Check className="h-4 w-4 text-success" />;
			case "pending":
				return <AlertCircle className="h-4 w-4 text-yellow-500" />;
			case "failed":
				return <X className="h-4 w-4 text-destructive" />;
			default:
				return null;
		}
	};

	const getInvoiceStatusLabel = (status: string) => {
		const statusMap: Record<string, string> = {
			paid: "Pago",
			pending: "Pendente",
			failed: "Falhou",
		};
		return statusMap[status] || status;
	};

	const daysRemaining = Math.ceil(
		(subscription.current_period_end.getTime() - Date.now()) /
			(1000 * 60 * 60 * 24),
	);

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	const formatTime = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	return (
		<div className="space-y-6 px-4 sm:px-6">
			<div>
				<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
					Assinatura
				</h1>
				<p className="text-muted-foreground text-base sm:text-lg mt-2">
					Gerenciar sua assinatura e histórico de pagamentos
				</p>
			</div>
			<BackToHomeHint />

			{/* Plano Atual */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Plano Atual</span>
						{getStatusBadge(subscription.status)}
					</CardTitle>
					<CardDescription>Detalhes da sua assinatura ativa</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Plano</p>
							<p className="text-lg font-semibold mt-1">{currentUser.plan}</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Status
							</p>
							<div className="mt-1">{getStatusBadge(subscription.status)}</div>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Data de Início
							</p>
							<p className="text-lg font-semibold mt-1">
								{formatDate(subscription.current_period_start)}
							</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Próxima Cobrança
							</p>
							<p className="text-lg font-semibold mt-1">
								{formatDate(subscription.current_period_end)}
							</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Dias Restantes
							</p>
							<p className="text-lg font-semibold mt-1">
								{daysRemaining > 0 ? `${daysRemaining} dias` : "Expirada"}
							</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Método de Pagamento
							</p>
							<div className="flex items-center gap-2 mt-1">
								<CreditCard className="h-4 w-4 text-muted-foreground" />
								<p className="text-lg font-semibold">
									{getPaymentMethodLabel(subscription.payment_method)}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Renovação Automática */}
			{subscription.payment_method === "card" && (
				<Card>
					<CardHeader>
						<CardTitle>Renovação Automática</CardTitle>
						<CardDescription>
							Sua assinatura será renovada automaticamente quando expirar
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* TODO: Implementar update subscription */}
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div>
								<p className="font-medium">Renovação Automática</p>
								<p className="text-sm text-muted-foreground">
									{autoRenewal
										? "Sua assinatura será renovada automaticamente"
										: "Sua assinatura será cancelada em " +
											formatDate(subscription.current_period_end)}
								</p>
							</div>
							<Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
						</div>

						{!autoRenewal && (
							<div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
								<AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
								<p className="text-sm text-yellow-800">
									Sua assinatura será cancelada em{" "}
									<strong>{formatDate(subscription.current_period_end)}</strong>
									. Você perderá acesso aos recursos premium.
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{/* Histórico de Pagamentos */}
			<Card>
				<CardHeader>
					<CardTitle>Histórico de Pagamentos</CardTitle>
					<CardDescription>Todos os seus recibos e faturas</CardDescription>
				</CardHeader>
				<CardContent>
					{invoices.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-muted-foreground">
								Nenhum pagamento registrado.
							</p>
						</div>
					) : (
						<div className="overflow-x-auto -mx-6 sm:mx-0">
							<div className="inline-block min-w-full sm:rounded-lg">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b">
											<th className="px-6 py-3 text-left font-medium text-muted-foreground">
												Data
											</th>
											<th className="px-6 py-3 text-left font-medium text-muted-foreground">
												Hora
											</th>
											<th className="px-6 py-3 text-left font-medium text-muted-foreground">
												Método
											</th>
											<th className="px-6 py-3 text-right font-medium text-muted-foreground">
												Valor
											</th>
											<th className="px-6 py-3 text-center font-medium text-muted-foreground">
												Status
											</th>
										</tr>
									</thead>
									<tbody className="divide-y">
										{invoices.map((invoice) => (
											<tr key={invoice.id} className="hover:bg-muted/50">
												<td className="px-6 py-4">
													{formatDate(invoice.created)}
												</td>
												<td className="px-6 py-4">
													{formatTime(invoice.created)}
												</td>
												<td className="px-6 py-4">
													{getPaymentMethodLabel(invoice.payment_method)}
												</td>
												<td className="px-6 py-4 text-right font-semibold">
													{formatCurrency(invoice.amount_paid)}
												</td>
												<td className="px-6 py-4 text-center">
													<div className="flex items-center justify-center gap-2">
														{getInvoiceStatusIcon(invoice.status)}
														<span className="text-sm">
															{getInvoiceStatusLabel(invoice.status)}
														</span>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
