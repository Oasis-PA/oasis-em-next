import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components";
import styles from '@/styles/corte-modelo.module.css';

interface CorteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const cortes: { slug: string }[] = await prisma.cortes.findMany({
      where: {
        OR: [
          { status: "publicado" },
          { status: "agendado"  },
        ],
      },
      select: { slug: true },
    });

    return cortes.filter((c) => c.slug).map((c) => ({ slug: c.slug }));
  } catch (error) {
    return [];
  }
}

export default async function CortePage({ params }: CorteProps) {
  const { slug } = await params;

  const corte = await prisma.cortes.findUnique({
    where: { slug },
  });

  if (!corte) return notFound();

  // normaliza fields
  const normalized = {
    id: corte.id,
    nome: (corte as any).nome ?? corte.nome,
    descricao: (corte as any).descricao ?? corte.descricao,
    status: (corte as any).status ?? corte.status,
    criadoEm: (corte as any).criadoEm ?? corte.criadoEm,
    atualizadoEm: (corte as any).atualizadoEm ?? corte.atualizadoEm,
    dataPublicacao:
      (corte as any).dataPublicacao ??
      (corte as any).data_publicacao ??
      null,
    imagemPrincipal:
      (corte as any).imagem_principal ??
      (corte as any).imagemPrincipal ??
      null,
    historia: (corte as any).historia ?? corte.historia ?? null,
    comoFazer:
      (corte as any).como_fazer ?? (corte as any).comoFazer ?? null,
    rostoCompativel:
      (corte as any).rosto_compativel ??
      (corte as any).rostoCompativel ??
      null,
    comoArrumar:
      (corte as any).como_arrumar ?? (corte as any).comoArrumar ?? null,
  };

  // Bloquear rascunhos
  if (normalized.status === "rascunho") return notFound();

  // Bloquear agendados antes da data
  if (normalized.status === "agendado") {
    const now = new Date();
    const pub = normalized.dataPublicacao ? new Date(normalized.dataPublicacao) : null;
    if (!pub || pub.getTime() > now.getTime()) return notFound();
  }

  // Se estiver agendado e a data já passou, atualiza para publicado
  if (normalized.status === "agendado" && normalized.dataPublicacao) {
    const now = new Date();
    const pub = new Date(normalized.dataPublicacao);
    if (pub.getTime() <= now.getTime()) {
      await prisma.cortes.update({
        where: { id: normalized.id },
        data: { status: "publicado", atualizadoEm: new Date() },
      });
      normalized.status = "publicado";
    }
  }

  // Se não houver descrição, mostrar mensagem (Layout de erro atualizado com styles)
  if (!normalized.descricao) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <main>
          <section className={styles.container}>
            <p>Corte não encontrado ou sem conteúdo.</p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <section className={styles.container}>
          {normalized.imagemPrincipal && (
            <img 
              className={styles.mainImage}
              src={normalized.imagemPrincipal} 
              alt={`Imagem ${normalized.nome}`}
            />
          )}
           
          <div className={styles.rightColumn}>
            <div className={styles.topSection}>
              <p className={styles.title}>{normalized.nome}</p>
              <p className={styles.description}>
                {normalized.descricao}
              </p>
              
              {normalized.historia && (
                <>
                  <p className={styles.sectionTitle}>Quando surgiu?</p>
                  <p className={styles.description}>
                    {normalized.historia}
                  </p>
                </>
              )}
            </div>

            <div className={styles.grid}>
              {normalized.comoFazer && (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Como fazer</p>
                  <p className={styles.cardText}>
                    {normalized.comoFazer}
                  </p>
                </div>
              )}

              {normalized.rostoCompativel && (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Com qual rosto combina?</p>
                  <p className={styles.cardText}>
                    {normalized.rostoCompativel}
                  </p>
                </div>
              )}

              {normalized.comoArrumar && (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Como arrumar</p>
                  <p className={styles.cardText}>
                    {normalized.comoArrumar}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}