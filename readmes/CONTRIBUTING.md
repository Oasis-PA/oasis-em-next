# Guia de Contribuição

Obrigado por considerar contribuir para o projeto Oasis! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

1. [Como Contribuir](#como-contribuir)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Padrões de Código](#padrões-de-código)
4. [Convenções de Commit](#convenções-de-commit)
5. [Processo de Pull Request](#processo-de-pull-request)
6. [Reportando Bugs](#reportando-bugs)
7. [Sugerindo Melhorias](#sugerindo-melhorias)

---

## Como Contribuir

Existem várias formas de contribuir com o Oasis:

- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 📝 Melhorar a documentação
- 🔧 Corrigir bugs existentes
- ✨ Implementar novas funcionalidades

## Configuração do Ambiente

### Pré-requisitos

- Node.js 22.12.0 ou superior (use `nvm` para gerenciar versões)
- npm ou yarn
- Git
- Acesso ao banco de dados Supabase (contate a equipe)

### Passos para Configurar

1. **Fork o repositório**
   ```bash
   # Faça um fork no GitHub e clone seu fork
   git clone https://github.com/SEU-USUARIO/oasis-em-next.git
   cd oasis-em-next
   ```

2. **Configure o remote upstream**
   ```bash
   git remote add upstream https://github.com/Oasis-PA/oasis-em-next.git
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**
   - Solicite acesso às credenciais do banco de dados à equipe
   - Crie os arquivos `.env` e `.env.local` conforme documentado no README.md

5. **Execute as migrações do Prisma**
   ```bash
   npm run prisma:pull
   npm run prisma:generate
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

## Padrões de Código

### TypeScript

- Use TypeScript em todos os arquivos `.ts` e `.tsx`
- Evite usar `any` - sempre defina tipos específicos
- Use interfaces para objetos complexos

### Estilo de Código

- **Indentação**: 2 espaços
- **Aspas**: Usar aspas duplas para strings
- **Ponto e vírgula**: Sempre usar
- **Naming**:
  - Componentes: `PascalCase` (ex: `Header.tsx`)
  - Funções e variáveis: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`
  - Arquivos de estilos: `kebab-case.css`

### Estrutura de Componentes

```tsx
// Imports
import { useState } from 'react';

// Types/Interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// Component
export default function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### API Routes

- Sempre valide dados de entrada usando schemas Zod
- Use tratamento adequado de erros
- Retorne status HTTP apropriados
- Documente endpoints complexos

## Convenções de Commit

Use mensagens de commit descritivas e significativas:

### Formato

```
tipo(escopo): descrição curta

[corpo opcional da mensagem]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc (sem mudança de código)
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Tarefas de manutenção, build, etc

### Exemplos

```bash
feat(auth): adiciona autenticação com Google OAuth

fix(produtos): corrige erro ao carregar imagens dos produtos

docs(readme): atualiza instruções de instalação

style(header): ajusta espaçamento do menu de navegação

refactor(api): melhora validação de dados de usuário

test(usuarios): adiciona testes para cadastro de usuários

chore(deps): atualiza dependências do projeto
```

## Processo de Pull Request

1. **Crie uma branch para sua feature/correção**
   ```bash
   git checkout -b feat/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```

2. **Faça seus commits seguindo as convenções**
   ```bash
   git add .
   git commit -m "feat(escopo): descrição clara da mudança"
   ```

3. **Mantenha sua branch atualizada**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Execute os testes**
   ```bash
   npm run test
   npm run lint
   ```

5. **Envie sua branch**
   ```bash
   git push origin feat/nome-da-feature
   ```

6. **Abra um Pull Request**
   - Vá para o repositório no GitHub
   - Clique em "New Pull Request"
   - Preencha o template do PR com:
     - Descrição clara das mudanças
     - Issues relacionadas (se houver)
     - Screenshots (se aplicável)
     - Checklist de verificação

### Checklist do Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Commits seguem as convenções
- [ ] Testes foram adicionados/atualizados
- [ ] Todos os testes estão passando
- [ ] Documentação foi atualizada (se necessário)
- [ ] Não há conflitos com a branch main

## Reportando Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o bug
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** (se aplicável)
5. **Ambiente**:
   - Navegador e versão
   - Sistema operacional
   - Versão do Node.js

### Template de Bug Report

```markdown
### Descrição
[Descrição clara e concisa do bug]

### Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

### Comportamento Esperado
[O que deveria acontecer]

### Comportamento Atual
[O que está acontecendo]

### Screenshots
[Se aplicável]

### Ambiente
- Navegador: [ex: Chrome 120]
- OS: [ex: Windows 11]
- Node: [ex: 22.12.0]
```

## Sugerindo Melhorias

Para sugerir melhorias:

1. **Verifique** se a sugestão já não existe nas issues
2. **Abra uma issue** com o título claro
3. **Descreva** a melhoria proposta
4. **Explique** por que seria útil
5. **Forneça exemplos** de uso (se aplicável)

---

## 💬 Dúvidas?

Se tiver dúvidas sobre como contribuir:

- Abra uma issue com a tag `question`
- Entre em contato com a equipe do projeto

## 📜 Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e colaborativo.

---

**Obrigado por contribuir com o Oasis! 🌴**
