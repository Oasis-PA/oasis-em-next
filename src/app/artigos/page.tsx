
import '@/styles/artigo-geral.css';
export default function artigosMain (){
  // Componente para o ícone de salvar (SVG) para reutilização
  const SaveIcon = ({ fill }: { fill?: string }) => (
    <svg xmlns="http://www.w.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
      <path d="M14 0H1.75C1.28587 0 0.840752 0.184374 0.512563 0.512563C0.184374 0.840752 0 1.28587 0 1.75V21C7.76971e-05 21.1562 0.0419427 21.3094 0.121251 21.444C0.200559 21.5785 0.31442 21.6893 0.451018 21.765C0.587617 21.8406 0.741976 21.8784 0.898076 21.8743C1.05418 21.8701 1.20633 21.8243 1.33875 21.7416L7.875 17.6564L14.4123 21.7416C14.5447 21.824 14.6968 21.8696 14.8527 21.8736C15.0087 21.8776 15.1628 21.8398 15.2992 21.7642C15.4357 21.6885 15.5494 21.5778 15.6287 21.4434C15.7079 21.3091 15.7498 21.156 15.75 21V1.75C15.75 1.28587 15.5656 0.840752 15.2374 0.512563C14.9092 0.184374 14.4641 0 14 0ZM14 19.4217L8.33766 15.8834C8.19859 15.7965 8.0379 15.7504 7.87391 15.7504C7.70991 15.7504 7.54922 15.7965 7.41016 15.8834L1.75 19.4217V1.75H14V19.4217Z" fill={fill || "var(--corpo-texto)"}/>
    </svg>
  );

  return (
    <>
     
      <h5>Por dentro das notícias</h5>
      <p>Veja aqui os melhores artigos sobre cuidados, beleza e dicas. Salve os seus favoritos e leia sempre que quiser!</p> 

      <main>
        <h5>RECENTES</h5>

        <section className="grupo-1">
          <p>19 jun 2024</p>
          <SaveIcon />
          <h4>OS DILEMAS DO SÉCULO XXI: QUAL CREME COMPRAR?</h4>
          <div className="Cartegorias">
            <p id="c1">Cabelo</p> 
            <p id="c2">Cremes e óleos</p>
            <p id="c3">Produtos</p>
          </div>
          <img src="/images/artigo-geral/img produtos.png" alt="Exemplos de Produtos" />
        </section>
        
        <section className="grupo-2"> 
          <img src="/images/artigo-geral/imagem mulheres.png" alt="Imagem modelo" />
          <p className="data">13 jan 2025</p>
          <SaveIcon />
          <h4>Coleção verão Farm 2025</h4>
          <p className="descrição">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
          <div className="Cartegorias-ladodireito">
            <p>Moda</p>
            <p>Marcas</p>
          </div>
        </section>

        <section className="grupo-3"> 
          <img src="/images/artigo-geral/imagem homem.png" alt="Imagem modelo" />
          <p className="data">13 jan 2025</p>
          <SaveIcon />
          <h4>Coleção verão Farm 2025</h4>
          <p className="descrição">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
          <div className="Cartegorias-ladodireito">
            <p>Moda</p>
            <p>Marcas</p>
          </div>
        </section>
        
        <section className="seção">
          <div id="data" >
            <p>13 jan 2025</p>
          </div>
          <div id="texto">
            <h5>Coleção verão Farm 2025</h5>
          </div>
          <div className="Cartegorias-ladodireito" id="carte-seção">
            <p>Moda</p>
            <p>Marcas</p>
          </div>
        </section>
        
        <section className="seção2" >
          <section className="grupo-4"> 
            <img src="/images/artigo-geral/mulhergloss.png" alt="mulher passando gloss" />
            <p className="data" id="data4">13 jan 2025</p>
            <SaveIcon />
            <h4>Coleção verão Farm 2025</h4>
            <p className="descrição-s2">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-ladodireito" id="mulher-gloss">
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </section>

          <section className="grupo-5">
            <p id="descri" >“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-grupo5" id="cartegoria-grupo5">
              <p>Moda</p>
              <p>Marcas</p>
            </div>
            <img src="/images/artigo-geral/imagem meio.png" alt="" />
            <p className="data" id="data5">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4>Coleção verão Farm 2025</h4>
          </section>

          <section className="grupo-4">
            <img src="/images/artigo-geral/homem cabelo.png" alt="" />
            <p className="data" id="data4">13 jan 2025</p>
            <SaveIcon />
            <h4>Coleção verão Farm 2025</h4>
            <p className="descrição-s2">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-ladodireito" id="mulher-gloss">
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </section>
        </section>

        <img id="linha" src="/images/artigo-geral/linha.png" alt="" />

        <section className="grupos-linha1">
          <div> 
            <img src="/images/artigo-geral/img em linha1.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 2.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 3.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 4.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
        </section>

        <section className="grupos-linha2">
          <div> 
            <img src="/images/artigo-geral/img em linha 5.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 6.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 7.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
          <div> 
            <img src="/images/artigo-geral/img em linha 8.png" alt=""/>
            <p className="data-linha">13 jan 2025</p>
            <SaveIcon fill="white" />
            <h4 className="h4-linha">Coleção verão Farm 2025</h4>
            <p className="descrição-linha">“Pra quem adora o novo mas não abre mão do original, chegou a coleção de Verão oficial da Farm Rio 2025...</p>
            <div className="Cartegorias-linha" >
              <p>Moda</p>
              <p>Marcas</p>
            </div>
          </div>
        </section>

        <section className="cronograma-capilar">
            <img src="/images/artigo-geral/img cronograma capilar.png" alt="Mulher com cabelo cacheado" />
            <h5> Voce já fez o seu cronograma capilar?</h5>
            <button>
                <p>CRONOGRAMA</p>
            </button>
        </section>

        <section className="seção3">
            <div className="grupo-6"> 
                <img src="/images/artigo-geral/img1.png" alt="" />
                <p className="data" id="datas3">13 jan 2025</p>
                <SaveIcon />
                <h4>Coleção verão Farm 2025</h4>
                <div className="Cartegorias-g6" >
                    <p>Moda</p>
                    <p>Marcas</p>
                </div>
            </div>
            <div className="linha1">
                <div className="grupo-7">
                    <img src="/images/artigo-geral/img2.png" alt="" />
                    <p className="datag7">13 jan 2025</p>
                    <SaveIcon fill="white" />
                    <h4>Coleção verão Farm 2025</h4>
                    <div className="Cartegorias-g7" >
                        <p>Moda</p>
                        <p>Marcas</p>
                    </div>
                </div>
                <div className="grupo-7">
                    <img src="/images/artigo-geral/img 5.png" alt="" />
                    <p className="datag7">13 jan 2025</p>
                    <SaveIcon fill="white"/>
                    <h4>Coleção verão Farm 2025</h4>
                    <div className="Cartegorias-g7" >
                        <p>Moda</p>
                        <p>Marcas</p>
                    </div>
                </div>
            </div>
            <div className="linha2">
                <div className="grupo-7">
                    <img src="/images/artigo-geral/img3.png" alt="" />
                    <p className="datag7">13 jan 2025</p>
                    <SaveIcon fill="white"/>
                    <h4>Coleção verão Farm 2025</h4>
                    <div className="Cartegorias-g7" >
                        <p>Moda</p>
                        <p>Marcas</p>
                    </div>
                </div>
                <div className="grupo-7">
                    <img src="/images/artigo-geral/img 4.png" alt="" />
                    <p className="datag7">13 jan 2025</p>
                    <SaveIcon fill="white"/>
                    <h4>Coleção verão Farm 2025</h4>
                    <div className="Cartegorias-g7" >
                        <p>Moda</p>
                        <p>Marcas</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

     
    </>
  );
};

