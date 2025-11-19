# Solução do Problema de CSS - Footer e Layout

## Problema Original

Quando a página `/perfil` ou `/gerenciamento` era carregada, o CSS global estava afetando a página principal (`/`), causando:
- Footer aparecendo com `position: fixed` na página principal
- Seção "INFANTIL" saindo dos limites (overflow)
- Espaçamento incorreto em todo o layout da home

## Causa Raiz

O arquivo `src/styles/editar-perfil.css` tinha seletores CSS **globais** que se aplicavam a qualquer elemento na página, não apenas nas páginas de profile/gerenciamento:

```css
/* ❌ ERRADO - Afeta TODA a página */
footer { position: fixed; ... }
main { margin-left: 240px; ... }
form { width: 100%; ... }
.layout-container { display: flex; ... }
```

Isso significa que mesmo na página `/`, todos os elementos `footer`, `main`, `form` estavam recebendo esses estilos, quebrando o layout.

## Solução Implementada

### 1. Escopo de Seletores CSS

Mudou-se todos os seletores para serem **scoped** às páginas específicas usando wrappers:

```css
/* ✅ CORRETO - Só afeta as páginas de perfil/gerenciamento */
.page-perfil-wrapper footer { position: fixed; ... }
.page-gerenciamento-wrapper footer { position: fixed; ... }

.page-perfil-wrapper main { margin-left: 240px; ... }
.page-gerenciamento-wrapper main { margin-left: 240px; ... }

.page-perfil-wrapper form { ... }
.page-gerenciamento-wrapper form { ... }

.page-perfil-wrapper .layout-container { display: flex; ... }
.page-gerenciamento-wrapper .layout-container { display: flex; ... }
```

### 2. Estrutura HTML

As páginas agora envolvem todo o conteúdo em um wrapper específico:

```tsx
// src/app/perfil/page.tsx
return (
  <div className="page-perfil-wrapper">
    <Layout>
      {/* conteúdo */}
    </Layout>
  </div>
);

// src/app/gerenciamento/page.tsx
return (
  <div className="page-gerenciamento-wrapper">
    <Layout>
      {/* conteúdo */}
    </Layout>
  </div>
);
```

### 3. Estrutura do Layout

O layout utiliza flexbox corretamente com footer como sibling (não child):

```tsx
<div className="layout-container">
  {/* Sidebar */}
  <aside id="aside-lateral">...</aside>

  {/* Conteúdo principal */}
  <div className="layout-content">
    {children}
  </div>

  {/* Footer - SIBLING, não child de layout-content */}
  {!isLoading && (
    <footer>
      <button>Cancelar</button>
      <button>Salvar</button>
    </footer>
  )}
</div>
```

## Mudanças de Arquivos

### 1. `src/styles/editar-perfil.css`
- Adicionado prefixo `.page-perfil-wrapper` e `.page-gerenciamento-wrapper` a todos os seletores
- Garantido que estilos só se aplicam dentro desses wrappers

### 2. `src/app/perfil/page.tsx` e `src/app/gerenciamento/page.tsx`
- Envolvem conteúdo em `<div className="page-perfil-wrapper">` e `<div className="page-gerenciamento-wrapper">`
- Adicionado loading state visual
- Removido early return que quebrava a transição de página

### 3. `src/app/perfil/layout.tsx` e `src/app/gerenciamento/layout.tsx`
- Footer agora é sibling de `.layout-content` (não child)
- Adicionado prop `isLoading` para esconder footer durante carregamento
- Footer renderiza condicionalmente: `{!isLoading && <footer>...}</footer>`

### 4. `src/components/header.tsx`
- Adicionados links de navegação para `/perfil` e `/gerenciamento`
- Links aparecem no popup do usuário e no menu mobile quando logged in
- Permite acesso às páginas sem digitar URL manualmente

## Resultado

- ✅ Footer mantém `position: fixed` apenas em `/perfil` e `/gerenciamento`
- ✅ Página principal (`/`) não sofre nenhuma influência de CSS dessas páginas
- ✅ Estrutura de layout funciona corretamente
- ✅ Botões não aparecem brevemente durante transição entre páginas
- ✅ Navegação funcional entre páginas de usuário

## Boas Práticas Aplicadas

1. **CSS Scoping**: Usar wrappers específicos para evitar vazamento de estilos
2. **Flexbox Correto**: Footer como sibling, não child, para `position: fixed` funcionar
3. **Loading States**: Esconder UI durante carregamento de dados assíncronos
4. **Conditional Rendering**: Mostrar conteúdo apenas quando dados estão prontos
