import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "../../../components/header";
import BotaoFavoritar from "@/components/BotaoFavoritar";
import { getServerSession } from "next-auth/next";
import '@/styles/artigoteste.css';

// Extend the Session user type to include id_usuario
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id_usuario?: string;
    };
  }
}

interface ArtigoProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
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
}

export default async function ArtigoPage({ params }: ArtigoProps) {
  const { slug } = await params;
  const session = await getServerSession(/* authOptions */);

  const artigo = await prisma.artigo.findUnique({
    where: { slug }
  });

  if (!artigo) return notFound();
  if (artigo.status === "rascunho") return notFound();

  if (artigo.status === "agendado") {
    const now = new Date();
    const pub = artigo.dataPublicacao ? new Date(artigo.dataPublicacao) : null;
    if (!pub || pub.getTime() > now.getTime()) return notFound();
  }

  if (artigo.status === "agendado" && artigo.dataPublicacao) {
    const now = new Date();
    const pub = new Date(artigo.dataPublicacao);
    if (pub.getTime() <= now.getTime()) {
      await prisma.artigo.update({
        where: { id: artigo.id },
        data: { status: "publicado" },
      });
    }
  }

  // Verifica se o artigo está favoritado pelo usuário
  let isFavorito = false;
  if (session?.user?.id_usuario) {
    const favoritoExistente = await prisma.favoritoArtigo.findUnique({
      where: {
        id_usuario_id_artigo: {
          id_usuario: Number(session.user.id_usuario),
          id_artigo: artigo.id,
        },
      },
    });
    isFavorito = !!favoritoExistente;
  }

  if (!artigo.conteudo) {
    return (
      <>
        <Header />
        <main>
          <article>
            <p>Artigo não encontrado ou sem conteúdo.</p>
          </article>
        </main>
      </>
    );
  }

  const imagemHeader = artigo.imagemHeader;

  return (
    <>
      {imagemHeader ? <Header backgroundImage={imagemHeader} /> : <Header />}
      <main>
        <article className="markdown-content">
          <div className="artigo-header-actions">
            <BotaoFavoritar 
              id_artigo={artigo.id} 
              isFavoritoInicial={isFavorito} 
            />
          </div>
          
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h3>{children}</h3>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children, node }) => {
                const hasOnlyImage = node?.children?.length === 1 && 
                                    node.children[0].type === 'element' && 
                                    node.children[0].tagName === 'img';
                
                if (hasOnlyImage) {
                  return <>{children}</>;
                }
                
                return <p>{children}</p>;
              },
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              img: ({ src, alt, title }) => {
                const match = alt?.match(/^(.*?)\s*\{([^}]+)\}$/);
                const altText = match ? match[1].trim() : alt;
                const customClass = match ? match[2].trim() : '';
                
                return (
                  <figure className={`artigo-figura ${customClass}`}>
                    <img 
                      src={src} 
                      alt={altText || ''} 
                      className="artigo-imagem"
                    />
                    {title && <figcaption>{title}</figcaption>}
                  </figure>
                );
              },
            }}
          >
            {artigo.conteudo}
          </ReactMarkdown>
        </article>
      </main>
    </>
  );
}