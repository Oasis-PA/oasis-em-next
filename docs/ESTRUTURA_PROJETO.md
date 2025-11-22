# 📁 Estrutura do Projeto Oasis

## Raiz do Projeto (Limpa)
Apenas arquivos de configuração essenciais:
```
cypress.config.ts       - Configuração do Cypress
eslint.config.mjs       - Configuração do ESLint
jest.config.cjs         - Configuração do Jest
jest.integration.config.cjs - Configuração do Jest (Integration)
next.config.ts          - Configuração do Next.js
postcss.config.mjs      - Configuração do PostCSS
package.json            - Dependências do projeto
tsconfig.json           - Configuração do TypeScript
README.md               - Documentação principal
LICENSE                 - Licença do projeto
```

## 📂 Pastas Principais

### `/src`
Código-fonte da aplicação Next.js
```
├── app/          - Páginas e routes do Next.js 13+
├── components/   - Componentes React reutilizáveis
├── styles/       - Estilos CSS/SCSS
├── lib/          - Utilitários e helpers
└── types/        - Tipos TypeScript
```

### `/prisma`
Configuração do banco de dados
```
├── schema.prisma - Schema do banco de dados
└── migrations/   - Migrações do banco
```

### `/public`
Arquivos estáticos (imagens, fontes, etc)

### `/scripts`
Scripts para tarefas automatizadas
```
├── parse-artigos.py      - Extrai artigos de data/artigos.md
├── seed-artigos.ts       - Importa artigos no banco
├── artigos-data.json     - Dados dos artigos em JSON
└── ...
```

### `/data`
Dados e arquivos de entrada
```
├── artigos.md   - Arquivo markdown com todos os artigos
└── artigos.txt  - Versão anterior (backup)
```

### `/docs`
Documentação do projeto
```
├── CYPRESS_*.md                 - Documentação de testes Cypress
├── CSS_MODULES_*.md             - Guias de CSS Modules
├── TESTES_*.md                  - Documentação de testes
├── GUIA_*.md                    - Guias gerais
├── COMECE_AQUI.md               - Ponto de entrada para devs
└── ...
```

### `/scripts-temp`
Scripts e utilitários temporários (não usados ativamente)
```
├── add-css-imports.py
├── convert-css-module.py
├── fix-page-imports.py
├── test*.js                    - Testes de conexão/debug
└── ...
```

### `/tests`
Testes automatizados
```
├── unit/        - Testes unitários
├── integration/ - Testes de integração
└── e2e/         - Testes end-to-end (Cypress)
```

### `/cypress`
Testes Cypress (E2E)
```
├── e2e/         - Specs dos testes
├── fixtures/    - Dados para testes
└── support/     - Configuração de helpers
```

### `/coverage`
Relatórios de cobertura de testes

### `/node_modules`
Dependências do Node.js (gitignored)

### `/backups`
Backups de dados/código (gitignored)

### `/readmes`
Documentação adicional em texto

## 🔧 Scripts Disponíveis

### Extraction e Seeding de Artigos
```bash
# Extrair artigos de data/artigos.md para JSON
npm run parse:artigos
# ou
python scripts/parse-artigos.py

# Importar artigos no banco
npm run seed:artigos
# ou
npx tsx scripts/seed-artigos.ts
```

### Testes
```bash
npm test              # Jest
npm run test:e2e     # Cypress
npm run cypress:open # Cypress interativo
```

### Desenvolvimento
```bash
npm run dev    # Start dev server
npm run build  # Build para produção
npm start      # Start server produção
```

## 📝 Como Adicionar Novos Artigos

1. **Editar** `data/artigos.md` com a estrutura:
   ```markdown
   # N. Título do Artigo

   (Parágrafo introdutório/descrição)

   # **Título Completo em Markdown**

   Conteúdo em markdown...
   ```

2. **Executar o parser**:
   ```bash
   python scripts/parse-artigos.py
   ```

3. **Importar no banco**:
   ```bash
   npx tsx scripts/seed-artigos.ts
   ```

## 🎯 Estrutura Limpa

A raiz do projeto foi organizada para deixar apenas essenciais:
- ✅ Arquivos de config (.json, .ts, .mjs)
- ✅ Documentação principal (README.md, LICENSE)
- ✅ Pastas de código, dados e testes
- ✅ Sem arquivos soltos (scripts, docs, temp)

Todos os arquivos temporários e documentação foram movidos para:
- `/docs` - Documentações
- `/scripts-temp` - Scripts não-essenciais
- `/data` - Dados (artigos.md, etc)
