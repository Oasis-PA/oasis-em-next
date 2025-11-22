"use client";
import React, { useEffect, useState } from "react";
import "@/styles/perguntas.css";

interface Opcao {
  id_opcao?: number;
  texto: string;
  valor?: number | string;
  ordem?: number;
}

interface Pergunta {
  id_pergunta: number;
  pergunta: string;
  subtitulo?: string;
  imagem_url?: string;
  ordem?: number;
  OpcaoResposta?: Opcao[];
}

interface Questionario {
  id_questionario?: number;
  slug?: string;
  titulo: string;
  descricao?: string;
  icon?: string;
  ativo?: boolean;
  Pergunta?: Pergunta[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default function QuestionarioDinamico({ params }: Props) {
  // unwrap params promise in client component
  const resolvedParams = React.use(params as any) as { slug: string };
  const { slug } = resolvedParams;

  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // compute perguntas and current BEFORE any returns so hooks order is stable
  const perguntas = (questionario?.Pergunta ?? []).slice().sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  const current = perguntas[currentIndex];

  // sync selectedOption when current changes (hook placed before conditional returns)
  useEffect(() => {
    if (!current) {
      setSelectedOption(null);
      return;
    }
    const saved = answers[current.id_pergunta];
    setSelectedOption(saved ?? null);
  }, [currentIndex, current, answers]);

  // initial load effect (also before returns)
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/questionarios/${encodeURIComponent(slug)}`);
        const body = await res.json().catch(() => null);
        const q = body?.data ?? body;
        setQuestionario(q ?? null);
        setCurrentIndex(0);
        setAnswers({});
        setSelectedOption(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setQuestionario(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // early returns (hooks already declared above)
  if (loading) return <div className="loading">Carregando questionário...</div>;
  if (!questionario) return <div className="notFound">Questionário não encontrado</div>;

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value);
    if (!Number.isFinite(parsed)) return;
    const val = parsed;
    setSelectedOption(val);
    if (current) {
      setAnswers(prev => ({ ...prev, [current.id_pergunta]: val }));
    }
  };

  const handleNext = () => {
    if (!current) return;
    if (currentIndex < perguntas.length - 1) setCurrentIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const calculateTotalScore = () =>
    Object.values(answers).reduce((sum, v) => sum + Number(v || 0), 0);

  const getRedirectPage = (score: number) => {
    if (score <= 15) return "/respostas1";
    if (score <= 30) return "/respostas2";
    if (score <= 45) return "/respostas3";
    return "/respostas4";
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < perguntas.length) {
      alert(`Por favor, responda todas as perguntas. Você respondeu ${Object.keys(answers).length} de ${perguntas.length}.`);
      return;
    }
    const total = calculateTotalScore();
    const redirect = getRedirectPage(total);
    window.location.href = redirect;
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === perguntas.length - 1;

  return (
    <div className="page-perguntas-wrapper">
      <main>
        <section className="esquerda">
          <div className="content">
            <button className="seta" onClick={() => { setCurrentIndex(0); setSelectedOption(null); }}>
              <img src="/images/perguntas/setinha.png" alt="" />
              <p>Página Inicial</p>
            </button>

            <div className="pergunta-header">
              <div className="pergunta-titulo">
                <h1> Pergunta {currentIndex + 1}/{perguntas.length} </h1>
                <div className="pergunta-subtitulo">
                  <h2>{current?.pergunta}</h2>
                  <h3>{current?.subtitulo}</h3>
                </div>
              </div>
            </div>

            <img id="logo" src="/images/logobranca.png" alt="" />
          </div>
        </section>

        <section className="direita">
          <div className="conteudo">
            {current?.imagem_url ? (
              <img src={current.imagem_url} alt={current.pergunta} />
            ) : (
              <img src="/images/perguntas/Img principal.png" alt="" />
            )}

            <div className="respostas">
              {(current?.OpcaoResposta ?? [])
                .slice()
                .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
                .map((opt, idx) => {
                  const parsed = opt.valor != null && opt.valor !== "" ? Number(opt.valor) : NaN;
                  const numericValue = Number.isFinite(parsed) ? parsed : idx + 1;
                  const valueStr = String(numericValue);
                  return (
                    <label key={opt.id_opcao ?? idx} className={selectedOption === numericValue ? "selected" : ""}>
                      <input
                        type="radio"
                        name={`opcao-${current.id_pergunta}`}
                        value={valueStr}
                        checked={selectedOption === numericValue}
                        onChange={handleOptionChange}
                      />
                      <span>{opt.texto}</span>
                    </label>
                  );
                })}
            </div>

            <div className="botoes">
              {!isFirst && (
                <button onClick={handlePrev} id="number_one">Anterior</button>
              )}
              {!isLast ? (
                <button onClick={handleNext} id="number_two">Próximo</button>
              ) : (
                <button onClick={handleSubmitQuiz} id="number_two" className="finalizar-quiz-btn">Finalizar Quiz</button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}