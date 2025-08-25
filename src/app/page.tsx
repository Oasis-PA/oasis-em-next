'use client'

import { Cabecalho } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function OasisHomepage() {
  const [activeTable, setActiveTable] = useState('cortes');

  const handleTableHover = (tableName: string) => {
    setActiveTable(tableName);
  };

  return (
    <div id="bodyPaginaPrincipal" className="min-h-screen">
      {/* Page 1 */}
      <div id="page1" className="relative">
         <Cabecalho />

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
          
          <article className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
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

      {/* Page 10 - Footer */}
      <div id="page10" className="bg-gray-800 text-white py-10">
        <footer className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Oasis</h3>
              <p className="text-sm text-gray-300">
                Sua plataforma completa de beleza e cuidados pessoais.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cortes" className="hover:text-yellow-400">Cortes</Link></li>
                <li><Link href="/penteados" className="hover:text-yellow-400">Penteados</Link></li>
                <li><Link href="/skincare" className="hover:text-yellow-400">Skincare</Link></li>
                <li><Link href="/produtos" className="hover:text-yellow-400">Produtos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contato" className="hover:text-yellow-400">Contato</Link></li>
                <li><Link href="/faq" className="hover:text-yellow-400">FAQ</Link></li>
                <li><Link href="/ajuda" className="hover:text-yellow-400">Ajuda</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Redes Sociais</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-yellow-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.403 2h7.194A4.403 4.403 0 0118 6.403v7.194A4.403 4.403 0 0113.597 18H6.403A4.403 4.403 0 012 13.597V6.403A4.403 4.403 0 016.403 2zM10 5.897a4.103 4.103 0 100 8.206 4.103 4.103 0 000-8.206zm0 6.769a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm4.108-7.385a.96.96 0 11-1.92 0 .96.96 0 011.92 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Oasis. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}