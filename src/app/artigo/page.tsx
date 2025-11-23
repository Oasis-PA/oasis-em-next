// src/app/artigos/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Artigo, Tag, ArtigoTag } from '@prisma/client';
import { Header, Footer } from "@/components";
import FavoriteButton from '@/components/FavoriteButton'; // ← Importação direta!
import styles from '@/styles/artigo-geral.module.css';

// ... suas funções truncateText, truncateTag, formatDate ...

function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function truncateTag(tag: string, maxLength: number = 15): string {
  if (!tag) return '';
  if (tag.length <= maxLength) return tag;
  return tag.substring(0, maxLength).trim() + '...';
}

function formatDate(criadoEm: Date, atualizadoEm: Date): string {
  const diffInDays = Math.abs(new Date(atualizadoEm).getTime() - new Date(criadoEm).getTime()) / (1000 * 60 * 60 * 24);
  const dtf = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  if (diffInDays > 1) {
    return 'Atualizado em ' + dtf.format(new Date(atualizadoEm));
  }
  return dtf.format(new Date(criadoEm));
}

const DISPLAY_LIMITS = {
  titulo: { card: 60, destaque: 80, hero: 100 },
  resumo: { card: 120, preview: 160 },
  tags: { max: 3, maxLength: 15 }
};

export default async function ArtigosPage() {
  let artigos: (Artigo & { ArtigoTag: (ArtigoTag & { Tag: Tag })[] })[] = [];

  try {
    artigos = await prisma.artigo.findMany({
      where: { status: 'publicado' },
      include: {
        ArtigoTag: {
          include: { Tag: true },
          take: DISPLAY_LIMITS.tags.max
        }
      },
      orderBy: { dataPublicacao: 'desc' }
    });
  } catch (error) {
    artigos = [];
  }

  const artigoMaisRecente = artigos[0];
  const segundoTerceiro = artigos.slice(1, 3);
  const quartoQuinto = artigos.slice(3, 5);
  const secaoDestaque = artigos.slice(5, 6)[0];
  const gruposQuadruplos = artigos.slice(6, 14);
  const artigoGrande = artigos.slice(14, 15)[0];
  const ultimosArtigos = artigos.slice(15);

  return (
    <div className={styles.pageArtigoWrapper}>
      <Header />
      <div className={styles.artigosPageWrapper}>
        <h5 className={styles.artigosPageWrapperH5}>Por dentro das notícias</h5>
        <p className={styles.artigosPageWrapperP}>Veja aqui os melhores artigos sobre cuidados, beleza e dicas. Salve os seus favoritos e leia sempre que quiser!</p>

        <main className={styles.main}>
          <h5 className={styles.mainH5}>Recentes</h5>

          {/* GRUPO 1 - Hero */}
          {artigoMaisRecente && (
            <Link href={`/artigo/${artigoMaisRecente.slug}`} className={styles.grupo1}>
              <div className={styles.grupo1Svg}>
                <FavoriteButton artigoId={artigoMaisRecente.id} size="small" />
              </div>
              {artigoMaisRecente.imagemHeader && (
                <img className={styles.grupo1Img} src={artigoMaisRecente.imagemHeader} alt={artigoMaisRecente.titulo} />
              )}
              <p className={styles.grupo1P}>{formatDate(artigoMaisRecente.criadoEm, artigoMaisRecente.atualizadoEm)}</p>
              <h4 className={styles.grupo1H4}>{truncateText(artigoMaisRecente.titulo, DISPLAY_LIMITS.titulo.hero)}</h4>
              <div className={styles.Cartegorias}>
                {artigoMaisRecente.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <div key={at.tagId} className={styles.CartegoriaDiv}>
                    <p className={styles.CartegoriaDivP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  </div>
                ))}
              </div>
            </Link>
          )}

          {/* GRUPOS 2 e 3 */}
          {segundoTerceiro.map((artigo, index) => (
            <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={index === 0 ? styles.grupo2 : styles.grupo3}>
              <div className={index === 0 ? styles.grupo2Svg : styles.grupo3Svg}>
                <FavoriteButton artigoId={artigo.id} size="small" />
              </div>
              {artigo.imagemHeader && (
                <img className={index === 0 ? styles.grupo2Img : styles.grupo3Img} src={artigo.imagemHeader} alt={artigo.titulo} />
              )}
              <p className={styles.data}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
              <h4 className={index === 0 ? styles.grupo2H4 : styles.grupo3H4}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
              <p className={styles.descrição}>{truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
              <div className={styles.CartegoriaLadodireito}>
                {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <p key={at.tagId} className={styles.CartegoriaLadodireitoP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                ))}
              </div>
            </Link>
          ))}

          {/* SEÇÃO DESTAQUE */}
          {secaoDestaque && (
            <Link href={`/artigo/${secaoDestaque.slug}`} className={styles.seção}>
              <div className={styles.sorriso}>
                <FavoriteButton artigoId={secaoDestaque.id} size="small" />
              </div>
              <div className={styles.dataBox}>
                <p className={styles.dataBoxP}>{formatDate(secaoDestaque.criadoEm, secaoDestaque.atualizadoEm)}</p>
              </div>
              <div className={styles.textoBox}>
                <h5 className={styles.textoBoxH5}>{truncateText(secaoDestaque.titulo, DISPLAY_LIMITS.titulo.destaque)}</h5>
              </div>
              <div className={`${styles.Cartegorias} ${styles.carteSeção}`}>
                {secaoDestaque.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <div key={at.tagId} className={styles.CartegoriaDiv}>
                    <p className={styles.CartegoriaDivP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  </div>
                ))}
              </div>
            </Link>
          )}

          {/* SEÇÃO 2 */}
          <div className={styles.seção2}>
            {quartoQuinto[0] && (
              <Link href={`/artigo/${quartoQuinto[0].slug}`} className={styles.grupo4}>
                {quartoQuinto[0].imagemHeader && (
                  <img className={styles.grupo4Img} src={quartoQuinto[0].imagemHeader} alt={quartoQuinto[0].titulo} width={389} height={469} />
                )}
                <p className={styles.grupo4Data}>{formatDate(quartoQuinto[0].criadoEm, quartoQuinto[0].atualizadoEm)}</p>
                <div className={styles.grupo4Svg}>
                  <FavoriteButton artigoId={quartoQuinto[0].id} size="small" />
                </div>
                <h4 className={styles.grupo4H4}>{truncateText(quartoQuinto[0].titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className={styles.grupo4Descrição}>{truncateText(quartoQuinto[0].resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
                <div className={styles.CartegoriaS2}>
                  {quartoQuinto[0].ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}

            {quartoQuinto[1] && (
              <Link href={`/artigo/${quartoQuinto[1].slug}`} className={styles.grupo5}>
                <p className={styles.grupo5Descrição}>{truncateText(quartoQuinto[1].resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
                {quartoQuinto[1].imagemHeader && (
                  <img className={styles.grupo5Img} src={quartoQuinto[1].imagemHeader} alt={quartoQuinto[1].titulo} width={718} height={469} />
                )}
                <p className={styles.grupo5Data}>{formatDate(quartoQuinto[1].criadoEm, quartoQuinto[1].atualizadoEm)}</p>
                <div className={styles.grupo5Svg}>
                  <FavoriteButton artigoId={quartoQuinto[1].id} size="small" />
                </div>
                <h4 className={styles.grupo5H4}>{truncateText(quartoQuinto[1].titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>
                <div className={styles.CartegoriaS2Meio}>
                  {quartoQuinto[1].ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2MeioP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}

            {artigoGrande && (
              <Link href={`/artigo/${artigoGrande.slug}`} className={styles.grupo4}>
                {artigoGrande.imagemHeader && (
                  <img className={styles.grupo6Img} src={artigoGrande.imagemHeader} alt={artigoGrande.titulo} width={389} height={469} />
                )}
                <p className={styles.grupo6Data}>{formatDate(artigoGrande.criadoEm, artigoGrande.atualizadoEm)}</p>
                <div className={styles.grupo6Svg}>
                  <FavoriteButton artigoId={artigoGrande.id} size="small" />
                </div>
                <h4 className={styles.grupo6H4}>{truncateText(artigoGrande.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className={styles.grupo6Descrição}>{truncateText(artigoGrande.resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
                <div className={styles.CartegoriaS2}>
                  {artigoGrande.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}
          </div>

          <img className={styles.linha} src="/images/artigo-geral/linha.png" alt="" />

          {/* LINHAS QUADRUPLOS */}
          {gruposQuadruplos.length > 0 && (
            <>
              <div className={styles.gruposLinha1}>
                {gruposQuadruplos.slice(0, 4).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.gruposLinha1Link}>
                    {artigo.imagemHeader && <img className={styles.gruposLinha1Img} src={artigo.imagemHeader} alt={artigo.titulo} />}
                    <p className={styles.dataLinha}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <div className={styles.saveIcon}>
                      <FavoriteButton artigoId={artigo.id} size="small" />
                    </div>
                    <h4 className={styles.h4Linha}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                    <p className={styles.descriçãoLinha}>{truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
                    <div className={styles.CartegoriaLinha}>
                      {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                        <p key={at.tagId} className={styles.CartegoriaLinhaP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {gruposQuadruplos.length > 4 && (
                <div className={styles.gruposLinha2}>
                  {gruposQuadruplos.slice(4, 8).map((artigo) => (
                    <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.gruposLinha2Link}>
                      {artigo.imagemHeader && <img className={styles.gruposLinha2Img} src={artigo.imagemHeader} alt={artigo.titulo} />}
                      <p className={styles.dataLinha}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <div className={styles.saveIcon}>
                        <FavoriteButton artigoId={artigo.id} size="small" />
                      </div>
                      <h4 className={styles.h4Linha}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                      <p className={styles.descriçãoLinha}>{truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}</p>
                      <div className={styles.CartegoriaLinha}>
                        {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                          <p key={at.tagId} className={styles.CartegoriaLinhaP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CRONOGRAMA */}
          <section className={styles.cronogramaCapilar}>
            <img className={styles.cronogramaCapilarImg} src="/images/artigo-geral/img cronograma capilar.png" alt="Mulher com cabelo cacheado" />
            <h5 className={styles.cronogramaCapilarH5}>Você já fez o seu cronograma capilar?</h5>
            <button className={styles.cronogramaCapilarButton}>
              <p className={styles.cronogramaCapilarButtonP}>CRONOGRAMA</p>
            </button>
          </section>

          {/* SEÇÃO 3 */}
          {ultimosArtigos.length > 0 && (
            <div className={styles.seção3}>
              <Link href={`/artigo/${ultimosArtigos[0]?.slug}`} className={styles.grupo6Seção3}>
                <p className={styles.datas3}>{formatDate(ultimosArtigos[0]?.criadoEm, ultimosArtigos[0]?.atualizadoEm)}</p>
                <div className={styles.grupo6SeçãoSvg}>
                  <FavoriteButton artigoId={ultimosArtigos[0]?.id} size="small" />
                </div>
                <h4 className={styles.grupo6SeçãoH4}>{truncateText(ultimosArtigos[0]?.titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>
                <div className={styles.CartegoriaG6}>
                  {ultimosArtigos[0]?.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaG6P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>

              <div className={styles.linha1}>
                {ultimosArtigos.slice(1, 3).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.grupo7}>
                    {artigo.imagemHeader && <img className={styles.grupo7Img} src={artigo.imagemHeader} alt={artigo.titulo} />}
                    <p className={styles.datag7}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <div className={styles.grupo7Svg}>
                      <FavoriteButton artigoId={artigo.id} size="small" />
                    </div>
                    <h4 className={styles.grupo7H4}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                    <div className={styles.CartegoriaG7}>
                      {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                        <p key={at.tagId} className={styles.CartegoriaG7P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {ultimosArtigos.length > 3 && (
                <div className={styles.linha2}>
                  {ultimosArtigos.slice(3, 5).map((artigo) => (
                    <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.grupo7}>
                      {artigo.imagemHeader && <img className={styles.grupo7Img} src={artigo.imagemHeader} alt={artigo.titulo} />}
                      <p className={styles.datag7}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <div className={styles.grupo7Svg}>
                        <FavoriteButton artigoId={artigo.id} size="small" />
                      </div>
                      <h4 className={styles.grupo7H4}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                      <div className={styles.CartegoriaG7}>
                        {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                          <p key={at.tagId} className={styles.CartegoriaG7P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}