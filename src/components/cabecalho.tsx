import React from 'react';
import Image from 'next/image';
import "@/styles/cabecalho.css"; 
import "@/styles/globals.css";
export default function Cabecalho() {
  return (
    <header>
      <section>
        {/* HEADER TOP */}
        <div id="page1-header-top">
          <div id="page1-logo-container">
            <a href="/" rel="noreferrer">
              <Image
              
                src="/images/logo-oasis-total.png"
                alt="logo-oasis"
                width={150}
                height={50}
                priority
              />
            </a>
          </div>
          <div id="margin-header-top-itens"></div>
          <div id="page1-user">
            <a target="_blank" href="../../Pesquisa/index.html" rel="noreferrer">
              <Image src="/images/lupa.png" alt="Pesquisae" width={30} height={30} />
            </a>
            <a target="_blank" href="../../Favoritos/index.html" rel="noreferrer">
              <Image
                src="/images/salvo.png"
                alt="Favoritos"
                width={30}
                height={30}
              />
            </a>
            <a target="_blank" href="../../Tela-login/index.html" rel="noreferrer">
              <Image
                src="/images/perfil.png"
                alt="Usuario"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>

        {/* NAV */}
        <nav id="page1-header-bottom">
          {/* TABLE CORTES */}
          <table id="tableCortes">
            <thead>
              <tr>
                <th>
                  <a
                    target="_blank"
                    href="../../CorteS/index.html"
                    className="page1-header-bottom-itens"
                    rel="noreferrer"
                  >
                    CORTES
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr-cabecalho">
                {/* Tamanho */}
                <th>
                  <h1 className="textoAmarelo">Tamanho</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-tamanho-itens">
                    {['Super curto', 'Curto', 'Médio', 'Longo', 'Super Longo'].map((t, i) => (
                      <p key={i} className="textoRoxo">
                        {t}
                      </p>
                    ))}
                  </div>
                </th>

                {/* Formato */}
                <th>
                  <h1 className="textoAmarelo">Formato</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-formato-itens">
                    <div id="tr-cabecalho-formato-item1">
                      {['2A', '2B', '2C', '3A', '3B', '3C'].map((item, i) => (
                        <p key={i} className="textoRoxo">
                          {item}
                        </p>
                      ))}
                    </div>
                    <div id="tr-cabecalho-formato-item2">
                      {['4A', '4B', '4C'].map((item, i) => (
                        <p key={i} className="textoRoxo">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Tipo de rosto */}
                <th>
                  <h1 className="textoAmarelo">Tipo de rosto</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-tipo-de-rosto-itens">
                    {['Rosto Oval', 'Rosto Redondo', 'Rosto Coração', 'Rosto Quadrado', 'Rosto Diamante'].map(
                      (item, i) => (
                        <p key={i} className="textoRoxo">
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </th>

                {/* Banners */}
                <th>
                  <div id="tr-cabecalho-tipo-de-banners-itens">
                    <Image
                      src="/images/tela-principal/page1/cortes-banner1.png"
                      alt="a profissão de 2024: Transista"
                      width={200}
                      height={100}
                    />
                    <Image
                      src="/images/tela-principal/page1/cortes-banner2.png"
                      alt="Verão 2024 tendencias"
                      width={200}
                      height={100}
                    />
                  </div>
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABLE PENTEADOS */}
          <table id="tablePenteados" className="tableItensNone">
            <thead>
              <tr>
                <th>
                  <a href="#" className="page1-header-bottom-itens">
                    PENTEADOS
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr-cabecalho">
                {/* Tamanho */}
                <th>
                  <h1 className="textoAmarelo">Tamanho</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-tamanho-itens">
                    {['Super curto', 'Curto', 'Médio', 'Longo', 'Super Longo'].map((t, i) => (
                      <p key={i} className="textoRoxo">
                        {t}
                      </p>
                    ))}
                  </div>
                </th>

                {/* Penteados */}
                <th>
                  <h1 className="textoAmarelo">Penteados</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-formato-itens">
                    <div id="tr-cabecalho-formato-item1">
                      {['Trança', 'Coque', 'Com Elástico', 'Tradicionais', 'Para Festas!', 'Com Faixa'].map(
                        (p, i) => (
                          <p key={i} className="textoRoxo">
                            {p}
                          </p>
                        )
                      )}
                    </div>
                    <div id="tr-cabecalho-formato-item2">
                      {[
                        'Com laço',
                        'Para O Trabalho',
                        'Para quem está em transição',
                        'twist',
                        'com presilha',
                        'baby hair',
                      ].map((p, i) => (
                        <p key={i} className="textoRoxo">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Formato novamente */}
                <th>
                  <h1 className="textoAmarelo">Formato</h1>
                  <div className="linhaRoxa2"></div>
                  <div id="tr-cabecalho-formato-itens">
                    <div id="tr-cabecalho-formato-item1">
                      {['2A', '2B', '2C', '3A', '3B', '3C'].map((item, i) => (
                        <p key={i} className="textoRoxo">
                          {item}
                        </p>
                      ))}
                    </div>
                    <div id="tr-cabecalho-formato-item2">
                      {['4A', '4B', '4C'].map((item, i) => (
                        <p key={i} className="textoRoxo">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABLE COLORAÇÃO */}
          <table id="tablecoloracao" className="tableItensNone">
            <thead>
              <tr>
                <th>
                  <a href="#" className="page1-header-bottom-itens">
                    COLORAÇÃO
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                   className='hover-image'
                    src="/images/tela-principal/page1/hoverColoracao.png"
                    alt="COLORAÇÃO"
                    width={800}
                    height={100}
                  />
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABLE SKINCARE */}
          <table id="tableSkinCare" className="tableItensNone">
            <thead>
              <tr>
                <th>
                  <a target="_blank" href="/" className="page1-header-bottom-itens" rel="noreferrer">
                    Skincare
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                   className='hover-image'
                    src="/images/tela-principal/page1/hoverSkinCare.png"
                    alt="SkinCare"
                    width={800}
                    height={50}
                  />
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABLE CRONOGRAMA CAPILAR */}
          <table id="tableCronogramaCapilar" className="tableItensNone">
            <thead>
              <tr>
                <th>
                  <a href="#" className="textoAmarelo">
                    CRONOGRAMA CAPILAR
                  </a>
                </th>
              </tr>
            </thead>
          </table>

          {/* TABLE RECOMENDAÇÕES */}
          <table id="tableRecomendacoes" className="tableItensNone">
            <thead>
              <tr>
                <th>
                  <a href="#" className="page1-header-bottom-itens">
                    RECOMENDAÇÕES
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                    className='hover-image'
                    src="/images/tela-principal/page1/hoverRecomendacoes.png"
                    alt="Recomendações"
                    width={800}
                    height={100}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </nav>
      </section>
    </header>
  );
}
