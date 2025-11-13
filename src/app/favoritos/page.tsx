"use client";

import { Header, Footer } from "@/components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import "@/styles/favoritos.css";

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

  // Remove o array artigosGrid, não é mais necessário

  // Cria array de 9 posições mesclando favoritos com cards vazios
  const artigosGrid = Array.from({ length: 9 }, (_, index) => 
    favoritos[index] || null
  );

  return (
    <>
      <Header />
      <main>
        <figure id="imagens-artigos">
          <h1>Quais as tendências de 2025?</h1>
        </figure>

        <section id="section-favoritos">
          <h1 id="h1-favoritos">Favoritos</h1>
          <p id="p1">
            Veja seus artigos favoritados sempre que quiser! Para sua compra, 
            faremos a seleção das lojas com os preços mais em conta para o seu bolso.
          </p>
          
          <h1 id="h1-artigos">ARTIGOS</h1>
          
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
            <section id="section-imagens-artigos">
              {artigosGrid.map((favorito, index) => (
                favorito ? (
                  // Card com artigo favoritado - MESMA estrutura
                  <Link key={index} href={`/artigo/${favorito.Artigo.slug}`}>
                    <div 
                      id={`artigo${index + 1}`}
                      style={{
                        backgroundImage: favorito.Artigo.imagemHeader 
                          ? `url(${favorito.Artigo.imagemHeader})` 
                          : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <h1>{favorito.Artigo.titulo}</h1>
                      <div className="favorite-btn-original">
                        <FavoriteButton 
                          artigoId={favorito.Artigo.id}
                          initialIsFavorited={true}
                          size="medium"
                        />
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Card vazio - estrutura IDÊNTICA ao original
                  <Link key={index} href="#">
                    <div id={`artigo${index + 1}`}>
                      <h1>ARTIGO AQUI</h1>
                    </div>
                  </Link>
                )
              ))}
            </section>
          )}
        </section>
      </main>

      <section id="section-artigo">
        <div>
          <h1>Ácido hialurônico</h1>
          <h4>DESCUBRA SOBRE O QUERIDINHO DA INTERNET</h4>
          <button id="button-conheca">
            <Link href='/artigo/acido-hialuronico'>CONHEÇA</Link>
          </button>
        </div>
      </section>

      <section id="section-artigos">
        <Link href='/alimentacao'>
          <div className="categ">
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </div>
        </Link>

        <Link href='/cronograma-capilar'>
          <div className="categ">
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </div>
        </Link>

        <Link href='/haircare'>
          <div className="categ">
            <img src="/images/skincare/categ3.png" alt="HAIR-CARE" />
            <h2>HAIR-CARE</h2>
          </div>
        </Link>

        <Link href='/produtos'>
          <div className="categ">
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </div>
        </Link>

        <Link href='/infantil'>
          <div className="categ">
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </div>
        </Link>

        <Link href='/tendencias'>
          <div className="categ">
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </div>
        </Link>
      </section>

      <section id="section-imagem-marrom">
        <div className="card-marrom">
          <img id="img-marrom" src="/images/favoritos/imagem-produto-salvo.png" alt="" />
          <div className="card-marrom-content">
            <img src="/images/favoritos/fav.svg" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <button>CONHEÇA</button>
          </div>
        </div>

        <div className="card-marrom">
          <img id="img-marrom" src="/images/favoritos/imagem-produto-salvo.png" alt="" />
          <div className="card-marrom-content">
            <img src="/images/favoritos/fav.svg" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <button>CONHEÇA</button>
          </div>
        </div>

        <div className="card-marrom">
          <img id="img-marrom" src="/images/favoritos/imagem-produto-salvo.png" alt="" />
          <div className="card-marrom-content">
            <img src="/images/favoritos/fav.svg" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <button>CONHEÇA</button>
          </div>
        </div>
      </section>

      <section id="section-salvos-recen">
        <h1 id="h1-salvos">Salvos Recentemente</h1>
        <div id="section-salvos">
          <Link href="#"><img src="/images/favoritos/seta-esquerda.svg" alt="seta" width="16px" height="30px" /></Link>
          <div className="card-salvo">
            <img id="img-fav" src="/images/favoritos/fav2.svg" alt="" />
            <img id="img-prod" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
          </div>

          <div className="card-salvo">
            <img id="img-fav" src="/images/favoritos/fav2.svg" alt="" />
            <img id="img-prod" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
          </div>

          <div className="card-salvo">
            <img id="img-fav" src="/images/favoritos/fav2.svg" alt="" />
            <img id="img-prod" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
          </div>

          <div className="card-salvo">
            <img id="img-fav" src="/images/favoritos/fav2.svg" alt="" />
            <img id="img-prod" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
          </div>
          <div className="card-salvo">
            <img id="img-fav" src="/images/favoritos/fav2.svg" alt="" />
            <img id="img-prod" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
          </div>
          <Link href="#"><img src="/images/favoritos/seta-direita.svg" alt="seta" width="16px" height="30px" /></Link>
        </div>
        <Link href="#">
          <p id="p3">Veja lista completa</p>
        </Link>
        <img id="img-dourada" src="/images/favoritos/imagem-dourada.png" alt="imagem-dourada" />
      </section>

      <section id="section-maisprodutos">
        <h1 id="h1-maisprodutos">MAIS PRODUTOS</h1>
        <div id="container-maisprodutos">
          <div className="card-maisprodutos">
            <img id="img-produto" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <div>
              <h2>Vá para compra</h2>
              <img src="/images/favoritos/seta.svg" alt="" />
            </div>
          </div>

          <div className="card-maisprodutos">
            <img id="img-produto" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <div>
              <h2>Vá para compra</h2>
              <img src="/images/favoritos/seta.svg" alt="" />
            </div>
          </div>

          <div className="card-maisprodutos">
            <img id="img-produto" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <div>
              <h2>Vá para compra</h2>
              <img src="/images/favoritos/seta.svg" alt="" />
            </div>
          </div>

          <div className="card-maisprodutos">
            <img id="img-produto" src="/images/favoritos/imagem-produto.png" alt="" />
            <h1>PRODUTO TAL</h1>
            <p>Esse é o produto tal, que faz tal coisa e tem tal função, visando tal efeito.</p>
            <div>
              <h2>Vá para compra</h2>
              <img src="/images/favoritos/seta.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="section-artigos-s2">
        <Link href='/artigo/10-tons-fantasticos'>
          <div id="artigo1-s2" className="artigo-s2-item">
            <h1>10 tons fantásticos para sair do básico</h1>
          </div>
        </Link>

        <Link href='/artigo/nago-colorida'>
          <div id="artigo2-s2" className="artigo-s2-item">
            <h1>Nago colorida: 15 estilos diferentes</h1>
          </div>
        </Link>

        <Link href='/artigo/produtos-indispensaveis'>
          <div id="artigo3-s2" className="artigo-s2-item">
            <h1>Produtos indispensáveis para cabelos pintados</h1>
          </div>
        </Link>

        <Link href='/artigo/oleo-de-rosa-mosqueta'>
          <div id="artigo4-s2" className="artigo-s2-item">
            <h1>Benefícios do Óleo de Rosa Mosqueta</h1>
          </div>
        </Link>

        <Link href='/artigo/diferenca-de-geracoes'>
          <div id="artigo5-s2" className="artigo-s2-item">
            <h1>Diferença de gerações</h1>
          </div>
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Favoritos;