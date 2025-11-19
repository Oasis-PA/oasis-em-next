'use client';

import { Header, Footer } from "@/components";
import Image from "next/image";
import "@/styles/tendencias.css";
import Link from "next/link";

interface TrendCardProps {
  imageClass: string;
  title: string;
  tags: string[];
  link: string;
  titId: string;
}

// Componente para renderizar os cards de tendência
const TrendCard: React.FC<TrendCardProps> = ({ imageClass, title, tags, link, titId }) => {
  // Caminho da imagem de salvar ajustado para convenções do Next.js
  const saveIconSrc = '/images/tendencias/Salvar.png'; 

  return (
<<<<<<< Updated upstream
    <div className="page-tendencias-wrapper">
    // O link envolve todo o card (div com a classe da imagem de fundo)
    <Link href={link} className={imageClass}> 
      <div className="elementos">
        <div className="cima">
          <p id="data-3">19 jun 2024</p>
          {/* Componente Image para o ícone de salvar */}
          <Image 
            id="salvar-3" 
            src={saveIconSrc} 
            alt="Salvar" 
            width={20} // Tamanho base será sobrescrito pelo CSS
            height={27} // Tamanho base será sobrescrito pelo CSS
            unoptimized // Imagens de ícone pequenas podem ser unoptimized
          />
        </div>

        <div className="centro">
          <div className="butaos">
            {tags.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </div>
          <p id={titId}>{title}</p>
        </div>
      </div>
    </Link>    </div>
=======
    // O link envolve todo o card (div com a classe da imagem de fundo)
    <Link href={link} className={imageClass}> 
      <div className="elementos">
        <div className="cima">
          <p id="data-3">19 jun 2024</p>
          {/* Componente Image para o ícone de salvar */}
          <Image 
            id="salvar-3" 
            src={saveIconSrc} 
            alt="Salvar" 
            width={20} // Tamanho base será sobrescrito pelo CSS
            height={27} // Tamanho base será sobrescrito pelo CSS
            unoptimized // Imagens de ícone pequenas podem ser unoptimized
          />
        </div>

        <div className="centro">
          <div className="butaos">
            {tags.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </div>
          <p id={titId}>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default function tendencias() {

  return (
    <>
      <Header />
      <main>
        {/* ... Seções anteriores (primeiro, segundo, terceiro) ... */}
        <section className="primeiro">
          <div className="banner-principal">
            <p id="tit-1">
              Acompanhe o que está <br /> bombando nos últimos dias
            </p>
            <p id="text-1">
              Os assuntos mais comentados, a nova coleção, o novo tratamento - aqui você encontra de tudo sem precisar sair do conforto. Todas as principais tendências estão reunidas em um único lugar feito pensando especialmente em você.
            </p>
          </div>

          {/* NOVO GRUPO PARA SOBREPOSIÇÃO LIMPA */}
          <div className="primeiro-overlap-group">
            <Link href='/artigo/qual-creme-comprar' className="banner-sec-link">
              <div className="banner-sec">
                <div className="butoes">
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p id="tit-2">Os dilemas do século XXI: Qual creme comprar?</p>
              </div>
            </Link>

            <div className="meio">
              <p>
                O essencial <br /> para o seu estilo
              </p>
              <button>Ver todos</button>
            </div>

            <Link href='/artigo/qual-creme-comprar' className="banner-terc-link">
              <div className="banner-terc">
                <div className="butoes-2">
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p id="tit-3">Acessórios para pele e cabelo</p>
              </div>
            </Link>
          </div>
        </section>
        
        <section className="segundo">
          <div className="segundo-col-esq">
            <p id="tit-4">Cabelo perfeito em 3 passos</p>
            <p id="text-2">
              Os produtos essenciais para o seu cronograma capilar estão aqui, descubra a importância do cuidado diário.
            </p>
            <div className="produtss">
              <div className="produt1">
                <p>Óleo Essencial</p>
                <button id="but-2">Ver produto</button>
                <button id="but-3">
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className="produt2">
                <p>Óleo de Coco</p>
                <button id="but-4">Ver produto</button>
                <button id="but-5">
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
            </div>
          </div>

          <div className="segundo-col-dir">
            <Image 
              id="img-direita" 
              src="/images/tendencias/img-4.png" 
              alt="Modelo sorrindo com a mão no cabelo" 
              width={400} 
              height={400} 
            />
            <p id="tit-5">Maquiagens</p>
            <p id="text-3">
              O que você precisa saber sobre a nova linha de maquiagens da Makeup Star!
            </p>
            <div id="divi">
              <p>Produtos essenciais</p>
            </div>
            <Image 
              id="img-produt-1" 
              src="/images/tendencias/produ-4.png" 
              alt="Foto de maquiagem" 
              width={300} 
              height={100} 
            />
            <button id="but-6">Ver produtos</button>
          </div>
        </section>

        <section className="terceiro">
          <div className="esq">
            <p>Os itens que você deve usar no inverno</p>
          </div>
          <div className="dir">
            <p id="tit-6">Esteja sempre no estilo</p>
            <div id="uno">
              <Image
                src="/images/tendencias/Frame.png"
                alt="Couro repaginado"
                width={100}
                height={100}
              />
              <p>Couro repaginado</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-1.png"
                alt="Cachos com volume"
                width={100}
                height={100}
              />
              <p>Cachos com volume</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-2.png"
                alt="Acessórios com textura"
                width={100}
                height={100}
              />
              <p>Acessórios com textura</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-3.png"
                alt="Sobreposições"
                width={100}
                height={100}
              />
              <p>Sobreposições</p>
            </div>
          </div>
        </section>

        <section className="quarto">
          <div id="outro-titulo">
            <p>Tendencias da Semana</p>
          </div>

          <section className="imagenszinas">
            <div className="esqui">
              <div className="sec-1">
                {/* Imagem 2 */}
                <TrendCard
                  imageClass="img-2"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar"
                  titId="tit-7"
                />
                {/* Imagem 3 */}
                <TrendCard
                  imageClass="img-3"
                  title="skincare - 4 produtos"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/skincare-4"
                  titId="tit-7"
                />
              </div>

              <div className="sec-2">
                {/* Imagem empé */}
                <TrendCard
                  imageClass="empé"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-2"
                  titId="tit-7"
                />
                <div className="deitada">
                  {/* Imagem 4 */}
                  <TrendCard
                    imageClass="img-4"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-3"
                    titId="tit-7"
                  />
                  {/* Imagem 5 */}
                  <TrendCard
                    imageClass="img-5"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-4"
                    titId="tit-7"
                  />
                </div>
              </div>
            </div>

            <div className="diri">
              <div className="diri-topo">
                {/* Imagem 6 */}
                <TrendCard
                  imageClass="img-6"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-5"
                  titId="tit-7"
                />
              </div>

              <div className="diri-baixo">
                {/* Imagem 7 */}
                <TrendCard
                  imageClass="img-7"
                  title="Grillz em 2025"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/grillz-2025"
                  titId="tit-7"
                />
                {/* Imagem 8 */}
                <TrendCard
                  imageClass="img-8"
                  title="como fazer waves"
                  tags={["Cabelo"]}
                  link="/artigo/waves"
                  titId="tit-8"
                />
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
>>>>>>> Stashed changes
  );

};

export default function tendencias() {

  return (
    <>
      <Header />
      <main>
        {/* ... Seções anteriores (primeiro, segundo, terceiro) ... */}
        <section className="primeiro">
          <div className="banner-principal">
            <p id="tit-1">
              Acompanhe o que está <br /> bombando nos últimos dias
            </p>
            <p id="text-1">
              Os assuntos mais comentados, a nova coleção, o novo tratamento - aqui você encontra de tudo sem precisar sair do conforto. Todas as principais tendências estão reunidas em um único lugar feito pensando especialmente em você.
            </p>
          </div>

          {/* NOVO GRUPO PARA SOBREPOSIÇÃO LIMPA */}
          <div className="primeiro-overlap-group">
            <Link href='/artigo/qual-creme-comprar' className="banner-sec-link">
              <div className="banner-sec">
                <div className="butoes">
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p id="tit-2">Os dilemas do século XXI: Qual creme comprar?</p>
              </div>
            </Link>

            <div className="meio">
              <p>
                O essencial <br /> para o seu estilo
              </p>
              <button>Ver todos</button>
            </div>

            <Link href='/artigo/qual-creme-comprar' className="banner-terc-link">
              <div className="banner-terc">
                <div className="butoes-2">
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p id="tit-3">Acessórios para pele e cabelo</p>
              </div>
            </Link>
          </div>
        </section>
        
        <section className="segundo">
          <div className="segundo-col-esq">
            <p id="tit-4">Cabelo perfeito em 3 passos</p>
            <p id="text-2">
              Os produtos essenciais para o seu cronograma capilar estão aqui, descubra a importância do cuidado diário.
            </p>
            <div className="produtss">
              <div className="produt1">
                <p>Óleo Essencial</p>
                <button id="but-2">Ver produto</button>
                <button id="but-3">
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className="produt2">
                <p>Óleo de Coco</p>
                <button id="but-4">Ver produto</button>
                <button id="but-5">
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className="produt3">
                <p>Creme capilar</p>
                <button id="but-2">Ver produto</button>
                <button id="but-3">
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
            </div>
          </div>

          <div className="segundo-col-dir">
            <Image 
              id="img-direita" 
              src="/images/tendencias/imagem-direita.png" 
              alt="Modelo sorrindo com a mão no cabelo" 
              width={400} 
              height={400} 
            />
            <p id="tit-5">Maquiagens</p>
            <p id="text-3">
              O que você precisa saber sobre a nova linha de maquiagens da Makeup Star!
            </p>
            <div id="divi">
              <p>Produtos essenciais</p>
            </div>
            <Image 
              id="img-produt-1" 
              src="/images/tendencias/imagem-maquiagem.png" 
              alt="Foto de maquiagem" 
              width={300} 
              height={100} 
            />
            <button id="but-6">Ver produtos</button>
          </div>
        </section>

        <section className="terceiro">
          <div className="esq">
            <p>Os itens que você deve usar no inverno</p>
          </div>
          <div className="dir">
            <p id="tit-6">Esteja sempre no estilo</p>
            <div id="uno">
              <Image
                src="/images/tendencias/Frame.png"
                alt="Couro repaginado"
                width={100}
                height={100}
              />
              <p>Couro repaginado</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-1.png"
                alt="Cachos com volume"
                width={100}
                height={100}
              />
              <p>Cachos com volume</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-2.png"
                alt="Acessórios com textura"
                width={100}
                height={100}
              />
              <p>Acessórios com textura</p>
            </div>
            <div id="uno">
              <Image
                src="/images/tendencias/frame-3.png"
                alt="Sobreposições"
                width={100}
                height={100}
              />
              <p>Sobreposições</p>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* NOVA SEÇÃO: QUARTO - TENDÊNCIAS DA SEMANA */}
        {/* ======================================================= */}
        <section className="quarto">
          <div id="outro-titulo">
            <p>Tendencias da Semana</p>
          </div>

          <section className="imagenszinas">
            <div className="esqui">
              <div className="sec-1">
                {/* Imagem 2 */}
                <TrendCard
                  imageClass="img-2"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar"
                  titId="tit-7"
                />
                {/* Imagem 3 */}
                <TrendCard
                  imageClass="img-3"
                  title="skincare - 4 produtos"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/skincare-4"
                  titId="tit-7"
                />
              </div>

              <div className="sec-2">
                {/* Imagem empé */}
                <TrendCard
                  imageClass="empé"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-2"
                  titId="tit-7"
                />
                <div className="deitada">
                  {/* Imagem 4 */}
                  <TrendCard
                    imageClass="img-4"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-3"
                    titId="tit-7"
                  />
                  {/* Imagem 5 */}
                  <TrendCard
                    imageClass="img-5"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-4"
                    titId="tit-7"
                  />
                </div>
              </div>
            </div>

            <div className="diri">
              <div className="diri-topo">
                {/* Imagem 6 */}
                <TrendCard
                  imageClass="img-6"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-5"
                  titId="tit-7"
                />
              </div>

              <div className="diri-baixo">
                {/* Imagem 7 */}
                <TrendCard
                  imageClass="img-7"
                  title="Grillz em 2025"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/grillz-2025"
                  titId="tit-7"
                />
                {/* Imagem 8 */}
                <TrendCard
                  imageClass="img-8"
                  title="como fazer waves"
                  tags={["Cabelo"]}
                  link="/artigo/waves"
                  titId="tit-8"
                />
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}