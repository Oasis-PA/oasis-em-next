# Plano de Migração: Global CSS → CSS Modules

## Objetivo
Converter 38 arquivos CSS globais em CSS Modules para melhor escopo, type-safety e eliminação de conflitos entre páginas.

## Status Atual
- **CSS Modules:** 4 arquivos (9.5%)
  - page.module.css (home)
  - artigo.module.css (admin)
  - pos_login.module.css
  - UserMenu.module.css
- **Global CSS:** 38 arquivos (90.5%)

## Benefícios
✅ Sem conflitos de CSS entre páginas
✅ Type-safe: TypeScript valida className
✅ Escopo automático: não precisa de `.page-xxx-wrapper`
✅ Melhor performance: CSS compilado apenas onde é usado
✅ Refatoração segura: renomear classes sem quebrar outras páginas

## Padrão de Migração

### Antes (Global CSS)
```tsx
// src/app/alimentacao/page.tsx
import '@/styles/alimentacao.css';

export default function Alimentacao() {
  return (
    <div className="page-alimentacao-wrapper">
      <Header />
      <section className="secao1">
        <h1 className="titulo">...</h1>
      </section>
    </div>
  );
}
```

### Depois (CSS Modules)
```tsx
// src/app/alimentacao/page.tsx
import styles from '@/styles/alimentacao.module.css';
import { Header, Footer } from '@/components';

export default function Alimentacao() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.secao1}>
        <h1 className={styles.titulo}>...</h1>
      </section>
      <Footer />
    </div>
  );
}
```

### Mudanças no CSS
```css
/* Antes: alimentacao.css */
.page-alimentacao-wrapper { /* ... */ }
.page-alimentacao-wrapper .secao1 { /* ... */ }
.page-alimentacao-wrapper .titulo { /* ... */ }

/* Depois: alimentacao.module.css */
.wrapper { /* ... */ }
.secao1 { /* ... */ }
.titulo { /* ... */ }
```

## Ordem de Migração (Prioridade)

### FASE 1: High-Priority (Páginas Complexas)
Fazer primeiro porque têm maior chance de conflitos e beneficiam mais

1. **alimentacao.module.css** ← COMEÇAR AQUI
   - Página: `/alimentacao`
   - Arquivo: `src/app/alimentacao/page.tsx`
   - Tamanho: ~200 linhas CSS
   - Complexidade: Alta (múltiplas seções)

2. **meuperfil-after.module.css**
   - Página: `/meuperfil-after`
   - Arquivo: `src/app/meuperfil-after/page.tsx`
   - Tamanho: ~400 linhas CSS
   - Complexidade: Alta (layout complexo)

3. **meuperfil-before.module.css**
   - Página: `/meuperfil-before`
   - Arquivo: `src/app/meuperfil-before/page.tsx`
   - Tamanho: ~300 linhas CSS
   - Complexidade: Alta

4. **produtos.module.css**
   - Página: `/produtos`
   - Arquivo: `src/app/produtos/page.tsx`
   - Tamanho: ~250 linhas CSS
   - Complexidade: Alta (grid, filtros)

5. **cronograma-capilar.module.css**
   - Página: `/cronograma-capilar`
   - Arquivo: `src/app/cronograma-capilar/page.tsx`
   - Tamanho: ~200 linhas CSS
   - Complexidade: Alta

### FASE 2: Medium-Priority (Páginas Padrão)
6. hair-care.module.css
7. skincare.module.css
8. tendencias.module.css
9. guia.module.css
10. favoritos.module.css
11. perguntas.module.css
12. artigo-geral.module.css
13. cortes-geral.module.css
14. questionario1.module.css → questionario.module.css (consolidar)
15. questionario2.module.css
16. questionario3.module.css

### FASE 3: Low-Priority (Páginas Simples)
17-38. Demais páginas (infantil, tinturas, login, etc.)

## Checklist para Cada Migração

### 1. Preparação
- [ ] Abrir arquivo CSS (ex: alimentacao.css)
- [ ] Renomear para `.module.css` (alimentacao.module.css)
- [ ] Remover prefixos de classe `.page-xxx-wrapper`
- [ ] Simplificar seletores CSS

### 2. Refatoração CSS
- [ ] Converter `.page-alimentacao-wrapper` → `.wrapper`
- [ ] Converter `.page-alimentacao-wrapper .secao1` → `.secao1`
- [ ] Remover seletores aninhados desnecessários
- [ ] Manter variáveis CSS (`--corpo-texto`, etc)

### 3. Atualização do Component
- [ ] Importar: `import styles from '@/styles/alimentacao.module.css';`
- [ ] Remover: `import '@/styles/alimentacao.css';`
- [ ] Converter todos `className="xxx"` → `className={styles.xxx}`
- [ ] Verificar classes dinâmicas com lógica (usar template strings)

### 4. Testes
- [ ] Abrir página no browser
- [ ] Verificar layout visual
- [ ] Verificar responsividade (mobile, tablet, desktop)
- [ ] Verificar header/footer consistência
- [ ] Verificar hover states, animações
- [ ] Testar com dark mode (se aplicável)

### 5. Commit
- [ ] Adicionar alterações: `git add`
- [ ] Commit com mensagem: `Migrate [nome-página] to CSS Modules`
- [ ] Push (opcional)

## Exemplo Completo: Alimentacao

### Passo 1: Renomear arquivo
```bash
# alimentacao.css → alimentacao.module.css
```

### Passo 2: Refatorar CSS
```css
/* Antes */
.page-alimentacao-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.page-alimentacao-wrapper main {
  width: 100%;
}

.page-alimentacao-wrapper .secao1 {
  margin-top: 2rem;
}

/* Depois */
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main {
  width: 100%;
}

.secao1 {
  margin-top: 2rem;
}
```

### Passo 3: Atualizar Component
```tsx
// Antes
import '@/styles/alimentacao.css';
import { Header, Footer } from '@/components';

export default function Alimentacao() {
  return (
    <div className="page-alimentacao-wrapper">
      <Header />
      <main>
        <section className="secao1">
          {/* conteúdo */}
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Depois
import styles from '@/styles/alimentacao.module.css';
import { Header, Footer } from '@/components';

export default function Alimentacao() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.secao1}>
          {/* conteúdo */}
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

## Tratamento de Classes Dinâmicas

Se houver classes dinâmicas com condições:

```tsx
// Antes
<div className={condition ? "class1" : "class2"}>

// Depois
<div className={condition ? styles.class1 : styles.class2}>

// Com múltiplas classes
<div className={`${styles.base} ${isActive ? styles.active : ''}`}>

// Melhor com clsx (se disponível)
<div className={clsx(styles.base, isActive && styles.active)}>
```

## Consolidação de Arquivos Duplicados

Alguns arquivos são usados por múltiplas páginas:

### cadastrar-produto.css
- Usado por: `/cadastrar-produto` e `/cadastrar-tag`
- Solução: Criar `cadastrar-produto.module.css`
- Importar em ambas as páginas

### tela-de-cadastro.css
- Usado por: `/cadastro`, `/cadastro2`, `/login`
- Solução: Renomear para `auth.module.css` (mais genérico)
- Importar em todas as páginas

### questionario*.css
- 4 arquivos separados (questionario1-4)
- Solução: Consolidar em `questionario.module.css`
- Usar classes específicas para cada passo: `.step1`, `.step2`, etc

## Erros Comuns a Evitar

❌ Deixar classes globais (`.page-xxx-wrapper`) no CSS Module
❌ Esquecer de atualizar imports em page.tsx
❌ Não testar responsividade após migração
❌ Converter classes dinâmicas errado
❌ Manter seletores aninhados complexos

✅ Simplicidade: Use nomes curtos (`.wrapper`, `.titulo`, `.secao1`)
✅ Consistência: Mantenha padrão de naming
✅ Testabilidade: Teste cada página após migração
✅ Documentação: Comente classes complexas

## Impacto na Estrutura

### Antes (Global CSS)
```
src/styles/
├── componentes.css      (global header/footer)
├── alimentacao.css      (global import)
├── produtos.css         (global import)
├── ... 36 arquivos CSS
```

### Depois (CSS Modules)
```
src/styles/
├── componentes.css      (mantém para header/footer)
├── alimentacao.module.css
├── produtos.module.css
├── ... 36 arquivos .module.css
```

**Nota:** `componentes.css` permanece como CSS global porque contém estilos do Header e Footer que são usados por TODAS as páginas.

## Timeline Estimada

- **FASE 1 (High-Priority):** ~2-3 páginas por sessão
- **FASE 2 (Medium-Priority):** ~3-4 páginas por sessão
- **FASE 3 (Low-Priority):** ~5-6 páginas por sessão

Total: ~10-15 sessões para migração completa

## Próximos Passos

1. ✅ Revisar este plano
2. ⏭️ Começar com `alimentacao` como exemplo
3. ⏭️ Documentar processo aprendido
4. ⏭️ Aplicar padrão às demais páginas

## Benefício Final

Uma vez completo, o projeto terá:
- ✅ Sem risco de conflitos de CSS
- ✅ Type-safe styling
- ✅ Melhor maintainability
- ✅ Fácil refatoração (renomear classes sem quebrar outras)
- ✅ Performance otimizada (CSS compilado apenas onde é usado)
- ✅ Padrão consistente em 100% do projeto
