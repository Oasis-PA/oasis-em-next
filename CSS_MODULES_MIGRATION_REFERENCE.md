# CSS Modules Migration Reference - Página Alimentação

## ✅ Migração Completada: Alimentação

Este documento documenta a migração bem-sucedida da página **Alimentação** de Global CSS para CSS Modules.

## O Que Foi Mudado

### 1. Arquivo CSS
**Antes:** `src/styles/alimentacao.css` (Global CSS - 703 linhas)
**Depois:** `src/styles/alimentacao.module.css` (CSS Module - 753 linhas)

#### Mudanças Principais:
```css
/* ANTES - Global CSS */
.page-alimentacao-wrapper { ... }
.page-alimentacao-wrapper main { ... }
.page-alimentacao-wrapper .secao1 { ... }
#banner { ... }
#cx1 { ... }
#ol1 { ... }

/* DEPOIS - CSS Module */
.wrapper { ... }
.main { ... }
.secao1 { ... }
.banner { ... }
.cx1 { ... }
.ol1 { ... }
```

### 2. Component TypeScript
**Arquivo:** `src/app/alimentacao/page.tsx`

#### Import Change:
```tsx
// ANTES
import '@/styles/alimentacao.css';

// DEPOIS
import styles from '@/styles/alimentacao.module.css';
```

#### ClassName Updates - Exemplo:
```tsx
// ANTES
<div className="page-alimentacao-wrapper">
  <section id="banner">
    <div className="texto-banner">

// DEPOIS
<div className={styles.wrapper}>
  <section className={styles.banner}>
    <div className={styles.textoBanner}>
```

## Padrão de Conversão

### ID Selectors → Class Names
```
ID Selector (HTML)  →  Class Name (CSS Module)
#banner             →  .banner
#cx1, #cx2, #cx3    →  .cx1, .cx2, .cx3
#ol1 até #ol8       →  .ol1 até .ol8
#linha              →  .linha
```

### CamelCase para Nomenclatura
```
Kebab-case (CSS)    →  CamelCase (Module)
texto-banner        →  textoBanner
espi-cenou          →  espiCenou
parte-de-baixo      →  partedebaixo (sem hífen)
```

### Wrapper Simplificado
```
.page-alimentacao-wrapper  →  .wrapper (dentro do context da página)
```

## Checklist Completo

- [x] Criar alimentacao.module.css com classes simplificadas
- [x] Atualizar import em alimentacao/page.tsx
- [x] Converter todos className="xxx" → className={styles.xxx}
- [x] Converter todos id="xxx" → className={styles.xxx}
- [x] Simplificar names de classes (remover prefixos)
- [x] Testar TypeScript compilation (sem erros de módulo)
- [x] Commit com mensagem descritiva

## Resultado

✅ **Página alimentacao agora usa CSS Modules**
- Nenhum risco de conflito com outras páginas
- Type-safe (TypeScript valida className)
- Escopo automático (CSS compilado apenas para esta página)
- Melhor maintainability (fácil renomear classes sem quebrar outras páginas)

## Próximos Passos

Use este arquivo como **referência e template** para as próximas migrações:

1. **Fase 1 (High-Priority):**
   - meuperfil-after.module.css
   - meuperfil-before.module.css
   - produtos.module.css
   - cronograma-capilar.module.css

2. **Fase 2 (Medium-Priority):**
   - hair-care.module.css
   - skincare.module.css
   - tendencias.module.css
   - E outras...

3. **Fase 3 (Low-Priority):**
   - Pages mais simples

## Dicas de Implementação

### Ao Converter uma Nova Página

1. **Renomeie o arquivo:**
   ```bash
   # Exemplo: skincare.css → skincare.module.css
   ```

2. **Remova prefixos de classe:**
   ```css
   /* De: */
   .page-skincare-wrapper { ... }

   /* Para: */
   .wrapper { ... }
   ```

3. **Converta IDs para classes:**
   ```css
   /* De: */
   #banner { ... }

   /* Para: */
   .banner { ... }
   ```

4. **Atualize o component:**
   ```tsx
   import styles from '@/styles/skincare.module.css';
   // e mude className="page-skincare-wrapper" → className={styles.wrapper}
   ```

5. **Use CamelCase para nomes compostos:**
   ```tsx
   <!-- De: -->
   className="texto-banner"

   <!-- Para: -->
   className={styles.textoBanner}
   ```

## Benefícios Realizados

✅ **Escopo automático** - Sem mais conflitos de CSS entre páginas
✅ **Type-safe** - TypeScript valida className em tempo de compilação
✅ **Melhor performance** - CSS compilado apenas onde é usado
✅ **Fácil refatoração** - Renomear classes sem quebrar outras páginas
✅ **Padrão consistente** - Todas as páginas seguem o mesmo padrão

## Arquivos Afetados

- ✅ `src/styles/alimentacao.module.css` - NOVO (migrado)
- ✅ `src/app/alimentacao/page.tsx` - ATUALIZADO
- ⚠️ `src/styles/alimentacao.css` - Pode ser mantido ou deletado (use com cuidado)

## Notas Importantes

- CSS Modules em Next.js geram nomes únicos de classe automaticamente (ex: `alimentacao__banner__a1b2c`)
- Isso previne qualquer possibilidade de conflito de CSS entre páginas
- O componente Header/Footer ainda usa `componentes.css` global (como deve ser)
- Cada página agora tem seu próprio escopo de estilo

## Commit de Referência

```
commit 80edefb
Author: Claude <noreply@anthropic.com>

Migrate alimentacao page to CSS Modules

- Convert alimentacao.css to alimentacao.module.css with simplified class names
- Update alimentacao/page.tsx to import and use CSS Module
- Remove global CSS import and update all className references
- Change .page-alimentacao-wrapper to .wrapper
- Convert ID-based selectors to class names
```

Use este commit como referência para comparar com futuras migrações.
