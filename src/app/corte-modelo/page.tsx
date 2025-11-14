'use client';

import {Header, Footer} from "@/components";
import Image from "next/image";
import "@/styles/corte-modelo.css";

export default function cortemodelo() {
  return (
    <div className="page-corte-modelo-wrapper">

    <Header/>
 <main>
        <section className="principal">
            <img id="img-principal" src="/images/corte-modelo/img-principal.png" alt="Imagem mulher com cabelo curto"/>
          <div className="direita">
            <div className="parte-superior">
              <p id="tit1">Pixie</p>
              <p id="corpo-texto1">
                O corte pixie é um estilo de cabelo curto, com as
                laterais e costas mais curtas que o topo da cabeça. É
                prático, versátil, e pode ser adaptado a diferentes
                formatos de rosto e texturas capilares.
              </p>
              <p id="corpo-tit">Quando surgiu?</p>
              <p id="corpo-texto1">
               O corte Pixie Cut surgiu em meados dos anos 50, com a indústria cinematográfica sendo 
               impressionada pela ousadia das divas Elizabeth Taylor e Audrey Hepburn. Porém, a tendência 
               só explodiu mesmo em 1966 com a modelo britânica Twiggy, que não só fez o corte se tornar um 
               sucesso, como também foi responsável por bombar o delineado gráfico nas makes da época.
              </p>
            </div>

            <div className="parte-inferior">
              <div className="quadradinhos">
                <p id="corpo-tit1">Como fazer</p>
                <p id="corpo-texto2">
                Para fazer o Pixie Cut você precisa de duas coisas: referências de cortes e um profissional 
                especializado, já que tentar reproduzi-lo sozinha em casa pode acabar trazendo um resultado 
                totalmente oposto do que você imaginou. 
                </p>
              </div>

              <div className="quadradinhos">
                <p id="corpo-tit1">Com qual rosto combina?</p>
                <p id="corpo-texto2">
                  Rostos ovais, considerados os mais versáteis, podem usar o pixie de várias maneiras. Para rostos redondos, 
                  a franja lateral assimétrica ou alongada pode ajudar a alongar a face. Rostos quadrados podem se beneficiar
                  de cortes com camadas e franjas mais curtas ou diagonais.
                </p>
              </div>

              <div className="quadradinhos">
                <p id="corpo-tit1">Como arrumar</p>
                <p id="corpo-texto2">
                 Para arrumar um corte pixie, pode-se utilizar produtos como gel e spray fixador para criar um efeito espetado, 
                 ou usar a escova e o secador para modelar e dar volume, dependendo do efeito desejado. 
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
      </>
)}