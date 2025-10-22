import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ArtigoCard from "@/components/ArtigoCard";
import '@/styles/artigo-geral.css';

export const dynamic = 'force-dynamic';

export default async function ArtigosListPage() {
  const now = new Date();
  const session = await getServerSession(authOptions);

  // Busca os artigos
  const artigos = await prisma.artigo.findMany({
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
  });

  // Busca os favoritos do usuário (se logado)
  let favoritosIds: number[] = [];
  if (session?.user?.id_usuario) {
    const favoritos = await prisma.favoritoArtigo.findMany({
      where: {
        id_usuario: session.user.id_usuario,
      },
      select: {
        id_artigo: true,
      },
    });
    favoritosIds = favoritos.map(f => f.id_artigo);
  }

  return (
    <main className="artigos-container">
      <div className="artigos-header">
        <h1 className="artigos-titulo">Nossos Artigos</h1>
        <p className="artigos-subtitulo">
          Descubra dicas e conteúdos exclusivos sobre beleza e cuidados
        </p>
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

            const isFavorito = favoritosIds.includes(artigo.id);

            return (
              <ArtigoCard
                key={artigo.id}
                artigo={{
                  id: artigo.id,
                  titulo: artigo.titulo,
                  slug: artigo.slug,
                  preview,
                  dataFormatada,
                }}
                isFavoritoInicial={isFavorito}
              />
            );
          })}
      </div>
    </main>
  );
}