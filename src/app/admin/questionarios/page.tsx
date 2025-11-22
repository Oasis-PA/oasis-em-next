"use client";
import React, { useState, useEffect } from "react";

interface Opcao {
  id_opcao?: number;
  valor: string;
  texto: string;
  ordem: number;
  id_pergunta?: number;
}

interface Pergunta {
  id_pergunta: number;
  pergunta: string;
  subtitulo?: string;
  campo_bd?: string;
  imagem_url?: string;
  ordem?: number;
  obrigatoria?: boolean;
  opcoes?: Opcao[];
}

interface Questionario {
  id_questionario: number;
  slug: string;
  titulo: string;
  descricao?: string;
  icon?: string;
  redirect_url?: string;
  ordem?: number;
  perguntas?: Pergunta[];
}

export default function AdminQuestionarios() {
  const [view, setView] = useState<"list" | "create-quiz" | "create-question" | "create-option">("list");
  const [questionarios, setQuestionarios] = useState<Questionario[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Questionario | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Pergunta | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedQuizIds, setExpandedQuizIds] = useState<number[]>([]);

  const toggleExpandQuiz = (id: number) => {
    setExpandedQuizIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  // Form states
  const [quizForm, setQuizForm] = useState({
    slug: "",
    titulo: "",
    descricao: "",
    icon: "📋",
    redirect_url: "",
    ordem: 0,
  });

  const [questionForm, setQuestionForm] = useState({
    pergunta: "",
    subtitulo: "",
    campo_bd: "",
    imagem_url: "/images/perguntas/Img principal.png",
    ordem: 1,
    obrigatoria: true,
  });

  const [optionForm, setOptionForm] = useState({
    valor: "",
    texto: "",
    ordem: 1,
  });

  // Carregar questionários
  useEffect(() => {
    loadQuestionarios();
  }, []);

  const loadQuestionarios = async () => {
    try {
      const response = await fetch("/api/admin/questionarios");
      const body = await response.json().catch(() => null);
      console.log("[ADMIN] GET /api/admin/questionarios", response.status, body);

      // normalizar formatos possíveis de resposta do backend
      let items: any[] = [];
      if (Array.isArray(body)) items = body;
      else if (Array.isArray(body?.data)) items = body.data;
      else if (Array.isArray(body?.questionarios)) items = body.questionarios;
      else if (body && typeof body === "object" && body !== null) {
        // caso o endpoint retorne { success: true, data: { ... } } com single item
        items = body.data && Array.isArray(body.data) ? body.data : (Array.isArray(body) ? body : []);
      }

      // garantir shape esperado pelo front: questionarios[].perguntas[].opcoes
      const normalized: Questionario[] = (items ?? []).map((q: any) => {
        const perguntasRaw = q.perguntas ?? q.Pergunta ?? q.questions ?? [];
        const perguntas = (perguntasRaw ?? []).map((p: any) => ({
          ...p,
          opcoes: p.opcoes ?? p.OpcaoResposta ?? p.options ?? [],
        }));
        return { ...q, perguntas };
      });

      setQuestionarios(normalized as Questionario[]);
    } catch (error) {
      console.error("Erro ao carregar questionários:", error);
      setQuestionarios([]);
    }
  };

  // Criar questionário
  const handleCreateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/questionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizForm),
      });
      const data = await response.json().catch(() => ({ ok: false }));
      console.log("[CREATE QUIZ] status:", response.status, "body:", data);
      if (!response.ok) {
        alert(`Erro ao criar questionário: ${data?.error ?? response.status}`);
      } else if (data.success) {
        alert("Questionário criado com sucesso!");
        setQuizForm({ slug: "", titulo: "", descricao: "", icon: "📋", redirect_url: "", ordem: 0 });
        await loadQuestionarios();
        setView("list");
      } else {
        alert("Erro ao criar questionário");
      }
    } catch (error) {
      console.error("[CREATE QUIZ] exception:", error);
      alert("Erro ao criar questionário (ver console)");
    } finally {
      setLoading(false);
    }
  };

  // Criar pergunta
  const handleCreateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedQuiz) { alert("Selecione um questionário primeiro."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/perguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...questionForm, id_questionario: selectedQuiz.id_questionario }),
      });
      const data = await response.json().catch(() => ({ ok: false }));
      console.log("[CREATE QUESTION] status:", response.status, "body:", data);
      if (!response.ok) {
        alert(`Erro ao criar pergunta: ${data?.error ?? response.status}`);
      } else if (data.success) {
        alert("Pergunta criada com sucesso!");
        setSelectedQuestion(data.data ?? null);
        setQuestionForm({ pergunta: "", subtitulo: "", campo_bd: "", imagem_url: "/images/perguntas/Img principal.png", ordem: (questionForm.ordem || 1) + 1, obrigatoria: true });
        await loadQuestionarios();
        setView("create-option");
      } else {
        alert("Erro ao criar pergunta");
      }
    } catch (error) {
      console.error("[CREATE QUESTION] exception:", error);
      alert("Erro ao criar pergunta (ver console)");
    } finally {
      setLoading(false);
    }
  };

  // Criar opção
  const handleCreateOption = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedQuestion) { alert("Selecione uma pergunta primeiro."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/opcoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...optionForm, id_pergunta: selectedQuestion.id_pergunta }),
      });
      const data = await response.json().catch(() => ({ ok: false }));
      console.log("[CREATE OPTION] status:", response.status, "body:", data);
      if (!response.ok) {
        alert(`Erro ao criar opção: ${data?.error ?? response.status}`);
      } else if (data.success) {
        alert("Opção criada com sucesso!");
        setOptionForm({ valor: "", texto: "", ordem: (optionForm.ordem || 1) + 1 });
        await loadQuestionarios();
      } else {
        alert("Erro ao criar opção");
      }
    } catch (error) {
      console.error("[CREATE OPTION] exception:", error);
      alert("Erro ao criar opção (ver console)");
    } finally {
      setLoading(false);
    }
  };

  // Deletar questionário
  const handleDeleteQuiz = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este questionário?")) return;

    try {
      const response = await fetch(`/api/admin/questionarios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Questionário deletado!");
        await loadQuestionarios();
      } else {
        alert("Erro ao deletar questionário");
      }
    } catch (error) {
      alert("Erro ao deletar questionário");
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Louis George Cafe', sans-serif; }
      `}</style>

      <header style={styles.header}>
        <h1>🎯 Admin - Questionários</h1>
        <button
          style={styles.btnPrimary}
          onClick={() => setView("create-quiz")}
        >
          + Novo Questionário
        </button>
      </header>

      {/* ========== LISTA DE QUESTIONÁRIOS ========== */}
      {view === "list" && (
        <div style={styles.content}>
          <h2>Questionários Cadastrados</h2>

          {questionarios.length === 0 ? (
            <div style={styles.empty}>
              <p>Nenhum questionário cadastrado ainda.</p>
              <button
                style={styles.btnPrimary}
                onClick={() => setView("create-quiz")}
              >
                Criar Primeiro Questionário
              </button>
            </div>
          ) : (
            <div style={styles.grid}>
              {questionarios.map((quiz: Questionario) => (
                <div key={quiz.id_questionario} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.icon}>{quiz.icon}</span>
                    <h3>{quiz.titulo}</h3>
                  </div>

                  <p style={styles.description}>{quiz.descricao}</p>

                  <div style={styles.meta}>
                    <span>🔗 /{quiz.slug}</span>
                    <span>📝 {quiz.perguntas?.length || 0} perguntas</span>
                  </div>

                  <div style={styles.cardActions}>
                    <button
                      style={styles.btnSecondary}
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setView("create-question");
                      }}
                    >
                      Adicionar Pergunta
                    </button>
                    <button
                      style={styles.btnDanger}
                      onClick={() => handleDeleteQuiz(quiz.id_questionario)}
                    >
                      Deletar
                    </button>
                  </div>

                  {/* Lista de perguntas: botão para expandir/colapsar e exibição detalhada */}
                  <div style={{ marginTop: 12 }}>
                    <button
                      style={{ ...styles.btnSecondary, marginBottom: 8 }}
                      onClick={() => toggleExpandQuiz(quiz.id_questionario)}
                    >
                      {expandedQuizIds.includes(quiz.id_questionario) ? "Ocultar perguntas" : "Ver perguntas"}
                    </button>

                    {expandedQuizIds.includes(quiz.id_questionario) && (
                      <div style={styles.questionList}>
                        <h4>Perguntas ({quiz.perguntas?.length ?? 0}):</h4>
                        {(quiz.perguntas ?? []).map((pergunta: Pergunta, idx: number) => (
                          <div key={pergunta.id_pergunta} style={styles.questionItem}>
                            <div style={{ flex: 1 }}>
                              <strong>{idx + 1}.</strong> {pergunta.pergunta}
                              {pergunta.subtitulo && <div style={{ color: "#6b7280", fontSize: 12 }}>{pergunta.subtitulo}</div>}
                              {/* options preview */}
                              <div style={{ marginTop: 8 }}>
                                {(pergunta.opcoes ?? []).slice(0, 10).map((opt: Opcao) => (
                                  <span key={opt.id_opcao} style={{ display: "inline-block", marginRight: 8, background: "#f3f4f6", padding: "4px 8px", borderRadius: 8, fontSize: 12 }}>
                                    {opt.texto}
                                  </span>
                                ))}
                                {(pergunta.opcoes?.length ?? 0) > 10 && <span style={{ marginLeft: 8, color: "#6b7280", fontSize: 12 }}>+{(pergunta.opcoes?.length ?? 0) - 10} mais</span>}
                              </div>
                            </div>

                            <div style={{ marginLeft: 12 }}>
                              <span style={styles.badge}>{pergunta.opcoes?.length ?? 0} opções</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========== CRIAR QUESTIONÁRIO ========== */}
      {view === "create-quiz" && (
        <div style={styles.content}>
          <button
            style={styles.btnBack}
            onClick={() => setView("list")}
          >
            ← Voltar
          </button>

          <h2>Criar Novo Questionário</h2>

          <form onSubmit={handleCreateQuiz} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Slug (URL única) *</label>
              <input
                type="text"
                value={quizForm.slug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuizForm({ ...quizForm, slug: e.target.value })
                }
                placeholder="avatar, pele, cabelo..."
                required
                style={styles.input}
              />
              <small>Será usado na URL: /meu-perfil/questionario/{quizForm.slug}</small>
            </div>

            <div style={styles.formGroup}>
              <label>Título *</label>
              <input
                type="text"
                value={quizForm.titulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuizForm({ ...quizForm, titulo: e.target.value })
                }
                placeholder="Monte seu Perfil"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Descrição</label>
              <textarea
                value={quizForm.descricao}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setQuizForm({ ...quizForm, descricao: e.target.value })
                }
                placeholder="Breve descrição do questionário..."
                style={styles.textarea}
                rows={3}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label>Ícone</label>
                <input
                  type="text"
                  value={quizForm.icon}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuizForm({ ...quizForm, icon: e.target.value })
                  }
                  placeholder="📋"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Ordem</label>
                <input
                  type="number"
                  value={quizForm.ordem}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuizForm({ ...quizForm, ordem: parseInt(e.target.value) || 0 })
                  }
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>URL de Redirecionamento</label>
              <input
                type="text"
                value={quizForm.redirect_url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuizForm({ ...quizForm, redirect_url: e.target.value })
                }
                placeholder="/meuperfil-after"
                style={styles.input}
              />
              <small>Para onde o usuário vai após completar</small>
            </div>

            <button
              type="submit"
              style={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Questionário"}
            </button>
          </form>
        </div>
      )}

      {/* ========== CRIAR PERGUNTA ========== */}
      {view === "create-question" && selectedQuiz && (
        <div style={styles.content}>
          <button
            style={styles.btnBack}
            onClick={() => {
              setView("list");
              setSelectedQuiz(null);
            }}
          >
            ← Voltar
          </button>

          <h2>Adicionar Pergunta</h2>
          <p style={styles.subtitle}>
            Questionário: <strong>{selectedQuiz?.titulo}</strong>
          </p>

          <form onSubmit={handleCreateQuestion} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Pergunta *</label>
              <input
                type="text"
                value={questionForm.pergunta}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestionForm({ ...questionForm, pergunta: e.target.value })
                }
                placeholder="Qual é o seu tipo de cabelo?"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Subtítulo</label>
              <input
                type="text"
                value={questionForm.subtitulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestionForm({ ...questionForm, subtitulo: e.target.value })
                }
                placeholder="Selecione uma opção"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Campo no Banco de Dados *</label>
              <input
                type="text"
                value={questionForm.campo_bd}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestionForm({ ...questionForm, campo_bd: e.target.value })
                }
                placeholder="tipo_cabelo"
                required
                style={styles.input}
              />
              <small>Nome do campo onde a resposta será salva</small>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label>URL da Imagem</label>
                <input
                  type="text"
                  value={questionForm.imagem_url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestionForm({ ...questionForm, imagem_url: e.target.value })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Ordem</label>
                <input
                  type="number"
                  value={questionForm.ordem}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestionForm({
                      ...questionForm,
                      ordem: parseInt(e.target.value) || 0,
                    })
                  }
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={questionForm.obrigatoria}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestionForm({
                      ...questionForm,
                      obrigatoria: e.target.checked,
                    })
                  }
                />
                {" "}Pergunta obrigatória
              </label>
            </div>

            <button
              type="submit"
              style={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Pergunta e Adicionar Opções"}
            </button>
          </form>
        </div>
      )}

      {/* ========== CRIAR OPÇÕES ========== */}
      {view === "create-option" && selectedQuestion && (
        <div style={styles.content}>
          <button
            style={styles.btnBack}
            onClick={() => {
              setView("list");
              setSelectedQuestion(null);
            }}
          >
            ✓ Finalizar e Voltar
          </button>

          <h2>Adicionar Opções de Resposta</h2>
          <p style={styles.subtitle}>
            Pergunta: <strong>{selectedQuestion?.pergunta}</strong>
          </p>

          <form onSubmit={handleCreateOption} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Valor (será salvo no BD) *</label>
              <input
                type="text"
                value={optionForm.valor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOptionForm({ ...optionForm, valor: e.target.value })
                }
                placeholder="1A, oleosa, natural..."
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Texto (o usuário verá) *</label>
              <input
                type="text"
                value={optionForm.texto}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOptionForm({ ...optionForm, texto: e.target.value })
                }
                placeholder="Tipo 1A - Liso fino"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Ordem</label>
              <input
                type="number"
                value={optionForm.ordem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOptionForm({
                    ...optionForm,
                    ordem: parseInt(e.target.value) || 0,
                  })
                }
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              style={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? "Adicionando..." : "+ Adicionar Opção"}
            </button>
          </form>

          <div style={styles.infoBox}>
            <p>💡 <strong>Dica:</strong> Continue adicionando todas as opções de resposta para esta pergunta.</p>
            <p>Quando terminar, clique em "Finalizar e Voltar" acima.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem",
  },
  header: {
    background: "white",
    padding: "2rem",
    borderRadius: 12,
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  content: {
    background: "white",
    padding: "2rem",
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  btnPrimary: {
    background: "#F2A518",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: 8,
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  btnSecondary: {
    background: "#667eea",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: 6,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  btnDanger: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: 6,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  btnBack: {
    background: "transparent",
    border: "2px solid #667eea",
    color: "#667eea",
    padding: "0.5rem 1rem",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: "1rem",
  },
  btnSubmit: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "1rem",
    borderRadius: 8,
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
    marginTop: "1rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  card: {
    border: "2px solid #e5e7eb",
    borderRadius: 12,
    padding: "1.5rem",
    transition: "all 0.3s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "2rem",
  },
  description: {
    color: "#6b7280",
    marginBottom: "1rem",
    lineHeight: 1.5,
  },
  meta: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  cardActions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  questionList: {
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e5e7eb",
  },
  questionItem: {
    padding: "0.75rem",
    background: "#f9fafb",
    borderRadius: 6,
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
  },
  badge: {
    background: "#667eea",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: 12,
    fontSize: "0.75rem",
  },
  form: {
    marginTop: "2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e5e7eb",
    borderRadius: 8,
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e5e7eb",
    borderRadius: 8,
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical" as React.CSSProperties["resize"],
  },
  subtitle: {
    color: "#6b7280",
    marginTop: "0.5rem",
  },
  infoBox: {
    background: "#eff6ff",
    border: "2px solid #3b82f6",
    borderRadius: 8,
    padding: "1rem",
    marginTop: "2rem",
    lineHeight: 1.6,
  },
};