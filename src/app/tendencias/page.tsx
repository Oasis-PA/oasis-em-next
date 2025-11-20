'use client';

import { Header, Footer } from "@/components";
import Image from "next/image";
import styles from "@/styles/tendencias.module.css";
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
    <Link href={link} className={styles[imageClass]}> 
      <div className={styles.elementos}>
        <div className={styles.cima}>
          <p className={styles.data3}>19 jun 2024</p>
          {/* Componente Image para o ícone de salvar */}
          <Image
            className={styles.salvar3}
            src={saveIconSrc}
            alt="Salvar"
            width={20}
            height={27}
            unoptimized
          />
        </div>

        <div className={styles.centro}>
          <div className={styles.butaos}>
            {tags.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </div>
          <p className={styles[titId]}>{title}</p>
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
        <section className={styles.primeiro}>
          <div className={styles.bannerPrincipal}>
            <p className={styles.tit1}>
              Acompanhe o que está <br /> bombando nos últimos dias
            </p>
            <p className={styles.text1}>
              Os assuntos mais comentados, a nova coleção, o novo tratamento - aqui você encontra de tudo sem precisar sair do conforto. Todas as principais tendências estão reunidas em um único lugar feito pensando especialmente em você.
            </p>
          </div>

          {/* NOVO GRUPO PARA SOBREPOSIÇÃO LIMPA */}
          <div className={styles.primeiroOverlapGroup}>
            <Link href='/artigo/qual-creme-comprar' className={styles.bannerSecLink}>
              <div className={styles.bannerSec}>
                <div className={styles.butoes}>
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p className={styles.tit2}>Os dilemas do século XXI: Qual creme comprar?</p>
              </div>
            </Link>

            <div className={styles.meio}>
              <p>
                O essencial <br /> para o seu estilo
              </p>
              <button>Ver todos</button>
            </div>

            <Link href='/artigo/qual-creme-comprar' className={styles.bannerTercLink}>
              <div className={styles.bannerTerc}>
                <div className={styles.butoes2}>
                  <button>Cabelo</button>
                  <button>Cremes e óleos</button>
                  <button>Produtos</button>
                </div>
                <p className={styles.tit3}>Acessórios para pele e cabelo</p>
              </div>
            </Link>
          </div>
        </section>
        
        <section className={styles.segundo}>
          <div className={styles.segundoColEsq}>
            <p className={styles.tit4}>Cabelo perfeito em 3 passos</p>
            <p className={styles.text2}>
              Os produtos essenciais para o seu cronograma capilar estão aqui, descubra a importância do cuidado diário.
            </p>
            <div className={styles.produtss}>
              <div className={styles.produt1}>
                <p>Óleo Essencial</p>
                <button className={styles.but2}>Ver produto</button>
                <button className={styles.but3}>
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className={styles.produt2}>
                <p>Óleo de Coco</p>
                <button className={styles.but4}>Ver produto</button>
                <button className={styles.but5}>
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className={styles.produt3}>
                <p>Creme capilar</p>
                <button className={styles.but2}>Ver produto</button>
                <button className={styles.but3}>
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.segundoColDir}>
            <Image 
              className={styles.imgDireita} 
              src="/images/tendencias/imagem-direita.png" 
              alt="Modelo sorrindo com a mão no cabelo" 
              width={400} 
              height={400} 
            />
            <p className={styles.tit5}>Maquiagens</p>
            <p className={styles.text3}>
              O que você precisa saber sobre a nova linha de maquiagens da Makeup Star!
            </p>
            <div className={styles.divi}>
              <p>Produtos essenciais</p>
            </div>
            <Image 
              className={styles.imgProdut1} 
              src="/images/tendencias/imagem-maquiagem.png" 
              alt="Foto de maquiagem" 
              width={300} 
              height={100} 
            />
            <button className={styles.but6}>Ver produtos</button>
          </div>
        </section>

        <section className={styles.terceiro}>
          <div className={styles.esq}>
            <p>Os itens que você deve usar no inverno</p>
          </div>
          <div className={styles.dir}>
            <p className={styles.tit6}>Esteja sempre no estilo</p>
            <div className={styles.uno}>
              <Image
                src="/images/tendencias/Frame.png"
                alt="Couro repaginado"
                width={100}
                height={100}
              />
              <p>Couro repaginado</p>
            </div>
            <div className={styles.uno}>
              <Image
                src="/images/tendencias/frame-1.png"
                alt="Cachos com volume"
                width={100}
                height={100}
              />
              <p>Cachos com volume</p>
            </div>
            <div className={styles.uno}>
              <Image
                src="/images/tendencias/frame-2.png"
                alt="Acessórios com textura"
                width={100}
                height={100}
              />
              <p>Acessórios com textura</p>
            </div>
            <div className={styles.uno}>
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
        <section className={styles.quarto}>
          <div className={styles.outroTitulo}>
            <p>Tendencias da Semana</p>
          </div>

          <section className={styles.imagenszinas}>
            <div className={styles.esqui}>
              <div className={styles.sec1}>
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

              <div className={styles.sec2}>
                {/* Imagem empé */}
                <TrendCard
                  imageClass="empé"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-2"
                  titId="tit-7"
                />
                <div className={styles.deitada}>
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

            <div className={styles.diri}>
              <div className={styles.diriTopo}>
                {/* Imagem 6 */}
                <TrendCard
                  imageClass="img-6"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-5"
                  titId="tit-7"
                />
              </div>

              <div className={styles.diriBaixo}>
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