import React from 'react';
import Link from 'next/link'; 
import Script from 'next/script'; 
import image from 'next/image'; 

import '@/styles/hair-care.css';

const HairCarePage: React.FC = () => {
  return (
    <main>
      <section className="retangulo" id="barra">
        <article>
          <h1 id="asM">AS MELHORES DICAS PARA O SEU CABELO</h1>
          <img src="/images/hair-care/image 47.png" alt="" id="img47" />
          
        </article>
        <aside className="grupo-retangulos">
          <div className="retangulo-item">cortes</div>
          <div className="retangulo-item">penteados</div>
          <div className="retangulo-item">tratamentos</div>
          <div className="retangulo-item">pinturas</div>
        </aside>
      </section>

      <section className="container-imagens">
        <article className="grupo-img">
          <img id="img350" src="/images/hair-care/Rectangle 350.png" alt="" />
          <aside className="img-com-botao">
            <img id="img352" src="/images/hair-care/Rectangle 352.png" alt="" />
            <button id="bntRoxo">CONHEÇA</button>
          </aside>
          <img id="img351" src="/images/hair-care/Rectangle 351.png" alt="" />
        </article>
      </section>

      <h3 id="nossosTutoriais">Nossos tutoriais</h3>

      <section className="container-retangulos">
        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="trança">TRANÇA EMBUTIDA</h1>
          <ol className="lista-tranca">
            <li>Separe uma mecha no topo da cabeça e a divida em três partes iguais</li>
            <li>Comece trançando a lateral esquerda por cima da mecha do meio e depois repita...</li>
          </ol>
        </article>

        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="coques">COQUES</h1>
          <ol className="lista-coques">
            <li>Reúna todo o cabelo no topo da cabeça;</li>
            <li>Use a escova para pentear e deixar os fios bem esticados;</li>
            <li>Amarre com uma xuxinha;</li>
          </ol>
        </article>

        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="festivos">FESTIVOS</h1>
          <p className="lista-festivos">Antes de escolher um penteado, é importante considerar o tipo de evento que você vai participar. Para eventos mais formais, como casamentos e formaturas, penteados mais elaborados e sofisticados...</p>
        </article>
      </section>

      <section id="barra2">
        <div className="content">
          <article className="texto">
            <h1 id="nossosCortes">NOSSOS CORTES MAIS ACESSADOS</h1>
            <p id="osCortes">
              Os cortes para cabelos cacheados estão dominando as
              tendências! Com opções que valorizam o volume e o movimento
              natural dos fios, esses estilos são pura expressão de personalidade e
              autenticidade. Dos mais clássicos aos ousados, há um visual perfeito
              para cada estilo.
              Quer dar um upgrade no look e descobrir os cortes que estão em
              alta? Aqui, você encontra inspirações incríveis e dicas essenciais
              para manter o cabelo sempre impecável. Prontos para se jogar
              nessa? Vamos explorar!
            </p>
          </article>

          <aside className="imgBarra2">
            <img src="/images/hair-care/imagecach.png" alt="imagem" className="imagem11" />
            <img src="/images/hair-care/imageamrcn.png" alt="imagem" className="imagem11" />
            <img src="/images/hair-care/imagemld.png" alt="imagem" className="imagem11" />
            <img src="/images/hair-care/Rectangle 361.png" alt="imagem" className="imagem11" />
          </aside>
        </div>
      </section>

      <section className="container">
        <article className="item">
          <img src="/images/hair-care/image.png" alt="Imagem 1" className="imagem" id="img1" />
          <h1>SKINCARE</h1>
          <button className="botao-marrom" id="b1">conheça</button>
        </article>
        
        <article className="item">
          <img src="/images/hair-care/image (1).png" alt="Imagem 2" className="imagem" id="img2" />
          <h1>TINTURAS</h1>
          <button className="botao-marrom" id="b2">conheça</button>
        </article>

        <article className="item">
          <img src="/images/hair-care/image (2).png" alt="Imagem 3" className="imagem" id="img3" />
          <h1>CORTES</h1>
          <Link href="/corteS">
            <button className="botao-marrom" id="b3">conheça</button>
          </Link>
        </article>

        <article className="item">
          <img src="/images/hair-care/image (3).png" alt="Imagem 4" className="imagem" id="img4" />
          <h1>CRONOGRAMA CAPILAR</h1>
          <button className="botao-marrom" id="b4">conheça</button>
        </article>
      </section>

      <section className="container2">
        <aside className="dimg">
          <img src="/images/hair-care/image (4).png" alt="Imagem do óleo de rosa mosqueta" className="imagem2" id="oleo" />
          <img src="/images/hair-care/image (5).png" alt="Imagem do creme de rosa mosqueta" className="imagem2" id="creme" />
        </aside>
        
        <article className="texto">
          <h2 id="th2">
            Benefícios do Óleo de Rosa Mosqueta: <br />
            Aliado para a pele, cabelo e unhas
          </h2>
          <p id="tp">
            O óleo de rosa mosqueta oferece propriedades antioxidantes e ajuda a evitar o envelhecimento precoce. "Além disso, também age na manutenção da integridade e na regeneração da pele". Dessa forma, o ativo pode ser um grande aliado para a cicatrização e para a melhora de inflamações.
            “Todos podem usar e sentir os benefícios do óleo de rosa mosqueta. Pode ser que pessoas com a pele oleosa não se sintam tão confortáveis com o sensorial do produto, porém ele não aumenta a oleosidade ou piora a acne, então, pode ser usado tranquilamente, mas é claro que sem excessos”.
          </p>
          <button className="botao-roxo">CONHEÇA</button>
        </article>
      </section>
      
      {/* Carrega o script da pasta /public de forma otimizada */}
      <Script src="/Hair-care.js" strategy="lazyOnload" />
    </main>
  );
};

export default HairCarePage;