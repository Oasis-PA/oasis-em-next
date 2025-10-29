# 💡 Melhorias Sugeridas - Sistema Oasis

Sugestões de melhorias, boas práticas e otimizações para elevar a qualidade do projeto.

**Data:** 2025-10-29
**Versão:** 1.0

---

## 📋 Índice

1. [Melhorias de Código](#-melhorias-de-código)
2. [Melhorias de Arquitetura](#-melhorias-de-arquitetura)
3. [Melhorias de Performance](#-melhorias-de-performance)
4. [Melhorias de UX/UI](#-melhorias-de-uxui)
5. [Melhorias de Segurança](#-melhorias-de-segurança)
6. [Melhorias de DevOps](#-melhorias-de-devops)
7. [Melhorias de Testes](#-melhorias-de-testes)
8. [Melhorias de Documentação](#-melhorias-de-documentação)

---

## 💻 Melhorias de Código

### 1. Padronizar Tratamento de Erros

**Situação Atual:**
```typescript
// Cada endpoint trata erros de forma diferente
catch (error) {
  return NextResponse.json({ error: 'Erro' }, { status: 500 });
}

catch (error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

catch (error) {
  if (error instanceof ZodError) { ... }
}
```

**Melhoria:**
```typescript
// lib/error-handler.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Validação falhou', details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Registro duplicado', field: error.meta?.target },
        { status: 409 }
      );
    }
  }

  // Log error for monitoring
  console.error('Erro não tratado:', error);

  return NextResponse.json(
    { error: 'Erro interno do servidor' },
    { status: 500 }
  );
}

// Uso
try {
  // ...
} catch (error) {
  return handleApiError(error);
}
```

**Benefícios:**
- Respostas de erro consistentes
- Melhor debugging
- Códigos de erro estruturados
- Facilita integração com frontend

---

### 2. Extrair Lógica de Negócio para Services

**Situação Atual:**
```typescript
// Toda lógica no route handler
export async function POST(req: Request) {
  const body = await req.json();
  const validated = schema.parse(body);

  // 50 linhas de lógica de negócio aqui
  const user = await prisma.usuario.create({ ... });
  const token = jwt.sign({ ... });
  // ...

  return NextResponse.json(user);
}
```

**Melhoria:**
```typescript
// services/usuario.service.ts
export class UsuarioService {
  async criar(data: CriarUsuarioDTO) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        ...data,
        senha: senhaHash,
      },
    });

    return this.sanitizeUsuario(usuario);
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  private sanitizeUsuario(usuario: Usuario) {
    const { senha, ...safe } = usuario;
    return safe;
  }
}

// api/usuarios/cadastro/route.ts
const usuarioService = new UsuarioService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = cadastroSchema.parse(body);

    const usuario = await usuarioService.criar(validated);

    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

**Benefícios:**
- Reutilização de código
- Testes mais fáceis
- Separação de responsabilidades
- Routes mais limpos

---

### 3. Implementar DTOs (Data Transfer Objects)

**Melhoria:**
```typescript
// types/usuario.dto.ts
export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  id_genero: number;
  id_tipo_cabelo?: number;
}

export interface UsuarioResponseDTO {
  id_usuario: number;
  nome: string;
  email: string;
  data_cadastro: Date;
  genero: {
    id_genero: number;
    nome: string;
  };
}

export interface AtualizarUsuarioDTO {
  nome?: string;
  telefone?: string;
  sobrenome?: string;
  sobre?: string;
}
```

**Benefícios:**
- Contratos claros entre camadas
- Type-safety
- Documentação automática
- Facilita validação

---

### 4. Usar Enums para Constantes

**Situação Atual:**
```typescript
if (artigo.status === 'publicado') { ... }
if (artigo.status === 'rascunho') { ... }
// Strings mágicas espalhadas
```

**Melhoria:**
```typescript
// types/enums.ts
export enum StatusArtigo {
  RASCUNHO = 'rascunho',
  PUBLICADO = 'publicado',
  ARQUIVADO = 'arquivado',
}

export enum TipoUsuario {
  COMUM = 'comum',
  ADMIN = 'admin',
  MODERADOR = 'moderador',
}

// Uso
if (artigo.status === StatusArtigo.PUBLICADO) { ... }
```

**Benefícios:**
- Autocomplete no IDE
- Menos erros de digitação
- Refatoração mais fácil
- Valores centralizados

---

### 5. Implementar Repository Pattern

**Melhoria:**
```typescript
// repositories/usuario.repository.ts
export class UsuarioRepository {
  async findById(id: number) {
    return prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: {
        genero: true,
        tipo_cabelo: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({ data });
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput) {
    return prisma.usuario.update({
      where: { id_usuario: id },
      data,
    });
  }
}
```

**Benefícios:**
- Abstração do Prisma
- Facilita mudança de ORM/DB
- Queries reutilizáveis
- Testes mais fáceis (mock do repository)

---

## 🏗️ Melhorias de Arquitetura

### 1. Implementar Clean Architecture

```
src/
├── domain/              # Entidades e regras de negócio
│   ├── entities/
│   ├── interfaces/
│   └── errors/
├── application/         # Casos de uso
│   ├── use-cases/
│   └── services/
├── infrastructure/      # Implementações concretas
│   ├── database/
│   ├── http/
│   └── storage/
└── presentation/        # API e UI
    ├── api/
    └── app/
```

**Benefícios:**
- Arquitetura escalável
- Testabilidade
- Independência de frameworks
- Manutenibilidade

---

### 2. Implementar CQRS (Command Query Responsibility Segregation)

**Melhoria:**
```typescript
// commands/criar-usuario.command.ts
export class CriarUsuarioCommand {
  constructor(
    public readonly nome: string,
    public readonly email: string,
    public readonly senha: string
  ) {}
}

// commands/handlers/criar-usuario.handler.ts
export class CriarUsuarioHandler {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private eventBus: EventBus
  ) {}

  async execute(command: CriarUsuarioCommand) {
    // Validar
    // Criar usuário
    // Emitir evento
    this.eventBus.emit(new UsuarioCriadoEvent(usuario));

    return usuario;
  }
}

// queries/buscar-usuario.query.ts
export class BuscarUsuarioQuery {
  constructor(public readonly id: number) {}
}

// queries/handlers/buscar-usuario.handler.ts
export class BuscarUsuarioHandler {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(query: BuscarUsuarioQuery) {
    return this.usuarioRepository.findById(query.id);
  }
}
```

**Benefícios:**
- Separação clara de escrita/leitura
- Performance otimizada
- Escalabilidade
- Event sourcing possível

---

### 3. Implementar Event-Driven Architecture

**Melhoria:**
```typescript
// events/usuario-criado.event.ts
export class UsuarioCriadoEvent {
  constructor(
    public readonly usuario: Usuario,
    public readonly timestamp: Date = new Date()
  ) {}
}

// listeners/enviar-email-boas-vindas.listener.ts
export class EnviarEmailBoasVindasListener {
  handle(event: UsuarioCriadoEvent) {
    emailService.enviar({
      para: event.usuario.email,
      assunto: 'Bem-vindo ao Oasis!',
      template: 'boas-vindas',
      dados: { nome: event.usuario.nome },
    });
  }
}

// listeners/criar-perfil-padrao.listener.ts
export class CriarPerfilPadraoListener {
  handle(event: UsuarioCriadoEvent) {
    perfilService.criarPadrao(event.usuario.id_usuario);
  }
}
```

**Benefícios:**
- Desacoplamento
- Extensibilidade
- Auditoria (event log)
- Processamento assíncrono

---

## ⚡ Melhorias de Performance

### 1. Implementar Cache com Redis

**Melhoria:**
```typescript
// lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  // Tentar cache primeiro
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // Buscar dados
  const data = await fetcher();

  // Cachear
  await redis.setex(key, ttl, JSON.stringify(data));

  return data;
}

// Uso
export async function GET() {
  const produtos = await cached(
    'produtos:destaque',
    () => prisma.produto.findMany({ take: 10 }),
    3600 // 1 hora
  );

  return NextResponse.json(produtos);
}
```

**Benefícios:**
- Reduz carga no banco
- Respostas mais rápidas
- Escalabilidade

---

### 2. Implementar Paginação Cursor-Based

**Situação Atual:**
```typescript
// Offset pagination (lento em grandes datasets)
const produtos = await prisma.produto.findMany({
  skip: page * limit,
  take: limit,
});
```

**Melhoria:**
```typescript
// Cursor-based pagination (rápido)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const limit = 20;

  const produtos = await prisma.produto.findMany({
    take: limit + 1,
    ...(cursor && {
      skip: 1,
      cursor: { id_produto: parseInt(cursor) },
    }),
    orderBy: { id_produto: 'desc' },
  });

  const hasMore = produtos.length > limit;
  const items = hasMore ? produtos.slice(0, -1) : produtos;

  return NextResponse.json({
    items,
    nextCursor: hasMore ? items[items.length - 1].id_produto : null,
  });
}
```

**Benefícios:**
- Performance constante
- Não pula resultados em dados dinâmicos
- Melhor para infinite scroll

---

### 3. Otimizar Queries com Select e Include Seletivo

**Situação Atual:**
```typescript
// Busca todos os campos e relações
const usuario = await prisma.usuario.findUnique({
  where: { id_usuario: 1 },
  include: {
    genero: true,
    tipo_cabelo: true,
    avaliacoes: true,
    favoritos: true,
  },
});
```

**Melhoria:**
```typescript
// Busca apenas o necessário
const usuario = await prisma.usuario.findUnique({
  where: { id_usuario: 1 },
  select: {
    id_usuario: true,
    nome: true,
    email: true,
    genero: {
      select: {
        nome: true,
      },
    },
  },
});
```

**Benefícios:**
- Menos dados transferidos
- Queries mais rápidas
- Menos memória usada

---

### 4. Implementar ISR (Incremental Static Regeneration)

**Melhoria:**
```typescript
// app/artigos/[slug]/page.tsx
export const revalidate = 3600; // Revalidar a cada 1 hora

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string };
}) {
  const artigo = await prisma.artigo.findUnique({
    where: { slug: params.slug },
  });

  return <ArtigoView artigo={artigo} />;
}
```

**Benefícios:**
- Páginas estáticas rápidas
- Atualizadas periodicamente
- Reduz carga no servidor

---

### 5. Implementar Lazy Loading de Imagens

**Melhoria:**
```typescript
import Image from 'next/image';

// Em vez de <img>
<Image
  src={produto.url_imagem}
  alt={produto.nome}
  width={500}
  height={500}
  loading="lazy"
  placeholder="blur"
  blurDataURL={produto.blur_placeholder}
/>
```

**Benefícios:**
- Carregamento progressivo
- Otimização automática
- Melhor LCP (Largest Contentful Paint)

---

## 🎨 Melhorias de UX/UI

### 1. Implementar Loading States

**Melhoria:**
```typescript
'use client';

import { useState } from 'react';

export function ProdutosList() {
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  async function carregarProdutos() {
    setLoading(true);
    try {
      const res = await fetch('/api/produtos');
      const data = await res.json();
      setProdutos(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Skeleton count={5} />;
  }

  return (
    <div>
      {produtos.map(p => <ProdutoCard key={p.id} produto={p} />)}
    </div>
  );
}
```

---

### 2. Implementar Error Boundaries

**Melhoria:**
```typescript
// components/error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Algo deu errado</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Uso
<ErrorBoundary>
  <ProdutosList />
</ErrorBoundary>
```

---

### 3. Implementar Toast Notifications

**Melhoria:**
```typescript
// lib/toast.ts
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string) => {
    sonnerToast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  },

  error: (message: string) => {
    sonnerToast.error(message, {
      duration: 5000,
      position: 'top-right',
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },
};

// Uso
async function handleSubmit() {
  const loadingToast = toast.loading('Salvando...');

  try {
    await salvar();
    toast.success('Salvo com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar');
  } finally {
    sonnerToast.dismiss(loadingToast);
  }
}
```

---

### 4. Implementar Validação em Tempo Real

**Melhoria:**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    mode: 'onChange', // Valida em tempo real
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type="email"
        aria-invalid={!!errors.email}
      />
      {errors.email && (
        <span className="error">{errors.email.message}</span>
      )}

      <button disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
```

---

## 🔒 Melhorias de Segurança

### 1. Implementar Audit Log

**Melhoria:**
```typescript
// models/audit-log.ts
export interface AuditLog {
  id: number;
  usuario_id: number;
  acao: string;
  entidade: string;
  entidade_id: number;
  dados_anteriores?: any;
  dados_novos?: any;
  ip_address: string;
  user_agent: string;
  timestamp: Date;
}

// services/audit.service.ts
export class AuditService {
  async log(event: {
    usuarioId: number;
    acao: 'CREATE' | 'UPDATE' | 'DELETE';
    entidade: string;
    entidadeId: number;
    dadosAnteriores?: any;
    dadosNovos?: any;
    request: Request;
  }) {
    await prisma.auditLog.create({
      data: {
        usuario_id: event.usuarioId,
        acao: event.acao,
        entidade: event.entidade,
        entidade_id: event.entidadeId,
        dados_anteriores: event.dadosAnteriores,
        dados_novos: event.dadosNovos,
        ip_address: event.request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: event.request.headers.get('user-agent') || 'unknown',
      },
    });
  }
}
```

**Benefícios:**
- Rastreabilidade
- Compliance
- Debugging
- Segurança

---

### 2. Implementar 2FA (Two-Factor Authentication)

**Melhoria:**
```typescript
// lib/2fa.ts
import * as OTPAuth from 'otpauth';
import * as QRCode from 'qrcode';

export class TwoFactorService {
  async gerarSecret(email: string) {
    const secret = new OTPAuth.Secret();
    const totp = new OTPAuth.TOTP({
      issuer: 'Oasis',
      label: email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret,
    });

    const uri = totp.toString();
    const qrCode = await QRCode.toDataURL(uri);

    return { secret: secret.base32, qrCode };
  }

  verificarToken(secret: string, token: string): boolean {
    const totp = new OTPAuth.TOTP({
      secret: OTPAuth.Secret.fromBase32(secret),
    });

    return totp.validate({ token, window: 1 }) !== null;
  }
}
```

---

### 3. Implementar Session Management

**Melhoria:**
```typescript
// lib/session.ts
export interface Session {
  id: string;
  usuario_id: number;
  token: string;
  expires_at: Date;
  ip_address: string;
  user_agent: string;
  is_active: boolean;
}

export class SessionManager {
  async criar(usuarioId: number, req: Request) {
    const token = generateSecureToken();

    return prisma.session.create({
      data: {
        usuario_id: usuarioId,
        token,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
      },
    });
  }

  async invalidar(sessionId: string) {
    await prisma.session.update({
      where: { id: sessionId },
      data: { is_active: false },
    });
  }

  async listarAtivas(usuarioId: number) {
    return prisma.session.findMany({
      where: {
        usuario_id: usuarioId,
        is_active: true,
        expires_at: { gt: new Date() },
      },
    });
  }
}
```

---

## 🚀 Melhorias de DevOps

### 1. Implementar Health Checks

**Melhoria:**
```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'unknown',
    redis: 'unknown',
    storage: 'unknown',
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  try {
    await redis.ping();
    checks.redis = 'ok';
  } catch {
    checks.redis = 'error';
  }

  const allHealthy = Object.values(checks).every(v =>
    typeof v === 'string' ? v === 'ok' : true
  );

  return NextResponse.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}
```

---

### 2. Implementar Graceful Shutdown

**Melhoria:**
```typescript
// server.ts
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, starting graceful shutdown...');

  // Parar de aceitar novas requisições
  server.close(() => {
    console.log('HTTP server closed');
  });

  // Fechar conexões com banco
  await prisma.$disconnect();
  console.log('Database disconnected');

  // Fechar Redis
  await redis.quit();
  console.log('Redis disconnected');

  process.exit(0);
});
```

---

### 3. Implementar Feature Flags

**Melhoria:**
```typescript
// lib/feature-flags.ts
export const features = {
  avaliacoes: process.env.FEATURE_AVALIACOES === 'true',
  darkMode: process.env.FEATURE_DARK_MODE === 'true',
  notificacoes: process.env.FEATURE_NOTIFICACOES === 'true',
};

export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature] || false;
}

// Uso
if (isFeatureEnabled('avaliacoes')) {
  // Mostrar seção de avaliações
}
```

---

## 🧪 Melhorias de Testes

### 1. Implementar Test Fixtures

**Melhoria:**
```typescript
// tests/fixtures/usuario.fixture.ts
export const usuarioFactory = {
  build: (overrides?: Partial<Usuario>): Usuario => ({
    id_usuario: 1,
    nome: 'João Silva',
    email: 'joao@test.com',
    senha: 'hashedpassword',
    id_genero: 1,
    data_cadastro: new Date(),
    ...overrides,
  }),

  buildMany: (count: number): Usuario[] => {
    return Array.from({ length: count }, (_, i) =>
      usuarioFactory.build({ id_usuario: i + 1 })
    );
  },
};

// Uso
it('deve listar usuários', () => {
  const usuarios = usuarioFactory.buildMany(5);
  expect(usuarios).toHaveLength(5);
});
```

---

### 2. Implementar Mutation Testing

**Melhoria:**
```bash
# Instalar Stryker
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner

# stryker.config.json
{
  "mutator": "typescript",
  "testRunner": "jest",
  "coverageAnalysis": "perTest",
  "mutate": [
    "src/**/*.ts",
    "!src/**/*.test.ts"
  ]
}

# Rodar
npx stryker run
```

---

## 📚 Melhorias de Documentação

### 1. Implementar JSDoc

**Melhoria:**
```typescript
/**
 * Cria um novo usuário no sistema
 *
 * @param data - Dados do usuário a ser criado
 * @param data.nome - Nome completo do usuário
 * @param data.email - Email válido e único
 * @param data.senha - Senha com no mínimo 8 caracteres
 * @returns O usuário criado (sem a senha)
 * @throws {ApiError} Se o email já estiver em uso
 * @throws {ZodError} Se os dados forem inválidos
 *
 * @example
 * const usuario = await criarUsuario({
 *   nome: 'João Silva',
 *   email: 'joao@example.com',
 *   senha: 'SenhaForte123!'
 * });
 */
export async function criarUsuario(
  data: CriarUsuarioDTO
): Promise<UsuarioResponseDTO> {
  // ...
}
```

---

### 2. Implementar ADRs (Architecture Decision Records)

**Estrutura:**
```
docs/adr/
├── 001-escolha-do-nextjs.md
├── 002-prisma-como-orm.md
├── 003-supabase-para-storage.md
└── 004-jwt-para-autenticacao.md
```

**Template:**
```markdown
# ADR 004: Uso de JWT para Autenticação

## Status
Aceito

## Contexto
Precisamos de um sistema de autenticação stateless e escalável.

## Decisão
Usar JWT (JSON Web Tokens) para autenticação.

## Consequências
### Positivas
- Stateless (não precisa armazenar sessões)
- Escalável horizontalmente
- Funciona bem com APIs

### Negativas
- Não pode ser revogado facilmente
- Precisa de estratégia de refresh token
- Payload público (base64)

## Alternativas Consideradas
1. Sessions (rejeitado - não escalável)
2. OAuth (complexo demais para MVP)
```

---

## 📊 Resumo de Prioridades

| Categoria | Melhorias | Prioridade | Esforço |
|-----------|-----------|------------|---------|
| Código | 5 | Alta | Médio |
| Arquitetura | 3 | Média | Alto |
| Performance | 5 | Alta | Médio |
| UX/UI | 4 | Alta | Baixo |
| Segurança | 3 | Crítica | Médio |
| DevOps | 3 | Média | Baixo |
| Testes | 2 | Média | Baixo |
| Documentação | 2 | Baixa | Baixo |

---

## 🎯 Quick Wins (Implementar Primeiro)

1. ✅ Padronizar tratamento de erros (4h)
2. ✅ Implementar loading states (2h)
3. ✅ Implementar toast notifications (2h)
4. ✅ Health checks endpoint (1h)
5. ✅ JSDoc nas funções principais (3h)

**Total: 12 horas para melhorias significativas**

---

**Última atualização:** 2025-10-29
**Revisão:** Trimestral
