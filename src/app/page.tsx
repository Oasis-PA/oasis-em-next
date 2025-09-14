"use client";
import { Header, Footer } from "@/components";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import "@/styles/index.css";

export default function OasisHomepage() {
  
  useEffect(() => {
    // Detecta quando o usuário volta para a página usando o botão voltar
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // A página foi carregada do cache (botão voltar)
        window.location.reload();
      }
    };

    // Detecta mudanças no histórico (botão voltar)
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div id="bodyPaginaPrincipal" className="min-h-screen">
      {/* Page 1 */}
      <div id="page1" className="relative">
        <Header />

        <main id="page1Main" className="text-center py-20">
          <p>Tratamentos inovadores</p>
          <h1 className="text-4xl font-bold my-4">Cuidado sem limites</h1>
          <button className="botoes bg-yellow-500 px-6 py-3 rounded">
            <Link href="/pagina-em-manutencao">
              <p>Conheça</p>
            </Link>
          </button>
          <div id="page1-circulos" className="flex justify-center gap-2 mt-8">
            <Image 
              id="circulo1" 
              src="/images/circulo-marcado.png" 
              alt="circulo marcado" 
              width={20} 
              height={20}
            />
            <Image 
              id="circulo2" 
              src="/images/circulo.png" 
              alt="circulo nao marcado" 
              width={20} 
              height={20}
            />
            <Image 
              id="circulo3" 
              src="/images/circulo.png" 
              alt="circulo nao marcado" 
              width={20} 
              height={20}
            />
          </div>
        </main>
      </div>

      {/* Page 2 */}
      <div id="page2" className="py-20">
        <h1 className="text-center text-3xl font-bold mb-10">HOT TOPICS</h1>
        <section role="none" id="page2-slides-container" className="flex overflow-x-auto gap-6 px-6">
          <figure className="page2-slide min-w-[300px]">
            <Image 
              draggable={false} 
              src="/images/tela-principal/page2/slide-img1.png" 
              alt="" 
              width={300} 
              height={200}
            />
            <figcaption>
              <Link href="/artigo2" className="no-underline text-black">
                <p>Como fazer acidificação no cabelo? Confira dicas</p>
              </Link>
            </figcaption>
          </figure>
          <figure className="page2-slide min-w-[300px]">
            <Image 
              draggable={false} 
              src="/images/tela-principal/page2/slide-img2.png" 
              alt="" 
              width={300} 
              height={200}
            />
            <figcaption>
              <Link href="/artigo1" className="no-underline text-black">
                <p>Sérum Facial: o que é, como usar e para que serve</p>
              </Link>
            </figcaption>
          </figure>
          <figure className="page2-slide min-w-[300px]">
            <Image 
              draggable={false} 
              src="/images/tela-principal/page2/slide-img3.png" 
              alt="" 
              width={300} 
              height={200}
            />
            <figcaption>
              <p>tópico</p>
            </figcaption>
          </figure>
          <figure className="page2-slide min-w-[300px]">
            <Image 
              draggable={false} 
              src="/images/tela-principal/page2/slide-img4.png" 
              alt="" 
              width={300} 
              height={200}
            />
            <figcaption>
              <p>tópico</p>
            </figcaption>
          </figure>
          <figure className="page2-slide min-w-[300px]">
            <Image 
              draggable={false} 
              src="/images/tela-principal/page2/slide-img5.png" 
              alt="" 
              width={300} 
              height={200}
            />
            <figcaption>
              <p>tópico</p>
            </figcaption>
          </figure>
        </section>
      </div>

      {/* Page 3 */}
      <div id="page3" className="py-20">
        <header>
          <article >
            <div className="setas">
              <Image 
                src="/images/seta-esquerda.png" 
                id="page3-seta-esquerda" 
                alt="seta-rolagem" 
                width={30} 
                height={30}
              />
            </div>
            <figure className="text-center min-w-[150px]">
              <Link href="/hair-care">
                <Image 
                  className="headerImg" 
                  id="page3-imagens-article1" 
                  src="/images/tela-principal/page3/img-figure1.png" 
                  alt="" 
                  width={150} 
                  height={150}
                />
              </Link>
              <figcaption className="page3-texto-cortes">Hair Care</figcaption>
            </figure>
            <figure className="text-center min-w-[150px]">
              <Image 
                className="headerImg" 
                id="page3-imagens-article2" 
                src="/images/tela-principal/page3/img-figure2.png" 
                alt="" 
                width={150} 
                height={150}
              />
              <figcaption className="page3-texto-cortes">Tendencias</figcaption>
            </figure>
            <figure className="text-center min-w-[150px]">
              <Image 
                className="headerImg" 
                id="page3-imagens-article3" 
                src="/images/tela-principal/page3/img-figure3.png" 
                alt="" 
                width={150} 
                height={150}
              />
              <figcaption className="page3-texto-cortes">vestuário</figcaption>
            </figure>
            <figure className="text-center min-w-[150px]">
              <Link href="/skincare">
                <Image 
                  className="headerImg" 
                  id="page3-imagens-article4" 
                  src="/images/tela-principal/page3/img-figure4.png" 
                  alt="" 
                  width={150} 
                  height={150}
                />
              </Link>
              <figcaption className="page3-texto-cortes">skincare</figcaption>
            </figure>
            <figure className="text-center min-w-[150px]">
              <Image 
                className="headerImg" 
                id="page3-imagens-article5" 
                src="/images/tela-principal/page3/img-figure5.png" 
                alt="" 
                width={150} 
                height={150}
              />
              <figcaption className="page3-texto-cortes">tutoriais</figcaption>
            </figure>
            <figure className="text-center min-w-[150px]">
              <Link href="/tela-de-produto">
                <Image 
                  className="headerImg" 
                  id="page3-imagens-article6" 
                  src="/images/tela-principal/page3/img-figure6.png" 
                  alt="" 
                  width={150} 
                  height={150}
                />
              </Link>
              <figcaption className="page3-texto-cortes">produtos</figcaption>
            </figure>
            <div className="setas">
              <Image 
                id="page3-seta-direita" 
                src="/images/seta-direita.png" 
                alt="seta-rolagem" 
                width={30} 
                height={30}
              />
            </div>
          </article>
          <section className="page3-circulos">
            <Image 
              id="circulo4" 
              src="/images/circulo-marcado.png" 
              alt="circle-checked" 
              width={20} 
              height={20}
            />
            <Image 
              id="circulo5" 
              src="/images/circulo.png" 
              alt="circle-unchecked" 
              width={20} 
              height={20}
            />
          </section>
        </header>
        
        <main className="text-center my-10">
          <article>
            <h1 className="text-3xl font-bold">Cortes em Alta</h1>
            <p className="mt-4">As melhores recomendações de cortes de cabelos para todos os gêneros e idades</p>
          </article>
        </main>
        
        <footer>
          <nav className="flex justify-center gap-8 mb-10">
            <div className="cortes-em-alta-container">
              <p className="cortes-em-alta-text">FEMININO</p>
            </div>
            <div className="cortes-em-alta-container">
              <p className="cortes-em-alta-text">MASCULINO</p>
            </div>
            <div className="cortes-em-alta-container">
              <p className="cortes-em-alta-text">PARA QUEM É 50+</p>
            </div>
            <div className="cortes-em-alta-container">
              <p className="cortes-em-alta-text">NOVIDADES</p>
            </div>
          </nav>
          
          <article >
            <figure className="text-center">
              <div className="page3-cortes">
                <h1>CORTE PIXIE</h1>
                <Image 
                  className="cortesImagens" 
                  src="/images/tela-principal/page3/img-conheca1.png" 
                  alt="" 
                  width={200} 
                  height={200}
                />
              </div>
              <figcaption>
                <button className="botoes bg-yellow-500 px-4 py-2 rounded mt-4">
                  <Link href="/corte">CONHEÇA</Link>
                </button>
              </figcaption>
            </figure>
            <figure className="text-center">
              <div className="page3-cortes">
                <h1>WOLFCUT</h1>
                <Image 
                  className="cortesImagens" 
                  src="/images/tela-principal/page3/img-conheca2.png" 
                  alt="" 
                  width={200} 
                  height={200}
                />
              </div>
              <figcaption>
                <button className="botoes bg-yellow-500 px-4 py-2 rounded mt-4">
                  <Link href="/pagina-em-manutencao">CONHEÇA</Link>
                </button>
              </figcaption>
            </figure>
            <figure className="text-center">
              <div className="page3-cortes">
                <h1>FRANJA</h1>
                <Image 
                  className="cortesImagens" 
                  src="/images/tela-principal/page3/img-conheca3.png" 
                  alt="" 
                  width={200} 
                  height={200}
                />
              </div>
              <figcaption>
                <button className="botoes bg-yellow-500 px-4 py-2 rounded mt-4">
                  <Link href="/pagina-em-manutencao">CONHEÇA</Link>
                </button>
              </figcaption>
            </figure>
            <figure className="text-center">
              <div className="page3-cortes">
                <h1>CAMADA</h1>
                <Image 
                  className="cortesImagens" 
                  src="/images/tela-principal/page3/img-conheca4.png" 
                  alt="" 
                  width={200} 
                  height={200}
                />
              </div>
              <figcaption>
                <button className="botoes bg-yellow-500 px-4 py-2 rounded mt-4">
                  <Link href="/pagina-em-manutencao">CONHEÇA</Link>
                </button>
              </figcaption>
            </figure>
          </article>
        </footer>
      </div>

      {/* Page 4 */}
      <div id="page4" className="py-20">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold">Baseados no seu Perfil</h1>
          <p className="mt-4">Uma lista de recomendações personalizadas baseadas no seu avatar. Veja produtos que se foram feitos especialmente para você!</p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          {[...Array(4)].map((_, index) => (
            <figure key={index} className="text-center">
              <Image 
                src="/images/tela-principal/page4/produto1.png" 
                alt="produto" 
                width={200} 
                height={200}
              />
              <figcaption>
                <p>Texto Ilustrativo</p>
                <button className="botoes bg-yellow-500 px-4 py-2 rounded mt-2">
                  <Link href="/pagina-em-manutencao">
                    <p>ir para compra</p>
                  </Link>
                </button>
              </figcaption>
            </figure>
          ))}
        </main>
      </div>

      {/* Page 5 */}
      <div id="page5" className="flex items-center py-20 px-6">
        <figure className="flex-1">
          <Image 
            src="/images/tela-principal/page5/picture1.png" 
            alt="imagem de mulher" 
            width={400} 
            height={400}
          />
        </figure>
        <article className="flex-1 pl-10">
          <h1 className="text-3xl font-bold mb-4">Aposte em Maquiagens ousadas!</h1>
          <p className="mb-6">Está cansada das mesmas makes monótonas e sem brilho em toda festa? Veja agora mesmo 10 maquiagens para inovar e arrasar no visual! Aposte também em produtos que não danifiquem sua pele e preservem sua beleza natural.</p>
          <button className="botoes bg-yellow-500 px-6 py-3 rounded">
            <Link href="/pagina-em-manutencao">Descubra</Link>
          </button>
        </article>
      </div>

      {/* Page 6 */}
      <div id="page6" className="flex items-center py-20 px-6">
        <figure className="flex-1">
          <Image 
            src="/images/tela-principal/page6/picture1.png" 
            alt="imagem de casamento" 
            width={400} 
            height={400}
          />
        </figure>
        <article className="flex-1 pl-10">
          <h1 className="text-3xl font-bold mb-4">Vai se casar? esteja incrível para seu amor!</h1>
          <p className="mb-6">Está de casamento marcado mas ainda não tem certeza sobre como deve se arrumar? Invista em você! Clique abaixo e descubra o kit de casamento perfeito, com looks, maquiagens e penteados usados por famosos e feitos para você!</p>
          <button className="botoes bg-yellow-500 px-6 py-3 rounded">
            <Link href="/pagina-em-manutencao">Descubra</Link>
          </button>
        </article>
      </div>

      {/* Page 7 */}
      <div id="page7" className="flex items-center py-20 px-6">
        <figure className="flex-1">
          <Image 
            src="/images/tela-principal/page7/picture1.png" 
            alt="imagem de homem com bone" 
            width={400} 
            height={400}
          />
        </figure>
        <article className="flex-1 pl-10">
          <h1 className="text-3xl font-bold mb-4">autocuidado masculino</h1>
          <p className="mb-6">Se importar com a própria beleza e querer se cuidar não é mais algo irreal. Para quem dá aquele toque a mais na aparência, recebe autoestima e felicidade renovadas! Leia agora por onde começar a ter uma rotina capilar e de skincare e dê uma repaginada total no visual</p>
          <button className="botoes bg-yellow-500 px-6 py-3 rounded">
            <Link href="/skincare" target="_blank">Descubra</Link>
          </button>
        </article>
      </div>

      {/* Page 8 */}
      <div id="page8" className="py-20">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold">NOVIDADES</h1>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          <Link href="/tela-de-produto">
            <figure>
              <Image 
                src="/images/tela-principal/page8/produto1.png" 
                alt="produtos" 
                width={250} 
                height={250}
              />
              <figcaption></figcaption>
            </figure>
          </Link>
          <Link href="/tela-de-produto">
            <figure>
              <Image 
                src="/images/tela-principal/page8/produto2.png" 
                alt="produtos" 
                width={250} 
                height={250}
              />
              <figcaption></figcaption>
            </figure>
          </Link>
          <Link href="/tela-de-produto">
            <figure>
              <Image 
                src="/images/tela-principal/page8/produto3.png" 
                alt="produtos" 
                width={250} 
                height={250}
              />
              <figcaption></figcaption>
            </figure>
          </Link>
          <Link href="/tela-de-produto">
            <figure>
              <Image 
                src="/images/tela-principal/page8/produto4.png" 
                alt="produtos" 
                width={250} 
                height={250}
              />
              <figcaption></figcaption>
            </figure>
          </Link>
        </main>
      </div>

      {/* Page 9 */}
      <div id="page9" className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-20">
        <figure>
          <Image 
            src="/images/tela-principal/page9/picture1.png" 
            alt="" 
            width={400} 
            height={300}
          />
          <figcaption></figcaption>
        </figure>
        <figure>
          <Image 
            src="/images/tela-principal/page9/picture2.png" 
            alt="" 
            width={400} 
            height={300}
          />
          <figcaption></figcaption>
        </figure>
        <figure>
          <Image 
            src="/images/tela-principal/page9/picture3.png" 
            alt="" 
            width={400} 
            height={300}
          />
          <figcaption></figcaption>
        </figure>
      </div>

    
      
       <Footer />
     
    </div>
  );
}