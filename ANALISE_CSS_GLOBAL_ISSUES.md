# Análise de Problemas de CSS Global - Relatório Completo

## Resumo Executivo

Identificadas **7 arquivos CSS com problemas de vazamento de estilos globais** que podem afetar múltiplas páginas. Desses, **2 foram corrigidos (CRÍTICOS)** e **5 ainda precisam de atenção (MÉDIOS/CRÍTICOS)**.

---

## 1. CRÍTICOS - JÁ CORRIGIDOS ✅

### 1.1 `meuperfil-after.css` → `/meuperfil-after`
**Status**: ✅ CORRIGIDO

**Problemas Encontrados**:
- `body { display: flex; ... }` - Alterava layout de toda a página
- `html { overflow-x: hidden; }` - Afetava scroll global
- `main { ... }` - Estilos específicos vazando para outras páginas

**Solução Aplicada**:
- Envolvido com `.page-meuperfil-after-wrapper`
- Todos os seletores agora scoped: `.page-meuperfil-after-wrapper body`, `.page-meuperfil-after-wrapper main`
- Adicionado wrapper HTML na página: `<div className="page-meuperfil-after-wrapper">`

---


### 1.3 `componentes.css`
**Status**: ⚠️ PARCIALMENTE TRATADO

**Problema**:
- É usado por componentes Header/Footer globais, não por páginas
- Seletores `header`, `footer` são apropriados para componentes
- Adicionado comentário para documentar comportamento

**Decisão**:
- Deixado como está (não é problema de página, é design de componente)

---

## 2. CRÍTICOS/MÉDIOS - AINDA PRECISAM CORREÇÃO 🔄

### 2.0 `artigoteste.css` → `/artigo/[slug]`
**Status**: ⏳ PENDENTE (REVERTIDO - precisa de abordagem diferente)

**Problemas**:
- `body { width: 100%; display: flex; flex-flow: column nowrap; ... }` - Mudava direção flex globalmente
- `header { width: 100%; height: 560px; ... }` - Afetava header site-wide
- `main { position: relative; ... }` - Alterava positioning de todos os `main` elements

**Nota**: Revertido porque a solução anterior (wrapper) quebrou outros estilos. Precisa de análise mais cuidadosa antes de corrigir.

---

### 2.1 `tela-de-cadastro.css` → `/cadastro`, `/cadastro2`, `/login`
**Status**: ⏳ PENDENTE

**Problemas**:
- Linha 21: `html, body` - Seletores globais
- Media queries com `body` - Afetam layout responsivo globalmente
- `form` e `select` - Podem conflitar com outras formas na página

**Ação Necessária**:
- Criar wrapper `.page-login-cadastro-wrapper` ou similar
- Remover `html, body` globais ou scoped
- Testar responsividade em todas as resoluções

---

### 2.2 `parcerias-usuarios.css` → `/parcerias-influenciadores`
**Status**: ⏳ PENDENTE

**Problemas**:
- Linha 68: `form { ... }` - Sem escopo
- Linha 383: `aside { ... }` - Sem escopo
- Pode afetar outras formas e sidebars

**Ação Necessária**:
- Wrapper `.page-parcerias-usuarios-wrapper`
- Escope: `.page-parcerias-usuarios-wrapper form`, `.page-parcerias-usuarios-wrapper aside`

---

### 2.3 `parcerias-empresas.css` → `/parcerias-empresas`
**Status**: ⏳ PENDENTE

**Problemas**:
- Linha 70: `form { ... }` - Sem escopo
- Linha 347: `aside { ... }` - Sem escopo

**Ação Necessária**:
- Wrapper `.page-parcerias-empresas-wrapper`
- Escope similar a parcerias-usuarios

---

### 2.4 `tendencias.css` → `/tendencias`
**Status**: ⏳ PENDENTE

**Problemas**:
- `button { ... }` - Seletor muito genérico
- `a { ... }` - Seletor muito genérico
- Afeta TODOS os botões e links na página

**Ação Necessária**:
- Wrapper `.page-tendencias-wrapper`
- Escope específico: `.page-tendencias-wrapper button`, `.page-tendencias-wrapper a`

---

## 3. SEGUROS - JÁ USANDO CSS MODULES ✅

Os arquivos abaixo não têm problema porque usam **CSS Modules** (auto-scoped):
- `page.module.css` (Home)
- `artigo.module.css`
- `pos_login.module.css`
- `UserMenu.module.css`

---

## 4. SEGUROS - SÓ CLASS SELECTORS ✅

Os arquivos abaixo só usam **class selectors** (sem vazamento):
- admin-artigos.css
- artigo-geral.css
- central-de-ajuda.css
- cortes-geral.css
- cronograma-capilar.css
- alimentacao.css
- favoritos.css
- guia.css
- hair-care.css
- infantil.css
- login-admin.css
- perguntas.css
- quizzes.css
- resetar.css
- skincare.css
- tinturas.css
- meuperfil-before.css

---

## Padrão de Solução

Para cada arquivo problemático, aplicar:

```tsx
// 1. CSS: Envolver seletores globais
.page-{name}-wrapper body { ... }
.page-{name}-wrapper main { ... }
.page-{name}-wrapper form { ... }

// 2. HTML: Adicionar wrapper na página
<div className="page-{name}-wrapper">
  <main>...</main>
</div>
```

---

## Impacto

### Sem Correção
- CSS de uma página pode afetar layout de outras páginas
- Quebra de styling ao navegar
- Comportamento inconsistente em resolução e responsividade
- Dificuldade em manutenção futura

### Com Correção
- CSS isolado por página
- Sem contaminação entre páginas
- Styling previsível e manutenível
- Facilita refatoração futura

---

## Próximas Ações

- [ ] Analisar melhor `artigoteste.css` antes de corrigir (foi revertido)
- [ ] Corrigir `tela-de-cadastro.css`
- [ ] Corrigir `parcerias-usuarios.css`
- [ ] Corrigir `parcerias-empresas.css`
- [ ] Corrigir `tendencias.css`
- [ ] Testar todas as páginas após correções
- [ ] Documentar padrão CSS no projeto (evita repetição)
