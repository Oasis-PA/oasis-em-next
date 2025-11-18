# GitHub Actions Workflows

Este diretório contém os workflows automáticos do projeto.

## Workflows Disponíveis

### 1. `test.yml` - Teste Completo com Coverage
- **Trigger**: Push em `main` ou `develop`, Pull Requests
- **O que faz**:
  - Executa todos os testes
  - Coleta métricas de cobertura de código
  - Faz upload dos resultados para Codecov
  - Comenta no PR com resultados de cobertura

### 2. `test-simple.yml` - Teste Rápido
- **Trigger**: Push em `main` ou `develop`, Pull Requests
- **O que faz**:
  - Executa todos os testes rapidamente
  - Não coleta coverage (mais rápido)
  - Ideal para feedback imediato

## Configuração do Banco de Dados

Os workflows usam o Supabase (ou banco remoto configurado):
- URL: Definida em `DATABASE_URL_TEST` (secret)

## Variáveis de Ambiente (GitHub Secrets)

Para adicionar variáveis de ambiente secretas:
1. Vá para: **Settings → Secrets and variables → Actions**
2. Clique em **"New repository secret"**
3. Adicione os seguintes secrets:

### Secrets Obrigatórios:

```
DATABASE_URL_TEST=postgresql://user:password@host:5432/dbname
ADMIN_USERNAME=seu_usuario_admin
ADMIN_PASSWORD=sua_senha_admin
JWT_SECRET=sua_chave_jwt_secreta
```

### Exemplo com Supabase:

```
DATABASE_URL_TEST=postgresql://postgres.xxxxx:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres
ADMIN_USERNAME=admin
ADMIN_PASSWORD=oasiscapenga
JWT_SECRET=chave-secreta-super-segura
```

⚠️ **IMPORTANTE**:
- Nunca commit secrets no repositório
- Use variáveis de ambiente sempre
- Regenere secrets periodicamente
- Use uma database de teste isolada (não use a produção!)

## Próximas Melhorias

- [ ] Adicionar linting (ESLint)
- [ ] Adicionar type checking (TypeScript)
- [ ] Adicionar build check
- [ ] Notificações Slack/Discord
- [ ] Backup automático do banco de testes
