import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/Header.module.css"; 
import "@/styles/globals.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <section>
        {/* TOPO DO HEADER */}
        <div className={styles.page1HeaderTop}>
          <div className={styles.page1LogoContainer}>
            <Link href="/">
              <Image
                src="/images/logo-oasis-total.png"
                alt="logo-oasis"
                width={225}
                height={154}
                priority
              />
            </Link>
          </div>
          <div className={styles.marginHeaderTopItens}></div>
          <div className={styles.page1User}>
            <Link href="/pesquisa">
              <Image src="/images/lupa.png" alt="Pesquisa" width={54} height={54} />
            </Link>
            <Link href="/favoritos">
              <Image
                src="/images/salvo.png"
                alt="Favoritos"
                width={54}
                height={54}
              />
            </Link>
            <Link href="/login">
              <Image
                src="/images/perfil.png"
                alt="Usuario"
                width={54}
                height={54}
              />
            </Link>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className={styles.page1HeaderBottom}>
          {/* TABELA CORTES */}
          <table className={styles.tableCortes}>
            <thead>
              <tr>
                <th>
                  <Link
                    href="/cortes"
                    className={styles.page1HeaderBottomItens}
                  >
                    CORTES
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trCabecalho}>
                {/* Tamanho */}
                <th>
                  <h1 className={styles.textoAmarelo}>Tamanho</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoTamanhoItens}>
                    {['Super curto', 'Curto', 'Médio', 'Longo', 'Super Longo'].map((tamanho, index) => (
                      <p key={index} className={styles.textoRoxo}>
                        {tamanho}
                      </p>
                    ))}
                  </div>
                </th>

                {/* Formato */}
                <th>
                  <h1 className={styles.textoAmarelo}>Formato</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoFormatoItens}>
                    <div className={styles.trCabecalhoFormatoItem1}>
                      {['2A', '2B', '2C', '3A', '3B', '3C'].map((formato, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {formato}
                        </p>
                      ))}
                    </div>
                    <div className={styles.trCabecalhoFormatoItem2}>
                      {['4A', '4B', '4C'].map((formato, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {formato}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Tipo de rosto */}
                <th>
                  <h1 className={styles.textoAmarelo}>Tipo de rosto</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoTipoDeRostoItens}>
                    {['Rosto Oval', 'Rosto Redondo', 'Rosto Coração', 'Rosto Quadrado', 'Rosto Diamante'].map(
                      (tipoRosto, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {tipoRosto}
                        </p>
                      )
                    )}
                  </div>
                </th>

                {/* Banners */}
                <th>
                  <div className={styles.trCabecalhoTipoDeBannersItens}>
                    <Image
                      src="/images/tela-principal/page1/cortes-banner1.png"
                      alt="a profissão de 2024: Trancista"
                      width={200}
                      height={100}
                    />
                    <Image
                      src="/images/tela-principal/page1/cortes-banner2.png"
                      alt="Verão 2024 tendências"
                      width={200}
                      height={100}
                    />
                  </div>
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABELA PENTEADOS */}
          <table className={styles.tablePenteados}>
            <thead>
              <tr>
                <th>
                  <Link href="/penteados" className={styles.page1HeaderBottomItens}>
                    PENTEADOS
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trCabecalho}>
                {/* Tamanho */}
                <th>
                  <h1 className={styles.textoAmarelo}>Tamanho</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoTamanhoItens}>
                    {['Super curto', 'Curto', 'Médio', 'Longo', 'Super Longo'].map((tamanho, index) => (
                      <p key={index} className={styles.textoRoxo}>
                        {tamanho}
                      </p>
                    ))}
                  </div>
                </th>

                {/* Penteados */}
                <th>
                  <h1 className={styles.textoAmarelo}>Penteados</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoFormatoItens}>
                    <div className={styles.trCabecalhoFormatoItem1}>
                      {['Trança', 'Coque', 'Com Elástico', 'Tradicionais', 'Para Festas!', 'Com Faixa'].map(
                        (penteado, index) => (
                          <p key={index} className={styles.textoRoxo}>
                            {penteado}
                          </p>
                        )
                      )}
                    </div>
                    <div className={styles.trCabecalhoFormatoItem2}>
                      {[
                        'Com laço',
                        'Para O Trabalho',
                        'Para quem está em transição',
                        'Twist',
                        'Com presilha',
                        'Baby hair',
                      ].map((penteado, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {penteado}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Formato novamente */}
                <th>
                  <h1 className={styles.textoAmarelo}>Formato</h1>
                  <div className={styles.linhaRoxa2}></div>
                  <div className={styles.trCabecalhoFormatoItens}>
                    <div className={styles.trCabecalhoFormatoItem1}>
                      {['2A', '2B', '2C', '3A', '3B', '3C'].map((formato, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {formato}
                        </p>
                      ))}
                    </div>
                    <div className={styles.trCabecalhoFormatoItem2}>
                      {['4A', '4B', '4C'].map((formato, index) => (
                        <p key={index} className={styles.textoRoxo}>
                          {formato}
                        </p>
                      ))}
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABELA COLORAÇÃO */}
          <table className={styles.tableColoracao}>
            <thead>
              <tr>
                <th>
                  <Link href="/coloracao" className={styles.page1HeaderBottomItens}>
                    COLORAÇÃO
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                    className={styles.hoverImage}
                    src="/images/tela-principal/page1/hoverColoracao.png"
                    alt="COLORAÇÃO"
                    width={800}
                    height={100}
                  />
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABELA SKINCARE */}
          <table className={styles.tableSkincare}>
            <thead>
              <tr>
                <th>
                  <Link href="/skincare" className={styles.page1HeaderBottomItens}>
                    Skincare
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                    className={styles.hoverImage}
                    src="/images/tela-principal/page1/hoverSkinCare.png"
                    alt="SkinCare"
                    width={800}
                    height={50}
                  />
                </th>
              </tr>
            </tbody>
          </table>

          {/* TABELA CRONOGRAMA CAPILAR */}
          <table className={styles.tableCronogramaCapilar}>
            <thead>
              <tr>
                <th>
                  <Link href="/cronograma-capilar" className={styles.textoAmarelo}>
                    CRONOGRAMA CAPILAR
                  </Link>
                </th>
              </tr>
            </thead>
          </table>

          {/* TABELA RECOMENDAÇÕES */}
          <table className={styles.tableRecomendacoes}>
            <thead>
              <tr>
                <th>
                  <Link href="/recomendacoes" className={styles.page1HeaderBottomItens}>
                    RECOMENDAÇÕES
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Image
                    className={styles.hoverImage}
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