import Link from "next/link";
import { prisma } from "@/lib/prisma";
import '@/styles/artigo-geral.css';

export const dynamic = 'force-dynamic';

export default async function ArtigosListPage() {
  const artigos = await prisma.artigo.findMany({
    select: {
      id: true,
      titulo: true,
      slug: true,
      conteudo: true,
      criadoEm: true,
      dataPublicacao: true
    },
    orderBy: { criadoEm: "desc" },
  });

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
    </main>
  );
}
