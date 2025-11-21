# Solução: Header Consistente em Todas as Páginas

## Problema Original
O header tinha tamanho inconsistente entre páginas:
- Página principal: header grande ✓
- Skincare, Cronograma Capilar, Infantil, etc: header pequeno ✗

## Causa Raiz
O problema **NÃO** era CSS vazando entre páginas. O CSS estava correto e scoped.

O problema real era que cada página havia sido desenvolvida com seus próprios estilos e layouts específicos, causando variação visual no header dependendo do contexto da página.

## Solução Implementada
**Data:** 17 de novembro de 2025
**Commit:** `3d2c6f9 - "se quebrar me avisem"`

A solução foi aplicar normalizações de CSS em TODAS as páginas para garantir consistência:

### 1. Padronizar estilos de página
Cada arquivo CSS de página recebeu:
- Wrapper scoped `.page-{name}-wrapper` para isolar estilos
- Reset de propriedades globais (margin, padding)
- Normalização de seletores para não afetar componentes globais

### 2. Manter Header e Footer globais
- Header e Footer permanecem como componentes globais
- Seus estilos vêm APENAS de `componentes.css`
- Nenhuma página override os estilos do Header/Footer

### 3. Garantir layouts consistentes
- Cada página usa flexbox ou grid de forma consistente
- Sem conflitos com o layout do Header
- Footer não fica fixo a menos que seja necessário

## Estrutura Correta Após Solução

```
├── componentes.css (estilos GLOBAIS de Header/Footer)
├── página1.css (estilos SCOPED da página 1)
├── página2.css (estilos SCOPED da página 2)
└── ... (demais páginas com estilos scoped)
```

**Importante:** Nenhum arquivo CSS de página deve ter:
```css
/* ❌ ERRADO */
body { ... }
html { ... }
header { ... }  /* Override do header global */
footer { ... }  /* Override do footer global */
```

**Correto:**
```css
/* ✅ CERTO */
.page-xxxx-wrapper { ... }
.page-xxxx-wrapper main { ... }
.page-xxxx-wrapper section { ... }
```

## Páginas Afetadas Pela Solução
- ✅ Página Principal (/)
- ✅ Skincare (/skincare)
- ✅ Cronograma Capilar (/cronograma-capilar)
- ✅ Infantil (/infantil)
- ✅ Hair Care (/haircare)
- ✅ Tendências (/tendencias)
- ✅ Tinturas (/tinturas)
- ✅ Alimentação (/alimentacao)
- ✅ Guia (/guia)
- ✅ Produtos (/produtos)
- ✅ Favoritos (/favoritos)
- E demais páginas

## Como Manter a Consistência

Ao adicionar novos estilos CSS para uma página:

1. **Crie um wrapper scoped:**
   ```css
   .page-nova-pagina-wrapper {
     /* estilos da página */
   }

   .page-nova-pagina-wrapper main {
     /* estilos do main */
   }
   ```

2. **Nunca override componentes globais:**
   ```css
   /* ❌ NÃO FAZER */
   header { display: none; }
   footer { position: fixed; }

   /* ✅ FAZER */
   .page-nova-pagina-wrapper main {
     /* modificar apenas conteúdo interno */
   }
   ```

3. **Mantenha HTML simples:**
   ```jsx
   <Header />
   <div className="page-nova-pagina-wrapper">
     {/* conteúdo */}
   </div>
   <Footer />
   ```

## Testando a Solução

Para verificar se o header está consistente:

1. Acesse a página principal (/)
2. Observe o tamanho/espaçamento do header
3. Navegue para outras páginas (skincare, infantil, etc)
4. O header deve ter **exatamente o mesmo tamanho** em todas

Se notarssetar tamanho diferente, procure por:
- Seletores `body { }` ou `html { }` em arquivos CSS de página
- Seletores `header { }` ou `footer { }` que não sejam em componentes.css
- Wrappers com `display: flex` que envolvem o Header

## Histórico de Tentativas Falhadas
- ❌ Reduzir/aumentar padding do header (quebrava outras páginas)
- ❌ Mover Header dentro/fora de wrappers (deixava footer fixo)
- ❌ Aplicar CSS scoping incorretamente (afetava componentes globais)

**Solução Final:** Manter a estrutura original que funciona, com todos os CSS de páginas corretamente scoped.

## Referências
- Arquivo: `src/styles/componentes.css` (estilos globais do Header)
- Padrão: `.page-{name}-wrapper` para todas as páginas
- Commit de referência: `3d2c6f9`
