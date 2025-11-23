'use client';

import { Header, Footer } from "@/components";
import Image from "next/image";
import styles from "@/styles/tendencias.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Importação necessária

interface TrendCardProps {
  imageClass: string;
  title: string;
  tags: string[];
  link: string;
  titId: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ imageClass, title, tags, link, titId }) => {
  const saveIconSrc = '/images/tendencias/Salvar.png';

  return (
    <Link href={link} className={styles[imageClass]}>
      <div className={styles.elementos}>
        <div className={styles.cima}>
          <p className={styles.data3}>19 jun 2024</p>
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
  const router = useRouter(); // 2. Inicialização do router

  // Função para navegar para o final da página de produtos
  const irParaFinalProdutos = () => {
    // Certifique-se de que na página '/produtos' exista um elemento com id="final"
    router.push('/produtos#final');
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.primeiro}>
          <div className={styles.bannerPrincipal}>
            <p className={styles.tit1}>
              Acompanhe o que está <br /> bombando nos últimos dias
            </p>
            <p className={styles.text1}>
              Os assuntos mais comentados, a nova coleção, o novo tratamento - aqui você encontra de tudo sem precisar sair do conforto. Todas as principais tendências estão reunidas em um único lugar feito pensando especialmente em você.
            </p>
          </div>

          <div className={styles.primeiroOverlapGroup}>
            <Link href='/artigo/qual-creme-comprar' className={styles.bannerSecLink}>
              <div className={styles.bannerSec}>
                <div className={styles.conteudo}>
                  <div className={styles.butoes}>
                    <button>Cabelo</button>
                    <button>Cremes e óleos</button>
                    <button>Produtos</button>
                  </div>
                  <p className={styles.tit2}>Os dilemas do século XXI: Qual creme comprar?</p>
                </div>
              </div>
            </Link>

            <div className={styles.meio}>
              <p>
                O essencial <br /> para o seu estilo
              </p>
              <button>Ver todos</button>
            </div>

            <Link href='/artigo/acido-hialuronico' className={styles.bannerTercLink}>
              <div className={styles.bannerTerc}>
                <div className={styles.conteudo}>
                  <div className={styles.butoes2}>
                    <button>Cabelo</button>
                    <button>Cremes e óleos</button>
                    <button>Produtos</button>
                  </div>
                  <p className={styles.tit3}>Ácido hialurônico</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
        
        <section className={styles.segundo}>

          <div className={styles.segundoColEsq}>
            <div className={styles.textos}>
            <p className={styles.tit4}>Coleção Inverno - Cachos dos sonhos</p>
            <p className={styles.text2}>
              Neste inverno, abrace seus cachos como nunca antes. A coleção Cachos dos Sonhos foi criada especialmente para cuidar, nutrir e proteger seus fios nos dias frios, quando o ressecamento e o frizz tentam roubar a cena.
            </p>
            </div>
            <div className={styles.produtss}>
              <div className={styles.produt2}>
                <p>Óleo de Coco</p>
                {/* 3. Botão atualizado */}
                <button className={styles.but4} onClick={irParaFinalProdutos}>Ver produto</button>
                <button className={styles.but5}>
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
              <div className={styles.produt3}>
                <p>Creme capilar</p>
                {/* 3. Botão atualizado */}
                <button className={styles.but2} onClick={irParaFinalProdutos}>Ver produto</button>
                <button className={styles.but3}>
                  <Image src="/images/tendencias/Salvar.png" alt="" width={24} height={24}/>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.segundoColDir}>
            <div className={styles.textas}>
            <p className={styles.tit5}>Melhores tipos de finalização</p>
            <p className={styles.text3}>
              A finalização é a etapa-chave para realçar a beleza natural dos cachos. A fitagem tradicional é ideal para quem busca definição intensa e controle do frizz. Já a fitagem rápida oferece praticidade e um visual mais leve e volumoso. Para cachos duradouros, a combinação de creme e gel é imbatível. 
            </p>
            </div>
            <div className={styles.divi}>
              <p>Linha produtos tropicais - Hidratação Intensa</p>
            
            <Image 
              className={styles.imgProdut1} 
              src="/images/tendencias/produ-4.png" 
              alt="Foto de maquiagem" 
              width={300} 
              height={250} 
            />
            
            {/* 3. Botão atualizado */}
            <button className={styles.but6} onClick={irParaFinalProdutos}>Ver produtos</button>
          </div>
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

        <section className={styles.quarto}>
          <div className={styles.outroTitulo}>
            <p>Tendencias da Semana</p>
          </div>

          <section className={styles.imagenszinas}>
            <div className={styles.esqui}>
              <div className={styles.sec1}>
                <TrendCard
                  imageClass="img-2"
                  title="Melhores tipos de finalização"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar"
                  titId="tit7"
                />
                <TrendCard
                  imageClass="img-3"
                  title="skincare - 4 produtos"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/skincare-4"
                  titId="tit7"
                />
              </div>

              <div className={styles.sec2}>
                <TrendCard
                  imageClass="empe"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-2"
                  titId="tit7"
                />
                <div className={styles.deitada}>
                  <TrendCard
                    imageClass="img-4"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-3"
                    titId="tit7"
                  />
                  <TrendCard
                    imageClass="img-5"
                    title="Os dilemas do século XXI: Qual creme comprar?"
                    tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                    link="/artigo/creme-comprar-4"
                    titId="tit7"
                  />
                </div>
              </div>
            </div>

            <div className={styles.diri}>
              <div className={styles.diriTopo}>
                <TrendCard
                  imageClass="img-6"
                  title="Os dilemas do século XXI: Qual creme comprar?"
                  tags={["Cabelo", "Cremes e óleos", "Produtos"]}
                  link="/artigo/creme-comprar-5"
                  titId="tit7"
                />
              </div>

              <div className={styles.diriBaixo}>
                <TrendCard
                  imageClass="img-7"
                  title="Grillz em 2025"
                  tags={["Cabelo", "Cremes e óleos"]}
                  link="/artigo/grillz-2025"
                  titId="tit7"
                />
                <TrendCard
                  imageClass="img-8"
                  title="como fazer waves"
                  tags={["Cabelo"]}
                  link="/artigo/waves"
                  titId="tit8"
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