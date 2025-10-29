# 🗺️ ROADMAP - Sistema Oasis

Planejamento estratégico de desenvolvimento do projeto Oasis.

**Versão:** 1.0
**Última atualização:** 2025-10-29
**Status do Projeto:** Em desenvolvimento - TCC

---

## 📍 Situação Atual (v0.9)

### ✅ Implementado
- 31 endpoints de API REST
- 177 testes automatizados (100% passando)
- Autenticação JWT completa
- Sistema de favoritos (produtos e artigos)
- Upload de imagens (Supabase Storage)
- Validação robusta com Zod
- 49 páginas frontend
- Admin dashboard básico

### ⚠️ Estado do Projeto
- **Funcionalidades Core:** 85% completo
- **Segurança:** 70% completo
- **Qualidade de Código:** 75% completo
- **DevOps:** 20% completo
- **Documentação:** 60% completo

### 🎯 Objetivo
Tornar o projeto production-ready para apresentação do TCC e potencial deploy real.

---

## 🚀 FASE 1 - Segurança & Estabilidade (2 semanas)

**Meta:** Corrigir vulnerabilidades críticas e garantir segurança básica.

### Semana 1 - Segurança Core
**Objetivo:** Sistema seguro para autenticação

- [x] **Rate Limiting** (2h)
  - Proteger login/cadastro contra força bruta
  - Implementar em rotas públicas
  - Biblioteca: Upstash Rate Limit

- [x] **Refatorar Admin Auth** (4h)
  - Migrar de Base64 para JWT
  - Adicionar expiração de token
  - Implementar refresh token

- [x] **Security Headers** (1h)
  - X-Frame-Options
  - Content-Security-Policy
  - X-Content-Type-Options

- [ ] **Validações Robustas** (3h)
  - Validar preços (min/max)
  - Validar URLs de imagens
  - Validar formatos de telefone
  - Limites de tamanho de upload

**Entregável:** Sistema com segurança básica implementada

### Semana 2 - Correções & Testes
**Objetivo:** Garantir estabilidade

- [ ] **Corrigir ESLint** (4h)
  - Remover `ignoreDuringBuilds`
  - Corrigir todos os warnings
  - Adicionar regras customizadas

- [ ] **Error Handling** (3h)
  - Padronizar respostas de erro
  - Implementar error boundary
  - Logging estruturado básico

- [ ] **Testes de Segurança** (3h)
  - Testes de rate limiting
  - Testes de validação
  - Testes de autenticação

**Entregável:** Código limpo, sem warnings, com boa cobertura de testes

**📊 Resultado Esperado:** Sistema seguro e estável (85% funcionalidade, 90% segurança)

---

## 🎨 FASE 2 - Features Essenciais (3 semanas)

**Meta:** Completar funcionalidades previstas no TCC.

### Semana 3 - Sistema de Avaliações
**Objetivo:** Usuários podem avaliar produtos

- [ ] **Backend de Avaliações** (6h)
  - `POST /api/produtos/[id]/avaliacoes`
  - `GET /api/produtos/[id]/avaliacoes`
  - `DELETE /api/avaliacoes/[id]`
  - `PATCH /api/avaliacoes/[id]`

- [ ] **Validações de Avaliações** (2h)
  - Nota entre 1-5
  - Comentário opcional (max 500 chars)
  - Apenas 1 avaliação por usuário/produto

- [ ] **Frontend de Avaliações** (4h)
  - Componente de estrelas
  - Formulário de avaliação
  - Lista de avaliações
  - Média de notas

**Entregável:** Sistema completo de reviews

### Semana 4 - Múltiplas Imagens
**Objetivo:** Produtos com galeria de imagens

- [ ] **Upload Múltiplo** (4h)
  - Endpoint de upload em lote
  - Validação de tipos (JPEG, PNG, WebP)
  - Limite de 5 imagens por produto
  - Compressão automática

- [ ] **Gestão de Imagens** (3h)
  - Reordenação de imagens
  - Definir imagem principal
  - Deletar imagens específicas

- [ ] **Frontend de Galeria** (3h)
  - Carousel de imagens
  - Thumbnails
  - Zoom em imagens

**Entregável:** Sistema de galeria de produtos

### Semana 5 - PATCH Endpoints
**Objetivo:** Permitir atualizações parciais

- [ ] **Implementar PATCH** (4h)
  - PATCH /api/produtos/[id]
  - PATCH /api/categorias/[id]
  - PATCH /api/tags/[id]

- [ ] **Validações Parciais** (2h)
  - Validar apenas campos enviados
  - Manter valores não alterados

- [ ] **Testes de Atualização** (2h)
  - Testes de atualização parcial
  - Testes de validação

**Entregável:** APIs completas com CRUD total

**📊 Resultado Esperado:** 95% funcionalidade, sistema feature-complete

---

## 🏗️ FASE 3 - DevOps & Automação (2 semanas)

**Meta:** Preparar para deploy e automação.

### Semana 6 - CI/CD Pipeline
**Objetivo:** Automação de testes e build

- [ ] **GitHub Actions - Tests** (3h)
  - Rodar testes em PRs
  - Validar build
  - Verificar lint

- [ ] **GitHub Actions - Deploy** (3h)
  - Deploy automático para Vercel
  - Deploy preview em PRs
  - Variáveis de ambiente

- [ ] **Pre-commit Hooks** (2h)
  - Husky setup
  - Lint staged
  - Type checking

**Entregável:** Pipeline CI/CD completo

### Semana 7 - Containerização
**Objetivo:** Deploy via Docker

- [ ] **Dockerfile** (2h)
  - Multi-stage build
  - Otimização de layers
  - Build de produção

- [ ] **Docker Compose** (2h)
  - Dev environment completo
  - PostgreSQL local
  - Redis (se implementado)

- [ ] **Documentação de Deploy** (2h)
  - Guia de deploy Vercel
  - Guia de deploy Docker
  - Configuração de domínio

**Entregável:** Sistema containerizado e documentado

**📊 Resultado Esperado:** Sistema pronto para deploy em qualquer ambiente

---

## 📚 FASE 4 - Documentação & Qualidade (2 semanas)

**Meta:** Documentação completa e código de qualidade.

### Semana 8 - Documentação Técnica
**Objetivo:** Documentar arquitetura

- [ ] **OpenAPI/Swagger** (6h)
  - Documentar todos os 31 endpoints
  - UI interativa em /api/docs
  - Exemplos de request/response

- [ ] **Diagramas** (4h)
  - ERD do banco de dados
  - Diagrama de arquitetura
  - Fluxos de autenticação

- [ ] **ADRs** (2h)
  - Decisões arquiteturais
  - Justificativas técnicas

**Entregável:** Documentação técnica completa

### Semana 9 - Testes E2E
**Objetivo:** Garantir qualidade end-to-end

- [ ] **Setup Playwright** (2h)
  - Configuração inicial
  - Browser automation

- [ ] **Testes Principais** (8h)
  - Fluxo de login/cadastro
  - Fluxo de compra/favoritos
  - Fluxo de avaliações
  - Fluxo admin

- [ ] **Coverage Report** (2h)
  - Relatório de cobertura
  - Meta: 80%+ cobertura

**Entregável:** Suite completa de testes E2E

**📊 Resultado Esperado:** Documentação completa, 80%+ cobertura

---

## 🎯 FASE 5 - Polimento & Performance (2 semanas)

**Meta:** Otimizar e refinar para produção.

### Semana 10 - Performance
**Objetivo:** Sistema rápido e responsivo

- [ ] **Cache Strategy** (4h)
  - Redis para queries frequentes
  - ISR para páginas estáticas
  - Cache de imagens

- [ ] **Otimização de Imagens** (3h)
  - Next.js Image component
  - Lazy loading
  - WebP conversion

- [ ] **Database Optimization** (3h)
  - Índices adicionais
  - Query optimization
  - Connection pooling

**Entregável:** Sistema otimizado (< 2s LCP)

### Semana 11 - UX/UI Refinement
**Objetivo:** Interface polida

- [ ] **Biblioteca de Componentes** (6h)
  - Mais componentes reutilizáveis
  - Storybook (opcional)
  - Documentação de componentes

- [ ] **Dark Mode** (4h)
  - Theme provider
  - Persistência de preferência
  - Todos os componentes suportam

- [ ] **Acessibilidade** (4h)
  - ARIA labels
  - Keyboard navigation
  - Screen reader support

**Entregável:** UI polida e acessível

**📊 Resultado Esperado:** Sistema production-ready, performático

---

## 🏁 FASE 6 - Lançamento & Manutenção (Contínuo)

**Meta:** Deploy em produção e manutenção.

### Pré-lançamento
- [ ] **Testes de Carga** (4h)
  - Simular 100+ usuários simultâneos
  - Identificar gargalos
  - Ajustar limites

- [ ] **Security Audit** (4h)
  - Verificar vulnerabilidades
  - OWASP Top 10
  - Penetration testing básico

- [ ] **Backup Strategy** (2h)
  - Backups automáticos
  - Restore procedure
  - Disaster recovery plan

### Lançamento
- [ ] Deploy em produção (Vercel)
- [ ] Configurar domínio customizado
- [ ] Setup analytics (Google/Plausible)
- [ ] Monitoramento (Sentry/LogRocket)

### Pós-lançamento
- [ ] Monitoring e alertas
- [ ] Bug fixes baseados em uso real
- [ ] Melhorias baseadas em feedback
- [ ] Manutenção semanal

**📊 Resultado Esperado:** Sistema em produção, estável e monitorado

---

## 📊 Timeline Geral

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   FASE 1    │   FASE 2    │   FASE 3    │   FASE 4    │   FASE 5    │   FASE 6    │
│ Segurança   │  Features   │   DevOps    │    Docs     │ Performance │ Lançamento  │
│  2 semanas  │  3 semanas  │  2 semanas  │  2 semanas  │  2 semanas  │  Contínuo   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
  Semana 1-2    Semana 3-5    Semana 6-7    Semana 8-9   Semana 10-11   Semana 12+
```

**Total estimado:** 11 semanas (~3 meses)

---

## 🎯 Milestones

### Milestone 1 - MVP Seguro (Fim da Fase 1)
- ✅ Autenticação segura
- ✅ Rate limiting implementado
- ✅ Código sem warnings
- **Data alvo:** Semana 2

### Milestone 2 - Feature Complete (Fim da Fase 2)
- ✅ Todas as features do TCC implementadas
- ✅ CRUD completo em todas as entidades
- ✅ Frontend polido
- **Data alvo:** Semana 5

### Milestone 3 - Production Ready (Fim da Fase 3)
- ✅ CI/CD funcionando
- ✅ Docker configurado
- ✅ Documentação de deploy
- **Data alvo:** Semana 7

### Milestone 4 - Documented (Fim da Fase 4)
- ✅ Swagger docs completo
- ✅ Testes E2E
- ✅ 80%+ cobertura
- **Data alvo:** Semana 9

### Milestone 5 - Optimized (Fim da Fase 5)
- ✅ Performance otimizada
- ✅ Dark mode
- ✅ Acessibilidade completa
- **Data alvo:** Semana 11

### Milestone 6 - LANÇAMENTO (Fim da Fase 6)
- ✅ Deploy em produção
- ✅ Monitoramento ativo
- ✅ Backup configurado
- **Data alvo:** Semana 12

---

## 📈 KPIs de Sucesso

### Técnicos
- ✅ 100% testes passando
- ✅ 80%+ cobertura de testes
- ✅ 0 vulnerabilidades críticas
- ✅ < 2s tempo de carregamento (LCP)
- ✅ 90+ Lighthouse score

### Funcionais
- ✅ Todas as features do TCC implementadas
- ✅ Admin dashboard funcional
- ✅ Sistema de avaliações completo
- ✅ Upload de imagens robusto

### DevOps
- ✅ CI/CD automatizado
- ✅ Deploy com 1 comando
- ✅ 99.9% uptime (após lançamento)
- ✅ Rollback em < 5min

---

## 🔄 Revisões

### Review Semanal
- Toda sexta-feira: Revisar progresso
- Atualizar status de tarefas
- Ajustar timeline se necessário

### Review de Fase
- Fim de cada fase: Demo completa
- Validar entregáveis
- Decidir se avança ou ajusta

### Review Geral
- Mensal: Análise completa
- Revalidar prioridades
- Ajustar roadmap

---

## 📝 Notas

- **Flexibilidade:** Timeline pode ser ajustado conforme necessidade do TCC
- **Prioridades:** Fases 1-2 são críticas, 3-5 são desejáveis
- **Escopo:** Pode ser reduzido se prazo do TCC for apertado
- **Qualidade > Velocidade:** Melhor entregar menos features bem feitas

---

## 🎓 Considerações para TCC

### Essencial para Apresentação
- ✅ FASE 1 completa (segurança)
- ✅ FASE 2 completa (features)
- ✅ Documentação básica

### Desejável
- ✅ FASE 3 (DevOps mostra maturidade)
- ✅ FASE 4 (documentação impressiona)

### Opcional
- 🔵 FASE 5 (performance é plus)
- 🔵 FASE 6 (deploy real é wow factor)

### Recomendação
**Foco mínimo:** Fases 1 e 2 (5 semanas)
**Foco ideal:** Fases 1, 2 e 3 (7 semanas)
**Foco completo:** Todas as fases (11 semanas)

---

**Última atualização:** 2025-10-29
**Próxima revisão:** Semanal (toda sexta-feira)
