"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/respostas.css";

const nomesEventos = {
  hidratacao: 'Hidratação',
  nutricao: 'Nutrição',
  reconstrucao: 'Reconstrução',
};

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const cronogramaSemanal = [
  {0: 'Hidratação: Máscara hidratante para repor água e maciez.', 3: 'Nutrição: Máscara com óleos/manteigas para brilho.', 6: 'Reconstrução: Máscara com queratina/aminoácidos para força.'},
  {0: 'Hidratação: Reforço de hidratação para manter leveza.', 3: 'Hidratação: Manutenção da maciez.', 6: 'Nutrição: Nutrição para fios mais sedosos.'},
  {0: 'Hidratação: Hidratação para revitalizar.', 3: 'Reconstrução: Reposição de proteínas.', 6: 'Hidratação: Hidratação para manter saúde.'},
  {0: 'Nutrição: Nutrição profunda.', 3: 'Hidratação: Hidratação para equilíbrio.', 6: 'Hidratação: Hidratação para finalizar o mês.'},
  {0: 'Hidratação: Reinício do ciclo.', 3: 'Nutrição: Nutrição extra.', 6: 'Reconstrução: Reforço de força.'},
];

function getNumeroSemanasDoMes(mes: number, ano: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  return Math.ceil((diasNoMes + primeiroDia) / 7);
}

function getTratamentoPorData(dia: number, mes: number, ano: number) {
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const semana = Math.floor((dia + primeiroDiaSemana - 1) / 7);
  const diaSemana = new Date(ano, mes, dia).getDay();
  if (diaSemana === 0 || diaSemana === 3 || diaSemana === 6) {
    const texto = cronogramaSemanal[semana % cronogramaSemanal.length][diaSemana];
    if (!texto) return null;
    return (Object.keys(nomesEventos) as Array<keyof typeof nomesEventos>).find(k => texto.toLowerCase().includes(nomesEventos[k].toLowerCase()));
  }
  return null;
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
          bolinha = <span className={`bolinha ${tratamento}`} title={nomesEventos[tratamento as keyof typeof nomesEventos]}></span>;
        }
        colunas.push(
          <td key={j}>{bolinha}<div>{dia}</div></td>        );
        dia++;
      }
    }
    linhas.push(<tr key={i}>{colunas}</tr>);
    if (dia > diasNoMes) break;
  }
  return (
    <>
      <table className="tabela-calendario">
        <thead>
          <tr>{diasSemana.map((d, i) => <th key={i}>{d}</th>)}</tr>
        </thead>
        <tbody>{linhas}</tbody>
      </table>
      <div className="legenda-calendario">
        <span><span className="bolinha hidratacao"></span> Hidratação</span>
        <span><span className="bolinha nutricao"></span> Nutrição</span>
        <span><span className="bolinha reconstrucao"></span> Reconstrução</span>
      </div>
    </>
  );
}

const diasSemana = [
  {id: 'domingo', nome: 'Domingo', dia: 0},
  {id: 'segunda', nome: 'Segunda', dia: 1},
  {id: 'terca', nome: 'Terça', dia: 2},
  {id: 'quarta', nome: 'Quarta', dia: 3},
  {id: 'quinta', nome: 'Quinta', dia: 4},
  {id: 'sexta', nome: 'Sexta', dia: 5},
  {id: 'sabado', nome: 'Sábado', dia: 6},
];

const Respostas: React.FC = () => {
  const [mesAtual, setMesAtual] = useState(6); // Julho (0-index)
  const [anoAtual, setAnoAtual] = useState(2025);
  const [semanaAtual, setSemanaAtual] = useState(0);

  useEffect(() => {
    setSemanaAtual(0);
  }, [mesAtual, anoAtual]);

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
    return diasSemana.map(({id, nome, dia}) => {
      let tipo = '';
      if (dia === 0 || dia === 3 || dia === 6) {
        const texto = cronogramaSemanal[semanaIndex][dia];
        if (texto) {
          if (texto.toLowerCase().includes('hidratação')) tipo = 'Hidratação';
          else if (texto.toLowerCase().includes('nutrição')) tipo = 'Nutrição';
          else if (texto.toLowerCase().includes('reconstrução')) tipo = 'Reconstrução';
        }
      } else {
        tipo = 'Pausa: Descanso ou cuidados leves.';
      }
      return (
        <div id={id} key={id}>
          <h1>{nome}</h1>
          <p>{tipo}</p>
        </div>
      );
    });
  }

  return (
    <main>
      <section className="de-ladinho">
        <div className="em-ciminha">
          <img id="logo" src="/images/logo-reduzida.png" alt="" />
          <img id="user" src="/images/resposta/user.png" alt="" />
        </div>
        <div className="botoes">
          <img src="/images/lupa.png" alt="" />
          <img src="/images/coracao.svg" alt="" />
          <img src="/images/tres-barras.svg" alt="" />
        </div>
        <div></div>
      </section>
      <section className="outro-ladinho">
        <div className="titulos">
          <h1>Cabelo Levemente Danificado</h1>
          <p>27/60 pontos</p>
        </div>
        <div className="abaixo">
          <section className="esquerda">
            <div className="info-texto">
              <img src="/images/resposta/img-cabelo.png" alt="" />
              <div className="content">
                <p>Cabelos com sinais leves de ressecamento, frizz moderado, pequena quebra, uso moderado de química/chapinha, porosidade alta leve, couro cabeludo com oleosidade leve.</p>
                <section className="detalhes">
                  <div className="elementos">
                    <div className="texto-e-img">
                      <img src="/images/resposta/calendario.png" alt="" />
                      <p id="texto">Tratamento</p>
                    </div>
                    <p id="explicacao">Médio</p>
                  </div>
                  <div className="elementos">
                    <div className="texto-e-img">
                      <img src="/images/resposta/relogio.png" alt="" />
                      <p id="texto">Duração</p>
                    </div>
                    <p id="explicacao">6 Meses</p>
                  </div>
                  <div className="elementos">
                    <div className="texto-e-img">
                      <img src="/images/resposta/secador.png" alt="" />
                      <p id="texto">Danos</p>
                    </div>
                    <p id="explicacao">Leve</p>
                  </div>
                </section>
              </div>
            </div>
            <div className="calendar">
              <h1>Semanal</h1>
              <div className="quadradinho">
                <div id="text">
                  <h1>03</h1>
                  <p>Lavagens</p>
                </div>
                <div id="text">
                  <h1>02</h1>
                  <p>Outros produtos</p>
                </div>
              </div>
            </div>
            <div className="calendar">
              <h1>Mensal</h1>
              <div className="quadradinho">
                <div id="text">
                  <h1>01</h1>
                  <p>Reconstrução</p>
                </div>
                <div id="text">
                  <h1>04</h1>
                  <p>Umectações</p>
                </div>
                <div id="text">
                  <h1>01</h1>
                  <p>Acidificações</p>
                </div>
              </div>
            </div>
            <div className="calenderio">
              <div className="calendario-nav">
                <button className="calendario-seta" onClick={handleMesAnterior} aria-label="Mês anterior">&#8592;</button>
                <h2 id="calendario-mes-ano">{nomesMeses[mesAtual]} {anoAtual}</h2>
                <button className="calendario-seta" onClick={handleMesProximo} aria-label="Próximo mês">&#8594;</button>
              </div>
              <div id="calendario-tabela">{gerarCalendario(mesAtual, anoAtual)}</div>
            </div>
          </section>
          <section className="direita">
            <h1>Informativo</h1>
            <div className="cronograma">
              <div className="aa">
                <button id="semana-anterior" onClick={handleSemanaAnterior}>←</button>
                <h1>Cronograma Semanal</h1>
                <button id="semana-proxima" onClick={handleSemanaProxima}>→</button>
              </div>
              <p id="data">{getSemanaLabel()}</p>
              <div className="dias-da-semana">
                <div className="conteudo">
                  {getCronogramaSemana()}
                </div>
              </div>
            </div>
            <section className="diquinhas">
              <div className="dicas">
                <h1>Dicas</h1>
                <p><strong>Antes de Aplicar:</strong> Lave com shampoo anti-resíduos 1x/semana, use água morna e retire o excesso de água antes da máscara.<br />
                  <strong>Durante:</strong> Aplique do comprimento às pontas, deixe agir 20-30min, use touca térmica e massageie.<br />
                  <strong>Finalização:</strong> Enxágue com água fria, use leave-in, evite água quente e durma com cabelo seco ou touca de cetim.<br />
                  <strong>Sinais de Atenção:</strong> Cabelo elástico: aumente reconstrução. Cabelo duro: aumente hidratação. Cabelo pesado: reduza óleos.</p>
              </div>
              <div className="dicas">
                <h1>Alimentação</h1>
                <p><strong>Proteínas:</strong> ovos, carnes, leguminosas.<br />
                  <strong>Vitaminas B:</strong> ovos, nozes, vegetais verdes.<br />
                  <strong>Ferro:</strong> carnes, feijão, vegetais escuros.<br />
                  <strong>Ômega 3:</strong> peixes, sementes.<br />
                  <strong>Zinco:</strong> frutos do mar, sementes.<br />
                  <strong>Vitamina A:</strong> cenoura, manga.<br />
                  <strong>Vitamina C:</strong> laranja, brócolis.<br />
                  <strong>Vitamina E:</strong> castanhas, azeite.<br />
                  <strong>Dica:</strong> Inclua proteína em todas as refeições, varie frutas e legumes, beba 2L de água/dia. Evite dietas restritivas e ultraprocessados.</p>
              </div>
            </section>
            <h2>Produtos recomendados</h2>
            <section className="produtos">
              <div className="produtinho">
                <h1>Hidratação</h1>
                <img src="/images/resposta/prod-1.png" alt="" />
                <p>Máscara 2 em 1 MITZIE, tratamento intenso para cabelos ressecados e sem brilho-</p>
                <button>Conheça</button>
              </div>
              <div className="produtinho">
                <h1>Nutrição</h1>
                <img src="/images/resposta/prod-2.png" alt="" />
                <p>Óleo de Argan, hidratação perfeita, nutrição profunda para cabelos secos e danificados.</p>
                <button>Conheça</button>
              </div>
              <div className="produtinho">
                <h1>Reconstrução</h1>
                <img src="/images/resposta/prod-3.png" alt="" />
                <p>Máscara de Reconstrução, força e proteção para cabelos fragilizados e quebradiços.</p>
                <button>Conheça</button>
              </div>
            </section>
            <section className="articles">
              <div className="artigo">
                <div id="conteudinho">
                  <p>13 jan 2025</p>
                  <div className="aaaa">
                    <div className="butoes">
                      <button>Moda</button>
                      <button>Marcas</button>
                    </div>
                    <h1>Os 10 melhores óleos essenciais</h1>
                  </div>
                </div>
                <img src="/images/resposta/Vector.png" alt="" />
              </div>
              <div className="artigo1">
                <div id="conteudinho">
                  <p>13 jan 2025</p>
                  <div className="aaaa">
                    <div className="butoes">
                      <button>Moda</button>
                      <button>Marcas</button>
                    </div>
                    <h1>Os 10 melhores óleos essenciais</h1>
                  </div>
                </div>
                <img src="/images/resposta/Vector.png" alt="" />
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Respostas;
