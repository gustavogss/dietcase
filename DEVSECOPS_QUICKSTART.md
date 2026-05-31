# Quickstart - DevSecOps Pipeline

Guia rápido para ativar a pipeline completa em 5 minutos.

## 🎯 Pré-requisitos

1. **Repositório GitHub** conectado ao projeto Lovable
2. **Contas gratuitas**:
   - [Semgrep](https://semgrep.dev) (sign up com GitHub)
   - [Snyk](https://snyk.io) (sign up com GitHub)
   - [SonarCloud](https://sonarcloud.io) (sign up com GitHub)

---

## ⚡ Setup em 3 Passos

### 1️⃣ Criar Projetos nas Ferramentas SAST

#### Semgrep
1. Acesse [semgrep.dev/orgs/-/projects](https://semgrep.dev/orgs/-/projects)
2. Clique **Add Project** → Conecte seu repositório
3. Vá em **Settings → Tokens** → Copie o token
4. Guarde para o próximo passo

#### Snyk
1. Acesse [app.snyk.io](https://app.snyk.io)
2. **Add Project** → GitHub → Selecione o repositório
3. Vá em **Account Settings** → **API Token** → Copie
4. Guarde para o próximo passo

#### SonarCloud
1. Acesse [sonarcloud.io/projects/create](https://sonarcloud.io/projects/create)
2. **Import from GitHub** → Selecione o repositório
3. Após criação, copie:
   - **Project Key** (ex: `dietcase-builder`)
   - **Organization** (ex: `seu-username`)
4. Vá em **My Account → Security** → Generate Token → Copie
5. Guarde tudo para o próximo passo

---

### 2️⃣ Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. **Settings → Secrets and variables → Actions**
3. Clique **New repository secret** e adicione:

| Nome | Valor | Fonte |
|------|-------|-------|
| `SEMGREP_APP_TOKEN` | Token copiado | Semgrep Settings |
| `SNYK_TOKEN` | Token copiado | Snyk Account Settings |
| `SONAR_TOKEN` | Token copiado | SonarCloud Security |
| `SONAR_PROJECT_KEY` | Chave do projeto | SonarCloud Project |
| `SONAR_ORGANIZATION` | Sua organização | SonarCloud |

---

### 3️⃣ Ativar Pipeline

1. **Commit os arquivos** criados (se ainda não fez):
   ```bash
   git add .github/ prometheus/ grafana/ *.yml *.md
   git commit -m "feat: adicionar pipeline DevSecOps"
   git push origin main
   ```

2. **Acompanhar execução**:
   - Acesse GitHub → **Actions**
   - Veja a pipeline `DevSecOps Pipeline` rodando
   - Aguarde ~5-8 minutos (primeira execução é mais lenta)

3. **Verificar resultados**:
   - ✅ Build & Lint: verde
   - ✅ SAST (4 scanners): revise alertas
   - ✅ DAST (ZAP + Nuclei): revise vulnerabilidades
   - ✅ Security Summary: resumo consolidado

---

## 📊 Ativar Monitoramento (Local)

### Opção A: Docker (recomendado)

```bash
# Iniciar Prometheus + Grafana
docker-compose -f docker-compose.monitoring.yml up -d

# Acessar
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
```

### Opção B: Cloud (produção)

Se você usar um VPS/cloud:
1. Upload dos arquivos `prometheus/` e `grafana/` para o servidor
2. Execute o mesmo comando `docker-compose`
3. Configure firewall para expor portas (3001, 9090)

---

## ✅ Verificação Final

### GitHub Actions
- [ ] Pipeline rodou sem erros críticos
- [ ] Relatórios SAST/DAST gerados (aba Artifacts)
- [ ] Security Summary exibido

### Monitoramento
- [ ] Grafana carregou dashboard "DietCase - Authentication Monitoring"
- [ ] Prometheus mostra target "dietcase-auth" UP
- [ ] Métricas aparecem após fazer login/signup na aplicação

---

## 🎉 Pronto!

Agora você tem:
- ✅ Pipeline DevSecOps automatizada (GitHub Actions)
- ✅ SAST com 4 ferramentas (Semgrep, Snyk, SonarCloud, ESLint)
- ✅ DAST com OWASP ZAP e Nuclei
- ✅ Monitoramento em tempo real (Prometheus + Grafana)
- ✅ 5 alertas configurados (brute force, latência, etc.)

---

## 📝 Próximos Passos

1. **Revisar alertas SAST** → Priorizar críticos
2. **Configurar Alertmanager** → Notificações Slack/email
3. **Adicionar testes E2E** → Playwright na pipeline
4. **Configurar SSL/TLS** → HTTPS para Grafana em produção
5. **Backup automático** → Volumes Prometheus/Grafana

---

## 🆘 Problemas?

| Erro | Solução |
|------|---------|
| Secret inválido | Re-gerar token na ferramenta e atualizar no GitHub |
| Pipeline falha no SAST | `continue-on-error: true` permite prosseguir; revise logs |
| Métricas vazias | Faça login/signup na app para gerar eventos |
| Dashboard Grafana vazio | Aguarde 1-2 min para primeira coleta do Prometheus |

Para mais detalhes, consulte [DEVSECOPS.md](./DEVSECOPS.md).
