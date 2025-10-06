import { Header, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers';
import styles from '@/styles/page.module.css'

export default async function OasisHomepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  const isLoggedIn = !!token;

  return (
    <div className={styles.mainContainer}>

      <div className={styles.page1}>
        <Header />
        <main className={styles.page1Main}>
          <p>Tratamentos inovadores</p>
          <h1>Cuidado sem limites</h1>
          <button className="botoes">
            <Link href="/pagina-em-manutencao"><p>Conheça</p></Link>
          </button>
          <div className={styles.page1Circulos}>
            <Image src="/images/circulo-marcado.png" alt="circulo marcado" width={20} height={20} />
            <Image src="/images/circulo.png" alt="circulo nao marcado" width={20} height={20} />
            <Image src="/images/circulo.png" alt="circulo nao marcado" width={20} height={20} />
          </div>
        </main>
      </div>

      <div className={styles.page2}>
        <h1 className={styles.page2_title}>HOT TOPICS</h1>
        <section className={styles.slidesContainer}>
          <figure className={styles.slide}>
            <Image draggable={false} src="/images/tela-principal/page2/slide-img1.png" alt="" width={255} height={438} />
            <figcaption><Link href="/artigo2"><p>Como fazer acidificação no cabelo? Confira dicas</p></Link></figcaption>
          </figure>
          <figure className={styles.slide}>
            <Image draggable={false} src="/images/tela-principal/page2/slide-img2.png" alt="" width={255} height={438} />
            <figcaption><Link href="/artigo1"><p>Sérum Facial: o que é, como usar e para que serve</p></Link></figcaption>
          </figure>
          {/* ...outros slides... */}
        </section>
      </div>

      <div className={styles.page3}>
        <header className={styles.page3Header}>
          <article className={styles.page3Header_article}>
            <div className={styles.setas}><Image src="/images/seta-esquerda.png" alt="seta-rolagem" width={17} height={31} /></div>
            <figure><Link href="/hair-care"><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure1.png" alt="" width={191} height={190} /></Link><figcaption className={styles.page3TextoCortes}>Hair Care</figcaption></figure>
            <figure><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure2.png" alt="" width={191} height={190} /><figcaption className={styles.page3TextoCortes}>Tendências</figcaption></figure>
            <figure><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure3.png" alt="" width={191} height={190} /><figcaption className={styles.page3TextoCortes}>vestuário</figcaption></figure>
            <figure><Link href="/skincare"><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure4.png" alt="" width={191} height={190} /></Link><figcaption className={styles.page3TextoCortes}>skincare</figcaption></figure>
            <figure><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure5.png" alt="" width={191} height={190} /><figcaption className={styles.page3TextoCortes}>tutoriais</figcaption></figure>
            <figure><Link href="/tela-de-produto"><Image className={styles.headerImg} src="/images/tela-principal/page3/img-figure6.png" alt="" width={191} height={190} /></Link><figcaption className={styles.page3TextoCortes}>produtos</figcaption></figure>
            <div className={styles.setas}><Image src="/images/seta-direita.png" alt="seta-rolagem" width={17} height={31} /></div>
          </article>
          <section className={styles.page3Circulos}><Image src="/images/circulo-marcado.png" alt="circle-checked" width={20} height={20} /><Image src="/images/circulo.png" alt="circle-unchecked" width={20} height={20} /></section>
        </header>
        <main>
          <article className={styles.page3Main_article}>
            <h1>Cortes em Alta</h1>
            <p>As melhores recomendações de cortes de cabelos para todos os gêneros e idades</p>
          </article>
        </main>
        <footer>
          <nav className={styles.page3FooterNav}>
            <div><p className={styles.cortesEmAltaText}>FEMININO</p></div>
            <div><p className={styles.cortesEmAltaText}>MASCULINO</p></div>
            <div><p className={styles.cortesEmAltaText}>PARA QUEM É 50+</p></div>
            <div><p className={styles.cortesEmAltaText}>NOVIDADES</p></div>
          </nav>
          <article className={styles.page3FooterArticle}>
            <figure><div className={styles.page3Cortes}><h1>CORTE PIXIE</h1><Image className={styles.cortesImagens} src="/images/tela-principal/page3/img-conheca1.png" alt="" width={267} height={290} /></div><figcaption><button className="botoes"><Link href="/corte">CONHEÇA</Link></button></figcaption></figure>
            <figure><div className={styles.page3Cortes}><h1>WOLFCUT</h1><Image className={styles.cortesImagens} src="/images/tela-principal/page3/img-conheca2.png" alt="" width={267} height={290} /></div><figcaption><button className="botoes"><Link href="/pagina-em-manutencao">CONHEÇA</Link></button></figcaption></figure>
            <figure><div className={styles.page3Cortes}><h1>FRANJA</h1><Image className={styles.cortesImagens} src="/images/tela-principal/page3/img-conheca3.png" alt="" width={267} height={290} /></div><figcaption><button className="botoes"><Link href="/pagina-em-manutencao">CONHEÇA</Link></button></figcaption></figure>
            <figure><div className={styles.page3Cortes}><h1>CAMADA</h1><Image className={styles.cortesImagens} src="/images/tela-principal/page3/img-conheca4.png" alt="" width={267} height={290} /></div><figcaption><button className="botoes"><Link href="/pagina-em-manutencao">CONHEÇA</Link></button></figcaption></figure>
          </article>
        </footer>
      </div>

      {isLoggedIn && (
        <div className={styles.page4}>
          <header className={styles.page4Header}>
            <h1>Baseados no seu Perfil</h1>
            <p>Uma lista de recomendações personalizadas baseadas no seu avatar. Veja produtos que foram feitos especialmente para você!</p>
          </header>
          <main className={styles.page4Main}>
            <figure className={styles.page4Main_figure}>
              <Image src="/images/tela-principal/page4/produto1.png" alt="produto" width={284} height={293} />
              <figcaption>
                <p>Texto Ilustrativo</p>
                <button className="botoes"><Link href="/pagina-em-manutencao"><p>ir para compra</p></Link></button>
              </figcaption>
            </figure>
            {/* ...outras figures da page4... */}
          </main>
        </div>
      )}

      <div className={styles.page5}>
        <figure className={styles.page5_figure}><Image src="/images/tela-principal/page5/picture1.png" alt="imagem de mulher" width={721} height={608} /></figure>
        <article className={styles.page5_article}>
          <h1>Aposte em Maquiagens ousadas!</h1>
          <p>Está cansada das mesmas makes monótonas e sem brilho em toda festa? Veja agora mesmo 10 maquiagens para inovar e arrasar no visual! Aposte também em produtos que não danifiquem sua pele e preservem sua beleza natural.</p>
          <button className="botoes"><Link href="/pagina-em-manutencao">Descubra</Link></button>
        </article>
      </div>

      <div className={styles.page6}>
        <figure className={styles.page6_figure}><Image src="/images/tela-principal/page6/picture1.png" alt="imagem de casamento" width={721} height={608} /></figure>
        <article className={styles.page6_article}>
          <h1>Vai se casar? esteja incrível para seu amor!</h1>
          <p>Está de casamento marcado mas ainda não tem certeza sobre como deve se arrumar? Invista em você! Clique abaixo e descubra o kit de casamento perfeito, com looks, maquiagens e penteados usados por famosos e feitos para você!</p>
          <button className="botoes"><Link href="/pagina-em-manutencao">Descubra</Link></button>
        </article>
      </div>

      <div className={styles.page7}>
        <figure className={styles.page7_figure}><Image src="/images/tela-principal/page7/picture1.png" alt="imagem de homem com bone" width={721} height={608} /></figure>
        <article className={styles.page7_article}>
          <h1>autocuidado masculino</h1>
          <p>Se importar com a própria beleza e querer se cuidar não é mais algo irreal. Para quem dá aquele toque a mais na aparência, recebe autoestima e felicidade renovadas! Leia agora por onde começar a ter uma rotina capilar e de skincare e dê uma repaginada total no visual</p>
          <button className="botoes"><Link href="/skincare" target="_blank">Descubra</Link></button>
        </article>
      </div>

      <div className={styles.page8}>
        <header className={styles.page8Header}><h1>NOVIDADES</h1></header>
        <main className={styles.page8Main}>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto1.png" alt="produtos" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto2.png" alt="produtos" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto3.png" alt="produtos" width={250} height={250} /></figure></Link>
          <Link href="/tela-de-produto"><figure><Image src="/images/tela-principal/page8/produto4.png" alt="produtos" width={250} height={250} /></figure></Link>
        </main>
      </div>

      <div className={styles.page9}>
        <figure className={styles.page9_figure}><Image src="/images/tela-principal/page9/picture1.png" alt="" width={486} height={744} /></figure>
        <figure className={styles.page9_figure}><Image src="/images/tela-principal/page9/picture2.png" alt="" width={486} height={744} /></figure>
        <figure className={styles.page9_figure}><Image src="/images/tela-principal/page9/picture3.png" alt="" width={486} height={744} /></figure>
      </div>
      

      <Footer />
    </div>
  );
}