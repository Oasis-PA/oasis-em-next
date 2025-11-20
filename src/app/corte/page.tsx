import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header, Footer } from "@/components";
import '@/styles/corte-listagem.css';

export const dynamic = 'force-dynamic';

export default async function CortesListPage() {
  const cortes = await prisma.cortes.findMany({
    where: { status: "publicado" },
    select: {
      id: true,
      nome: true,
      slug: true,
      descricao: true,
      imagem_principal: true,
      criadoEm: true,
    },
    orderBy: { criadoEm: "desc" },
  });

  return (
    <>
      <Header />
      <main className="cortes-container">
        <div className="cortes-header">
          <h1 className="cortes-titulo">Nossos Cortes</h1>
          <p className="cortes-subtitulo">
            Descubra os cortes mais modernos e encontre o estilo perfeito para você
          </p>
        </div>

        <div className="cortes-grid">
          {cortes
            .filter((c) => c.slug && c.nome)
            .map((corte) => {
              const preview = corte.descricao
                ? corte.descricao.substring(0, 120) + '...'
                : 'Descubra mais sobre este corte...';

              return (
                <Link href={`/corte/${corte.slug}`} key={corte.id} className="corte-card">
                  {corte.imagem_principal && (
                    <div className="corte-card-imagem">
                      <img src={corte.imagem_principal} alt={corte.nome} />
                      <div className="corte-card-overlay"></div>
                    </div>
                  )}
                  <div className="corte-card-content">
                    <h2 className="corte-card-titulo">{corte.nome}</h2>
                    <p className="corte-preview">{preview}</p>
                    <span className="corte-ver-mais">Ver detalhes →</span>
                  </div>
                </Link>
              );
            })}
        </div>

        {cortes.length === 0 && (
          <div className="cortes-vazio">
            <p>Nenhum corte disponível no momento</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}