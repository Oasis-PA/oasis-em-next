"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/infantil.css";

export default function infantil() {
  return (
    <>
    <Header/>
    <main>
        <div id="d1">
            <h1>Cuidados <span id="span1">infantis</span> com <span id="span2">carinho</span> e <span id="span3">identidade!</span></h1>
            <p>Dicas, produtos e rotinas pensadas para a pele e o cabelo das suas crianças, com segurança, leveza e muito amor.</p>
        </div>
    </main>

    <section id="s1">
        <h1>Artigos fundamentais</h1>
        <p>Dicas, guias e truques essenciais para a rotina de cuidados dos pequenos.</p>

        <div id="artigos">
            <div id="d2">
                <Link href='artigo/como-desembaracar-sem-dor' id="artigo1">
                    <div>
                        <h4 className="hpreto">Como desembaraçar sem dor?</h4>
                        <p className="ppreto">Desembarace os cabelos infantis sem dor e sem choro. Com as técnicas
                        e produtos certos, a tarefa vira um momento de carinho, deixando os fios macios e felizes.</p>
                    </div>
                </Link>

                <Link href='artigo/hidratacao-para-cabelos-infantis' id="artigo2">
                    <div>
                        <h4 className="hpreto">Hidratação natural para cabelos infantis</h4>
                        <p className="ppreto">Cuide dos fios delicados do seu pequeno com hidratação natural e suave. 
                        Ingredientes seguros transformam cabelos ressecados em fios macios, saudáveis e cheios de vida, 
                        com todo carinho que eles merecem</p>
                    </div>
                </Link>
            </div>

              <div className="d2">
                <Link href='artigo/cuidados-com-a-pele-das-criancas' id="artigo3">
                    <div>
                        <h4 className="hbranco">Cuidados com a pele sensível das crianças</h4>
                        <p className="pbranco">Proteja a pele delicada do seu filho com cuidados especiais e produtos suaves. 
                            Previna irritações e mantenha a pele macia, saudável e protegida todos os dias, com carinho e segurança.</p>
                    </div>
                </Link>
                
                <Link href='artigo/cuidados-com-a-pele-das-criancas' id="artigo4">
                    <div>
                        <h4 className="hpreto">Rotina de skincare infantil: protegendo a pele diariamente</h4>
                        <p className="ppreto">Crie uma rotina de cuidados simples e gostosa para proteger a pele do seu pequeno. Com 
                            produtos certos e gestos carinhosos, a pele fica saudável, protegida e feliz todos os dias.</p>
                    </div>
                </Link>   
            </div>

              <div className="d2">
                <Link href='artigo/como-identificar-alergias' id="artigo5">
                    <div>
                        <h4 className="hbranco">Como identificar alergias e irritações na pele das crianças</h4>
                        <p className="pbranco">Aprenda a reconhecer os sinais de alergias e irritações na pele delicada das crianças. Com 
                        atenção e cuidado, você protege seu pequeno, evita desconfortos e garante uma pele sempre saudável.</p>
                    </div>
                </Link>

                <Link href='artigo/dicas-para-hora-do-banho' id="artigo6">
                    <div>
                        <h4 className="hbranco">Dicas para hora do banho sem lágrimas</h4>
                        <p className="pbranco">Transforme o banho em um momento especial e divertido, sem choro e sem estresse. Com as técnicas 
                        certas e produtos suaves, seu pequeno vai amar esse momento de carinho, diversão e cuidado.</p>
                    </div>
                </Link> 
            </div>
        </div>
    </section>
    
    <section id="s2">
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

            <div id="leao-bg"><h1>shampoos sem sulfato</h1></div>
        </div>

        <div className="produtos">
            <div id="girafa-bg"><h1>cremes suaves</h1></div>
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

            <div id="zebra-bg"><h1>natural/<br></br>vegano</h1></div>
        </div>

        <div id="linhatexto2">
            <div className="linha"></div>
            <h1>Dicas rápidas para você</h1>
        </div>

    </section>

    <section id="s3">
        <div className="dicas">
            <div id="dica1">
                <h2>Evite produtos com fragrâncias fortes</h2>
                <p>Produtos com cheiro muito intenso podem irritar a pele delicada da criança. 
                Prefira opções suaves e específicas para o público infantil.</p>
            </div>

            <div id="dica2">
                <h2>Use pentes largos para reduzir a quebra</h2>
                <p>Ao desembaraçar, escolha pentes de dentes largos ou dedos. Isso ajuda a 
                proteger os fios frágeis e evita dor.</p>
            </div>
        </div>

        <div className="dicas">
            <div id="dica3">
                <h2>Sempre aplique protetor solar nas crianças</h2>
                <p>Mesmo em dias nublados, a pele precisa de proteção. Escolha fórmulas
                infantis suaves e reaplique conforme necessário.</p>
            </div>

            <div id="dica4">
                <h2>Hidrate a pele após o banho</h2>
                <p>Logo após o banho, aplique hidratante infantil para manter a pele macia,
                protegida e saudável.</p>
            </div>
        </div>
    </section>
    <Footer/>
    </>
  );
}