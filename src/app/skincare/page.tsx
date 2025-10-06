"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/skincare.css";

export default function skincare() {
  return (
    <>
    <header>
      <h1>SKIN</h1>
      <h2>CARE</h2>
    </header>
    
    <main>
      <section id="s1">
        <h1>Skincare com Propósito: Cuidar de Todos os Tons de Beleza</h1>
      </section>
      <div id="tons"></div>

      <section id="s2">
          <div className="categ">
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ3.png" alt="HAIR-CARE" />
            <h2>HAIR-CARE</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </div>
      </section>
      
      <section id="s3">
        <div className="artigos">
            <img src="images/skincare/artigo1.png" alt="" />
            <div className="cont-artigo">
              <h1>Aposte em Maquiagens ousadas!</h1>
              <p>Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens 
              para inovar e arrasar no visual! Aposte também em 
              produtos que não danifiquem sua pele e preservem sua
              beleza natural.</p>
              <button>CONHEÇA</button>
            </div>
        </div>

        <div id="artigo2">
            <div id="cont-artigo">
              <h1>Vai se casar? esteja incrível para seu amor!</h1>
              <p>Está de casamento marcado mas ainda não tem certeza sobre
              como deve se arrumar? Invista em você! Clique abaixo e 
              descubra o kit de casamento perfeito, com looks, maquiagens
              e penteados usados por famosos e feitos para você!
              </p>
              <button>CONHEÇA</button>
            </div>
            <img src="images/skincare/artigo2.png" alt="" />
        </div>

        <div className="artigos">
            <img src="images/skincare/artigo3.png" alt="" />
            <div className="cont-artigo">
              <h1>autocuidado masculino</h1>
              <p>Se importar com a própria beleza e querer se cuidar não
                é mais algo irreal. Para quem dá aquele toque a mais na
                aparência, recebe autoestima e felicidade renovadas! Leia 
                agora por onde começar a ter uma rotina capilar e de 
                skincare e dê uma repaginada total no visual!</p>
              <button>CONHEÇA</button>
            </div>
        </div>
      </section>

      <section id="s4">
        <div id="linhatexto1">
            <h1>Produtos recomendados</h1>
            <div className="linha"></div>
        </div>

        <div className="produtos">
            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div id="prod1-bg"><h1>mais amados</h1></div>
        </div>

        <div className="produtos">
            <div id="prod2-bg"><h1>opção acessível</h1></div>
            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>
        </div>

        <div className="produtos">
            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div className="prod1">
                <img src="/images/infantil/produto.png" alt="produto1"/>
                <h5>Força e vigor</h5>
                <h4>L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h4>
                <button>Veja mais</button>
            </div>

            <div id="prod3-bg"><h1>natural/<br></br>vegano</h1></div>
        </div>

        <div id="linhatexto2">
            <div className="linha"></div>
            <h1>Dicas rápidas para você</h1>
        </div>
    </section>

    <section id="s5">
        <div id="dicas">
          <div id="card1">
            <div className="conteudo">
                <h1>PROTETOR SOLAR É ESSENCIAL</h1>
                <p>A pele precisa de proteção diária contra manchas e envelhecimento precoce.</p>
            </div>
          </div>

          <div id="card2">
            <div className="conteudo">
                <h1>Hidrate logo após o banho</h1>
                <p>Isso ajuda a reter a umidade e manter a pele macia.</p>
            </div>
          </div>

          <div id="card3">
            <div className="conteudo">
                <h1>Evite sabonetes muito agressivos</h1>
                <p>Prefira fórmulas suaves que não ressequem a pele.</p>
            </div>
          </div>

          <div id="card4">
            <div className="conteudo">
                <h1>Inclua antioxidantes na rotina</h1>
                <p>Vitamina C, por exemplo, ajuda a uniformizar o tom da pele.</p>
            </div>
          </div>

          <div id="card5">
            <div className="conteudo">
                <h1>Esfolie com moderação</h1>
                <p>Uma vez por semana já ajuda a renovar sem agredir.</p>
            </div>
          </div>
        </div>
    </section>
    <section id="imagem-perfume"></section>
    </main>
    </>
  );
}