'use client';

import {Footer} from "@/components";
import Image from "next/image";
import "@/styles/cortE.css";



export default function tendencias() {

  return (
    <>


 <main>
        <section className="principal">
          <div className="esquerda">
            <div className="botooes">
              <button id="but">Moda</button>
              <button id="but">Moda</button>
              <button id="but">Moda</button>
              <button id="but">Moda</button>
            </div>
            <Image
              id="img-principal"
              src="/images/cortE/img-principal.png"
              alt="Imagem mulher com cabelo curto"
              width={400}
              height={500}
            />
          </div>

          <div className="direita">
            <Image
              src="/images/cortE/Estrelinha.png"
              alt="Estrelinhas"
              width={100}
              height={30}
            />

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
                O corte Pixie Cut surgiu em meados dos anos 50 com
                Elizabeth Taylor e Audrey Hepburn, mas ganhou força em
                1966 com a modelo Twiggy...
              </p>
            </div>

            <div className="parte-inferior">
              <div className="quadradinhos">
                <p id="corpo-tit1">Como fazer</p>
                <p id="corpo-texto2">
                  Para fazer o Pixie Cut você precisa de duas coisas:
                  referências de cortes e um profissional
                  especializado...
                </p>
              </div>

              <div className="quadradinhos">
                <p id="corpo-tit1">Com qual rosto combina?</p>
                <p id="corpo-texto2">
                  Rostos ovais são os mais versáteis. Para rostos
                  redondos, franjas laterais ajudam a alongar a face...
                </p>
              </div>

              <div className="quadradinhos">
                <p id="corpo-tit1">Como arrumar</p>
                <p id="corpo-texto2">
                  Pode-se usar gel e spray fixador para efeito
                  espetado, ou escova e secador para modelar...
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="secundario">
          <p id="tit-3">Você também pode gostar</p>
          <div className="recs">
            <div className="rec">
              <Image
                id="img-rec"
                src="/images/cortE/img-corte-1.png"
                alt="Corte 1"
                width={250}
                height={250}
              />
              <Image
                id="estre-rec"
                src="/images/cortE/Estrelinha.png"
                alt="Estrelinhas"
                width={80}
                height={20}
              />
              <p id="tit-4">Corte XXXX</p>
              <button>Moda</button>
              <button>Moda</button>
              <p id="text-rec">
                Para arrumar um corte pixie, pode-se utilizar produtos
                como gel e spray fixador...
              </p>
            </div>

            <div className="rec">
              <Image
                src="/images/cortE/img-corte-2.png"
                alt="Corte 2"
                width={250}
                height={250}
              />
              <Image
                id="estre-rec"
                src="/images/cortE/Estrelinha.png"
                alt="Estrelinhas"
                width={80}
                height={20}
              />
              <p id="tit-4">Corte XXXX</p>
              <button>Moda</button>
              <button>Moda</button>
              <p id="text-rec">
                Para arrumar um corte pixie, pode-se utilizar produtos
                como gel e spray fixador...
              </p>
            </div>

            <div className="rec">
              <Image
                id="img-rec"
                src="/images/cortE/img-corte-3.png"
                alt="Corte 3"
                width={250}
                height={250}
              />
              <Image
                id="estre-rec"
                src="/images/cortE/Estrelinha.png"
                alt="Estrelinhas"
                width={80}
                height={20}
              />
              <p id="tit-4">Corte XXXX</p>
              <button>Moda</button>
              <button>Moda</button>
              <p id="text-rec">
                Para arrumar um corte pixie, pode-se utilizar produtos
                como gel e spray fixador...
              </p>
            </div>

            <div className="rec">
              <Image
                id="img-rec"
                src="/images/cortE/img-corte-4.png"
                alt="Corte 4"
                width={250}
                height={250}
              />
              <Image
                id="estre-rec"
                src="/images/cortE/Estrelinha.png"
                alt="Estrelinhas"
                width={80}
                height={20}
              />
              <p id="tit-4">Corte XXXX</p>
              <button>Moda</button>
              <button>Moda</button>
              <p id="text-rec">
                Para arrumar um corte pixie, pode-se utilizar produtos
                como gel e spray fixador...
              </p>
            </div>
          </div>
        </section>
      </main>

    <Footer/>

      </>
)}