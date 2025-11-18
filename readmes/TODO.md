# 📋 TODO - Sistema Oasis

Lista de tarefas pendentes organizadas por prioridade e categoria.

**Última atualização:** 2025-10-29

---

## 🔴 PRIORIDADE 0 - CRÍTICO (Segurança)

### Autenticação & Segurança

- [ ] **Refatorar Admin Auth para JWT**
  - Arquivo: `src/app/api/admin/auth/route.ts`
  - Problema: Token atual é apenas Base64
  - Solução: Implementar JWT assinado com secret
  - Estimativa: 4h

- [ ] **Implementar Rate Limiting**
  - Endpoints: `/api/usuarios/login`, `/api/usuarios/cadastro`
  - Biblioteca: `express-rate-limit` ou Upstash
  - Configuração: 5 tentativas por 15min
  - Estimativa: 2h

- [ ] **Adicionar Security Headers**
  - Arquivo: `next.config.ts`
  - Headers: X-Frame-Options, CSP, X-Content-Type-Options
  - Estimativa: 1h

- [ ] **Remover Credenciais Admin Padrão**
  - Arquivo: `src/app/api/admin/auth/route.ts`
  - Problema: Fallback 'admin123' não é seguro
  - Solução: Forçar .env obrigatório
  - Estimativa: 30min

- [ ] **Mover Supabase Service Role para Server-Only**
  - Problema: Service role key em endpoints públicos
  - Solução: Usar RLS do Supabase
  - Estimativa: 3h

**Total P0: ~10.5 horas**

---

## 🟡 PRIORIDADE 1 - IMPORTANTE (Funcionalidades)

### APIs Faltando

- [ ] **Implementar CRUD de Avaliações**
  - [ ] `POST /api/produtos/[id]/avaliacoes` - Criar avaliação
  - [ ] `GET /api/produtos/[id]/avaliacoes` - Listar avaliações
  - [ ] `DELETE /api/avaliacoes/[id]` - Deletar avaliação
  - [ ] `PATCH /api/avaliacoes/[id]` - Editar avaliação
  - Estimativa: 8h

- [ ] **Implementar Sistema de Múltiplas Imagens**
  - [ ] `POST /api/produtos/[id]/imagens` - Upload múltiplas imagens
  - [ ] `GET /api/produtos/[id]/imagens` - Listar imagens
  - [ ] `DELETE /api/imagens/[id]` - Deletar imagem
  - [ ] `PATCH /api/imagens/[id]/ordem` - Reordenar imagens
  - Estimativa: 6h

- [ ] **Adicionar PATCH Endpoints**
  - [ ] `PATCH /api/produtos/[id]` - Atualizar produto
  - [ ] `PATCH /api/categorias/[id]` - Atualizar categoria
  - [ ] `PATCH /api/tags/[id]` - Atualizar tag
  - [ ] `PATCH /api/usuarios/[id]` - Atualizar usuário específico
  - Estimativa: 4h

### Validações

- [ ] **Melhorar Validações Zod**
  - [ ] Preço: validar min(0), max(999999)
  - [ ] URLs: validar formato de URL
  - [ ] Email: validar domínios permitidos
  - [ ] Telefone: validar formato brasileiro
  - [ ] Data nascimento: validar idade mínima
  - Estimativa: 2h

- [ ] **Adicionar Validações de Tamanho**
  - [ ] Limite de upload de imagens (5MB)
  - [ ] Limite de caracteres em textos
  - [ ] Validação de tipos MIME
  - Estimativa: 2h

**Total P1: ~22 horas**

---

## 🟠 PRIORIDADE 2 - DESEJÁVEL (Qualidade)

### DevOps & CI/CD

- [ ] **Setup GitHub Actions**
  - [ ] `.github/workflows/test.yml` - Rodar testes em PRs
  - [ ] `.github/workflows/lint.yml` - Validar código
  - [ ] `.github/workflows/build.yml` - Testar build
  - [ ] `.github/workflows/deploy.yml` - Deploy automático
  - Estimativa: 8h

- [ ] **Criar Docker**
  - [ ] `Dockerfile` - Multi-stage build
  - [ ] `docker-compose.yml` - Dev environment
  - [ ] `.dockerignore` - Ignorar node_modules
  - Estimativa: 4h

- [ ] **Pre-commit Hooks**
  - [ ] Setup Husky
  - [ ] Pre-commit: ESLint + Type check
  - [ ] Pre-push: Testes
  - Estimativa: 2h

### Documentação

- [ ] **Gerar Documentação OpenAPI/Swagger**
  - [ ] Setup swagger-jsdoc
  - [ ] Documentar todos os 31 endpoints
  - [ ] Criar UI do Swagger em `/api/docs`
  - Estimativa: 6h

- [ ] **Criar Diagramas de Arquitetura**
  - [ ] Diagrama de banco de dados (ERD)
  - [ ] Diagrama de arquitetura do sistema
  - [ ] Fluxo de autenticação
  - Estimativa: 4h

- [ ] **Guia de Deployment**
  - [ ] Documentar deploy na Vercel
  - [ ] Configuração de variáveis de ambiente
  - [ ] Setup do Supabase
  - Estimativa: 2h

### Testes

- [ ] **Implementar Testes E2E**
  - [ ] Setup Playwright ou Cypress
  - [ ] Testes de login/cadastro
  - [ ] Testes de produtos
  - [ ] Testes de favoritos
  - Estimativa: 16h

- [ ] **Aumentar Cobertura de Testes**
  - [ ] Testes de componentes React (Testing Library)
  - [ ] Testes de hooks customizados
  - [ ] Testes de utils/helpers
  - Meta: 80%+ cobertura
  - Estimativa: 12h

### Qualidade de Código

- [ ] **Corrigir ESLint**
  - [ ] Remover `ignoreDuringBuilds: true`
  - [ ] Corrigir todos os warnings
  - [ ] Adicionar regras customizadas
  - Estimativa: 4h

- [ ] **Implementar Logging**
  - [ ] Setup Winston ou Pino
  - [ ] Logs estruturados (JSON)
  - [ ] Rotação de logs
  - Estimativa: 3h

- [ ] **Error Tracking**
  - [ ] Setup Sentry ou similar
  - [ ] Rastreamento de erros frontend
  - [ ] Rastreamento de erros API
  - Estimativa: 2h

**Total P2: ~63 horas**

---

## 🔵 PRIORIDADE 3 - NICE TO HAVE (Melhorias)

### Performance

- [ ] **Implementar Cache**
  - [ ] Redis para cache de queries
  - [ ] Cache de API routes
  - [ ] ISR (Incremental Static Regeneration)
  - Estimativa: 6h

- [ ] **Otimizar Imagens**
  - [ ] Usar Next.js Image component
  - [ ] Configurar domínios remotos
  - [ ] Lazy loading
  - Estimativa: 3h

### UX/UI

- [ ] **Criar Biblioteca de Componentes**
  - [ ] Setup Storybook
  - [ ] Documentar componentes
  - [ ] Criar mais componentes reutilizáveis
  - Estimativa: 12h

- [ ] **Implementar Temas**
  - [ ] Dark mode
  - [ ] Customização de cores
  - [ ] Persistência de preferências
  - Estimativa: 4h

### Features

- [ ] **Sistema de Notificações**
  - [ ] Notificações push
  - [ ] Email notifications
  - [ ] In-app notifications
  - Estimativa: 8h

- [ ] **Sistema de Busca Avançada**
  - [ ] Full-text search
  - [ ] Filtros avançados
  - [ ] Sugestões de busca
  - Estimativa: 10h

- [ ] **Dashboard Analytics**
  - [ ] Métricas de uso
  - [ ] Produtos mais visualizados
  - [ ] Relatórios de admin
  - Estimativa: 12h

**Total P3: ~55 horas**

---

## 📊 Resumo

| Prioridade | Tarefas | Horas | Status |
|-----------|---------|-------|--------|
| 🔴 P0 - Crítico | 5 tarefas | 10.5h | 0% |
| 🟡 P1 - Importante | 7 tarefas | 22h | 0% |
| 🟠 P2 - Desejável | 11 tarefas | 63h | 0% |
| 🔵 P3 - Nice to Have | 7 tarefas | 55h | 0% |
| **TOTAL** | **30 tarefas** | **150.5h** | **0%** |

---

## 🎯 Sprint Sugerido (2 Semanas)

### Semana 1 - Segurança & Funcionalidades Core
- ✅ Todas as tarefas P0 (10.5h)
- ✅ API de Avaliações (8h)
- ✅ Validações melhoradas (4h)
- **Total: 22.5 horas**

### Semana 2 - DevOps & Qualidade
- ✅ PATCH endpoints (4h)
- ✅ Imagens de produtos (6h)
- ✅ GitHub Actions (8h)
- ✅ Docker (4h)
- **Total: 22 horas**

---

## 📝 Notas

- Tempos são estimativas baseadas em desenvolvimento solo
- Prioridades podem mudar conforme necessidade do projeto
- Marcar como completo alterando `[ ]` para `[x]`
- Atualizar percentuais conforme progresso

---

**Desenvolvido para o TCC - Sistema Oasis**
