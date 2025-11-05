# Documentação de Testes Funcionais (E2E) - OASIS

## 📋 Visão Geral

Este documento descreve os testes funcionais (End-to-End) implementados para a plataforma OASIS usando Cypress.

**Framework**: Cypress 15.6.0
**Tipo de Teste**: Teste Funcional (Interface)
**Total de Testes**: ~100+ testes E2E

---

## 🎯 Objetivos dos Testes Funcionais

1. **Validar fluxos de usuário** de ponta a ponta
2. **Garantir interface responsiva** em múltiplos dispositivos
3. **Verificar validações** de formulários
4. **Testar acessibilidade** da aplicação
5. **Garantir performance** adequada
6. **Validar interações** do usuário com a interface

---

## 📁 Estrutura dos Testes

```
cypress/
├── e2e/
│   ├── 01-auth.cy.ts              # Testes de autenticação (login/signup/logout)
│   ├── 02-produtos.cy.ts          # Testes do catálogo de produtos
│   ├── 03-favoritos.cy.ts         # Testes de sistema de favoritos
│   ├── 04-artigos.cy.ts           # Testes de artigos e painel admin
│   ├── 05-responsividade.cy.ts    # Testes de responsividade e performance
│   └── 06-validacoes.cy.ts        # Testes de validações de entrada
├── support/
│   ├── commands.ts                # Comandos customizados do Cypress
│   └── e2e.ts                     # Configuração de suporte E2E
├── tsconfig.json                  # Configuração TypeScript
└── cypress.config.ts              # Configuração do Cypress
```

---

## 🧪 Testes Implementados

### 1. **Autenticação (01-auth.cy.ts)** - ~15 Testes

#### Página de Login
- ✅ Validar exibição do formulário de login
- ✅ Validar erro ao submeter email vazio
- ✅ Validar erro ao submeter senha vazia
- ✅ Validar erro com email inválido
- ✅ Realizar login com credenciais válidas
- ✅ Exibir erro com credenciais inválidas

#### Página de Registro
- ✅ Validar exibição do formulário de registro
- ✅ Validar erro ao submeter formulário vazio
- ✅ Validar força da senha
- ✅ Registrar novo usuário com dados válidos

#### Perfil do Usuário
- ✅ Exibir dados do perfil quando logado
- ✅ Permitir editar dados do perfil
- ✅ Fazer logout com sucesso

---

### 2. **Catálogo de Produtos (02-produtos.cy.ts)** - ~20 Testes

#### Listagem de Produtos
- ✅ Exibir página de produtos
- ✅ Exibir lista de produtos
- ✅ Exibir informações básicas dos produtos
- ✅ Permitir paginação
- ✅ Buscar produtos por nome
- ✅ Filtrar por categoria
- ✅ Filtrar por tipo de cabelo
- ✅ Filtrar por tipo de pele
- ✅ Ordenar por preço

#### Detalhes do Produto
- ✅ Exibir detalhes completos
- ✅ Exibir múltiplas imagens
- ✅ Navegar entre imagens
- ✅ Exibir preço e informações de compra
- ✅ Exibir marca do produto
- ✅ Adicionar aos favoritos

#### Avaliações
- ✅ Exibir avaliações do produto
- ✅ Exibir classificação média
- ✅ Permitir deixar avaliação (logado)
- ✅ Escrever comentário
- ✅ Validar erro ao tentar avaliar sem logar

---

### 3. **Sistema de Favoritos (03-favoritos.cy.ts)** - ~15 Testes

#### Favoritos de Produtos
- ✅ Adicionar produto aos favoritos
- ✅ Remover produto dos favoritos
- ✅ Exibir página de favoritos
- ✅ Mensagem quando não há favoritos
- ✅ Ir ao produto a partir dos favoritos
- ✅ Filtrar favoritos por categoria

#### Favoritos de Artigos
- ✅ Adicionar artigo aos favoritos
- ✅ Exibir página de artigos favoritos
- ✅ Remover artigo dos favoritos
- ✅ Mensagem quando não há artigos

#### Sincronização
- ✅ Manter favoritos após logout e login
- ✅ Atualizar contador de favoritos

#### Compartilhamento
- ✅ Copiar link dos favoritos
- ✅ Compartilhar no WhatsApp
- ✅ Compartilhar no Facebook

---

### 4. **Artigos e Conteúdo (04-artigos.cy.ts)** - ~20 Testes

#### Listagem de Artigos
- ✅ Exibir página de artigos
- ✅ Exibir lista de artigos publicados
- ✅ Buscar artigos por título
- ✅ Filtrar por tag
- ✅ Ordenar por data
- ✅ Permitir paginação

#### Detalhes do Artigo
- ✅ Exibir conteúdo completo
- ✅ Exibir título e data
- ✅ Exibir autor
- ✅ Exibir tags
- ✅ Adicionar aos favoritos
- ✅ Compartilhar artigo
- ✅ Exibir artigos relacionados

#### Painel Admin
- ✅ Exibir painel admin
- ✅ Criar novo artigo
- ✅ Editar artigo existente
- ✅ Excluir artigo
- ✅ Upload de imagem de capa
- ✅ Agendar publicação
- ✅ Filtrar por status

#### Modo Escuro
- ✅ Alternar para modo escuro
- ✅ Salvar preferência de tema

---

### 5. **Responsividade e Performance (05-responsividade.cy.ts)** - ~20 Testes

#### Layout Mobile
- ✅ Menu hambúrguer em mobile
- ✅ Produtos em coluna única
- ✅ Navegação em mobile
- ✅ Botões de ação em mobile
- ✅ Touch targets adequados

#### Layout Tablet
- ✅ Produtos em 2 colunas
- ✅ Navegação visível

#### Layout Desktop
- ✅ Produtos em múltiplas colunas
- ✅ Sidebar visível

#### Performance
- ✅ Carregar página em < 3s
- ✅ Listar produtos sem problemas
- ✅ Carregar imagens eficientemente
- ✅ Paginar sem demora

#### Acessibilidade
- ✅ Navegação por teclado
- ✅ Atributos alt em imagens
- ✅ Contraste de cores
- ✅ Estrutura de headings
- ✅ Labels associados aos inputs

#### Compatibilidade
- ✅ Funcionar em navegadores modernos
- ✅ CSS carregado corretamente
- ✅ JavaScript carregado corretamente

---

### 6. **Validações de Entrada (06-validacoes.cy.ts)** - ~25 Testes

#### Cadastro de Usuário
- ✅ Validar email obrigatório
- ✅ Validar senha obrigatória
- ✅ Validar formato de email
- ✅ Validar força da senha
- ✅ Validar comprimento de senha
- ✅ Validar email duplicado
- ✅ Validar nomes obrigatórios

#### Cadastro de Produtos
- ✅ Validar nome obrigatório
- ✅ Validar preço obrigatório e válido
- ✅ Validar preço mínimo
- ✅ Validar URL de imagem
- ✅ Validar categoria

#### Avaliações
- ✅ Validar classificação obrigatória
- ✅ Validar comprimento mínimo
- ✅ Validar comprimento máximo
- ✅ Permitir avaliação válida

#### Formulário de Contato
- ✅ Validar nome obrigatório
- ✅ Validar email obrigatório
- ✅ Validar mensagem obrigatória
- ✅ Enviar mensagem válida

#### Edição de Perfil
- ✅ Validar nome não vazio
- ✅ Validar comprimento
- ✅ Validar telefone
- ✅ Salvar alterações válidas

---

## 🚀 Como Executar os Testes

### Pré-requisitos
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Executar Testes

```bash
# Modo headless (sem interface gráfica)
npm run test:functional

# Modo interativo (abrir Cypress UI)
npm run test:functional:open

# Modo headless com navegador específico
npm run test:functional:chrome

# Executar todos os testes (unit + functional)
npm run test:all
```

---

## 🎮 Interface do Cypress

Quando você executa `npm run test:functional:open`, a interface do Cypress abre com:

1. **Seletor de Navegador**: Escolha Chrome, Firefox, Edge, etc.
2. **Seletor de Especificação**: Selecione qual arquivo de teste executar
3. **Visualizador de Testes**: Acompanhe cada passo em tempo real
4. **Console**: Veja logs e erros
5. **Snapshots**: Captura de tela de cada etapa

---

## 📊 Cobertura de Testes Funcionais

| Funcionalidade | Testes | Status |
|---|---|---|
| Autenticação | 15 | ✅ Completo |
| Produtos | 20 | ✅ Completo |
| Favoritos | 15 | ✅ Completo |
| Artigos | 20 | ✅ Completo |
| Responsividade | 20 | ✅ Completo |
| Validações | 25 | ✅ Completo |
| **TOTAL** | **~115** | **✅ Completo** |

---

## 🔧 Comandos Customizados

### Login
```typescript
cy.login('email@example.com', 'Senha123!@#');
```

### Logout
```typescript
cy.logout();
```

### Seletor de Viewport
```typescript
cy.viewport('iphone-x');    // Mobile
cy.viewport('ipad-2');      // Tablet
cy.viewport(1280, 720);     // Desktop
```

---

## ⚙️ Configuração do Cypress

**Arquivo**: `cypress.config.ts`

**Principais configurações:**
- Base URL: `http://localhost:3000`
- Viewport padrão: 1280x720
- Timeout: 5000ms
- Screenshots em falha: ✅ Ativado
- Vídeos: ❌ Desativado (pode ativar)

---

## 📈 Métricas de Qualidade

A execução dos testes funcionais valida:

1. **Funcionalidade**: Todas as features funcionam como esperado
2. **Usabilidade**: Interface é intuitiva e fácil de usar
3. **Responsividade**: Aplicação funciona em múltiplos dispositivos
4. **Validação**: Formulários validam corretamente
5. **Performance**: Aplicação carrega e responde rapidamente
6. **Acessibilidade**: Aplicação é acessível para todos os usuários

---

## 🐛 Troubleshooting

### Teste falhando: "element not visible"
**Solução**: Aumentar timeout ou aguardar elemento aparecer
```typescript
cy.get('button', { timeout: 10000 }).click();
```

### Teste falhando: "Cannot find element"
**Solução**: Verificar seletor CSS ou usar `cy.contains()`
```typescript
cy.contains(/button text/i).click();
```

### Cypress não consegue conectar ao servidor
**Solução**: Verificar se `npm run dev` está rodando
```bash
npm run dev
```

---

## 📝 Boas Práticas

1. **Usar `data-testid`**: Adicionar atributos para seleção confiável
2. **Evitar `cy.wait()`**: Usar `cy.get()` com wait implícito
3. **Usar comandos customizados**: `cy.login()` ao invés de repetir passos
4. **Manter testes isolados**: Cada teste deve funcionar independentemente
5. **Descrições claras**: Descrever o que cada teste valida

---

## 🔗 Recursos Adicionais

- [Documentação Cypress](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Seletores CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Selectors)

---

## 📄 Resumo de Testes Funcionais

**Total de Testes Funcionais**: ~115 testes
**Cobertura**: Autenticação, Produtos, Favoritos, Artigos, Responsividade, Validações
**Framework**: Cypress 15.6.0
**Linguagem**: TypeScript
**Status**: ✅ Implementado e Pronto

---

**Última Atualização**: 04/11/2025
**Versão**: 1.0.0
