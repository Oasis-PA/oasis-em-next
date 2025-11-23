import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Header, Footer } from "@/components";
import FavoriteButton from "@/components/FavoriteButton";
import styles from '@/styles/artigoteste.module.css';

interface ArtigoProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const now = new Date();
    const artigos: { slug: string }[] = await prisma.artigo.findMany({
      where: {
        OR: [
          { status: "publicado" },
          { status: "agendado", dataPublicacao: { lte: now } },
        ],
      },
      select: { slug: true },
    });

    return artigos.filter((a) => a.slug).map((a) => ({ slug: a.slug }));
  } catch (error) {
    // Se o banco não estiver acessível durante o build, retorna array vazio
    // As páginas serão geradas sob demanda (ISR/dynamic rendering)
    return [];
  }
}

// Função auxiliar para formatar datas
function formatarData(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(data));
}

export default async function ArtigoPage({ params }: ArtigoProps) {
  // Await params antes de usar
  const { slug } = await params;

  const artigo = await prisma.artigo.findUnique({
    where: { slug }
  });

  // Se não existir, 404
  if (!artigo) return notFound();

  // Bloquear rascunhos
  if (artigo.status === "rascunho") return notFound();

  // Bloquear agendados antes da data
  if (artigo.status === "agendado") {
    const now = new Date();
    const pub = artigo.dataPublicacao ? new Date(artigo.dataPublicacao) : null;
    // se data de publicação não definida ou maior que agora -> 404
    if (!pub || pub.getTime() > now.getTime()) return notFound();
  }

  // Se estiver agendado e a data já passou, atualiza para publicado
  if (artigo.status === "agendado" && artigo.dataPublicacao) {
    const now = new Date();
    const pub = new Date(artigo.dataPublicacao);
    if (pub.getTime() <= now.getTime()) {
      await prisma.artigo.update({
        where: { id: artigo.id },
        data: { status: "publicado" },
      });
      // recarregar artigo atualizado
      const atualizado = await prisma.artigo.findUnique({ where: { id: artigo.id } });
      if (!atualizado) return notFound();
      // use 'atualizado' daqui pra frente
    }
  }

  if (!artigo.conteudo) {
    return (
    
    <div className="page-artigo-wrapper">

        <Header />
        <main>
          <article>
            <p>Artigo não encontrado ou sem conteúdo.</p>
          </article>
        </main>    </div>
  );

  }

  // Usa a imagem do header do banco de dados (Supabase Storage)
  const imagemHeader = artigo.imagemHeader;
  const themeDark = artigo.themeDark;

  // Verifica se o artigo foi atualizado (diferença maior que 1 minuto)
  const foiAtualizado = artigo.atualizadoEm && artigo.criadoEm && 
    (artigo.atualizadoEm.getTime() - artigo.criadoEm.getTime() > 60000);

  return (
    <>
    {imagemHeader ? (
        <Header
          backgroundImage={imagemHeader}
          theme={themeDark ? "dark" : undefined}
          className={styles.headerArticle}
        />
      ) : (
        <Header theme={themeDark ? "dark" : undefined} />
      )}
    <div className={styles.wrapper}>
      
      <div className={styles.pageArtigoWrapper}>
        <main className={styles.mainWrapper}>
          <article className={styles.articleContent}>
          {/* Botão de favorito no topo */}
          <div className={styles.artigoFavoritoTopo}>
            <FavoriteButton
              artigoId={artigo.id}
              size="large"
            />
          </div>

          {/* Informações de data */}
          {(artigo.criadoEm || artigo.atualizadoEm) && (
            <div className={styles.artigoDatasInfo}>
              {artigo.criadoEm && (
                <div className={styles.artigoDataItem}>
                  <svg className={styles.dataIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className={styles.artigoDataItemSpan}>Publicado em {formatarData(artigo.criadoEm)}</span>
                </div>
              )}

              {foiAtualizado && artigo.atualizadoEm && (
                <div className={`${styles.artigoDataItem} ${styles.artigoAtualizado}`}>
                  <svg className={styles.dataIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  <span className={styles.artigoDataItemSpan}>Atualizado em {formatarData(artigo.atualizadoEm)}</span>
                </div>
              )}
            </div>
          )}

          {/* Conteúdo do artigo */}
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className={styles.articleHeading1}>{children}</h1>,
              h2: ({ children }) => <h3 className={styles.articleHeading3}>{children}</h3>,
              h3: ({ children }) => <h3 className={styles.articleHeading3}>{children}</h3>,
              p: ({ children, node }) => {
                // Verifica se o parágrafo contém apenas uma imagem
                const hasOnlyImage = node?.children?.length === 1 &&
                                    node.children[0].type === 'element' &&
                                    node.children[0].tagName === 'img';

                // Se só tem imagem, não envolve em <p>
                if (hasOnlyImage) {
                  return <>{children}</>;
                }

                return <p className={styles.articleParagraph}>{children}</p>;
              },
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              ul: ({ children }) => <ul className={styles.articleList}>{children}</ul>,
              ol: ({ children }) => <ol className={styles.articleList}>{children}</ol>,
              li: ({ children }) => <li className={styles.articleListItem}>{children}</li>,
              img: ({ src, alt, title }) => {
                // Extrai classe customizada do alt text se houver
                const match = alt?.match(/^(.*?)\s*\{([^}]+)\}$/);
                const altText = match ? match[1].trim() : alt;
                const customClass = match ? match[2].trim() : '';

                const figureClass = customClass === 'imagem-destaque'
                  ? `${styles.artigoFigura} ${styles.imagemDestaque}`
                  : styles.artigoFigura;

                return (
                  <figure className={figureClass}>
                    <img
                      src={src}
                      alt={altText || ''}
                      className={styles.artigoImagem}
                    />
                    {title && <figcaption className={styles.artigoFiguraCaption}>{title}</figcaption>}
                  </figure>
                );
              },
            }}
          >
            {artigo.conteudo}
          </ReactMarkdown>
        </article>
        </main>
      </div>
     
    </div>
  <Footer/>
    </>
  );
}