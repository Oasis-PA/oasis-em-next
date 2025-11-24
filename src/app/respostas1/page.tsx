"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/respostas.module.css";

// 1. Adicionando a Interface do Usuário (igual ao Header)
interface User {
  nome: string;
  url_foto?: string;
}

const nomesEventos = {
  hidratacao: 'Hidratação',
  nutricao: 'Nutrição',
  reconstrucao: 'Reconstrução',
};

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// ... (Mantenha as funções gerarCronogramaSemanalEspacado, getNumeroSemanasDoMes, etc. como estão) ...
function gerarCronogramaSemanalEspacado() {
  const opcoes3 = [
    [0, 3, 6],
    [1, 4, 6],
    [2, 4, 6],
    [0, 2, 5],
    [1, 3, 6],
  ];
  const opcoes2 = [
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 6],
    [0, 3],
  ];
  const tipos = [
    'Hidratação: Máscara hidratante profunda.',
    'Nutrição: Máscara nutritiva com óleos.',
    'Reconstrução: Máscara reconstrutora.'
  ];
  const semanas: Array<Record<number, string>> = [];
  for (let i = 0; i < 6; i++) {
    let semana: Record<number, string> = {};
    if (i % 2 === 0) {
      const dias = opcoes3[i % opcoes3.length];
      dias.forEach((dia, idx) => {
        semana[dia] = tipos[(i + idx) % tipos.length];
      });
    } else {
      const dias = opcoes2[i % opcoes2.length];
      dias.forEach((dia, idx) => {
        semana[dia] = tipos[(i + idx) % tipos.length];
      });
    }
    semanas.push(semana);
  }
  return semanas;
}

const cronogramaSemanal: Array<Record<number, string>> = gerarCronogramaSemanalEspacado();

function getNumeroSemanasDoMes(mes: number, ano: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  return Math.ceil((diasNoMes + primeiroDia) / 7);
}

function getTratamentoPorData(dia: number, mes: number, ano: number) {
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const semana = Math.floor((dia + primeiroDiaSemana - 1) / 7);
  const diaSemana = new Date(ano, mes, dia).getDay();
  const semanaObj = cronogramaSemanal[semana % cronogramaSemanal.length];
  const texto = semanaObj ? semanaObj[diaSemana] : undefined;
  if (!texto) return null;
  return (Object.keys(nomesEventos) as Array<keyof typeof nomesEventos>).find(k => texto.toLowerCase().includes(nomesEventos[k].toLowerCase()));
}

function gerarCalendario(mes: number, ano: number) {
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const linhas: React.JSX.Element[] = [];
  let dia = 1;
  for (let i = 0; i < 6; i++) {
    const colunas: React.JSX.Element[] = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < primeiroDia) || dia > diasNoMes) {
        colunas.push(<td key={j}></td>);
      } else {
        const tratamento = getTratamentoPorData(dia, mes, ano);
        let bolinha = null;
        if (tratamento) {
          bolinha = <span className={`${styles.dot} ${styles[tratamento]}`} title={nomesEventos[tratamento as keyof typeof nomesEventos]}></span>;
        }
        colunas.push(
          <td key={j}>{bolinha}<div className={styles.calendarDayNumber}>{dia}</div></td>);
        dia++;
      }
    }
    linhas.push(<tr key={i}>{colunas}</tr>);
    if (dia > diasNoMes) break;
  }
  return (
    <>
      <table className={styles.calendarTable}>
        <thead>
          <tr>{diasSemana.map((d, i) => <th key={i}>{d}</th>)}</tr>
        </thead>
        <tbody>{linhas}</tbody>
      </table>
      <div className={styles.calendarLegend}>
        <span><span className={`${styles.dot} ${styles.hidratacao}`}></span> Hidratação</span>
        <span><span className={`${styles.dot} ${styles.nutricao}`}></span> Nutrição</span>
        <span><span className={`${styles.dot} ${styles.reconstrucao}`}></span> Reconstrução</span>
      </div>
    </>
  );
}

const diasSemana = [
  { id: 'domingo', nome: 'Domingo', dia: 0 },
  { id: 'segunda', nome: 'Segunda', dia: 1 },
  { id: 'terca', nome: 'Terça', dia: 2 },
  { id: 'quarta', nome: 'Quarta', dia: 3 },
  { id: 'quinta', nome: 'Quinta', dia: 4 },
  { id: 'sexta', nome: 'Sexta', dia: 5 },
  { id: 'sabado', nome: 'Sábado', dia: 6 },
];

const Respostas: React.FC = () => {
  const [mesAtual, setMesAtual] = useState(6);
  const [anoAtual, setAnoAtual] = useState(2025);
  const [semanaAtual, setSemanaAtual] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 2. Estado para o Usuário
  const [user, setUser] = useState<User | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 3. useEffect para buscar a foto (Igual ao Header)
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/usuarios/perfil');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        setUser(null);
      }
    }

    fetchUserProfile();
  }, []);

  useEffect(() => {
    setSemanaAtual(0);
  }, [mesAtual, anoAtual]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // ... (Mantenha as funções handleSemanaAnterior, handleMesProximo, etc. como estão) ...
  function handleSemanaAnterior() {
    if (semanaAtual === 0) {
      let novoMes = mesAtual - 1;
      let novoAno = anoAtual;
      if (novoMes < 0) {
        novoMes = 11;
        novoAno--;
      }
      setMesAtual(novoMes);
      setAnoAtual(novoAno);
      setSemanaAtual(0);
    } else {
      setSemanaAtual(semanaAtual - 1);
    }
  }

  function handleSemanaProxima() {
    const numSemanas = getNumeroSemanasDoMes(mesAtual, anoAtual);
    if (semanaAtual === numSemanas - 1) {
      let novoMes = mesAtual + 1;
      let novoAno = anoAtual;
      if (novoMes > 11) {
        novoMes = 0;
        novoAno++;
      }
      setMesAtual(novoMes);
      setAnoAtual(novoAno);
      setSemanaAtual(0);
    } else {
      setSemanaAtual(semanaAtual + 1);
    }
  }

  function handleMesAnterior() {
    let novoMes = mesAtual - 1;
    let novoAno = anoAtual;
    if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
    setSemanaAtual(0);
  }

  function handleMesProximo() {
    let novoMes = mesAtual + 1;
    let novoAno = anoAtual;
    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    }
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
    setSemanaAtual(0);
  }

  function getSemanaLabel() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1).getDay();
    const inicioSemana = semanaAtual * 7 + 1 - primeiroDiaMes;
    let semanaReal = 1;
    if (inicioSemana > 0) {
      semanaReal = Math.ceil((inicioSemana + primeiroDiaMes) / 7);
    }
    return `semana ${semanaReal} - ${nomesMeses[mesAtual]} ${anoAtual}`;
  }

  function getCronogramaSemana() {
    const semanaIndex = semanaAtual % cronogramaSemanal.length;
    return diasSemana.map(({ id, nome, dia }) => {
      let tipo = '';
      const semanaObj = cronogramaSemanal[semanaIndex];
      const texto = semanaObj ? semanaObj[dia] : undefined;
      if (texto) {
        if (texto.toLowerCase().includes('hidratação')) tipo = 'Hidratação';
        else if (texto.toLowerCase().includes('nutrição')) tipo = 'Nutrição';
        else if (texto.toLowerCase().includes('reconstrução')) tipo = 'Reconstrução';
      } else {
        tipo = 'Pausa: Descanso ou cuidados leves.';
      }
      return (
        <div key={id} className={styles.weekDayItem}>
          <h1>{nome}</h1>
          <p>{tipo}</p>
        </div>
      );
    });
  }

  return (
    <main className={styles.pageWrapper}>
      {/* Sidebar */}
      <section className={styles.sidebar}>
        <div className={styles.topIcons}>
          <Link href="/">
            <img className={styles.logo} src="/images/logo-reduzida.png" alt="Logo" />
          </Link>
          
          {/* 4. Atualização da imagem do usuário */}
          <Link href="/perfil"> {/* Opcional: Link para o perfil ao clicar na foto */}
            <img 
                className={styles.userAvatar} 
                src={user?.url_foto ? user.url_foto : "/images/resposta/user.png"} 
                alt="User Profile" 
            />
          </Link>
          
        </div>
        <div className={styles.navButtons}>
          <Link href="/guia">
            <img src="/images/lupa.png" alt="Ir para Guia" />
          </Link>
          <Link href="/favoritos">
            <img src="/images/coracao.svg" alt="Ir para Favoritos" />
          </Link>
          <img
            src="/images/tres-barras.svg"
            alt="Menu"
            onClick={toggleMenu}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div></div>
      </section>

      {/* ... Restante do código (Menu Mobile, Main Layout, etc) permanece idêntico ... */}
      
      {/* Menu Mobile */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.active : ''}`} onClick={closeMenu}></div>
      <div className={`${styles.menuMobile} ${menuOpen ? styles.active : ''}`}>
        <button className={styles.menuClose} onClick={closeMenu}>✕</button>
        <Link href="/guia" onClick={closeMenu}>
          <img src="/images/lupa.png" alt="Guia" />
          <span>Guia</span>
        </Link>
        <Link href="/favoritos" onClick={closeMenu}>
          <img src="/images/coracao.svg" alt="Favoritos" />
          <span>Favoritos</span>
        </Link>
      </div>

      <section className={styles.mainLayout}>
        <div className={styles.titles}>
          <h1>Cabelo Saudável</h1>
          <p>15/60 pontos</p>
        </div>
        <div className={styles.contentGrid}>
          <section className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <div className={`${styles.infoImage} ${styles.infoImage1}`}></div>
              <div className={styles.cardContent}>
                <p>Cabelo com brilho natural, pouco frizz, boa resistência, sem ou com pouca química, couro cabeludo saudável e rotina de lavagem equilibrada.</p>
                <section className={styles.detailsList}>
                  <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <img src="/images/resposta/calendario.png" alt="" />
                      <p className={styles.detailLabel}>Tratamento</p>
                    </div>
                    <p className={styles.detailValue}>Manutenção</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <img src="/images/resposta/relogio.png" alt="" />
                      <p className={styles.detailLabel}>Duração</p>
                    </div>
                    <p className={styles.detailValue}>3 Meses</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <img src="/images/resposta/secador.png" alt="" />
                      <p className={styles.detailLabel}>Danos</p>
                    </div>
                    <p className={styles.detailValue}>Mínimo</p>
                  </div>
                </section>
              </div>
            </div>

            <section className={styles.statsWrapper}>
              <div className={styles.miniCalendar}>
                <h1>Semanal</h1>
                <div className={styles.statBox}>
                  <div className={styles.statItem}>
                    <h1>02-03</h1>
                    <p>Lavagens</p>
                  </div>
                  <div className={styles.statItem}>
                    <h1>03</h1>
                    <p>Tratamentos</p>
                  </div>
                </div>
              </div>
              <div className={styles.miniCalendar}>
                <h1>Mensal</h1>
                <div className={styles.statBox}>
                  <div className={styles.statItem}>
                    <h1>00</h1>
                    <p>Reconstrução</p>
                  </div>
                  <div className={styles.statItem}>
                    <h1>00</h1>
                    <p>Umectações</p>
                  </div>
                  <div className={styles.statItem}>
                    <h1>01</h1>
                    <p>Acidificações</p>
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.calendarSection}>
              <div className={styles.calendarNav}>
                <button className={styles.calendarArrow} onClick={handleMesAnterior} aria-label="Mês anterior">&#8592;</button>
                <h2 className={styles.calendarTitle}>{nomesMeses[mesAtual]} {anoAtual}</h2>
                <button className={styles.calendarArrow} onClick={handleMesProximo} aria-label="Próximo mês">&#8594;</button>
              </div>
              <div>{gerarCalendario(mesAtual, anoAtual)}</div>
            </div>
          </section>

          <section className={styles.rightColumn}>
            <h1>Informativo</h1>
            
            <div className={styles.scheduleCard}>
              <div className={styles.scheduleHeader}>
                <button onClick={handleSemanaAnterior}>←</button>
                <h2>Cronograma Semanal</h2>
                <button onClick={handleSemanaProxima}>→</button>
              </div>
              <p className={styles.scheduleDateLabel}>{getSemanaLabel()}</p>
              <div className={styles.weekDaysContainer}>
                <div className={styles.weekDaysContent}>
                  {getCronogramaSemana()}
                </div>
              </div>
            </div>

            <section className={styles.tipsContainer}>
              <div className={styles.tipCard}>
                <h2>Dicas</h2>
                <p><b>Antes de Aplicar:</b> Lave com shampoo suave sem sulfato, use água morna e retire o excesso de água antes da máscara.<br />
                  <b>Durante:</b> Aplique do comprimento às pontas, deixe agir 15-20min e massageie suavemente.<br />
                  <b>Finalização:</b> Enxágue com água fria, use leave-in leve, evite água quente e durma com fronha de cetim.<br />
                  <b>Manutenção:</b> Mantenha lavagem de 2 a 3x por semana. Evite excesso de calor. Corte a cada 3 meses para prevenir pontas duplas.</p>
              </div>
              <div className={styles.tipCard}>
                <h2>Alimentação</h2>
                <p><b>Proteínas:</b> ovos, carnes, leguminosas.<br />
                  <b>Vitaminas B:</b> ovos, nozes, vegetais verdes.<br />
                  <b>Ferro:</b> carnes, feijão, vegetais escuros.<br />
                  <b>Ômega 3:</b> peixes, sementes.<br />
                  <b>Zinco:</b> frutos do mar, sementes.<br />
                  <b>Vitamina A:</b> cenoura, manga.<br />
                  <b>Vitamina C:</b> laranja, brócolis.<br />
                  <b>Vitamina E:</b> castanhas, azeite.<br />
                  <b>Dica:</b> Inclua proteína em todas as refeições, varie frutas e legumes, beba 2L de água/dia. Evite dietas restritivas e ultraprocessados.</p>
              </div>
            </section>

            <h2>Produtos recomendados</h2>
            <section className={styles.productsContainer}>
              {/* PRODUTO 1 */}
              <div className={styles.productCard}>
                <h1>Shampoo Afro Vegan 300ml</h1>
                <div className={`${styles.productImage} ${styles.productImg1}`}></div>
                <p>Limpeza suave que não compromete a forma dos cachos. Nutre, hidrata, sela as cutículas, confere maciez e brilho, e estimula o crescimento saudável.</p>
                {/* ID de exemplo: 999. Substitua pelo ID real */}
                <Link href="/produtos/1619">
                  <button>Conheça</button>
                </Link>
              </div>

              {/* PRODUTO 2 */}
              <div className={styles.productCard}>
                <h1>Shampoo Higienizando a JUBA 500ml</h1>
                <div className={`${styles.productImage} ${styles.productImg2}`}></div>
                <p>Limpa, faz espuma e não embola os fios. Desenvolvido para respeitar as curvaturas, hidrata e nutre desde a primeira aplicação, com espuma cremosa.</p>
                {/* ID de exemplo: 999. Substitua pelo ID real */}
                <Link href="/produtos/1620">
                  <button>Conheça</button>
                </Link>
              </div>

              {/* PRODUTO 3 */}
              <div className={styles.productCard}>
                <h1>Shampoo Umectante Cachos 400ml</h1>
                <div className={`${styles.productImage} ${styles.productImg3}`}></div>
                <p>Limpa suavemente sem ressecar. Proporciona nutrição intensa, definição duradoura, controle do frizz e brilho. cabelos cacheados a crespos ou em transição.</p>
                {/* ID de exemplo: 999. Substitua pelo ID real */}
                <Link href="/produtos/1615">
                  <button>Conheça</button>
                </Link>
              </div>
            </section>

            <section className={styles.articlesContainer}>
              <Link href='artigo/como-escolher-o-corte-ideal-para-o-formato-do-rosto' className={`${styles.articleCard} ${styles.articleCard1}`}>
                <div className={styles.articleContent}>
                  <div className={styles.articleTextWrapper}>
                    <div className={styles.articleButtons}>
                      <button>Cortes</button>
                      <button>Marcas</button>
                    </div>
                    <h1>Como escolher o corte ideal para o formato do rosto</h1>
                  </div>
                </div>
                <img className={styles.articleArrow} src="/images/resposta/Vector.png" alt="" />
              </Link>
              <Link href='/artigo/shampoos-em-barra' className={`${styles.articleCard} ${styles.articleCard2}`}>
                <div className={styles.articleContent}>
                  <div className={styles.articleTextWrapper}>
                    <div className={styles.articleButtons}>
                      <button>Moda</button>
                      <button>Marcas</button>
                    </div>
                    <h1>Shampoos em barra: veja os 5 mais populares</h1>
                  </div>
                </div>
                <img className={styles.articleArrow} src="/images/resposta/Vector.png" alt="" />
              </Link>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Respostas;