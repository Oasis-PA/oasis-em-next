// src/app/artigos/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Artigo, Tag, ArtigoTag } from '@prisma/client';
import { Header, Footer } from "@/components";
import styles from '@/styles/artigo-geral.module.css';

// ===== FUNÇÕES DE TRUNCAMENTO PARA PROTEGER O LAYOUT =====
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
  // Se foi atualizado mais de 1 dia depois da criação, mostrar "Atualizado em"
  const diffInDays = Math.abs(new Date(atualizadoEm).getTime() - new Date(criadoEm).getTime()) / (1000 * 60 * 60 * 24);

  // usar mês abreviado (ex: jun, jan)
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

// ===== LIMITES RÍGIDOS PARA EXIBIÇÃO =====
const DISPLAY_LIMITS = {
  titulo: {
    card: 60,        // Título em cards pequenos
    destaque: 80,    // Título em cards grandes
    hero: 100        // Título em hero sections
  },
  resumo: {
    card: 120,       // Resumo em cards
    preview: 160     // Preview expandido
  },
  tags: {
    max: 3,          // Máximo de tags exibidas
    maxLength: 15    // Máximo de caracteres por tag
  }
};

export default async function ArtigosPage() {
  // Buscar artigos publicados ordenados por data de publicação
  let artigos: (Artigo & { ArtigoTag: (ArtigoTag & { Tag: Tag })[] })[] = [];

  try {
    artigos = await prisma.artigo.findMany({
      where: {
        status: 'publicado'
      },
      include: {
        ArtigoTag: {
          include: {
            Tag: true
          },
          take: DISPLAY_LIMITS.tags.max // Limitar tags na query
        }
      },
      orderBy: {
        dataPublicacao: 'desc'
      }
    });
  } catch (error) {
    // Se o banco não estiver acessível, retornar página vazia/fallback
    artigos = [];
  }

  // Separar artigos por seção
  const artigoMaisRecente = artigos[0];
  const segundoTerceiro = artigos.slice(1, 3);
  const quartoQuinto = artigos.slice(3, 5);
  const secaoDestaque = artigos.slice(5, 6)[0];
  const gruposQuadruplos = artigos.slice(6, 14); // 8 artigos (2 linhas de 4)
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

          {/* GRUPO 1 - Artigo Mais Recente (Hero) */}
          {artigoMaisRecente && (
            <Link href={`/artigo/${artigoMaisRecente.slug}`} className={styles.grupo1}>
              <svg className={styles.grupo1Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
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

          {/* GRUPOS 2 e 3 - Segundo e Terceiro Artigos */}
          {segundoTerceiro.map((artigo, index) => (
            <Link
              href={`/artigo/${artigo.slug}`}
              key={artigo.id}
              className={index === 0 ? styles.grupo2 : styles.grupo3}
            >
              <svg className={index === 0 ? styles.grupo2Svg : styles.grupo3Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              {artigo.imagemHeader && (
                <img className={index === 0 ? styles.grupo2Img : styles.grupo3Img} src={artigo.imagemHeader} alt={artigo.titulo} />
              )}
              <p className={styles.data}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
              <h4 className={index === 0 ? styles.grupo2H4 : styles.grupo3H4}>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
              <p className={styles.descrição}>
                {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
              </p>
              <div className={styles.CartegoriaLadodireito}>
                {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <p key={at.tagId} className={styles.CartegoriaLadodireitoP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                ))}
              </div>
            </Link>
          ))}

          {/* SEÇÃO - Artigo em Destaque */}
          {secaoDestaque && (
            <Link href={`/artigo/${secaoDestaque.slug}`} className={styles.seção}>
              <svg className={styles.sorriso} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
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
          
          {/* SEÇÃO 2 - Grade de 3 Artigos */}
          <div className={styles.seção2}>
            {/* GRUPO 4 - Artigo Esquerdo (389x469) */}
            {quartoQuinto[0] && (
              <Link href={`/artigo/${quartoQuinto[0].slug}`} key={quartoQuinto[0].id} className={styles.grupo4}>
                {quartoQuinto[0].imagemHeader && (
                  <img
                    className={styles.grupo4Img}
                    src={quartoQuinto[0].imagemHeader}
                    alt={quartoQuinto[0].titulo}
                    width={389}
                    height={469}
                  />
                )}
                <p className={styles.grupo4Data}>{formatDate(quartoQuinto[0].criadoEm, quartoQuinto[0].atualizadoEm)}</p>
                <svg className={styles.grupo4Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4 className={styles.grupo4H4}>{truncateText(quartoQuinto[0].titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className={styles.grupo4Descrição}>
                  {truncateText(quartoQuinto[0].resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                <div className={styles.CartegoriaS2}>
                  {quartoQuinto[0].ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}

            {/* GRUPO 5 - Artigo do Meio (718x469) */}
            {quartoQuinto[1] && (
              <Link href={`/artigo/${quartoQuinto[1].slug}`} key={quartoQuinto[1].id} className={styles.grupo5}>
              <p className={styles.grupo5Descrição}>
                  {truncateText(quartoQuinto[1].resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                 {quartoQuinto[1].imagemHeader && (
                  <img
                    className={styles.grupo5Img}
                    src={quartoQuinto[1].imagemHeader}
                    alt={quartoQuinto[1].titulo}
                    width={718}
                    height={469}
                  />
                )}
                <p className={styles.grupo5Data}>{formatDate(quartoQuinto[1].criadoEm, quartoQuinto[1].atualizadoEm)}</p>

                <svg className={styles.grupo5Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4 className={styles.grupo5H4}>{truncateText(quartoQuinto[1].titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>

                <div className={styles.CartegoriaS2Meio}>
                  {quartoQuinto[1].ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2MeioP}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}

            {/* GRUPO 6 - Artigo Direito (389x469) */}
            {artigoGrande && (
              <Link href={`/artigo/${artigoGrande.slug}`} key={artigoGrande.id} className={styles.grupo4}>
                {artigoGrande.imagemHeader && (
                  <img
                    className={styles.grupo6Img}
                    src={artigoGrande.imagemHeader}
                    alt={artigoGrande.titulo}
                    width={389}
                    height={469}
                  />
                )}
                <p className={styles.grupo6Data}>{formatDate(artigoGrande.criadoEm, artigoGrande.atualizadoEm)}</p>
                <svg className={styles.grupo6Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4 className={styles.grupo6H4}>{truncateText(artigoGrande.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className={styles.grupo6Descrição}>
                  {truncateText(artigoGrande.resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                <div className={styles.CartegoriaS2}>
                  {artigoGrande.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaS2P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>
            )}
            
          </div>
          
          <img className={styles.linha} src="/images/artigo-geral/linha.png" alt="" />

          {/* LINHAS DE ARTIGOS QUADRUPLOS */}
          {gruposQuadruplos.length > 0 && (
            <>
              <div className={styles.gruposLinha1}>
                {gruposQuadruplos.slice(0, 4).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.gruposLinha1Link}>
                    {artigo.imagemHeader && (
                      <img className={styles.gruposLinha1Img} src={artigo.imagemHeader} alt={artigo.titulo} />
                    )}
                    <p className={styles.dataLinha}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <svg className={styles.saveIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                      <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <h4 className={styles.h4Linha}>
                      {truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}
                    </h4>
                    <p className={styles.descriçãoLinha}>
                      {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
                    </p>
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
                      {artigo.imagemHeader && (
                        <img className={styles.gruposLinha2Img} src={artigo.imagemHeader} alt={artigo.titulo} />
                      )}
                      <p className={styles.dataLinha}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <svg className={styles.saveIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                        <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      <h4 className={styles.h4Linha}>
                        {truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}
                      </h4>
                      <p className={styles.descriçãoLinha}>
                        {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
                      </p>
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

          {/* SEÇÃO CRONOGRAMA CAPILAR */}
          <section className={styles.cronogramaCapilar}>
            <img className={styles.cronogramaCapilarImg} src="/images/artigo-geral/img cronograma capilar.png" alt="Mulher com cabelo cacheado" />
            <h5 className={styles.cronogramaCapilarH5}>Você já fez o seu cronograma capilar?</h5>
            <button className={styles.cronogramaCapilarButton}>
              <p className={styles.cronogramaCapilarButtonP}>CRONOGRAMA</p>
            </button>
          </section>

          {/* SEÇÃO 3 - Últimos Artigos em Layout Especial */}
          {ultimosArtigos.length > 0 && (
            <div className={styles.seção3}>
              <Link href={`/artigo/${ultimosArtigos[0]?.slug}`} className={styles.grupo6}>
                <p className={styles.datas3}>{formatDate(ultimosArtigos[0]?.criadoEm, ultimosArtigos[0]?.atualizadoEm)}</p>
                <svg className={styles.grupo6Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4 className={styles.grupo6H4}>{truncateText(ultimosArtigos[0]?.titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>
                <div className={styles.CartegoriaG6}>
                  {ultimosArtigos[0]?.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId} className={styles.CartegoriaG6P}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>

              <div className={styles.linha1}>
                {ultimosArtigos.slice(1, 3).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className={styles.grupo7}>
                    {artigo.imagemHeader && (
                      <img className={styles.grupo7Img} src={artigo.imagemHeader} alt={artigo.titulo} />
                    )}
                    <p className={styles.datag7}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <svg className={styles.grupo7Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                      <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
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
                      {artigo.imagemHeader && (
                        <img className={styles.grupo7Img} src={artigo.imagemHeader} alt={artigo.titulo} />
                      )}
                      <p className={styles.datag7}>{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <svg className={styles.grupo7Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                        <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
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