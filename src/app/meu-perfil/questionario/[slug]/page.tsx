"use client";
import React, { useEffect, useState } from "react";
import "@/styles/perguntas.module.css";

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
  campo_bd?: string;
  OpcaoResposta?: Opcao[];
}

interface Questionario {
  id_questionario?: number;
  slug?: string;
  titulo: string;
  descricao?: string;
  icon?: string;
  ativo?: boolean;
  redirect_url?: string;
  Pergunta?: Pergunta[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default function QuestionarioDinamico({ params }: Props) {
  const resolvedParams = React.use(params as any) as { slug: string };
  const { slug } = resolvedParams;

  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const perguntas = (questionario?.Pergunta ?? [])
    .slice()
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  const current = perguntas[currentIndex];

  useEffect(() => {
    if (!current) {
      setSelectedOption(null);
      return;
    }
    const saved = answers[current.id_pergunta];
    setSelectedOption(saved ?? null);
  }, [currentIndex, current, answers]);

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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5E332C",
        color: "white",
        fontSize: "1.5rem"
      }}>
        Carregando questionário...
      </div>
    );
  }

  if (!questionario) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#5E332C",
        color: "white",
        gap: "1rem"
      }}>
        <h1>Questionário não encontrado</h1>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: "1rem 2rem",
            background: "#F2A518",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setSelectedOption(valor);
    if (current) {
      setAnswers(prev => ({ ...prev, [current.id_pergunta]: valor }));
    }
  };

  const handleNext = () => {
    if (!current) return;
    if (currentIndex < perguntas.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length < perguntas.length) {
      alert(
        `Por favor, responda todas as perguntas. Você respondeu ${Object.keys(answers).length} de ${perguntas.length}.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Formatar respostas usando campo_bd das perguntas
      const respostasFormatadas: Record<string, string> = {};

      perguntas.forEach((pergunta) => {
        const resposta = answers[pergunta.id_pergunta];
        if (resposta !== undefined) {
          // Usar campo_bd como chave, ou fallback para id
          const campoKey = pergunta.campo_bd || `pergunta_${pergunta.id_pergunta}`;
          respostasFormatadas[campoKey] = resposta;
        }
      });

      console.log("Enviando respostas:", respostasFormatadas);

      // Salvar no backend
      const response = await fetch("/api/usuarios/perfil/questionario", {
        method: "POST",
        credentials: "include", // envia cookies para autenticação
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug,
          respostas: respostasFormatadas,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Questionário salvo com sucesso!");
        // Redirecionar para página configurada ou padrão
        const redirectUrl = questionario.redirect_url || "/meuperfil-after";
        window.location.href = redirectUrl;
      } else {
        alert(`Erro ao salvar: ${data.error || "Tente novamente"}`);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar respostas. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === perguntas.length - 1;

  return (
    <div className="page-perguntas-wrapper">
      <main>
        <section className="esquerda">
          <div className="content">
            <button
              className="seta"
              onClick={() => {
                if (window.confirm("Deseja voltar ao início? Seu progresso será mantido.")) {
                  setCurrentIndex(0);
                }
              }}
            >
              <img src="/images/perguntas/setinha.png" alt="Voltar" />
              <p>Página Inicial</p>
            </button>

            <div className="pergunta-header">
              <div className="pergunta-titulo">
                <h1>
                  Pergunta {currentIndex + 1}/{perguntas.length}
                </h1>
                <div className="pergunta-subtitulo">
                  <h2>{current?.pergunta}</h2>
                  <h3>{current?.subtitulo}</h3>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "auto" }}>
              <p style={{ color: "#AAA", fontSize: "0.9rem" }}>
                {questionario.titulo}
              </p>
              {questionario.descricao && (
                <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  {questionario.descricao}
                </p>
              )}
            </div>

            <img id="logo" src="/images/logobranca.png" alt="Logo" />
          </div>
        </section>

        <section className="direita">
          <div className="conteudo">
            {current?.imagem_url ? (
              <img src={current.imagem_url} alt={current.pergunta} />
            ) : (
              <img src="/images/perguntas/Img principal.png" alt="Ilustração" />
            )}

            <div className="respostas">
              {(current?.OpcaoResposta ?? [])
                .slice()
                .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
                .map((opt, idx) => {
                  // Usar o valor da opção ou gerar um valor único
                  const valorOpcao = opt.valor?.toString() || `opt_${opt.id_opcao || idx}`;
                  
                  return (
                    <label
                      key={opt.id_opcao ?? idx}
                      className={selectedOption === valorOpcao ? "selected" : ""}
                    >
                      <input
                        type="radio"
                        name={`opcao-${current.id_pergunta}`}
                        value={valorOpcao}
                        checked={selectedOption === valorOpcao}
                        onChange={handleOptionChange}
                      />
                      <span>{opt.texto}</span>
                    </label>
                  );
                })}
            </div>

            <div className="botoes">
              {!isFirst && (
                <button onClick={handlePrev} id="number_one">
                  Anterior
                </button>
              )}
              {!isLast ? (
                <button
                  onClick={handleNext}
                  id="number_two"
                  disabled={!selectedOption}
                  style={{
                    opacity: !selectedOption ? 0.5 : 1,
                    cursor: !selectedOption ? "not-allowed" : "pointer"
                  }}
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  id="number_two"
                  className="finalizar-quiz-btn"
                  disabled={isSubmitting || !selectedOption}
                  style={{
                    opacity: isSubmitting || !selectedOption ? 0.5 : 1,
                    cursor: isSubmitting || !selectedOption ? "not-allowed" : "pointer"
                  }}
                >
                  {isSubmitting ? "Salvando..." : "Finalizar Quiz"}
                </button>
              )}
            </div>

            {/* Barra de progresso */}
            <div style={{
              width: "100%",
              height: "4px",
              background: "#e5e7eb",
              borderRadius: "2px",
              marginTop: "2rem",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${((currentIndex + 1) / perguntas.length) * 100}%`,
                height: "100%",
                background: "#F2A518",
                transition: "width 0.3s ease"
              }} />
            </div>
            
            <p style={{
              textAlign: "center",
              color: "#666",
              fontSize: "0.9rem",
              marginTop: "0.5rem"
            }}>
              {Object.keys(answers).length} de {perguntas.length} perguntas respondidas
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}