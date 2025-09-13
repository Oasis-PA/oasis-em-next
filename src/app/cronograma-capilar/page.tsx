// Garante que o componente seja executado apenas no navegador (cliente),
// pois o script manipula o DOM (document), que não existe no servidor.
"use client"; 

import React from 'react';
import Script from 'next/script'; // Componente otimizado do Next.js para carregar scripts

import '@/styles/cronograma-capilar.css'; 

const CronogramaCapilar: React.FC = () => {
  return (
    <>
      <section id="mulher">
          <p className="cornograma">Cronograma <br />Capilar</p>
          <p className="cornograma2">Descubra o tratamento ideal <br />para voce!</p>
      </section>

      <p className="ola">Diga olá para o seu novo <br />Lugar Favorito</p>

      <section className="firula">
        <div id="ajuda">
          <div className="texto">
            <p className="precisa">Precisa de ajuda com o seu cabelo?</p>
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
        <p className="praticidade">Onde a praticidade encontra <br />
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
          <p className="texto-foto" >CUIDADO EM POUCOS PASSOS</p>
        </div>
        <div className="fotos">
          <img className="img2" src="/images/Cronograma-capilar/agenda dos seus fios.png" alt="Agenda dos seus fios" />
          <a href=""><img className="butao" src="/images/Cronograma-capilar/conheca.png" alt="Conheça" /></a>
          <p className="texto-foto" >AGENDA DOS SEUS FIOS</p>             
        </div>
      </section>

      <div className="apostas">
        <section className="ousadas" id="ousadas1">
        <img src="/images/Cronograma-capilar/Aposte.png" alt="Aposte em maquiagens ousadas" />
        <div id="cansada1" >
          <p className="texto-aposte">Aposte em Maquiagens ousadas!</p>
          <p className="texto-cansada" >Está cansada das mesmas makes monótonas e sem
            brilho em toda festa? Veja agora mesmo 10 maquiagens
            para inovar e arrasar no visual! Aposte também em
            produtos que não danifiquem sua pele e preservem sua
            beleza natural.</p>
          <button className="descubra">DESCUBRA</button>
        </div>
        </section>
        <section className="ousadas">
          <div id="cansada2">
            <p className="texto-aposte">Vai se casar? esteja
              incrível para seu amor!</p>
              <p className="texto-cansada">Está de casamento marcado mas ainda não tem certeza sobre
              como deve se arrumar? Invista em você! Clique abaixo e
              descubra o kit de casamento perfeito, com looks, maquiagens
              e penteados usados por famosos e feitos para você!
              </p>
            <button className="descubra">DESCUBRA</button>
          </div>
        
          <img src="/images/Cronograma-capilar/incrivel.png" alt="Mulher incrível para casamento" />
        </section>
        <section className="ousadas">
          <img src="/images/Cronograma-capilar/maquiagens.png" alt="Maquiagens" />
          <div id="cansada3">
            <p className="texto-aposte">Aposte em Maquiagens ousadas!</p>
            <p className="texto-cansada">Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens
              para inovar e arrasar no visual! Aposte também em
              produtos que não danifiquem sua pele e preservem sua
              beleza natural.</p>
            <button className="descubra">DESCUBRA</button>
          </div>
        </section>
      </div>

      <section id="no_cronograma">
        <div id="esquerda">
                

                <div id="progresso">
                  <p>Progresso no Cronograma</p>
                  <div>
                    <p>Semanal</p> <img src="/images/Cronograma-capilar/Setinha.png" alt="Seta" />
                  </div>
                  <p>54%</p>
                  <div id="barra_de_progresso">
                  </div>
                </div>


                <div id="oleos_e_dicas">
                        <div id="oleos">
                          <p>óleos essenciais para cabelo: 7 opções poderosas</p>
                        </div>
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
                          <img src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/pote.svg" alt="Ícone de pote" />
                            <div>
                              <p className="sub1">Máscara</p>
                              <p className="sub2">Linha hidratante inoar</p>
                            </div>
                          </div>
                          <img src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
                          <div className="dicas_topicos">
                            <img className="sub0" src="/images/Cronograma-capilar/Sol.svg" alt="Ícone de sol" />
                            <div>
                              <p className="sub1">Duração</p>
                              <p className="sub2">30 minutos</p>
                            </div>
                          </div>
                          <img src="/images/Cronograma-capilar/linha.svg" alt="linha divisória" />
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
                              <p>Hidratante Salon Line</p>
                              <p>O hidratante capilar repõe a água dos fios. Deixa o cabelo macio e com brilho.</p>
                              <button className="descubra">Conheça</button>
                            </div>
                            <div id="logo">
                              <img className="homem_garfo" src="/images/Cronograma-capilar/homem-garfo.png" alt="Homem com pente garfo" />
                            </div>
                  </div>
                  <div id="shampoos">
                    <p>shampoos em barra? veja os 5 mais populares</p>
                  </div>
        </div>
      </section>

      <section id="cores">
        <img className="cor" src="/images/Cronograma-capilar/Retangulo_amarelo.png" alt="Forma amarela" />
        <img className="cor" src="/images/Cronograma-capilar/Retangulo_sem_borda.png" alt="Forma rosa" />
        <img className="cor" src="/images/Cronograma-capilar/Retangulo_roxo.png" alt="Forma roxa" />
        <img className="cor" src="/images/Cronograma-capilar/Retangulo_verde.png" alt="Forma verde" />
      </section>
     
      <Script 
        src="/cronograma-capilar.js" 
        strategy="afterInteractive" 
      />
    </>
  );
};

export default CronogramaCapilar;