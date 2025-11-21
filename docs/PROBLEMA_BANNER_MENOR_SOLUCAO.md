# Problema: Banner da Page1 Fica Menor ao Voltar de Artigos

## Descrição do Problema
Quando você:
1. Está na home/page1 com banner de tamanho correto
2. Clica em um artigo
3. Volta para home/page1
→ O banner fica **notavelmente menor**

## Possíveis Causas (Análise)

### Causa 1: CSS Global do Artigo Afetando Estrutura
**Onde procurar:**
- `src/styles/artigoteste.css` - pode ter `body` ou `html` alterando altura
- `src/app/artigo/page.tsx` ou rota similar - estrutura do componente

**Sinais:**
```css
/* Ruim - afeta todo body/html */
body {
  min-height: 100vh;
  display: flex;
}

html {
  height: 100vh;
}
```

### Causa 2: Overflow-X Não Sendo Removido
**Onde procurar:**
- Qualquer arquivo CSS com `overflow-x: hidden` em wrapper de artigo
- Quando sai do artigo, o overflow continua ativo e muda o layout

**Sinais:**
```css
.page-artigo-wrapper {
  overflow-x: hidden; /* Pode alterar scrollbar width e afetar layout */
}
```

### Causa 3: CSS Variables Sendo Redefinidas no Artigo
**Onde procurar:**
- Se `artigoteste.css` redefine `--body-height` ou similar
- Ao voltar, a variável permanece com valor errado

### Causa 4: Estado React Mantendo Altura
**Onde procurar:**
- `src/app/page.tsx` (home) ou layout que envolve home
- Pode ter estado que não reseta ao voltar
- CSS-in-JS que mantém estilo anterior

## Como Investigar (Passo a Passo)

### Passo 1: Verificar CSS do Artigo
Procure em `artigoteste.css` por:
```bash
grep -n "body\|html\|height.*100\|overflow-x" src/styles/artigoteste.css
```

Se encontrar `body { ... height: 100vh }` ou similar, essa é a causa.

### Passo 2: Verificar Estrutura da Página de Artigo
Em `src/app/artigo/page.tsx`:
- O componente envolve tudo em um `<div>` com classe wrapper?
- Usa `<>` (fragment) ou div raiz?
- Tem estilos inline que alteram altura?

### Passo 3: Verificar Se HTML/Body Estão Sendo Afetados
Abra DevTools → Inspecione `<html>` e `<body>`:
1. Na home: note `height` e `overflow`
2. Clique em artigo
3. Na página de artigo: veja se `height` mudou
4. Volte para home: se `height` permaneceu diferente, CSS do artigo é o culpado

### Passo 4: Verificar Reset de CSS
Procure se há um reset global que não é aplicado ao voltar:
```bash
grep -r "html\|body" src/styles/globals.css
```

## Soluções (Ordernadas por Probabilidade)

### Solução 1: Escopar CSS do Artigo (MAIS PROVÁVEL)
Se `artigoteste.css` tem:
```css
/* ❌ Errado */
body {
  height: 100vh;
  overflow-x: hidden;
}
```

Mude para:
```css
/* ✅ Correto */
.page-artigo-wrapper {
  min-height: 100vh;
  overflow-x: hidden;
}
```

**Arquivos a checar:**
- `src/styles/artigoteste.css`
- `src/styles/artigo-geral.css`

### Solução 2: Remover Overflow-X Global
Se há `overflow-x: hidden` em wrapper:
```css
/* ❌ Ruim */
.page-artigo-wrapper {
  overflow-x: hidden; /* Afeta layout geral */
}

/* ✅ Melhor */
.page-artigo-wrapper main {
  overflow-x: hidden; /* Só afeta conteúdo */
}
```

### Solução 3: Resetar Body ao Sair do Artigo
Se nenhuma das acima funcionar, adicione em `src/styles/globals.css`:
```css
body {
  height: auto;
  min-height: 100vh;
  overflow-x: auto;
}

html {
  height: auto;
}
```

### Solução 4: Usar useEffect para Resetar
Se o problema for React (state mantendo altura), em `src/app/page.tsx`:
```typescript
useEffect(() => {
  // Reset styles ao montar/desmontar
  document.body.style.height = 'auto';
  document.documentElement.style.height = 'auto';

  return () => {
    // Cleanup
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
  };
}, []);
```

## Ordem de Investigação (Recomendada)

1. **Procure por `body { height` em `artigoteste.css`** (5 min)
   - Se encontrar, essa é a resposta

2. **Procure por `overflow-x: hidden` no wrapper de artigo** (5 min)
   - Se encontrar, remova ou escope para elementos filhos

3. **Verifique `src/app/artigo/page.tsx`** (10 min)
   - Veja se tem wrapper classes aplicadas corretamente
   - Veja se há estilos inline problemáticos

4. **Abra DevTools e inspecione manualmente** (10 min)
   - Vá para home, anote `<body>` height
   - Vá para artigo, veja se mudou
   - Volte para home, se permaneceu diferente, CSS do artigo é culpado

## Checklist de Investigação

- [ ] Procurou `body { height` em `artigoteste.css`?
- [ ] Procurou `html { height` em `artigoteste.css`?
- [ ] Procurou `overflow-x: hidden` no wrapper de artigo?
- [ ] Verificou se página de artigo tem wrapper class correto?
- [ ] Abriu DevTools e comparou `<body>` antes/depois?
- [ ] Verificou se `artigoteste.css` tem seletores globais (`*`)?

## Resumo

O **problema mais provável** é que `artigoteste.css` ou arquivo similar está redefinindo `body` ou `html` com valores fixos que não são revertidos ao sair da página.

A solução é:
1. Encontrar esses seletores globais
2. Escopa-los para `.page-artigo-wrapper` ou classe específica
3. Garantir que `body` e `html` permaneçam `height: auto`
