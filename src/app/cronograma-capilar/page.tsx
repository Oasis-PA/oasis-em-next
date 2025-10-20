// Garante que o componente seja executado apenas no navegador (cliente),
// pois o script manipula o DOM (document), que não existe no servidor.
"use client"; 

import React from 'react';
import Script from 'next/script'; // Componente otimizado do Next.js para carregar scripts
import { Header, Footer } from "@/components";
import '@/styles/cronograma-capilar.css'; 
import Link from "next/link";

const CronogramaCapilar: React.FC = () => {
  return (
    <>
    <Header/>
      <section id="mulher">
          <p className="cornograma">Cronograma <br />Capilar</p>
          <p className="cornograma2">Descubra o tratamento ideal <br />para voce!</p>
      </section>

      <p className="ola">Diga olá para o seu novo <br />Lugar Favorito</p>

      <section className="firula">
        <div id="ajuda">
          <div className="texto">
            <p className="precisa">Precisa de ajuda com o <br />seu cabelo?</p>
            <p className="nossa">Nossa página de Cronograma Capilar te ajuda a identificar o que seu cabelo precisa — hidratação, nutrição ou reconstrução — e montar uma rotina de cuidados simples, eficaz e personalizada. Assim, você escolhe os produtos certos, organiza sua semana e conquista fios mais saudáveis, fortes e bonitos.</p>
          </div>
        </div>
        <div id="firula1">
          <img className="amarelo" src="/images/Cronograma-capilar/amarelo.png" alt="" />
          <img className="folhas" src="/images/Cronograma-capilar/folhas.png" alt="" />
        </div>
      </section>

      <section id="lugar">
        <div className="quadrado" id="quiz">
          <img className="imagem" src="/images/Cronograma-capilar/imagem-quiz.png" alt="Quiz" />
            <p className="legenda-quadrado" >Quiz</p>
            <p className="legenda-quadrado2">Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className="quadrado" id="calendario">
          <img className="imagem" src="/images/Cronograma-capilar/imagem-calendario.png" alt="Calendário" />
            <p className="legenda-quadrado" >Calendário</p>
            <p className="legenda-quadrado2">Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className="quadrado" id="produtos">
          <img className="imagem" src="/images/Cronograma-capilar/imagem-produtos.png" alt="Produtos" />
            <p className="legenda-quadrado" >Produtos</p>
            <p className="legenda-quadrado2">Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
        <div className="quadrado" id="organize">
          <img className="imagem" src="/images/Cronograma-capilar/imagem-organize.png" alt="Organize" />
            <p className="legenda-quadrado" >Organize</p>
            <p className="legenda-quadrado2">Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
      </section>

      <p className="veja">Veja seu cronograma</p>
      <p className="aqui" >Aqui no Oasis nós temos o sistema que mais se adapta <br />a você e sua rotina.</p>

      <div className="monte">
          <img src="/images/Cronograma-capilar/monte.png" alt="" />
          <img className="conheca" src="/images/Cronograma-capilar/conheça.png" alt="Conheça" />
      </div>

      <div className="pratica">
        <p className="praticidade">Onde a praticidade encontra o<br />
          <span className="autocuidado">AUTOCUIDADO</span>
        </p>
      </div>

      <p className="se">Se você não quer responder perguntas, tudo bem! Aqui nós temos cronogramas prontos para todos os tipos de cabelo.</p>

      <section className="passando">
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/Brilho força e maciez.png" alt="Brilho, força e maciez" />
            <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
            <p className="texto-foto" >BRILHO, FORÇA E MACIEZ</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/Cronograma facil e rapido.png" alt="Cronograma fácil e rápido" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" >CRONOGRAMA <br />FÁCIL E RÁPIDO</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/SOS cabelos danificados.png" alt="SOS cabelos danificados" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" >SOS CABELOS <br />DANIFICADOS</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/recupere seus fios ja.png" alt="Recupere seus fios já" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" >RECUPERE SEUS FIOS JÁ</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/cuidado em poucos passos.png" alt="Cuidado em poucos passos" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" id='texto-foto'>CUIDADO EM POUCOS PASSOS</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/agenda dos seus fios.png" alt="Agenda dos seus fios" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" >AGENDA DOS SEUS FIOS</p>             
        </div>
      </section>

      <div className="apostas">
        <section  className="ousadas" id='ousadas1'>
        <img src="/images/Cronograma-capilar/Aposte.png" alt="Aposte em maquiagens ousadas" />
        <div id="cansada1" >
          <p className="texto-aposte">Erros comuns no cronograma capilar</p>
          <p className="texto-cansada" >Sente que seu cabelo não responde ao cronograma? O problema pode ser mais simples do que parece! 
            Listamos os erros que podem estar sabotando sua rotina e te ensinamos a corrigi-los.</p>
          <button className="descubra"><Link href='artigo/erros-cronograma-capilar'>DESCUBRA</Link></button>
        </div>
        </section>
        <section className="ousadas" id='ousadas2'>
          <div id="cansada2">
            <p className="texto-aposte">Hidratação caseira para cabelos crespos</p>
              <p className="texto-cansada">Revitalize seus fios crespos sem sair de casa. Ingredientes como abacate e babosa podem se transformar 
                em máscaras poderosas para nutrir e definir seu cabelo. Convidamos você a ler o artigo completo em nosso site e aprender o passo a passo.
              </p>
            <button className="descubra"><Link href='artigo/hidratacao-caseira-crespos'>DESCUBRA</Link></button>
          </div>
        
          <img src="/images/Cronograma-capilar/incrivel.png" alt="Mulher incrível para casamento" />
        </section>
        <section className="ousadas">
          <img src="/images/Cronograma-capilar/maquiagens.png" alt="Maquiagens" />
          <div id="cansada3">
            <p className="texto-aposte">5 receitas naturais para fortalecer os fios</p>
            <p className="texto-cansada">Cuidar dos cabelos com ingredientes naturais é uma forma potente e acessível de devolver a força, o brilho e a vitalidade 
              aos fios. Ingredientes ricos em vitaminas, proteínas e ácidos graxos podem ser combinados em máscaras e tratamentos caseiros para nutrir a fibra capilar 
              desde a raiz até as pontas. Confira cinco receitas eficazes para incorporar à sua rotina de cuidados e fortalecer seus cabelos.</p>
            <button className="descubra"><Link href='artigo/5-receitas-naturais'>DESCUBRA</Link></button>
          </div>
        </section>
      </div>

      <section id="no_cronograma">
        <div id="esquerda">
                

                <div id="progresso">
                  <div id="prog">
                    <p id='progresso_cronograma'>Progresso no Cronograma</p>
                    <div id='semanal_seta'>
                      <p id='semanal'>Semanal</p> <img className='setinha' src="/images/Cronograma-capilar/Setinha.png" alt="Seta" />
                    </div>
                  </div>
                  <p id='percentagem'>54%</p>
                  <div id="barra_de_progresso">
                  </div>
                </div>


                <div id="oleos_e_dicas">
                        <Link href='artigo/oleos-essenciais-para-cabelo'>
                          <div id="oleos">
                            <p>óleos essenciais para cabelo: 7 opções poderosas</p>
                          </div>
                        </Link>
                        <div id="dicas">
                          <div id="dicas_topo">
                            <p id="dicas_titulo">Dicas</p>
                            <p id="dicas_subtitulo">Terça</p>
                          </div>
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/Conta_gotas.svg" alt="Ícone de conta-gotas" />
                            <div>
                              <p className="sub1">Óleos</p>
                              <p className="sub2">Babosa</p>
                            </div>
                          </div>
                          <img className='linha' src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/pote.svg" alt="Ícone de pote" />
                            <div>
                              <p className="sub1">Máscara</p>
                              <p className="sub2">Linha hidratante inoar</p>
                            </div>
                          </div>
                          <img className='linha' src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/Sol.svg" alt="Ícone de sol" />
                            <div>
                              <p className="sub1">Duração</p>
                              <p className="sub2">30 minutos</p>
                            </div>
                          </div>
                          <img className='linha' src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/gota.svg" alt="Ícone de gota" />
                            <div>
                              <p className="sub1">Lavagem</p>
                              <p className="sub2">água fria</p>
                            </div>
                          </div>
                        </div>
                </div>
        </div>

        <div id="direita">
                  <div id="hidratante_e_logo">
                            <div id="hidratante">
                              <img className="hidratante" src="/images/Cronograma-capilar/hidratante.png" alt="Hidratante Salon Line" />
                              <div className="Salon_Line">
                                <p className='sub3'>Hidratante Salon Line</p> <img className='favorito' src="/images/Cronograma-capilar/Favorito.png" alt="" />
                              </div>
                              <p>O hidratante capilar repõe a água dos fios. Deixa o cabelo macio e com brilho.</p>
                              <button className="descubra">Conheça</button>
                            </div>
                            <div id="logo">
                              <img className="homem_garfo" src="/images/Cronograma-capilar/homem-garfo.png" alt="Homem com pente garfo" />
                            </div>
                  </div>
                  <Link href='artigo/shampoos-em-barra'>
                    <div id="shampoos">
                      <p>shampoos em barra? veja os 5 mais populares</p>
                    </div>
                  </Link>
        </div>
      </section>

      
     
      <Script 
        src="/cronograma-capilar.js" 
        strategy="afterInteractive" 
      />
      <Footer/>
    </>
  );
};

export default CronogramaCapilar;