import Link from "next/link";
import { prisma } from "@/lib/prisma";
import '@/styles/artigo-geral.css';

// Habilita ISR com revalidação a cada 1 hora
export const revalidate = 3600;

const ARTIGOS_POR_PAGINA = 12;

interface ArtigosListPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArtigosListPage({ searchParams }: ArtigosListPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const skip = (page - 1) * ARTIGOS_POR_PAGINA;
  const now = new Date();

  // Busca total de artigos e dados paginados
  const [totalArtigos, artigos] = await Promise.all([
    prisma.artigo.count({
      where: {
        OR: [
          { status: "publicado" },
          { status: "agendado", dataPublicacao: { lte: now } },
        ],
      },
    }),
    prisma.artigo.findMany({
      where: {
        OR: [
          { status: "publicado" },
          { status: "agendado", dataPublicacao: { lte: now } },
        ],
      },
      select: {
        id: true,
        titulo: true,
        slug: true,
        conteudo: true,
        criadoEm: true,
        dataPublicacao: true,
        status: true,
      },
      orderBy: { criadoEm: "desc" },
      skip,
      take: ARTIGOS_POR_PAGINA,
    }),
  ]);

  const totalPages = Math.ceil(totalArtigos / ARTIGOS_POR_PAGINA);

  return (
    <main className="artigos-container">
      <div className="artigos-header">
        <h1 className="artigos-titulo">Nossos Artigos</h1>
        <p className="artigos-subtitulo">Descubra dicas e conteúdos exclusivos sobre beleza e cuidados</p>
      </div>

      <div className="artigos-grid">
        {artigos
          .filter((a) => a.slug && a.titulo)
          .map((artigo) => {
            const preview = artigo.conteudo
              ? artigo.conteudo.substring(0, 150).replace(/[#*_]/g, '') + '...'
              : 'Leia mais para descobrir...';

            const dataFormatada = artigo.dataPublicacao
              ? new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })
              : new Date(artigo.criadoEm).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                });

            return (
              <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className="artigo-card">
                <div className="artigo-card-content">
                  <span className="artigo-data">{dataFormatada}</span>
                  <h2 className="artigo-card-titulo">{artigo.titulo}</h2>
                  <p className="artigo-preview">{preview}</p>
                  <span className="artigo-ler-mais">Ler artigo completo →</span>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', marginBottom: '40px' }}>
          {page > 1 && (
            <Link href={`/artigo?page=${page - 1}`} style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#f5f5f5'
            }}>
              ← Anterior
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/artigo?page=${pageNum}`}
              style={{
                padding: '8px 12px',
                border: pageNum === page ? '2px solid #AA35B0' : '1px solid #ddd',
                borderRadius: '4px',
                textDecoration: 'none',
                color: pageNum === page ? '#AA35B0' : '#333',
                backgroundColor: pageNum === page ? '#f5f0ff' : '#f5f5f5',
                fontWeight: pageNum === page ? 'bold' : 'normal',
              }}
            >
              {pageNum}
            </Link>
          ))}

          {page < totalPages && (
            <Link href={`/artigo?page=${page + 1}`} style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#f5f5f5'
            }}>
              Próxima →
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
