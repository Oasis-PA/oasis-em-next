# Checklist: Identificar CSS que Causa Mudança de Layout Entre Páginas

## Sintomas
Quando você clica em um link e vai para outra página, o layout muda:
- Conteúdo fica mais estreito
- Coisas desaparecem
- Alinhamento muda
- Header fica diferente

## Causas Principais a Procurar

### 1. Seletores Globais que Afetam Todo o Body/HTML
❌ **ERRADO:**
```css
body { width: 100%; display: flex; align-items: center; }
html { overflow-x: hidden; height: 100vh; }
header { display: none; height: 560px; }
footer { position: fixed; }
```

✅ **CORRETO:**
```css
.page-xxx-wrapper { /* estilos */ }
.page-xxx-wrapper main { /* estilos */ }
```

### 2. Wrappers com `align-items: center` ou `justify-content: center`
❌ **PROBLEMA:**
```css
.page-xxx-wrapper {
  display: flex;
  align-items: center;  /* ← Isso deixa conteúdo estreito! */
  flex-direction: column;
}
```

✅ **SOLUÇÃO:** Remover `align-items: center` do wrapper raiz.

### 3. `max-width` SEM `margin: auto`
❌ **PROBLEMA:**
```css
.page-xxx-wrapper main {
  max-width: 800px;
  /* Sem margin: auto → conteúdo fica alinhado à esquerda */
}
```

✅ **SOLUÇÃO:**
```css
.page-xxx-wrapper main {
  max-width: 800px;
  margin: 0 auto;  /* ← Centraliza */
  width: 100%;
}
```

### 4. `width` Restrictivo em elementos
❌ **PROBLEMA:**
```css
.page-xxx-wrapper > div {
  width: 80%;  /* ← Só ocupa 80%, deixa espaço em branco */
}
```

✅ **SOLUÇÃO:**
```css
.page-xxx-wrapper > div {
  width: 100%;  /* ← Ocupa espaço total */
  max-width: 800px;  /* ← Mas tem um máximo */
  margin: 0 auto;  /* ← Centralizado */
}
```

### 5. `overflow-x: hidden` que pode afetar scrollbar
Pode deixar conteúdo desalinhado:
```css
.page-xxx-wrapper {
  overflow-x: hidden;  /* ← Pode causar problemas */
}
```

## Checklist para Cada Página

Para identificar o problema em uma página específica:

1. **Abra DevTools (F12) na página problemática**

2. **Inspecione o elemento `.page-xxx-wrapper`:**
   - Tem `display: flex`?
   - Tem `align-items: center`? ❌ (remover!)
   - Tem `width` ou `max-width`?
   - Tem `margin: 0 auto`? (se tiver max-width, precisa disto)

3. **Procure em `src/styles/xxx.css` por:**
   - `body {` → Remover
   - `html {` → Remover
   - `header {` → Remover (header é global!)
   - `footer {` → Remover (footer é global!)
   - `.page-xxx-wrapper { align-items: center; }` → Remover align-items
   - `.page-xxx-wrapper { max-width: ...` → Verificar se tem `margin: 0 auto`

## Páginas Já Corrigidas

✅ **Guia** (`guia.css`)
- Removido `align-items: center` do wrapper
- Removido `align-items: center` do main

✅ **Tinturas** (`componentes.css`)
- Adicionado `margin: 0 auto` em `.em_ciminha` para centralizar header

✅ **Admin Preview** (`artigo.module.css`)
- Adicionado `text-align: center` em `.article`

## Checklist de Arquivos CSS a Verificar

```
[ ] alimentacao.css
[ ] artigo-geral.css
[ ] artigoteste.css
[ ] central-de-ajuda.css
[ ] corte-modelo.css
[ ] cortes-geral.css
[ ] cronograma-capilar.css
[ ] editar-perfil.css
[ ] favoritos.css
[ ] hair-care.css
[ ] infantil.css
[ ] meuperfil-after.css
[ ] parcerias-empresas.css
[ ] parcerias-usuarios.css
[ ] perguntas.css
[ ] produtos.css
[ ] questionario1.css - questionario4.css
[ ] quizzes.css
[ ] respostas.css
[ ] skincare.css
[ ] tela-de-cadastro.css
[ ] tela-de-produto.css
[ ] tendencias.css
[ ] tinturas.css
```

## Ferramenta de Diagnóstico

Para usar no DevTools Console ao visitar uma página problemática:

```javascript
// Checar se o wrapper está restringindo largura
const wrapper = document.querySelector('[class*="page-"][class*="wrapper"]');
if (wrapper) {
  const style = window.getComputedStyle(wrapper);
  console.log('Wrapper width:', style.width);
  console.log('Wrapper max-width:', style.maxWidth);
  console.log('Wrapper align-items:', style.alignItems);
  console.log('Wrapper display:', style.display);
}
```

Se `align-items` for `center` ou `width` for muito pequeno, encontrou o problema!

## Template de Correção

Quando encontrar uma página com problema, aplique este padrão:

**CSS:**
```css
.page-xxx-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* ❌ REMOVER: align-items: center; */
  /* ❌ REMOVER: justify-content: center; */
}

.page-xxx-wrapper main {
  width: 100%;
  max-width: 1200px;  /* Opcional: limite de largura */
  margin: 0 auto;     /* ✅ ADICIONAR: se tiver max-width */
}
```

**HTML:**
```jsx
<>
  <Header />  {/* Fora do wrapper */}
  <div className="page-xxx-wrapper">
    <main>...</main>
  </div>
  <Footer />  {/* Fora do wrapper */}
</>
```

## Links Úteis
- Commit que documentou solução: `3d2c6f9 - "se quebrar me avisem"`
- Documento de solução: `SOLUCAO_HEADER_CONSISTENTE.md`
