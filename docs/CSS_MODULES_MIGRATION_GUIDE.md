# Guia de Migração CSS Modules - Passo a Passo

## Problema Encontrado e Solucionado

Durante a migração para CSS Modules, enfrentamos dois problemas principais:

### Problema 1: Componentes com className={styles.wrapper}
**Sintoma**: Página carrega conteúdo errado
**Causa**: Componentes reutilizáveis usavam `className={styles.wrapper}` (classe do wrapper da página)
**Solução**: Remover wrapper de componentes filhos - usar apenas classes específicas do componente

**Exemplo do Erro**:
```jsx
// ❌ ERRADO - ProdutoCardInfantil
const ProdutoCardInfantil: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
  return (
    <div className={styles.wrapper}>  {/* ERRADO! wrapper é classe da página */}
      <div className={styles.prod1}>
        {/* conteúdo */}
      </div>
    </div>
  );
};
```

**Exemplo Correto**:
```jsx
// ✅ CORRETO - ProdutoCardInfantil
const ProdutoCardInfantil: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
  return (
    <div className={styles.prod1}>  {/* Apenas a classe específica */}
      {/* conteúdo */}
    </div>
  );
};
```

### Problema 2: Seletores de Elemento em CSS Modules
**Sintoma**: Build falha com "Selector 'main' is not pure"
**Causa**: CSS Modules não permite seletores puros de elementos HTML (como `main`, `body`, etc)
**Solução**: Converter para usar apenas classes locais

**Exemplo do Erro**:
```css
/* ❌ ERRADO - CSS Module não aceita */
.wrapper main {
  display: flex;
  /* propriedades */
}
```

**Exemplo Correto**:
```css
/* ✅ CORRETO - Aplicar propriedades ao wrapper */
.wrapper {
  display: flex;
  /* propriedades */
}
```

---

## Processo de Migração Documentado

### Passo 1: Preparar o Script de Conversão CSS

Arquivo: `convert-css-module.py`

```python
#!/usr/bin/env python3
import re
import sys

def convert_css_to_module(css_content, page_name):
    """Convert global CSS to CSS Module format"""
    wrapper_pattern = f".page-{page_name}-wrapper"

    # Substitui wrapper com .wrapper
    content = css_content.replace(f"{wrapper_pattern} ", ".wrapper ")
    content = re.sub(rf"{re.escape(wrapper_pattern)}(?=\s*{{)", ".wrapper", content)

    # Converte kebab-case para camelCase
    def kebab_to_camel(match):
        class_name = match.group(1)
        words = class_name.split('-')
        camel_case = words[0] + ''.join(word.capitalize() for word in words[1:])
        return f".{camel_case}"

    content = re.sub(r'\.([a-z][a-z0-9]*(?:-[a-z0-9]+)*)', kebab_to_camel, content)

    # IDs também
    def kebab_to_camel_id(match):
        id_name = match.group(1)
        words = id_name.split('-')
        camel_case = words[0] + ''.join(word.capitalize() for word in words[1:])
        return f"#{camel_case}"

    content = re.sub(r'#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)', kebab_to_camel_id, content)

    return content
```

### Passo 2: Executar Conversão CSS

```bash
python convert-css-module.py "src/styles/PAGINA.css" "PAGENAME"
```

Exemplo:
```bash
python convert-css-module.py "src/styles/cortes-geral.css" "cortes"
```

Isso gera: `src/styles/cortes-geral.module.css`

### Passo 3: Verificar CSS Gerado

**Checklist**:
- [ ] Sem seletores `.wrapper main`, `.wrapper body`, etc
- [ ] Todos os kebab-case convertidos para camelCase
- [ ] Sem erros de sintaxe CSS

**Se houver seletores de elemento**:
```css
/* ❌ ANTES */
.wrapper main {
  display: flex;
}

/* ✅ DEPOIS - Mesclar com .wrapper */
.wrapper {
  display: flex;
}
```

### Passo 4: Atualizar Import na Página

```tsx
// ❌ ANTES
import "@/styles/pagina.css";

// ✅ DEPOIS
import styles from "@/styles/pagina.module.css";
```

### Passo 5: Substituir Classnames no JSX

**Mapeamento de Conversão**:
- `className="page-{name}-wrapper"` → `className={styles.wrapper}`
- `className="nome-classe"` → `className={styles.nomeClasse}` (camelCase)
- `className="active"` quando dinâmico → `className={styles.active}`

**Exemplo Completo**:
```tsx
// ❌ ANTES
<div className="page-cortes-wrapper">
  <div className="voce-procura">
    <h1 className="temos">Temos o que você procura</h1>
    <div className="texto-procura">...</div>
  </div>
  <section className="section-artigos">...</section>
</div>

// ✅ DEPOIS
<div className={styles.wrapper}>
  <div className={styles.voceProcura}>
    <h1 className={styles.temos}>Temos o que você procura</h1>
    <div className={styles.textoProcura}>...</div>
  </div>
  <section className={styles.sectionArticulos}>...</section>
</div>
```

### Passo 6: Testar Componentes Filhos

**Importante**: Se há componentes filhos/reutilizáveis:
- NÃO use `className={styles.wrapper}` neles
- Use apenas classes específicas do componente
- O wrapper deve estar APENAS no componente raiz

```tsx
// ❌ ERRADO
const Card = ({ data }) => (
  <div className={styles.wrapper}>  {/* Não fazer isso! */}
    <div className={styles.card}>...</div>
  </div>
);

// ✅ CORRETO
const Card = ({ data }) => (
  <div className={styles.card}>  {/* Apenas a classe específica */}
    {/* conteúdo */}
  </div>
);
```

### Passo 7: Testar com Build

```bash
npm run build
```

**Esperado**: Build sem erros CSS e sem erros de classNames

---

## Checklist por Página

Para cada página a migrar:

- [ ] Executar conversão CSS: `python convert-css-module.py "src/styles/NOME.css" "NOME"`
- [ ] Verificar seletores de elemento no CSS gerado
- [ ] Corrigir seletores `.wrapper > elemento` para apenas `.wrapper`
- [ ] Atualizar import: `import "@/styles/X.css"` → `import styles from "@/styles/X.module.css"`
- [ ] Buscar e substituir todas as occorrências de `className="..."`
- [ ] Verificar componentes filhos - remover `styles.wrapper` se presente
- [ ] Executar `npm run build` para testar
- [ ] Verificar que a página carrega e exibe conteúdo correto

---

## Conversão de Classes Dinâmicas

Para classes que são aplicadas dinamicamente:

```tsx
// ❌ ANTES
className={`active ${isActive ? 'show' : 'hide'}`}

// ✅ DEPOIS
className={`${styles.active} ${isActive ? styles.show : styles.hide}`}
```

---

## Pages Já Migradas (Testadas)

✅ favoritos - Completa
✅ guia - Completa
✅ infantil - Completa (corrigido)
✅ quizzes - Completa
✅ tela-produto - Completa

---

## Próximas Páginas para Migração

Ordenadas por complexidade (mais simples primeiro):

1. cortes-geral
2. tinturas
3. parcerias-empresas
4. parcerias-influenciadores
5. central-ajuda
6. artigos / artigo
7. cadastro / cadastro2
8. login
9. outros...

