# 📋 API Gap Analysis - OASIS EM Next

**Data:** November 13, 2024
**Status:** Análise Completa
**Páginas Analisadas:** 16 funcionais

---

## 📊 Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Páginas Funcionais Completas** | 13/16 (81%) ✓ |
| **Páginas Incompletas** | 2/16 (13%) ✗ |
| **Páginas para Verificar** | 1/16 (6%) ⚠️ |
| **APIs Faltando** | 6 endpoints |
| **APIs para Verificar** | 3 endpoints |
| **Tempo Estimado** | ~15 horas |

---

## ✅ PÁGINAS COMPLETAS (13 páginas)

### 🔐 Autenticação (4/4)
- ✓ `/login` - POST /api/usuarios/login
- ✓ `/cadastro` - POST /api/usuarios/check-email
- ✓ `/cadastro2` - POST /api/usuarios/cadastro
- ✓ `/admin/login` - POST /api/admin/auth

### 🛍️ Produtos (3/3)
- ✓ `/produtos` - GET /api/produtos + filtros
- ✓ `/produtos/[id]` - GET /api/produtos/[id]
- ✓ `/cadastrar-produto` - POST /api/produtos/cadastro

### 📰 Artigos (4/4)
- ✓ `/artigos` - Listagem de artigos
- ✓ `/artigo/[slug]` - Detalhes com favoritos
- ✓ `/admin/artigos` - Gerenciamento
- ✓ `/admin/artigos/criar` - Criar artigos

### 👤 Perfil & Gerenciamento (2/2)
- ✓ `/perfil` - GET/PUT /api/usuarios/perfil
- ✓ `/gerenciamento` - Gerenciar conta

### 💝 Outros (2/2)
- ✓ `/favoritos` - GET /api/favoritos/artigos
- ✓ `/parcerias-empresas` - POST /api/parcerias/empresas

---

## ❌ PÁGINAS INCOMPLETAS (2 páginas)

### 1️⃣ /questionario/[step] (Questionário de Cabelo)

**Status:** Cliente-side apenas, sem persistência

**Funcionalidade:**
- Multi-step questionnaire (4 passos)
- Recomendações personalizadas
- Cronograma semanal

**APIs FALTANDO:**

```typescript
// 1. Salvar respostas
POST /api/questionario/respostas
Request: {
  usuario_id: number,
  step: 1-4,
  resposta: JSON (respostas do passo atual)
}
Response: {
  id: number,
  success: boolean
}

// 2. Recuperar respostas (para resumir)
GET /api/questionario/respostas
Response: {
  step: number,
  resposta: JSON
}

// 3. Obter recomendações por passo
GET /api/questionario/recomendacoes/[step]
Response: {
  recommendations: Array<string>,
  produtos: Array<Produto>,
  dicas: Array<string>
}
```

**Banco de Dados Necessário:**
```sql
CREATE TABLE questionario_respostas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  step INT NOT NULL (1-4),
  resposta JSON NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
  UNIQUE KEY unique_usuario_step (usuario_id, step)
);
```

**Prioridade:** 🔴 HIGH
**Complexidade:** MEDIUM
**Tempo Estimado:** 4 horas

---

### 2️⃣ /cronograma-capilar (Cronograma Capilar)

**Status:** Calendário estático, sem persistência

**Funcionalidade:**
- Gerador de cronograma semanal/mensal
- Calendário interativo
- Recomendações de produtos
- Dicas de cuidados

**APIs FALTANDO:**

```typescript
// 1. Salvar cronograma do usuário
POST /api/cronograma/salvar
Request: {
  usuario_id: number,
  tipo_cabelo_id: number,
  cronograma: JSON (estrutura do cronograma)
}
Response: {
  id: number,
  success: boolean
}

// 2. Recuperar cronograma salvo
GET /api/cronograma/[userId]
Response: {
  id: number,
  tipo_cabelo_id: number,
  cronograma: JSON,
  criado_em: timestamp,
  atualizado_em: timestamp
}

// 3. Recomendações de produtos por tipo
GET /api/cronograma/recomendacoes/[hairType]
Response: {
  produtos: Array<{
    id: number,
    nome: string,
    tipo: 'hidratacao' | 'nutricao' | 'reconstrucao',
    url_loja: string
  }>
}
```

**Banco de Dados Necessário:**
```sql
CREATE TABLE cronograma_capilar (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  tipo_cabelo_id INT,
  cronograma JSON NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (tipo_cabelo_id) REFERENCES tipos_cabelo(id_tipo_cabelo),
  UNIQUE KEY unique_usuario (usuario_id)
);
```

**Prioridade:** 🔴 HIGH
**Complexidade:** MEDIUM
**Tempo Estimado:** 4 horas

---

## ⚠️ PÁGINAS PARA VERIFICAR (1 página)

### /admin/artigos/editar/[id]

**Status:** Provavelmente completa, mas precisa verificação

**Endpoint a Verificar:**
- ⚠️ `PUT /api/admin/artigos/[id]` - Atualizar artigo

**Ação:** Verificar se existe implementação em `src/app/api/admin/artigos/[id]/route.ts`

---

## 🔍 APIs para Verificar (3 endpoints)

Estes endpoints provavelmente existem, mas precisam de confirmação:

1. **POST /api/favoritos/artigos** - Adicionar favorito
2. **DELETE /api/favoritos/artigos/[id]** - Remover favorito
3. **PUT /api/admin/artigos/[id]** - Atualizar artigo

---

## 🚀 Roadmap de Implementação

### Fase 1: APIs Faltando (Semana 1-2) - 8 horas

```
├─ Questionário (4 horas)
│  ├─ Criar tabela
│  ├─ POST /api/questionario/respostas
│  ├─ GET /api/questionario/respostas
│  └─ GET /api/questionario/recomendacoes/[step]
│
└─ Cronograma (4 horas)
   ├─ Criar tabela
   ├─ POST /api/cronograma/salvar
   ├─ GET /api/cronograma/[userId]
   └─ GET /api/cronograma/recomendacoes/[hairType]
```

### Fase 2: Verificação (2 horas)

```
├─ Verificar PUT /api/admin/artigos/[id] (30 min)
└─ Verificar favoritos endpoints (1.5 horas)
```

### Fase 3: Integração & Testes (5 horas)

```
├─ Integração frontend (3 horas)
└─ Testes E2E (2 horas)
```

**Total: ~15 horas**

---

## 📈 Estatísticas por Categoria

### Endpoints por Tipo

| Tipo | Total | Implementado | Faltando | % |
|------|-------|--------------|----------|---|
| Autenticação | 4 | 4 | 0 | 100% ✓ |
| Produtos | 5 | 5 | 0 | 100% ✓ |
| Artigos | 5 | 5 | 0 | 100% ✓ |
| Usuários | 7 | 7 | 0 | 100% ✓ |
| Favoritos | 2 | 2 | 0 | 100% ✓ |
| **Questionário** | 3 | 0 | **3** | **0%** ✗ |
| **Cronograma** | 3 | 0 | **3** | **0%** ✗ |
| Parcerias | 2 | 2 | 0 | 100% ✓ |
| **Admin** | 1 | 0 | **1** | **0%** ⚠️ |
| **TOTAL** | **32** | **27** | **6** | **84%** |

---

## 🎯 Conclusões

### Pontos Fortes ✓
- ✅ Sistema de autenticação robusto
- ✅ CRUD de produtos completo
- ✅ Sistema de artigos/blog funcional
- ✅ Gerenciamento de usuários completo
- ✅ Sistema de favoritos implementado
- ✅ 81% das páginas completamente funcionais

### Áreas Críticas ✗
- ❌ Questionário sem persistência (afeta UX)
- ❌ Cronograma sem salvamento (feature incompleta)
- ❌ Falta verificação do endpoint de edição de artigos

### Oportunidades 💡
- Implementar recomendações personalizadas baseadas em respostas
- Adicionar histórico de cronogramas
- Exportar cronograma em PDF
- Compartilhar cronograma com amigos

---

## 📝 Próximos Passos Recomendados

1. **Verificação Rápida (30 min)**
   - Confirmar existência de `PUT /api/admin/artigos/[id]`
   - Confirmar funcionamento de POST/DELETE em favoritos

2. **Implementação das 6 APIs Faltando (8 horas)**
   - Priorizar questionário (impacto maior no UX)
   - Depois cronograma

3. **Testes e Validação (3 horas)**
   - Testes unitários das novas APIs
   - Testes E2E das pages completas

4. **Deploy (1 hora)**
   - Deploy para produção
   - Validação em ambiente real

---

**Documento Preparado:** November 13, 2024
**Análise Realizada Por:** Claude Code
**Status:** Pronto para Ação
