"use client";

import {Header, Footer} from "@/components";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/skincare.module.css";

interface Produto {
  id_produto: number;
  nome: string;
  url_loja: string | null;
  url_imagem: string | null;
  tag_principal: string;
  id_tag: number | null;
}

export default function Skincare() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // Buscar produtos do banco
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('/api/produtos?limit=9');
        const data = await response.json();
        
        if (data.produtos) {
          setProdutos(data.produtos);
        } else {
          setProdutos([]);
        }
      } catch (error) {
        setProdutos([]);
      } finally {
        setLoadingProdutos(false);
      }
    };

    fetchProdutos();
  }, []);

  // Dividir produtos em 3 grupos de 3
  const primeiroGrupo = produtos.slice(0, 3);
  const segundoGrupo = produtos.slice(3, 6);
  const terceiroGrupo = produtos.slice(6, 9);

  return (
    <>
     <Header className={styles.headerTransparente}/>
    <div className={styles.wrapper}>

   
    <section className={styles.sectionHeader}>
      <h1>SKIN</h1>
      <h2>CARE</h2>
    </section>
    
    <main>
      <section className={styles.s1}>
        <h1>Skincare com Propósito: Cuidar de Todos os Tons de Beleza</h1>
      </section>
      <div className={styles.tons}></div>

      {/* SEÇÃO 2 - CATEGORIAS LINKADAS */}
      <section className={styles.s2}>
          <Link href="/alimentacao" className={styles.categ}>
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </Link>

          <Link href="/cronograma-capilar" className={styles.categ}>
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </Link>

          <Link href="/tinturas" className={styles.categ}>
            <img src="/images/skincare/categ3.png" alt="TINTURAS" />
            <h2>TINTURAS</h2>
          </Link>

          <Link href="/produtos" className={styles.categ}>
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </Link>

          <Link href="/infantil" className={styles.categ}>
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </Link>

          <Link href="/tendencias" className={styles.categ}>
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </Link>
      </section>
      
      <section className={styles.s3}>
        <div className={styles.artigos}>
            <img className={styles.artigo1} src="images/link-artigos/alimentacao-e-beleza.jpg" alt="" />
            <div className={styles.contArtigo}>
              <h1>Alimentação e beleza: nutrientes que fazem diferença</h1>
              <p>Quer uma beleza que vem de dentro? Descubra quais nutrientes transformam
                sua pele, cabelo e unhas! A alimentação certa faz toda diferença. Clique
                e aprenda a se alimentar para brilhar de saúde e beleza!</p>
              <button><Link href='artigo/alimentacao-e-beleza'>CONHEÇA</Link></button>
            </div>
        </div>

        <div className={styles.artigo2}>
            <div className={styles.contArtigo}>
              <h1>Rotina de skincare para peles negras</h1>
              <p>Quer uma pele radiante e saudável? Descubra a rotina de skincare
                perfeita para peles negras! Produtos e cuidados especiais que realçam
                sua beleza natural. Clique e transforme sua pele!
              </p>
              <button><Link href='artigo/rotina-de-skincare-peles-negras'>CONHEÇA</Link></button>
            </div>
            <img src="images/link-artigos/rotina-de-skincare-peles-negras.jpg" alt="" />
        </div>

        <div className={styles.artigos}>
            <img src="images/link-artigos/oleos-vegetais-pele-seca.jpg" alt="" />
            <div className={styles.contArtigo}>
              <h1>Melhores óleos vegetais para pele seca</h1>
              <p>Sua pele está ressecada e sem vida? Descubra os melhores óleos vegetais que vão
                hidratar profundamente e deixar sua pele macia e radiante! Clique e conheça os segredos
                da hidratação natural!</p>
              <button><Link href='artigo/oleos-vegetais-pele-seca'>CONHEÇA</Link></button>
            </div>
        </div>
      </section>

      <section className={styles.s4}>
        <div className={styles.linhatexto1}>
            <h1>Produtos recomendados</h1>
            <div className={styles.linha}></div>
        </div>

        {loadingProdutos ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <p>Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <>
            {/* PRIMEIRO GRUPO - 3 PRODUTOS + MAIS AMADOS */}
            <div className={styles.produtos}>
              {primeiroGrupo.map((produto) => (
                <div className={styles.prod1} key={produto.id_produto}>
                  <img
                    src={produto.url_imagem || "/images/infantil/produto.png"}
                    alt={produto.nome}
                  />
                  <h5>{produto.tag_principal || 'Produto de beleza'}</h5>
                  <h4>{produto.nome}</h4>
                  <button>
                    <Link href={`/produtos/${produto.id_produto}`}>
                      Veja mais
                    </Link>
                  </button>
                </div>
              ))}
                              <div className={`${styles.imagemProduto} ${styles.prod1Bg}`}>                <h1>mais amados</h1>
              </div>
            </div>

            {/* SEGUNDO GRUPO - OPÇÃO ACESSÍVEL + 3 PRODUTOS */}
            <div className={styles.produtos}>
              <div className={`${styles.imagemProduto} ${styles.prod2Bg}`}>
                <h1>opção acessível</h1>
              </div>
              {segundoGrupo.map((produto) => (
                <div className={styles.prod1} key={produto.id_produto}>
                  <img
                    src={produto.url_imagem || "/images/infantil/produto.png"}
                    alt={produto.nome}
                  />
                  <h5>{produto.tag_principal || 'Produto de beleza'}</h5>
                  <h4>{produto.nome}</h4>
                  <button>
                    <Link href={produto.url_loja || `/produto/${produto.id_produto}`}>
                      Veja mais
                    </Link>
                  </button>
                </div>
              ))}
            </div>

            {/* TERCEIRO GRUPO - 3 PRODUTOS + NATURAL/VEGANO */}
            <div className={styles.produtos}>
              {terceiroGrupo.map((produto) => (
                <div className={styles.prod1} key={produto.id_produto}>
                  <img
                    src={produto.url_imagem || "/images/infantil/produto.png"}
                    alt={produto.nome}
                  />
                  <h5>{produto.tag_principal || 'Produto de beleza'}</h5>
                  <h4>{produto.nome}</h4>
                  <button>
                    <Link href={produto.url_loja || `/produto/${produto.id_produto}`}>
                      Veja mais
                    </Link>
                  </button>
                </div>
              ))}
              <div className={`${styles.imagemProduto} ${styles.prod3Bg}`}>
                <h1>natural/<br></br>vegano</h1>
              </div>
            </div>
          </>
        )}

        <div className={styles.linhatexto2}>
            <div className={styles.linha}></div>
            <h1>Dicas rápidas para você</h1>
        </div>
    </section>

    <section className={styles.s5}>
        <div className={styles.dicas}>
          <div className={styles.card}>
            <h1>Protetor solar é essencial</h1>
            <p>A pele precisa de proteção diária contra manchas e envelhecimento precoce.</p>
            <div className={styles.numphoto}>
              <h1>01</h1>
              <img src="images/skincare/numphoto (3).png" alt="" />
            </div>
          </div>

          <div className={styles.card}>
            <h1>Hidrate logo após o banho</h1>
            <p>Isso ajuda a reter a umidade e manter a pele macia.</p>
            <div className={styles.numphoto}>
              <h1>02</h1>
              <img src="images/skincare/numphoto (4).png" alt="" />
            </div>
          </div>

          <div className={styles.card}>
            <h1>Evite sabonetes  agressivos</h1>
            <p>Prefira fórmulas suaves que não ressequem a pele.</p>
            <div className={styles.numphoto}>
              <h1>03</h1>
              <img src="images/skincare/numphoto (5).png" alt="" />
            </div>
          </div>

          <div className={styles.card}>
            <h1>antioxidantes na rotina</h1>
            <p>Vitamina C, por exemplo, ajuda a uniformizar o tom da pele.</p>
            <div className={styles.numphoto}>
              <h1>04</h1>
              <img src="images/skincare/numphoto (2).png" alt="" />
            </div>
          </div>

          <div className={styles.card}>
            <h1>Esfolie com moderação</h1>
            <p>Uma vez por semana já ajuda a renovar sem agredir.</p>
            <div className={styles.numphoto}>
              <h1>05</h1>
              <img src="images/skincare/numphoto (1).png" alt="" />
            </div>
          </div>
        </div>
    </section>

    <section className={styles.imagemPerfume}></section>
    </main>
    </div>
    <Footer/>
    </>
  );
}