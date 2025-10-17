"use client";

import {Header, Footer} from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

import "@/styles/favoritos.css";

const Favoritos: React.FC = () => {
  return (
    <>
      <Header/>
      <main>
        <figure id="imagens-artigos">
            <h1>Quais as tendências de 2025?</h1>
        </figure>

        <section id="section-favoritos">
            <h1 id="h1-favoritos">Favoritos</h1>
            <p id="p1">Veja seus artigos favoritados e produtos salvos sempre que quiser! Para sua compra, faremos a seleção das lojas com os preços mais em conta para o seu bolso.</p>
            <h1 id="h1-artigos">ARTIGOS</h1>
            <section id="section-imagens-artigos">
                <Link href="#">
                    <div id="artigo1">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo2">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo3">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo4">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo5">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo6">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo7">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo8">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
                <Link href="#">
                    <div id="artigo9">
                        <h1>ARTIGO AQUI</h1>
                    </div>
                </Link>
            </section>
        </section>
    </main>

    <section id="section-artigo">
        <div>
            <h1>Ácido hialuronico</h1>
            <h4>DESCUBRA SOBRE O QUERIDINHO DA INTERNET</h4>
            <button id="button-conheca">CONHEÇA</button>
        </div>
    </section>

    <section id="section-artigos">
        <div className="categ">
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ3.png" alt="HAIR-CARE" />
            <h2>HAIR-CARE</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </div>
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
        <div id="artigo1-s2" className="artigo-s2-item">
            <h1>COLEÇÃO VERÃO FARM 2025</h1>
        </div>

        <div id="artigo2-s2" className="artigo-s2-item">
            <h1>COLEÇÃO VERÃO FARM 2025</h1>
        </div>

        <div id="artigo3-s2" className="artigo-s2-item">
            <h1>COLEÇÃO VERÃO FARM 2025</h1>
        </div>
        <div id="artigo4-s2" className="artigo-s2-item">
            <h1>COLEÇÃO VERÃO FARM 2025</h1>
        </div>

        <div id="artigo5-s2" className="artigo-s2-item">
            <h1>COLEÇÃO VERÃO FARM 2025</h1>
        </div>
    </section>
    <Footer/>
    </>
  );
}

export default Favoritos;