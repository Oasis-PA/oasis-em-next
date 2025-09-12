"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, MouseEvent } from 'react';

// Componente completo da página, com toda a lógica e estrutura integradas.
export default function CronogramaCapilarPage() {

  // Estado para controlar qual mega menu do cabeçalho está ativo
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Lógica para o carrossel de arrastar
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    carouselRef.current.classList.add('cursor-grabbing');
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const onMouseUpOrLeave = () => {
    if (!carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.classList.remove('cursor-grabbing');
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* ======================================================================= */}
      {/* CABEÇALHO COMPLETO COM MEGA MENU                                        */}
      {/* ======================================================================= */}
    
      <main>
        {/* ======================================================================= */}
        {/* SEÇÃO HERO                                                              */}
        {/* ======================================================================= */}
        <section
          className="w-full h-screen bg-no-repeat bg-contain bg-top flex flex-col pt-[12vh] pl-[5vw]"
          style={{ backgroundImage: "url('/images/Cronograma-capilar/Mulher-cronograma.png')" }}
        >
          <h1 className="text-white font-['PLAYFUL_RUNWAY'] text-[14vw] leading-[1.02]">Cronograma <br />Capilar</h1>
          <p className="text-black font-['THE_NEXT_FONT'] font-black text-[3vw] leading-[1.02] mt-[4vh]">Descubra o tratamento ideal <br />para você!</p>
        </section>

        <p className="font-['PLAYFUL_RUNWAY'] text-black text-[4vw] text-center mt-[10vh] mb-[4vh]">
          Diga olá para o seu novo <br />Lugar Favorito
        </p>

        {/* ======================================================================= */}
        {/* SEÇÃO AJUDA COM ELEMENTOS SOBREPOSTOS                                   */}
        {/* ======================================================================= */}
        <section className="relative w-[85vw] h-[50vh] mx-auto flex flex-col items-center">
          <div id="ajuda" className="relative w-full h-[25vh] bg-[#5E332C] p-[2.5vw] flex items-center z-10">
            <div>
              <p className="text-white font-['THE_NEXT_FONT'] font-black text-[2vw] mb-[1.35vh]">Precisa de ajuda com o seu cabelo?</p>
              <p className="text-white font-['Louis_George_Cafe'] text-[1.5vw]">Nossa página de Cronograma Capilar te ajuda a identificar o que seu cabelo precisa — hidratação, nutrição ou reconstrução — e montar uma rotina de cuidados simples, eficaz e personalizada. Assim, você escolhe os produtos certos, organiza sua semana e conquista fios mais saudáveis, fortes e bonitos.</p>
            </div>
          </div>
          <div id="firula1" className="absolute top-0 left-0 w-full h-full">
            <Image className="absolute top-[20vh] left-0 w-[17vw] h-[45vh] z-0" src="/images/Cronograma-capilar/amarelo.png" alt="" width={200} height={500} />
            <Image className="absolute bottom-[4vh] right-[4vw] w-[60vw] h-[6.5vh]" src="/images/Cronograma-capilar/folhas.png" alt="" width={700} height={100} />
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SEÇÃO DE CARDS DE FUNCIONALIDADES                                       */}
        {/* ======================================================================= */}
        <section id="lugar" className="flex flex-wrap justify-center gap-[4vw] my-16 pt-24">
          <div className="flex flex-col items-center p-[2vh] w-[15vw] min-w-[220px] h-[50vh] bg-gray-50 shadow-[0px_45px_45px_rgba(123,26,148,0.25)] rounded-lg">
            <Image className="w-[13vw] h-auto" src="/images/Cronograma-capilar/imagem-quiz.png" alt="Quiz" width={150} height={150} />
            <p className="font-['THE_NEXT_FONT'] text-[3vh] mt-[2vh]">Quiz</p>
            <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vh] text-justify mt-[2.1vh]">Respondendo a um questionário curto sobre as características de seu cabelo, criamos um plano feito especialmente para você.</p>
          </div>
          <div className="flex flex-col items-center p-[2vh] w-[15vw] min-w-[220px] h-[50vh] bg-gray-50 shadow-[0px_45px_45px_rgba(123,26,148,0.25)] rounded-lg">
            <Image className="w-[13vw] h-auto" src="/images/Cronograma-capilar/imagem-calendario.png" alt="Calendário" width={150} height={150} />
            <p className="font-['THE_NEXT_FONT'] text-[3vh] mt-[2vh]">Calendário</p>
            <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vh] text-justify mt-[2.1vh]">Organize sua rotina de tratamentos com um calendário personalizado que se adapta às suas necessidades.</p>
          </div>
          <div className="flex flex-col items-center p-[2vh] w-[15vw] min-w-[220px] h-[50vh] bg-gray-50 shadow-[0px_45px_45px_rgba(123,26,148,0.25)] rounded-lg">
            <Image className="w-[13vw] h-auto" src="/images/Cronograma-capilar/imagem-produtos.png" alt="Produtos" width={150} height={150} />
            <p className="font-['THE_NEXT_FONT'] text-[3vh] mt-[2vh]">Produtos</p>
            <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vh] text-justify mt-[2.1vh]">Receba recomendações de produtos ideais para cada etapa do seu cronograma capilar.</p>
          </div>
          <div className="flex flex-col items-center p-[2vh] w-[15vw] min-w-[220px] h-[50vh] bg-gray-50 shadow-[0px_45px_45px_rgba(123,26,148,0.25)] rounded-lg">
            <Image className="w-[13vw] h-auto" src="/images/Cronograma-capilar/imagem-organize.png" alt="Organize" width={150} height={150} />
            <p className="font-['THE_NEXT_FONT'] text-[3vh] mt-[2vh]">Organize</p>
            <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vh] text-justify mt-[2.1vh]">Monitore seu progresso e ajuste sua rotina sempre que necessário para obter os melhores resultados.</p>
          </div>
        </section>

        <p className="font-['PLAYFUL_RUNWAY'] text-black text-[6vw] text-center mt-[10vh] mb-[4vh]">Veja seu cronograma</p>
        <p className="font-['LOUIS_GEORGE_CAFE'] text-black text-[3vw] text-center">Aqui no Oasis nós temos o sistema que mais se adapta <br />a você e sua rotina.</p>

        <div className="relative mt-[6vh] w-full bg-[#5F0B38]">
          <Image src="/images/Cronograma-capilar/monte.png" alt="Monte seu cronograma personalizado" width={1920} height={500} className="w-full h-auto" />
          <Link href="/quiz" className="absolute bottom-[20%] right-[13vw]">
            <Image className="h-auto w-[13.5vw]" src="/images/Cronograma-capilar/conheça.png" alt="Conheça" width={250} height={70} />
          </Link>
        </div>

        <div className="mt-[10vh] ml-[23vw]">
            <p className="text-black font-['PLAYFUL_RUNWAY'] text-[5vw] leading-[1.02]">Onde a praticidade encontra <br/><span className="font-black text-[5.7vw] ml-[4.7vw] -mt-[6.3vw] block">AUTOCUIDADO</span></p>
        </div>

        <p className="text-black font-['LOUIS_GEORGE_CAFE'] text-[2.5vw] text-justify mx-[10vw] mt-[3vh]">Se você não quer responder perguntas, tudo bem! Aqui nós temos cronogramas prontos para todos os tipos de cabelo.</p>

        {/* ======================================================================= */}
        {/* SEÇÃO CARROSSEL                                                         */}
        {/* ======================================================================= */}
        <section
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUpOrLeave}
          onMouseUp={onMouseUpOrLeave}
          onMouseMove={onMouseMove}
          className="flex flex-nowrap gap-[10px] mt-[6vh] p-[10px] w-full overflow-x-auto cursor-grab"
        >
          {[{img: "Brilho força e maciez.png", text: "BRILHO, FORÇA E MACIEZ"}, {img: "Cronograma facil e rapido.png", text: "CRONOGRAMA <br/>FÁCIL E RÁPIDO"}, {img: "SOS cabelos danificados.png", text: "SOS CABELOS <br/>DANIFICADOS"}, {img: "recupere seus fios ja.png", text: "RECUPERE SEUS FIOS JÁ"}, {img: "cuidado em poucos passos.png", text: "CUIDADO EM POUCOS PASSOS"}, {img: "agenda dos seus fios.png", text: "AGENDA DOS SEUS FIOS"}].map((item, index) => (
            <div key={index} className="relative flex-shrink-0 w-[320px] h-[250px]">
              <Image className="w-full h-full object-cover rounded-[10px]" src={`/images/Cronograma-capilar/${item.img}`} alt={item.text.replace(/<br\/>/g, ' ')} width={320} height={250} draggable={false} />
              <div className="absolute top-[7%] left-[10%] text-white font-['THE_NEXT_FONT'] text-[2.5vw]" dangerouslySetInnerHTML={{ __html: item.text }} />
              <Link href="/pagina-em-manutencao" className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[9vw] h-[2vw]">
                <Image src="/images/Cronograma-capilar/conheça.png" alt="Botão Conheça" layout="fill" />
              </Link>
            </div>
          ))}
        </section>

        {/* ======================================================================= */}
        {/* SEÇÕES PROMOCIONAIS                                                     */}
        {/* ======================================================================= */}
        <div className="flex flex-col my-20">
            <section className="flex items-end mx-auto">
                <Image src="/images/Cronograma-capilar/Aposte.png" alt="Maquiagens ousadas" width={600} height={500} />
                <div className="ml-[5vw] mr-[10vw] mb-[5vw]">
                    <p className="font-['THE_NEXT_FONT'] text-[3.5vw] mb-[1.4vw]">Aposte em Maquiagens ousadas!</p>
                    <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vw]">Está cansada das mesmas makes monótonas e sem brilho em toda festa? Veja agora mesmo 10 maquiagens para inovar e arrasar no visual! Aposte também em produtos que não danifiquem sua pele e preservem sua beleza natural.</p>
                    <button className="bg-[#722F53] text-white font-['THE_NEXT_FONT'] w-[9vw] h-[2.3vw] rounded-[20px] mt-4 border-none">DESCUBRA</button>
                </div>
            </section>
            <section className="flex items-end mx-auto">
                <div className="mr-[3.5vw] ml-[10vw] mb-[3.5vw]">
                    <p className="font-['THE_NEXT_FONT'] text-[3.5vw] mb-[1.4vw]">Vai se casar? esteja incrível para seu amor!</p>
                    <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vw]">Está de casamento marcado mas ainda não tem certeza sobre como deve se arrumar? Invista em você! Clique abaixo e descubra o kit de casamento perfeito, com looks, maquiagens e penteados usados por famosos e feitos para você!</p>
                    <button className="bg-[#722F53] text-white font-['THE_NEXT_FONT'] w-[9vw] h-[2.3vw] rounded-[20px] mt-4 border-none">DESCUBRA</button>
                </div>
                <Image src="/images/Cronograma-capilar/incrivel.png" alt="Mulher se casando" width={600} height={500} />
            </section>
            <section className="flex items-end mx-auto">
                <Image src="/images/Cronograma-capilar/maquiagens.png" alt="Autocuidado masculino" width={600} height={500} />
                 <div className="ml-[3.5vw] mr-[10vw] mb-[3.5vw]">
                    <p className="font-['THE_NEXT_FONT'] text-[3.5vw] mb-[1.4vw]">Autocuidado masculino</p>
                    <p className="font-['LOUIS_GEORGE_CAFE'] text-[2vw]">Se importar com a própria beleza não é mais irreal. Para quem dá aquele toque a mais na aparência, recebe autoestima e felicidade renovadas! Leia agora por onde começar a ter uma rotina capilar e de skincare.</p>
                    <button className="bg-[#722F53] text-white font-['THE_NEXT_FONT'] w-[9vw] h-[2.3vw] rounded-[20px] mt-4 border-none">DESCUBRA</button>
                </div>
            </section>
        </div>

        {/* ======================================================================= */}
        {/* SEÇÃO DASHBOARD DO CRONOGRAMA                                           */}
        {/* ======================================================================= */}
        <section id="no_cronograma" className="w-full h-auto lg:h-screen bg-[#FAF5FF] p-8 flex flex-wrap gap-8 justify-center items-center">
            {/* --- Coluna Esquerda --- */}
            <div id="esquerda" className="flex flex-col gap-[5vh]">
                <div id="progresso" className="bg-white p-4 rounded-xl shadow-md w-[35vw] h-auto min-w-[320px]">
                    <div className="flex justify-between items-center"><p className="font-bold">Progresso no Cronograma</p><div className="flex items-center gap-1 cursor-pointer"><p className="text-sm">Semanal</p><Image src="/images/Cronograma-capilar/Setinha.png" alt="seta" width={12} height={12} /></div></div>
                    <p className="text-3xl font-bold text-[#5F0B38] my-2">54%</p>
                    <div className="w-[33vw] h-[3vh] bg-gray-200 rounded-[40px]"><div className="h-full bg-gradient-to-r from-[#5F0B38] to-[#FFEEF7_67.7%] w-[54%] rounded-[40px]"></div></div>
                </div>
                <div id="oleos_e_dicas" className="flex gap-[3vw]">
                    <div className="bg-cover bg-center rounded-xl w-[16vw] h-[45vh] min-w-[180px] p-4 flex items-end text-white font-bold shadow-lg" style={{backgroundImage: "url('/images/Cronograma-capilar/oleos.png')"}}><p>óleos essenciais para cabelo: 7 opções poderosas</p></div>
                    <div className="bg-white rounded-xl w-[16vw] h-[45vh] min-w-[180px] p-4 shadow-md flex flex-col justify-around">
                        <div className="flex justify-between items-baseline"><p className="font-['THE_NEXT_FONT'] text-[2.2vw]">Dicas</p><p className="font-['LOUIS_GEORGE_CAFE'] text-[1vw]">Terça</p></div>
                        <div className="flex items-center gap-3 border-t pt-2"><Image className="w-[3vw] h-[3vw]" src="/images/Cronograma-capilar/Conta_gotas.svg" alt="ícone" width={32} height={32}/><div><p className="font-bold text-sm">Óleos</p><p className="text-xs">Babosa</p></div></div>
                        <div className="flex items-center gap-3 border-t pt-2"><Image className="w-[3vw] h-[3vw]" src="/images/Cronograma-capilar/pote.svg" alt="ícone" width={32} height={32}/><div><p className="font-bold text-sm">Máscara</p><p className="text-xs">Linha hidratante inoar</p></div></div>
                        <div className="flex items-center gap-3 border-t pt-2"><Image className="w-[3vw] h-[3vw]" src="/images/Cronograma-capilar/Sol.svg" alt="ícone" width={32} height={32}/><div><p className="font-bold text-sm">Duração</p><p className="text-xs">30 minutos</p></div></div>
                        <div className="flex items-center gap-3 border-t pt-2"><Image className="w-[3vw] h-[3vw]" src="/images/Cronograma-capilar/gota.svg" alt="ícone" width={32} height={32}/><div><p className="font-bold text-sm">Lavagem</p><p className="text-xs">água fria</p></div></div>
                    </div>
                </div>
            </div>
            {/* --- Coluna Direita --- */}
            <div id="direita" className="flex gap-[3vw]">
                <div className="flex flex-col gap-4">
                    <div id="hidratante" className="bg-white p-[0.8vw] rounded-xl shadow-md flex flex-col justify-center items-center text-center w-[14vw] h-[40vh] min-w-[180px]">
                        <Image className="w-[13vw] h-auto" src="/images/Cronograma-capilar/hidratante.png" alt="Hidratante Salon Line" width={150} height={180} />
                        <p className="font-bold mt-2">Hidratante Salon Line</p>
                        <p className="text-xs my-2">O hidratante capilar repõe a água dos fios. Deixa o cabelo macio e com brilho.</p>
                        <button className="bg-[#722F53] text-white font-['THE_NEXT_FONT'] px-4 py-1 rounded-full mt-auto text-sm">Conheça</button>
                    </div>
                    <div id="logo" className="bg-[#5E332C] rounded-xl w-[14vw] h-[30vh] min-w-[180px] flex items-center justify-center overflow-hidden">
                        <Image className="w-full h-full object-cover" src="/images/Cronograma-capilar/homem-garfo.png" alt="Modelo masculino" width={160} height={240} />
                    </div>
                </div>
                <div id="shampoos" className="bg-cover bg-center rounded-xl w-[20vw] h-[75vh] min-w-[220px] p-4 flex items-end text-white font-bold shadow-lg" style={{backgroundImage: "url('/images/Cronograma-capilar/barra.png')"}}>
                    <p>shampoos em barra? veja os 5 mais populares</p>
                </div>
            </div>
        </section>
        
        {/* ======================================================================= */}
        {/* SEÇÃO PALETA DE CORES                                                   */}
        {/* ======================================================================= */}
        <section id="cores" className="flex justify-center items-center gap-4 py-10 -mt-[15vh] relative z-20">
            <Image className="w-1/6 max-w-[180px] h-auto" src="/images/Cronograma-capilar/Retangulo_amarelo.png" alt="Paleta de cor amarela" width={180} height={60}/>
            <Image className="w-1/6 max-w-[180px] h-auto" src="/images/Cronograma-capilar/Retangulo_sem_borda.png" alt="Paleta de cor cinza" width={180} height={60}/>
            <Image className="w-1/6 max-w-[180px] h-auto" src="/images/Cronograma-capilar/Retangulo_roxo.png" alt="Paleta de cor roxa" width={180} height={60}/>
            <Image className="w-1/6 max-w-[180px] h-auto" src="/images/Cronograma-capilar/Retangulo_verde.png" alt="Paleta de cor verde" width={180} height={60}/>
        </section>
      </main>
    </div>
  );
}