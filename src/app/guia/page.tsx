"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/guia.css";

export default function guia() {
  return (
    <>
    <header>
        <h1>Guia do site</h1>
        <p>Seu caminho para descobrir produtos, artigos e muito mais!</p>
    </header>

    <main>
        <section id="s1">
            <div id="guia">
                <div>
                    <h1>Páginas</h1>
                    <img src="images/guia/seta-baixo.png" alt="seta" />
                </div>
                <div>
                    <h1>Produtos</h1>
                    <img src="images/guia/seta-lado.png" alt="seta" />
                </div>
                <div>
                    <h1>Artigos</h1>
                    <img src="images/guia/seta-lado.png" alt="seta" />
                </div>
            </div>
            <div id="linha"></div>
        </section>

        <section id="s2">   
            <div className="pag">
                <img src="images/guia/pag1-alimentacao.png" alt=""/>
                <div className="pag-1">
                    <h1>ALIMENTAÇÃO</h1>
                    <p>Conteúdos práticos sobre como a nutrição influencia corpo, pele e cabelo. Dicas 
                    simples para manter saúde e beleza em equilíbrio no dia a dia.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag2-cortes.png" alt=""/>
                <div className="pag-2">
                    <h1>CORTES</h1>
                    <p>Inspire-se com estilos de cortes variados para valorizar sua identidade e realçar sua 
                    beleza. Sugestões modernas, clássicas e práticas para diferentes tipos de cabelo.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag3-ajuda.png" alt=""/>
                <div className="pag-2">
                    <h1>CENTRAL DE AJUDA</h1>
                    <p>Encontre respostas rápidas para suas dúvidas. Suporte simples e direto para facilitar 
                    sua experiência no site e no cuidado com sua beleza.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag4-cronograma.png" alt=""/>
                <div className="pag-1">
                    <h1>CRONOGRAMA CAPILAR</h1>
                    <p>Aprenda a organizar os cuidados com hidratação, nutrição e reconstrução. Um guia prático 
                    para manter seus fios sempre fortes, saudáveis e cheios de vida.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag5-favoritos.png" alt=""/>
                <div className="pag-1">
                    <h1>FAVORITOS</h1>
                    <p>Salve seus produtos e conteúdos preferidos em um só lugar. Facilite suas escolhas e retorne 
                    rapidamente ao que mais combina com você.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag6-haircare.png" alt=""/>
                <div className="pag-2">
                    <h1>HAIRCARE</h1>
                    <p>Aprenda a cuidar da sua coroa! Aqui você encontra as melhores dicas de hidratação, nutrição e finalização 
                    para realçar a beleza única dos seus cabelos crespos e cacheados.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag7-infantil.png" alt=""/>
                <div className="pag-2">
                    <h1>INFANTIL</h1>
                    <p>O cuidado que começa no berço. Dicas e rotinas para cuidar dos cabelos e da pele das crianças, 
                    fortalecendo a autoestima e o amor por sua identidade desde cedo.</p>
                </div>
            </div>


            <div className="pag">
                <img src="images/guia/pag8-perfil.png" alt=""/>
                <div className="pag-1">
                    <h1>MEU PERFIL</h1>
                    <p>Crie seu perfil de beleza! Salve as informações do seu cabelo e pele para receber 
                    recomendações de produtos e dicas personalizadas, feitas especialmente para as suas necessidades.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag9-parceria.png" alt=""/>
                <div className="pag-1">
                    <h1>PARCERIA</h1>
                    <p>Acreditamos no poder da união! Se sua marca ou trabalho tem como missão exaltar a beleza negra, queremos nos conectar. 
                    Conheça nossas oportunidades e vamos crescer juntos.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag10-skincare.png" alt=""/>
                <div className="pag-2">
                    <h1>SKINCARE</h1>
                    <p>Construa a rotina de cuidados ideal para você. Explore dicas de limpeza, hidratação e proteção para conquistar uma pele visivelmente 
                    mais saudável, luminosa e cheia de vida.</p>
                </div>
            </div>

            <div className="pag">
                <img src="images/guia/pag11-tinturas.png" alt=""/>
                <div className="pag-2">
                    <h1>TINTURAS</h1>
                    <p>Quer mudar a cor dos fios sem medo? Descubra técnicas de coloração e inspirações para cabelos crespos e cacheados, 
                    aprendendo a manter o visual vibrante com a saúde capilar em dia.</p>
                </div>
            </div>


            <div className="pag">
                <img src="images/guia/pag12-tendências.png" alt=""/>
                <div className="pag-1">
                    <h1>TENDÊNCIAS</h1>
                    <p>Crie seu perfil de beleza! Salve as informações do seu cabelo e pele para receber 
                    recomendações de produtos e dicas personalizadas, feitas especialmente para as suas necessidades.</p>
                </div>
            </div>

        </section>
    </main>
    </>
  );
}