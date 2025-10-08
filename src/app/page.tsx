import { Header, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers';
import styles from '@/styles/page.module.css';

const ContentBlock = ({
  imageUrl,
  imageAlt,
  title,
  children,
  buttonText,
  buttonLink,
  reversed = false,
  target,
}: {
  imageUrl: string;
  imageAlt: string;
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  reversed?: boolean;
  target?: string;
}) => (
  <article className={`${styles.infoBlock} ${reversed ? styles.reversed : ''}`}>
    <figure className={styles.infoBlock_figure}>
      <Image src={imageUrl} alt={imageAlt} width={721} height={608} />
    </figure>
    <div className={styles.infoBlock_article}>
      <h2>{title}</h2>
      <p>{children}</p>
      <Link href={buttonLink} className="botoes" target={target}>{buttonText}</Link>
    </div>
  </article>
);


export default async function OasisHomepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  const isLoggedIn = !!token;

  return (
    <main className={styles.mainContainer}>
      
      <section className={styles.page1}>
        <Header />
        <div className={styles.page1Main}>
          <p>Tratamentos inovadores</p>
          <h1>Cuidado sem limites</h1>
          <Link href="/pagina-em-manutencao" className="botoes">Conheça</Link>
          <div className={styles.page1Circulos}>
            <Image src="/images/circulo-marcado.png" alt="circulo marcado" width={20} height={20} />
            <Image src="/images/circulo.png" alt="circulo nao marcado" width={20} height={20} />
            <Image src="/images/circulo.png" alt="circulo nao marcado" width={20} height={20} />
          </div>
        </div>
      </section>

      <section className={styles.page2}>
        <h2 className={styles.sectionTitle}>HOT TOPICS</h2>
        <div className={styles.slidesContainer}>
          <article className={styles.slide}>
            <Link href="/artigo2">
              <Image draggable={false} src="/images/tela-principal/page2/slide-img1.png" alt="Mulher loira aplicando produto no cabelo." width={255} height={438} />
              <figcaption>Como fazer acidificação no cabelo? Confira dicas</figcaption>
            </Link>
          </article>
          <article className={styles.slide}>
            <Link href="/artigo1">
              <Image draggable={false} src="/images/tela-principal/page2/slide-img2.png" alt="Frasco de sérum facial sendo segurado." width={255} height={438} />
              <figcaption>Sérum Facial: o que é, como usar e para que serve</figcaption>
            </Link>
          </article>
        </div>
      </section>

      <section className={styles.page3}>
        <header className={styles.page3Header}>
            <h2 className={styles.sectionTitle}>Cortes em Alta</h2>
            <p>As melhores recomendações de cortes de cabelos para todos os gêneros e idades</p>
        </header>
        <div className={styles.page3Content}>
          <nav>
            <ul className={styles.page3Nav}>
              <li><a href="#feminino">FEMININO</a></li>
              <li><a href="#masculino">MASCULINO</a></li>
              <li><a href="#50plus">PARA QUEM É 50+</a></li>
              <li><a href="#novidades">NOVIDADES</a></li>
            </ul>
          </nav>
          <div className={styles.page3Grid}>
            <figure className={styles.page3Card}>
              <div className={styles.page3CardImage}>
                <h3>CORTE PIXIE</h3>
                <Image src="/images/tela-principal/page3/img-conheca1.png" alt="Mulher com corte de cabelo estilo pixie." width={267} height={290} />
              </div>
              <figcaption><Link href="/corte" className="botoes">CONHEÇA</Link></figcaption>
            </figure>
            <figure className={styles.page3Card}>
              <div className={styles.page3CardImage}>
                <h3>WOLFCUT</h3>
                <Image src="/images/tela-principal/page3/img-conheca2.png" alt="Mulher com corte de cabelo estilo wolfcut." width={267} height={290} />
              </div>
              <figcaption><Link href="/pagina-em-manutencao" className="botoes">CONHEÇA</Link></figcaption>
            </figure>
            <figure className={styles.page3Card}>
              <div className={styles.page3CardImage}>
                <h3>FRANJA</h3>
                <Image src="/images/tela-principal/page3/img-conheca3.png" alt="Mulher com cabelo com franja." width={267} height={290} />
              </div>
              <figcaption><Link href="/pagina-em-manutencao" className="botoes">CONHEÇA</Link></figcaption>
            </figure>
            <figure className={styles.page3Card}>
              <div className={styles.page3CardImage}>
                <h3>CAMADA</h3>
                <Image src="/images/tela-principal/page3/img-conheca4.png" alt="Mulher com cabelo longo cortado em camadas." width={267} height={290} />
              </div>
              <figcaption><Link href="/pagina-em-manutencao" className="botoes">CONHEÇA</Link></figcaption>
            </figure>
          </div>
        </div>
      </section>
      
      {isLoggedIn && (
        <section className={styles.page4}>
          <header className={styles.sectionHeader}>
            <h2>Baseados no seu Perfil</h2>
            <p>Uma lista de recomendações personalizadas baseadas no seu avatar. Veja produtos que foram feitos especialmente para você!</p>
          </header>
          <div className={styles.page4Grid}>
            <figure className={styles.productCard}>
              <Image src="/images/tela-principal/page4/produto1.png" alt="Produto recomendado 1" width={284} height={293} />
              <figcaption>
                <p>Texto Ilustrativo</p>
                <Link href="/pagina-em-manutencao" className="botoes">ir para compra</Link>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className={styles.page5}>
        <ContentBlock
          imageUrl="/images/tela-principal/page5/picture1.png"
          imageAlt="Mulher com maquiagem ousada e artística com tons de azul."
          title="Aposte em Maquiagens ousadas!"
          buttonText="Descubra"
          buttonLink="/pagina-em-manutencao"
        >
          Está cansada das mesmas makes monótonas e sem brilho em toda festa? Veja agora mesmo 10 maquiagens para inovar e arrasar no visual! Aposte também em produtos que não danifiquem sua pele e preservem sua beleza natural.
        </ContentBlock>
      </section>

      <section className={styles.page6}>
        <ContentBlock
          imageUrl="/images/tela-principal/page6/picture1.png"
          imageAlt="Noiva sorrindo em seu casamento."
          title="Vai se casar? esteja incrível para seu amor!"
          buttonText="Descubra"
          buttonLink="/pagina-em-manutencao"
          reversed={true}
        >
          Está de casamento marcado mas ainda não tem certeza sobre como deve se arrumar? Invista em você! Clique abaixo e descubra o kit de casamento perfeito, com looks, maquiagens e penteados usados por famosos e feitos para você!
        </ContentBlock>
      </section>
      
      <section className={styles.page7}>
        <ContentBlock
          imageUrl="/images/tela-principal/page7/picture1.png"
          imageAlt="Homem usando boné, demonstrando estilo e autocuidado."
          title="autocuidado masculino"
          buttonText="Descubra"
          buttonLink="/skincare"
          target="_blank"
        >
          Se importar com a própria beleza e querer se cuidar não é mais algo irreal. Para quem dá aquele toque a mais na aparência, recebe autoestima e felicidade renovadas! Leia agora por onde começar a ter uma rotina capilar e de skincare e dê uma repaginada total no visual.
        </ContentBlock>
      </section>

      <section className={styles.page8}>
        <header className={styles.page8Header}>
          <h2>NOVIDADES</h2>
        </header>
        <div className={styles.page8Grid}>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto1.png" alt="Novo produto de beleza 1" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto2.png" alt="Novo produto de beleza 2" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto3.png" alt="Novo produto de beleza 3" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto4.png" alt="Novo produto de beleza 4" width={250} height={250} /></figure></Link>
        </div>
      </section>

      <section className={styles.page9}>
        <div className={styles.page9Grid}>
          <figure><Image src="/images/tela-principal/page9/picture1.png" alt="Inspiração de estilo com look moderno 1" width={486} height={744} /></figure>
          <figure><Image src="/images/tela-principal/page9/picture2.png" alt="Inspiração de estilo com look moderno 2" width={486} height={744} /></figure>
          <figure><Image src="/images/tela-principal/page9/picture3.png" alt="Inspiração de estilo com look moderno 3" width={486} height={744} /></figure>
        </div>
      </section>

      <Footer />
      
    </main>

    
  );
}