"use client";

import React from 'react';
import Script from 'next/script';
import { Header, Footer } from "@/components";
import styles from '@/styles/cronograma-capilar.module.css';
import Link from "next/link";

const CronogramaCapilar: React.FC = () => {
  return (
    <div className={styles.wrapper}>

    <Header/>
      <section className={styles.mulher}>
          <p className={styles.cronograma}>Cronograma <br />Capilar</p>
          <p className={styles.cronograma2}>Descubra o tratamento ideal <br />para voce!</p>
      </section>

      <p className={styles.ola}>Diga olá para o seu novo <br />Lugar Favorito</p>

      <section className={styles.firula}>
        <div className={styles.ajuda}>
          <div>
            <p className={styles.precisa}>Precisa de ajuda com o <br />seu cabelo?</p>
            <p className={styles.nossa}>Nossa página de Cronograma Capilar te ajuda a identificar o que seu cabelo precisa — hidratação, nutrição ou reconstrução — e montar uma rotina de cuidados simples, eficaz e personalizada. Assim, você escolhe os produtos certos, organiza sua semana e conquista fios mais saudáveis, fortes e bonitos.</p>
          </div>
        </div>
        <div className={styles.firula1}>
          <img className={styles.amarelo} src="/images/Cronograma-capilar/amarelo.png" alt="" />
          <img className={styles.folhas} src="/images/Cronograma-capilar/folhas.png" alt="" />
        </div>
      </section>

      <section className={styles.lugar}>
        <div className={styles.quadrado}>
          <img className={styles.imagem} src="/images/Cronograma-capilar/imagem-quiz.png" alt="Quiz" />
            <p className={styles.legendaQuadrado} >Quiz</p>
            <p className={styles.legendaQuadrado2}>Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className={styles.quadrado}>
          <img className={styles.imagem} src="/images/Cronograma-capilar/imagem-calendario.png" alt="Calendário" />
            <p className={styles.legendaQuadrado} >Calendário</p>
            <p className={styles.legendaQuadrado2}>Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className={styles.quadrado}>
          <img className={styles.imagem} src="/images/Cronograma-capilar/imagem-produtos.png" alt="Produtos" />
            <p className={styles.legendaQuadrado} >Produtos</p>
            <p className={styles.legendaQuadrado2}>Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className={styles.quadrado}>
          <img className={styles.imagem} src="/images/Cronograma-capilar/imagem-organize.png" alt="Organize" />
            <p className={styles.legendaQuadrado} >Organize</p>
            <p className={styles.legendaQuadrado2}>Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
      </section>

      <p className={styles.veja}>Veja seu cronograma</p>
      <p className={styles.aqui} >Aqui no Oasis nós temos o sistema que mais se adapta <br />a você e sua rotina.</p>

      <Link href="/perguntas" className={styles.monte}>
          <img src="/images/Cronograma-capilar/monte.png" alt="" />
          <img className={styles.conheca} src="/images/Cronograma-capilar/conheça.png" alt="Conheça" />
      </Link>

      <div className={styles.pratica}>
        <p className={styles.praticidade}>Onde a praticidade encontra o<br />
          <span className={styles.autocuidado}>AUTOCUIDADO</span>
        </p>
      </div>

     <section className={styles.passando}>
        
        <Link href="artigo/acidificacao-no-cabelo" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgBrilho}`}>
           <p className={styles.textoFoto}>ACIDIFICAÇÃO CAPILAR</p>
          </div>
        </Link>

        
        <Link href="artigo/como-desembaracar-sem-dor" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgCronograma}`}>
            <p className={styles.textoFoto}>COMO <br />DESEMBARAÇAR <br /> SEM DOR</p>
          </div>
        </Link>
        
        <Link href="artigo/qual-creme-comprar" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgSOS}`}>
            <p className={styles.textoFoto}>QUAL CREME<br />COMPRAR</p>
          </div>
        </Link>
        
        <Link href="artigo/cuidados-noturnos" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgRecupere}`}>
            <p className={styles.textoFoto}>CUIDADOS NOTURNOS</p>
          </div>
        </Link>
        
        <Link href="artigo/suplementos-para-cabelo" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgCuidado}`}>
            <p className={styles.textoFoto}>SUPLEMENTOS CAPILARES</p>
          </div>
        </Link>
        
        <Link href="artigo/melhores-tipos-de-finalizacao" className={styles.fotos}>
          <div className={`${styles.cardImagem} ${styles.bgAgenda}`}>
            <p className={styles.textoFoto}>MELHORES FINALIZAÇÕES</p>
          </div>
        </Link>

      </section>

      <div className={styles.apostas}>
        <section className={styles.ousadas}>
        <img src="/images/Cronograma-capilar/Aposte.png" alt="Aposte em maquiagens ousadas" />
        <div className={styles.cansada1}>
          <p className={styles.textoAposte}>Erros comuns no cronograma capilar</p>
          <p className={styles.textoCansada} >Sente que seu cabelo não responde ao cronograma? O problema pode ser mais simples do que parece!
            Listamos os erros que podem estar sabotando sua rotina e te ensinamos a corrigi-los.</p>
          <button className={styles.descubra}><Link href='artigo/erros-cronograma-capilar'>DESCUBRA</Link></button>
        </div>
        </section>
        <section className={`${styles.ousadas} ${styles.ousadas2}`}>
          <div className={styles.cansada2}>
            <p className={styles.textoAposte}>Hidratação caseira para cabelos crespos</p>
              <p className={styles.textoCansada}>Revitalize seus fios crespos sem sair de casa. Ingredientes como abacate e babosa podem se transformar
                em máscaras poderosas para nutrir e definir seu cabelo. Convidamos você a ler o artigo completo em nosso site e aprender o passo a passo.
              </p>
            <button className={styles.descubra}><Link href='artigo/hidratacao-caseira-crespos'>DESCUBRA</Link></button>
          </div>

          <img src="/images/Cronograma-capilar/incrivel.png" alt="Mulher incrível para casamento" />
        </section>
        <section className={styles.ousadas}>
          <img src="/images/Cronograma-capilar/maquiagens.png" alt="Maquiagens" />
          <div className={styles.cansada3}>
            <p className={styles.textoAposte}>5 receitas naturais para fortalecer os fios</p>
            <p className={styles.textoCansada}>Cuidar dos cabelos com ingredientes naturais é uma forma potente e acessível de devolver a força, o brilho e a vitalidade
              aos fios. Ingredientes ricos em vitaminas, proteínas e ácidos graxos podem ser combinados em máscaras e tratamentos caseiros para nutrir a fibra capilar
              desde a raiz até as pontas. Confira cinco receitas eficazes para incorporar à sua rotina de cuidados e fortalecer seus cabelos.</p>
            <button className={styles.descubra}><Link href='artigo/5-receitas-naturais'>DESCUBRA</Link></button>
          </div>
        </section>
      </div>

      <section className={styles.noCronograma}>
        <div className={styles.esquerda}>

                

                <div className={styles.oleosEDicas}>
                        <Link href='artigo/oleos-essenciais-para-cabelo'>
                          <div className={styles.oleos}>
                            <p>óleos essenciais para cabelo: 7 opções poderosas</p>
                          </div>
                        </Link>
                        <div className={styles.dicas}>
                          <div className={styles.dicasTopo}>
                            <p className={styles.dicasTitulo}>Dicas</p>
                            <p className={styles.dicasSubtitulo}>Terça</p>
                          </div>
                          <div className={styles.dicasTopicos}>
                            <img className={styles.sub0} src="/images/Cronograma-capilar/Conta_gotas.svg" alt="Ícone de conta-gotas" />
                            <div>
                              <p className={styles.sub1}>Óleos</p>
                              <p className={styles.sub2}>Babosa</p>
                            </div>
                          </div>
                          <img className={styles.linha} src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className={styles.dicasTopicos}>
                            <img className={styles.sub0} src="/images/Cronograma-capilar/pote.svg" alt="Ícone de pote" />
                            <div>
                              <p className={styles.sub1}>Máscara</p>
                              <p className={styles.sub2}>Linha hidratante inoar</p>
                            </div>
                          </div>
                          <img className={styles.linha} src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className={styles.dicasTopicos}>
                            <img className={styles.sub0} src="/images/Cronograma-capilar/Sol.svg" alt="Ícone de sol" />
                            <div>
                              <p className={styles.sub1}>Duração</p>
                              <p className={styles.sub2}>30 minutos</p>
                            </div>
                          </div>
                          <img className={styles.linha} src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className={styles.dicasTopicos}>
                            <img className={styles.sub0} src="/images/Cronograma-capilar/gota.svg" alt="Ícone de gota" />
                            <div>
                              <p className={styles.sub1}>Lavagem</p>
                              <p className={styles.sub2}>água fria</p>
                            </div>
                          </div>
                        </div>
                </div>
        </div>

        <div className={styles.direita}>
                  <div className={styles.hidratanteELogo}>
                            <div className={styles.hidratante}>
                              <img className={styles.hidratanteImg} src="/images/Cronograma-capilar/hidratante.png" alt="Hidratante Salon Line" />
                              <div className={styles.salonLine}>
                                <p className={styles.sub3}>Hidratante Salon Line</p> <img className={styles.favorito} src="/images/Cronograma-capilar/Favorito.png" alt="" />
                              </div>
                              <p>O hidratante capilar repõe a água dos fios. Deixa o cabelo macio e com brilho.</p>
                              <button className={styles.descubra}>Conheça</button>
                            </div>
                            <div className={styles.logo}>
                              <img className={styles.homemGarfo} src="/images/Cronograma-capilar/homem-garfo.png" alt="Homem com pente garfo" />
                            </div>
                  </div>
                  <Link href='artigo/shampoos-em-barra'>
                    <div className={styles.shampoos}>
                      <p>shampoos em barra? veja os 5 mais populares</p>
                    </div>
                  </Link>
        </div>
      </section>

      
     
      <Script 
        src="/cronograma-capilar.js" 
        strategy="afterInteractive" 
      />
      <Footer/>    </div>
  );
};

export default CronogramaCapilar;