# DevSecOps Pipeline - DietCase

Pipeline completa de CI/CD com foco em segurança e monitoramento.

## 📋 Visão Geral

Esta pipeline implementa os princípios DevSecOps com:
- **Build automatizado** e validação de tipos
- **SAST** (análise estática): Semgrep, Snyk Code, SonarCloud, ESLint Security
- **DAST** (análise dinâmica): OWASP ZAP, Nuclei
- **Testes** unitários e de integração
- **Monitoramento** da rota /auth com Prometheus e Grafana

---

## 🚀 GitHub Actions Workflow

### Arquivo: `.github/workflows/devsecops.yml`

**Jobs executados em cada push/PR:**

1. **Build & Lint** - Compila o projeto e valida tipos
2. **SAST (4 ferramentas)**:
   - Semgrep (regras OWASP)
   - Snyk Code + Dependencies
   - SonarCloud (qualidade + segurança)
   - ESLint Security
3. **Dependency Scan** - npm audit + outdated check
4. **Tests** - Suite de testes
5. **DAST (2 ferramentas)**:
   - OWASP ZAP Baseline Scan
   - Nuclei (templates CVE/exposures)
6. **Security Summary** - Relatório consolidado
7. **Deploy** - Notificação (deploy automático via Lovable)

---

## 🔐 Secrets Necessários no GitHub

Configure em **Settings → Secrets and variables → Actions**:

| Secret | Descrição | Como obter |
|--------|-----------|------------|
| `SEMGREP_APP_TOKEN` | Token do Semgrep | [semgrep.dev](https://semgrep.dev/orgs/-/settings/tokens) |
| `SNYK_TOKEN` | Token do Snyk | [snyk.io/account](https://app.snyk.io/account) |
| `SONAR_TOKEN` | Token do SonarCloud | [sonarcloud.io](https://sonarcloud.io/account/security) |
| `SONAR_PROJECT_KEY` | Chave do projeto | Criar projeto no SonarCloud |
| `SONAR_ORGANIZATION` | Organização SonarCloud | Sua org no SonarCloud |

---

## 📊 Monitoramento (Prometheus + Grafana)

### Arquitetura

```
┌─────────────┐       ┌──────────────────┐       ┌────────────┐
│   /auth     │──────▶│  Edge Function   │──────▶│ Prometheus │
│  (frontend) │       │  auth-metrics    │       │            │
└─────────────┘       │  - /metrics      │       └──────┬─────┘
                      │  - /track        │              │
                      │  - /health       │              │
                      └──────────────────┘              │
                                                        │
                                                        ▼
                                                  ┌────────────┐
                                                  │  Grafana   │
                                                  │ Dashboard  │
                                                  └────────────┘
```

### Métricas Coletadas

| Métrica | Tipo | Descrição |
|---------|------|-----------|
| `auth_login_attempts_total` | Counter | Total de tentativas de login |
| `auth_login_success_total` | Counter | Total de logins bem-sucedidos |
| `auth_login_failure_total` | Counter | Total de logins falhados |
| `auth_signup_total` | Counter | Total de cadastros |
| `auth_password_reset_total` | Counter | Total de resets de senha |
| `auth_latency_ms_avg` | Gauge | Latência média (ms) |

### Alertas Configurados

- **HighLoginFailureRate**: Taxa de falha > 50% (5 min)
- **LoginAttemptSpike**: Pico de tentativas (possível brute force)
- **HighAuthLatency**: Latência > 2s (3 min)
- **NoSignupsDetected**: Sem signups em 30 min
- **AuthMetricsStale**: Métricas desatualizadas (edge function offline)

---

## 🐳 Deploy Local (Prometheus + Grafana)

### Requisitos
- Docker + Docker Compose

### Passos

1. **Iniciar stack de monitoramento:**
   ```bash
   docker-compose -f docker-compose.monitoring.yml up -d
   ```

2. **Acessar interfaces:**
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001
     - User: `admin`
     - Pass: `admin` (⚠️ mudar em produção)

3. **Dashboard automático:**
   - Acesse Grafana → Dashboards → "DietCase - Authentication Monitoring"
   - 6 painéis prontos (logins, latência, signups, taxa de sucesso)

4. **Parar stack:**
   ```bash
   docker-compose -f docker-compose.monitoring.yml down
   ```

---

## 🧪 Testar Métricas Localmente

### 1. Chamar endpoint de métricas:
```bash
curl https://lhwabshbvjpgiyvmkete.supabase.co/functions/v1/auth-metrics/metrics
```

**Resposta esperada:**
```
# HELP auth_login_attempts_total Total number of login attempts
# TYPE auth_login_attempts_total counter
auth_login_attempts_total 42

# HELP auth_login_success_total Total number of successful logins
# TYPE auth_login_success_total counter
auth_login_success_total 38
...
```

### 2. Health check:
```bash
curl https://lhwabshbvjpgiyvmkete.supabase.co/functions/v1/auth-metrics/health
```

### 3. Simular evento (backend):
```bash
curl -X POST https://lhwabshbvjpgiyvmkete.supabase.co/functions/v1/auth-metrics/track \
  -H "Content-Type: application/json" \
  -d '{"event": "login_attempt", "latency": 450, "success": true}'
```

---

## 📈 Queries Úteis (Prometheus)

```promql
# Taxa de sucesso de login (últimos 5 min)
rate(auth_login_success_total[5m]) / rate(auth_login_attempts_total[5m])

# Percentil 95 de latência
histogram_quantile(0.95, auth_latency_ms_avg)

# Signups por hora
increase(auth_signup_total[1h])
```

---

## 🛠️ Manutenção

### Atualizar regras de alerta
Edite `prometheus/rules/auth_alerts.yml` e reinicie Prometheus:
```bash
docker-compose -f docker-compose.monitoring.yml restart prometheus
```

### Criar novos dashboards
1. Crie no Grafana UI
2. Export JSON
3. Salve em `grafana/dashboards/`
4. Reinicie stack

### Retenção de dados
Padrão: 15 dias. Para alterar, edite `prometheus/prometheus.yml`:
```yaml
global:
  ...
storage:
  tsdb:
    retention.time: 30d
```

---

## 🔍 Troubleshooting

| Problema | Solução |
|----------|---------|
| Métricas não aparecem no Grafana | Verificar se Prometheus consegue acessar a edge function (Network → Targets) |
| Edge function retorna 404 | Confirmar deploy no Lovable Cloud |
| Alertas não disparam | Verificar `prometheus/rules/auth_alerts.yml` syntax |
| Dashboard vazio | Aguardar 1-2 min para primeira coleta |

---

## 📚 Recursos

- [Prometheus Query Language (PromQL)](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboard Best Practices](https://grafana.com/docs/grafana/latest/best-practices/)
- [OWASP ZAP Baseline Scan](https://www.zaproxy.org/docs/docker/baseline-scan/)
- [Semgrep Rules](https://semgrep.dev/explore)

---

## ✅ Checklist de Produção

- [ ] Configurar secrets no GitHub Actions
- [ ] Criar projetos no Semgrep/Snyk/SonarCloud
- [ ] Substituir senha padrão do Grafana (`admin`)
- [ ] Configurar HTTPS/TLS no Prometheus/Grafana
- [ ] Configurar Alertmanager para notificações (Slack/PagerDuty)
- [ ] Backup de volumes (`prometheus-data`, `grafana-data`)
- [ ] Implementar autenticação OAuth no Grafana (opcional)
- [ ] Configurar rate limiting na edge function `auth-metrics`
