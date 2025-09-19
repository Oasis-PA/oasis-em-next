import React from 'react';
import Link from 'next/link'; // Usando Link para navegação otimizada no Next.js
import Script from 'next/script'; // Usando Script para carregar JS de forma otimizada
import image from 'next/image'; // Usando Image para otimização de imagens
// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/favoritos.css';

const FavoritosPage: React.FC = () => {
  return (
    <>
      <main>
        <figure id="imagens-artigos">
          <img src="/images/favoritos/imagem-principal (1).png" alt="tendências 2025" />
        </figure>
        
        <section id="section-favoritos">
          <h1 id="h1-favoritos">Favoritos</h1>
          <p id="p1">Veja seus artigos favoritados e produtos salvos sempre que quiser! Para sua compra, faremos a seleção das lojas com os preços mais em conta para o seu bolso.</p>
          <h1 id="h1-artigos">ARTIGOS</h1>
          <section id="section-imagens-artigos">
            <Link href="#"><img src="/images/favoritos/imagem-artigo (2).png" alt="imagem-artigo1" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo (1).png" alt="imagem-artigo2" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo (3).png" alt="imagem-artigo3" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
            <Link href="#"><img src="/images/favoritos/imagem-artigo cinza.png" alt="imagem-artigo-cinza" /></Link>
          </section>
          <p id="p2">Veja lista completa</p>
        </section>
      </main>

      <section id="section-artigo">
        <div>
          <img src="/images/favoritos/imagem-artigo.png" alt="artigo-ácido-hialurônico" />
          <Link href="#"><button id="button-conheca">CONHEÇA</button></Link>
        </div>
      </section>
      
      <section id="section-artigos">
        <Link href="#"><img src="/images/favoritos/imagem-moda.png" alt="artigo-moda" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-marca.png" alt="artigo-marca" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-autoestima.png" alt="artigo-autoestima" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-tutoriais.png" alt="artigo-tutoriais" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-infantil.png" alt="artigo-infantil" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-novidades.png" alt="artigo-novidades" /></Link>
      </section>

      <section id="section-imagem-marrom">
        <img src="/images/favoritos/imagem-marrom.png" alt="imagem-marrom" />
        <button id="button-conheca1">CONHEÇA</button>
        <img src="/images/favoritos/imagem-marrom.png" alt="imagem-marrom" />
        <button id="button-conheca2">CONHEÇA</button>
        <img src="/images/favoritos/imagem-marrom.png" alt="imagem-marrom" />
        <button id="button-conheca3">CONHEÇA</button>
      </section>

      <section>
        <h1 id="h1-salvos">Salvos Recentemente</h1>
        <div id="section-salvos">
          <Link href="#"><img src="/images/seta esquerda.png" alt="seta" width="16px" height="30px" /></Link>
          <img src="/images/favoritos/imagem-produto.png" alt="imagem-produto" />
          <img src="/images/favoritos/imagem-produto.png" alt="imagem-produto" />
          <img src="/images/favoritos/imagem-produto.png" alt="imagem-produto" />
          <img src="/images/favoritos/imagem-produto.png" alt="imagem-produto" />
          <Link href="#"><img src="/images/seta direita.png" alt="seta" width="16px" height="30px" /></Link>
        </div>
        <p id="p3">Veja lista completa</p>
        <img src="/images/favoritos/imagem-dourada.png" alt="imagem-dourada" />
      </section>

      <section id="section-maisprodutos">
        <h1 id="h1-maisprodutos">MAIS PRODUTOS</h1>
        <div>
          <Link href="#"><img src="/images/favoritos/imagem-maisprodutos.png" alt="maisprodutos" /></Link>
          <Link href="#"><img src="/images/favoritos/imagem-maisprodutos.png" alt="maisprodutos" /></Link>
          <Link href="#"><img src="/images/favoritos/imagem-maisprodutos.png" alt="maisprodutos" /></Link>
          <Link href="#"><img src="/images/favoritos/imagem-maisprodutos.png" alt="maisprodutos" /></Link>
        </div>
      </section>

      <section id="section-farm">
        <Link href="#"><img src="/images/favoritos/imagem-farm 1.png" alt="imagem-farm 1" /></Link>
        <Link href="#"><img src="/images/favoritos/imagem-farm 2.png" alt="imagem-farm 2" /></Link>
        <Link href="#" id="foto1"><img src="/images/favoritos/imagem-farm 3.png" alt="imagem-farm 3" /></Link>
        <Link href="#" id="foto2"><img src="/images/favoritos/imagem-farm 4.png" alt="imagem-farm 4" /></Link>
        <Link href="#" id="foto3"><img src="/images/favoritos/imagem-farm 5.png" alt="imagem-farm 5" id="foto-larga" /></Link>
      </section>

      {/* Carrega o script da pasta /public de forma otimizada, 
          após a página se tornar interativa */}
      <Script src="/fav.js" strategy="afterInteractive" />
    </>
  );
};

export default FavoritosPage;