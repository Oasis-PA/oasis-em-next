"use client";

import { Header, Footer } from "@/components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
// Importação correta do CSS Module como objeto 'styles'
import styles from "@/styles/favoritos.module.css";

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

const Favoritos: React.FC = () => {
  const [favoritos, setFavoritos] = useState<FavoritoArtigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/favoritos/artigos', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setFavoritos(data.favoritos);
      } else if (response.status === 401) {
        setError('Você precisa estar logado para ver seus favoritos');
      } else {
        setError('Erro ao carregar favoritos');
      }
    } catch (err) {
      setError('Erro ao carregar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  // Cria array de 9 posições mesclando favoritos com cards vazios
  const artigosGrid = Array.from({ length: 9 }, (_, index) =>
    favoritos[index] || null
  );

  return (
    <>
      <Header />
      {/* Wrapper principal com o reset de box-sizing */}
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
              <div className="error-favoritos">
                <p>{error}</p>
                <Link href="/login">
                  <button className="btn-login-fav">Fazer Login</button>
                </Link>
              </div>
            ) : (
              <section className={styles.articlesGrid}>
                {artigosGrid.map((favorito, index) => (
                  favorito ? (
                    // Card PREENCHIDO com artigo
                    <Link key={index} href={`/artigo/${favorito.Artigo.slug}`} className={styles.articleCardWrapper}>
                      <div
                        className={styles.articleCard}
                        style={{
                          backgroundImage: favorito.Artigo.imagemHeader
                            ? `url(${favorito.Artigo.imagemHeader})`
                            : 'none',
                          // BackgroundSize e Position já estão na classe .articleCard,
                          // mas mantemos aqui caso a imagem venha inline de forma diferente
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
                  ) : (
                    // Card VAZIO (Placeholder)
                    // Usamos a sintaxe styles['bgArticle1'] para acessar classes dinâmicas
                    <Link key={index} href="#" className={styles.articleCardWrapper}>
                      <div className={`${styles.articleCard} ${styles[`bgArticle${index + 1}`]}`}>
                        <h1>ARTIGO AQUI</h1>
                      </div>
                    </Link>
                  )
                ))}
              </section>
            )}
          </section>
        </main>

        {/* Seção Artigo Destaque */}
        <section className={styles.highlightArticle}>
          <div className={styles.highlightContent}>
            <h1>Ácido hialurônico</h1>
            <h4>DESCUBRA SOBRE O QUERIDINHO DA INTERNET</h4>
            <button className={styles.knowMoreBtn}>
              <Link href='/artigo/acido-hialuronico'>CONHEÇA</Link>
            </button>
          </div>
        </section>

        {/* Seção Categorias */}
        <section className={styles.categoriesSection}>
          <Link href='/alimentacao' className={styles.categoryItem}>
              <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
              <h2>ALIMENTAÇÃO</h2>
          </Link>

          <Link href='/cronograma-capilar' className={styles.categoryItem}>
              <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
              <h2>CRONOGRAMA</h2>
          </Link>

          <Link href='/haircare' className={styles.categoryItem}>
              <img src="/images/skincare/categ3.png" alt="HAIR-CARE" />
              <h2>HAIR-CARE</h2>
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

        {/* Seção Cards Marrons */}
        <section className={styles.brownCardsSection}>
          <div className={styles.brownCard}>
            <img className={styles.brownCardImage} src="/images/favoritos/imagem-produto-salvo.png" alt="" />
            <div className={styles.brownCardContent}>
              <img className={styles.brownCardIcon} src="/images/favoritos/fav.svg" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <button className={styles.brownCardButton}>CONHEÇA</button>
            </div>
          </div>

          <div className={styles.brownCard}>
            <img className={styles.brownCardImage} src="/images/favoritos/imagem-produto-salvo.png" alt="" />
            <div className={styles.brownCardContent}>
              <img className={styles.brownCardIcon} src="/images/favoritos/fav.svg" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <button className={styles.brownCardButton}>CONHEÇA</button>
            </div>
          </div>

          <div className={styles.brownCard}>
            <img className={styles.brownCardImage} src="/images/favoritos/imagem-produto-salvo.png" alt="" />
            <div className={styles.brownCardContent}>
              <img className={styles.brownCardIcon} src="/images/favoritos/fav.svg" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <button className={styles.brownCardButton}>CONHEÇA</button>
            </div>
          </div>
        </section>

        {/* Seção Salvos Recentemente */}
        <section className={styles.savedSectionWrapper}>
          <h1 className={styles.savedTitle}>Salvos Recentemente</h1>
          <div className={styles.savedCardsContainer}>
            <Link href="#"><img src="/images/favoritos/seta-esquerda.svg" alt="seta" width="16px" height="30px" /></Link>

            {/* Exemplo de repetição manual mantido do original */}
            <div className={styles.savedCard}>
              <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
              <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            </div>

            <div className={styles.savedCard}>
              <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
              <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            </div>

            <div className={styles.savedCard}>
              <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
              <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            </div>

            <div className={styles.savedCard}>
              <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
              <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            </div>

            <div className={styles.savedCard}>
              <img className={styles.favIcon} src="/images/favoritos/fav2.svg" alt="" />
              <img className={styles.prodImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            </div>

            <Link href="#"><img src="/images/favoritos/seta-direita.svg" alt="seta" width="16px" height="30px" /></Link>
          </div>
          <Link href="#">
            <p className={styles.seeMoreLink}>Veja lista completa</p>
          </Link>
          <img className={styles.goldenImage} src="/images/favoritos/imagem-dourada.png" alt="imagem-dourada" />
        </section>

        {/* Seção Mais Produtos */}
        <section className={styles.moreProductsSection}>
          <h1 className={styles.moreProductsTitle}>MAIS PRODUTOS</h1>
          <div className={styles.moreProductsContainer}>

            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>

            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>

            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>

            <div className={styles.moreProductsCard}>
              <img className={styles.productImage} src="/images/favoritos/imagem-produto.png" alt="" />
              <h1>PRODUTO TAL</h1>
              <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
              <div className={styles.cardActionArea}>
                <h2>Vá para compra</h2>
                <img src="/images/favoritos/seta.svg" alt="" />
              </div>
            </div>

          </div>
        </section>

        {/* Seção Mosaico Final */}
        <section className={styles.mosaicGrid}>
  {/* Item 1 (Já estava correto) */}
  <Link 
    href='/artigo/10-tons-fantasticos' 
    className={`${styles.mosaicItem} ${styles.mosaicPos1} ${styles.mosaicBg1}`}
  >
    <h1>10 tons fantásticos para sair do básico</h1>
  </Link>

  {/* Item 2 (Corrigido) */}
  <Link 
    href='/artigo/nago-colorida' 
    className={`${styles.mosaicItem} ${styles.mosaicPos2} ${styles.mosaicBg2}`}
  >
    <h1>Nago colorida: 15 estilos diferentes</h1>
  </Link>

  {/* Item 3 (Corrigido) */}
  <Link 
    href='/artigo/produtos-indispensaveis' 
    className={`${styles.mosaicItem} ${styles.mosaicPos3} ${styles.mosaicBg3}`}
  >
    <h1>Produtos indispensáveis para cabelos pintados</h1>
  </Link>

  {/* Item 4 (Corrigido) */}
  <Link 
    href='/artigo/oleo-de-rosa-mosqueta' 
    className={`${styles.mosaicItem} ${styles.mosaicPos4} ${styles.mosaicBg4}`}
  >
    <h1>Benefícios do Óleo de Rosa Mosqueta</h1>
  </Link>

  {/* Item 5 (Corrigido) */}
  <Link 
    href='/artigo/diferenca-de-geracoes' 
    className={`${styles.mosaicItem} ${styles.mosaicPos5} ${styles.mosaicBg5}`}
  >
    <h1>Diferença de gerações</h1>
  </Link>
</section>

      </div>
      <Footer />
    </>
  );
}

export default Favoritos;
