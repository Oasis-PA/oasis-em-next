"use client";

import { Header, Footer } from "@/components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import styles from "@/styles/favoritos.module.css";

// --- Interfaces ---
interface Artigo {
  id: number;
  titulo: string;
  slug: string;
  imagemHeader?: string;
  resumo?: string;
  dataPublicacao?: string;
}

interface FavoritoArtigo {
  id_favorito_artigo: number;
  data_favoritado: string;
  Artigo: Artigo;
}

interface Produto {
  id_produto: number;
  nome: string;
  qualidades?: string; 
  url_imagem: string | null; 
}

interface FavoritoProduto {
  id?: number; 
  id_favorito_produto?: number; 
  produto: Produto; 
}

const Favoritos: React.FC = () => {
  const [favoritos, setFavoritos] = useState<FavoritoArtigo[]>([]);
  const [produtosFavoritos, setProdutosFavoritos] = useState<FavoritoProduto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      setIsLoading(true);
      
      const [resArtigos, resProdutos] = await Promise.all([
        fetch('/api/favoritos/artigos', { credentials: 'include' }),
        fetch('/api/favoritos/produtos', { credentials: 'include' })
      ]);

      if (resArtigos.ok) {
        const dataArtigos = await resArtigos.json();
        setFavoritos(dataArtigos.favoritos || []);
      } else if (resArtigos.status === 401) {
        throw new Error('Você precisa estar logado para ver seus favoritos');
      }

      if (resProdutos.ok) {
        const dataProdutos = await resProdutos.json();
        setProdutosFavoritos(dataProdutos.favoritos || []);
      }

    } catch (err: any) {
      setError(err.message || 'Erro ao carregar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  const renderArticlesGrid = () => {
    return favoritos.map((favorito) => (
      <Link 
        key={`favorito-${favorito.id_favorito_artigo}`} 
        href={`/artigo/${favorito.Artigo.slug}`} 
        className={styles.articleCardWrapper}
      >
        <div
          className={styles.articleCard}
          style={{
            backgroundImage: favorito.Artigo.imagemHeader
              ? `url(${favorito.Artigo.imagemHeader})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <h1>{favorito.Artigo.titulo}</h1>
          <div className={styles.favoriteBtn}>
            <FavoriteButton
              artigoId={favorito.Artigo.id}
              initialIsFavorited={true}
              size="medium"
            />
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>

        <main className={styles.mainContainer}>
          <figure className={styles.heroSection}>
            <h1>Quais as tendências de 2025?</h1>
          </figure>

          <section className={styles.favoritesSection}>
            <h1 className={styles.favoritesTitle}>Favoritos</h1>
            <p className={styles.favoritesDescription}>
              Veja seus artigos favoritados sempre que quiser! Para sua compra,
              faremos a seleção das lojas com os preços mais em conta para o seu bolso.
            </p>

            <h1 className={styles.articlesTitle}>ARTIGOS</h1>

            {isLoading ? (
              <div className="loading-favoritos">
                <p>Carregando seus favoritos...</p>
              </div>
            ) : error ? (
              <div className={styles.errorFavoritos}>
  <p>{error}</p>
  <Link href="/login">
    <button className={styles.btnLoginFav}>Fazer Login</button>
  </Link>
</div>

            ) : (
              <>
                {favoritos.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem 2rem', 
                    marginBottom: '2rem',
                    fontFamily: "'Louis George Cafe', sans-serif",
                    background: 'rgba(114, 47, 83, 0.05)',
                    borderRadius: '12px',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                  }}>
                    <p style={{ fontSize: '1.3rem', fontWeight: '600', color: '#722F53', marginBottom: '0.8rem' }}>
                      Você ainda não tem artigos favoritados.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>
                      Explore nossos artigos e salve seus favoritos!
                    </p>
                  </div>
                ) : (
                  <>
                    <p style={{
                      fontFamily: "'Louis George Cafe', sans-serif",
                      fontSize: '1rem',
                      color: '#666',
                      marginBottom: '1.5rem',
                      marginLeft: 'clamp(0.8rem, 1.2vw + 0.5rem, 1.2rem)'
                    }}>
                      {favoritos.length} {favoritos.length === 1 ? 'artigo favoritado' : 'artigos favoritados'}
                    </p>
                    <section className={styles.articlesGrid}>
                      {renderArticlesGrid()}
                    </section>
                  </>
                )}
              </>
            )}
          </section>
        </main>

        <section className={styles.highlightArticle}>
          <div className={styles.highlightContent}>
            <h1>Ácido hialurônico</h1>
            <h4>DESCUBRA SOBRE O QUERIDINHO DA INTERNET</h4>
            <button className={styles.knowMoreBtn}>
              <Link href='/artigo/acido-hialuronico'>CONHEÇA</Link>
            </button>
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <Link href='/alimentacao' className={styles.categoryItem}>
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </Link>
          <Link href='/cronograma-capilar' className={styles.categoryItem}>
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </Link>
          <Link href='/tinturas' className={styles.categoryItem}>
            <img src="/images/skincare/categ3.png" alt="TINTURAS" />
            <h2>TINTURAS</h2>
          </Link>
          <Link href='/produtos' className={styles.categoryItem}>
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </Link>
          <Link href='/infantil' className={styles.categoryItem}>
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </Link>
          <Link href='/tendencias' className={styles.categoryItem}>
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </Link>
        </section>

        <section className={styles.brownCardsSection}>
          {produtosFavoritos.length > 0 ? (
            produtosFavoritos.slice(0, 3).map((favProd, index) => (
              <div key={`brown-${favProd.produto?.id_produto || index}`} className={styles.brownCard}>
                <div style={{ position: 'relative' }}>
                  <img 
                    className={styles.brownCardImage} 
                    src={favProd.produto?.url_imagem || "/images/favoritos/imagem-produto-salvo.png"} 
                    alt={favProd.produto?.nome || "Produto"} 
                  />
                  <div style={{ position: 'absolute', top: '-10px', right: '3px', zIndex: 10 }}>
                    <FavoriteButton
                      produtoId={favProd.produto?.id_produto}
                      initialIsFavorited={true}
                      size="medium"
                    />
                  </div>
                </div>
                <div className={styles.brownCardContent}>
                  <h1>{favProd.produto?.nome}</h1>
                  <p>{favProd.produto?.qualidades || "Sem qualidades disponíveis."}</p>
                  {favProd.produto?.id_produto && (
                    <Link href={`/produtos/${favProd.produto.id_produto}`}>
                      <button className={styles.brownCardButton}>CONHEÇA</button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className={styles.brownCard}>
                <img className={styles.brownCardImage} src="/images/favoritos/imagem-produto-salvo.png" alt="" />
                <div className={styles.brownCardContent}>
                  <img className={styles.brownCardIcon} src="/images/favoritos/fav.svg" alt="" />
                  <h1>PRODUTO EXEMPLO</h1>
                  <p>Descrição do produto exemplo.</p>
                  <button className={styles.brownCardButton}>CONHEÇA</button>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Seção Salvos Recentemente - COM SCROLL */}
        <section className={styles.savedSectionWrapper}>
          <h1 className={styles.savedTitle}>Salvos Recentemente</h1>
          
          <div className={styles.savedCardsContainer}>
            {produtosFavoritos.length > 0 ? (
              produtosFavoritos.map((favProd, index) => (
                <div 
                  key={`recent-${favProd.produto?.id_produto || index}`} 
                  className={styles.savedCard}
                  style={{ position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <FavoriteButton
                      produtoId={favProd.produto?.id_produto}
                      initialIsFavorited={true}
                      size="small"
                    />
                  </div>
                  <img 
                    className={styles.prodImage} 
                    src={favProd.produto?.url_imagem || "/images/favoritos/imagem-produto.png"} 
                    alt={favProd.produto?.nome || "Produto"} 
                  />
                  <h1>{favProd.produto?.nome?.toUpperCase()}</h1>
                  <p>{favProd.produto?.qualidades || "Sem informações."}</p>
                </div>
              ))
            ) : (
              <div className={styles.savedCard}>
                 <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
                 <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
                 <h1>SEM FAVORITOS</h1>
                 <p>Seus produtos recentes aparecerão aqui.</p>
              </div>
            )}
          </div>
          
          <img className={styles.goldenImage} src="/images/favoritos/imagem-dourada.png" alt="imagem-dourada" />
        </section>

        <section className={styles.moreProductsSection}>
          <h1 className={styles.moreProductsTitle}>MAIS PRODUTOS</h1>
          <div className={styles.moreProductsContainer}>
            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>
            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>
            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>
            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mosaicGrid}>
          <Link href='/artigo/10-tons-fantasticos' className={`${styles.mosaicItem} ${styles.mosaicPos1} ${styles.mosaicBg1}`}>
            <h1>10 tons fantásticos para sair do básico</h1>
          </Link>
          <Link href='/artigo/nago-colorida' className={`${styles.mosaicItem} ${styles.mosaicPos2} ${styles.mosaicBg2}`}>
            <h1>Nago colorida: 15 estilos diferentes</h1>
          </Link>
          <Link href='/artigo/produtos-indispensaveis' className={`${styles.mosaicItem} ${styles.mosaicPos3} ${styles.mosaicBg3}`}>
            <h1>Produtos indispensáveis para cabelos pintados</h1>
          </Link>
          <Link href='/artigo/oleo-de-rosa-mosqueta' className={`${styles.mosaicItem} ${styles.mosaicPos4} ${styles.mosaicBg4}`}>
            <h1>Benefícios do Óleo de Rosa Mosqueta</h1>
          </Link>
          <Link href='/artigo/diferenca-de-geracoes' className={`${styles.mosaicItem} ${styles.mosaicPos5} ${styles.mosaicBg5}`}>
            <h1>Diferença de gerações</h1>
          </Link>
        </section>

      </div>
      <Footer />
    </>
  );
}

export default Favoritos;