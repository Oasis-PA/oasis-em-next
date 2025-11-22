"use client";
import React, { useState, useEffect } from "react";

interface Opcao {
  id_opcao?: number;
  valor: string;
  texto: string;
  ordem: number;
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

type ViewType = "list" | "create-quiz" | "edit-quiz" | "create-question" | "edit-question" | "create-option" | "edit-option";

export default function AdminQuestionarios() {
  const [view, setView] = useState<ViewType>("list");
  const [questionarios, setQuestionarios] = useState<Questionario[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Questionario | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Pergunta | null>(null);
  const [selectedOption, setSelectedOption] = useState<Opcao | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedQuizIds, setExpandedQuizIds] = useState<number[]>([]);

  const toggleExpandQuiz = (id: number) => {
    setExpandedQuizIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

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

  useEffect(() => {
    loadQuestionarios();
  }, []);

  const loadQuestionarios = async () => {
    try {
      const response = await fetch("/api/admin/questionarios");
      const body = await response.json();
      
      let items: any[] = [];
      if (Array.isArray(body)) items = body;
      else if (body?.data) items = Array.isArray(body.data) ? body.data : [body.data];

      const normalized: Questionario[] = items.map((q: any) => {
        const perguntasRaw = q.perguntas ?? q.Pergunta ?? [];
        const perguntas = perguntasRaw.map((p: any) => ({
          ...p,
          opcoes: p.opcoes ?? p.OpcaoResposta ?? [],
        }));
        return { ...q, perguntas };
      });

      setQuestionarios(normalized);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  const handleCreateQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/questionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Questionário criado!");
        resetQuizForm();
        await loadQuestionarios();
        setView("list");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao criar questionário");
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuiz = async () => {
    if (!selectedQuiz) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/questionarios/${selectedQuiz.id_questionario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Questionário atualizado!");
        resetQuizForm();
        await loadQuestionarios();
        setView("list");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao atualizar questionário");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id: number) => {
    if (!confirm("Deletar este questionário e todas suas perguntas?")) return;
    try {
      const res = await fetch(`/api/admin/questionarios/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Questionário deletado!");
        await loadQuestionarios();
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  const handleCreateQuestion = async () => {
    if (!selectedQuiz) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/perguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...questionForm, id_questionario: selectedQuiz.id_questionario }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Pergunta criada!");
        setSelectedQuestion(data.data);
        resetQuestionForm();
        await loadQuestionarios();
        setView("create-option");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao criar pergunta");
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuestion = async () => {
    if (!selectedQuestion) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/perguntas/${selectedQuestion.id_pergunta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Pergunta atualizada!");
        resetQuestionForm();
        await loadQuestionarios();
        setView("list");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao atualizar pergunta");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Deletar esta pergunta e todas suas opções?")) return;
    try {
      const res = await fetch(`/api/admin/perguntas/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Pergunta deletada!");
        await loadQuestionarios();
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  const handleCreateOption = async () => {
    if (!selectedQuestion) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/opcoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...optionForm, id_pergunta: selectedQuestion.id_pergunta }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Opção criada!");
        setOptionForm({ valor: "", texto: "", ordem: optionForm.ordem + 1 });
        await loadQuestionarios();
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao criar opção");
    } finally {
      setLoading(false);
    }
  };

  const handleEditOption = async () => {
    if (!selectedOption || !selectedOption.id_opcao) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/opcoes/${selectedOption.id_opcao}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(optionForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Opção atualizada!");
        resetOptionForm();
        await loadQuestionarios();
        setView("list");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao atualizar opção");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOption = async (id: number) => {
    if (!confirm("Deletar esta opção?")) return;
    try {
      const res = await fetch(`/api/admin/opcoes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Opção deletada!");
        await loadQuestionarios();
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  const resetQuizForm = () => {
    setQuizForm({ slug: "", titulo: "", descricao: "", icon: "📋", redirect_url: "", ordem: 0 });
    setSelectedQuiz(null);
  };

  const resetQuestionForm = () => {
    setQuestionForm({ pergunta: "", subtitulo: "", campo_bd: "", imagem_url: "/images/perguntas/Img principal.png", ordem: 1, obrigatoria: true });
    setSelectedQuestion(null);
  };

  const resetOptionForm = () => {
    setOptionForm({ valor: "", texto: "", ordem: 1 });
    setSelectedOption(null);
  };

  const openEditQuiz = (quiz: Questionario) => {
    setSelectedQuiz(quiz);
    setQuizForm({
      slug: quiz.slug,
      titulo: quiz.titulo,
      descricao: quiz.descricao || "",
      icon: quiz.icon || "📋",
      redirect_url: quiz.redirect_url || "",
      ordem: quiz.ordem || 0,
    });
    setView("edit-quiz");
  };

  const openEditQuestion = (pergunta: Pergunta, quiz: Questionario) => {
    setSelectedQuiz(quiz);
    setSelectedQuestion(pergunta);
    setQuestionForm({
      pergunta: pergunta.pergunta,
      subtitulo: pergunta.subtitulo || "",
      campo_bd: pergunta.campo_bd || "",
      imagem_url: pergunta.imagem_url || "/images/perguntas/Img principal.png",
      ordem: pergunta.ordem || 1,
      obrigatoria: pergunta.obrigatoria ?? true,
    });
    setView("edit-question");
  };

  const openEditOption = (opcao: Opcao, pergunta: Pergunta) => {
    setSelectedOption(opcao);
    setSelectedQuestion(pergunta);
    setOptionForm({
      valor: opcao.valor,
      texto: opcao.texto,
      ordem: opcao.ordem,
    });
    setView("edit-option");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🎯 Admin - Questionários</h1>
        <button style={styles.btnPrimary} onClick={() => { resetQuizForm(); setView("create-quiz"); }}>
          + Novo Questionário
        </button>
      </div>

      {/* LISTA */}
      {view === "list" && (
        <div style={styles.content}>
          <h2>Questionários ({questionarios.length})</h2>

          {questionarios.length === 0 ? (
            <div style={styles.empty}>
              <p>Nenhum questionário cadastrado.</p>
              <button style={styles.btnPrimary} onClick={() => setView("create-quiz")}>Criar Primeiro Questionário</button>
            </div>
          ) : (
            <div style={styles.grid}>
              {questionarios.map((quiz) => (
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
                    <button style={styles.btnEdit} onClick={() => openEditQuiz(quiz)}>✏️ Editar</button>
                    <button style={styles.btnSecondary} onClick={() => { setSelectedQuiz(quiz); setView("create-question"); }}>+ Pergunta</button>
                    <button style={styles.btnDanger} onClick={() => handleDeleteQuiz(quiz.id_questionario)}>🗑️ Deletar</button>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <button style={{ ...styles.btnSecondary, fontSize: "0.8rem", width: "100%" }} onClick={() => toggleExpandQuiz(quiz.id_questionario)}>
                      {expandedQuizIds.includes(quiz.id_questionario) ? "▼ Ocultar perguntas" : "▶ Ver perguntas"}
                    </button>

                    {expandedQuizIds.includes(quiz.id_questionario) && (
                      <div style={styles.questionList}>
                        {(quiz.perguntas ?? []).map((p, idx) => (
                          <div key={p.id_pergunta} style={styles.questionItem}>
                            <div style={{ flex: 1 }}>
                              <strong>{idx + 1}.</strong> {p.pergunta}
                              <div style={{ marginTop: 8 }}>
                                {(p.opcoes ?? []).slice(0, 3).map((opt) => (
                                  <span key={opt.id_opcao} style={styles.optionChip}>
                                    {opt.texto}
                                    <button style={styles.miniBtn} onClick={() => openEditOption(opt, p)}>✏️</button>
                                    <button style={styles.miniBtn} onClick={() => handleDeleteOption(opt.id_opcao!)}>🗑️</button>
                                  </span>
                                ))}
                                {(p.opcoes?.length || 0) > 3 && <span style={{ fontSize: 11, color: "#888" }}> +{(p.opcoes?.length || 0) - 3}</span>}
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <button style={styles.miniBtn2} onClick={() => openEditQuestion(p, quiz)}>✏️ Editar</button>
                              <button style={styles.miniBtn2} onClick={() => { setSelectedQuestion(p); setView("create-option"); }}>➕ Opção</button>
                              <button style={styles.miniBtn2} onClick={() => handleDeleteQuestion(p.id_pergunta)}>🗑️ Del</button>
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

      {/* CRIAR/EDITAR QUESTIONÁRIO */}
      {(view === "create-quiz" || view === "edit-quiz") && (
        <div style={styles.content}>
          <button style={styles.btnBack} onClick={() => { resetQuizForm(); setView("list"); }}>← Voltar</button>
          <h2>{view === "edit-quiz" ? "Editar Questionário" : "Criar Questionário"}</h2>
          <div style={styles.formBox}>
            <input style={styles.input} placeholder="Slug*" value={quizForm.slug} onChange={(e) => setQuizForm({ ...quizForm, slug: e.target.value })} disabled={view === "edit-quiz"} />
            <input style={styles.input} placeholder="Título*" value={quizForm.titulo} onChange={(e) => setQuizForm({ ...quizForm, titulo: e.target.value })} />
            <textarea style={styles.textarea} placeholder="Descrição" value={quizForm.descricao} onChange={(e) => setQuizForm({ ...quizForm, descricao: e.target.value })} rows={3} />
            <input style={styles.input} placeholder="Ícone" value={quizForm.icon} onChange={(e) => setQuizForm({ ...quizForm, icon: e.target.value })} />
            <input style={styles.input} placeholder="URL Redirecionamento" value={quizForm.redirect_url} onChange={(e) => setQuizForm({ ...quizForm, redirect_url: e.target.value })} />
            <input type="number" style={styles.input} placeholder="Ordem" value={quizForm.ordem} onChange={(e) => setQuizForm({ ...quizForm, ordem: parseInt(e.target.value) || 0 })} />
            <button style={styles.btnSubmit} onClick={view === "edit-quiz" ? handleEditQuiz : handleCreateQuiz} disabled={loading}>
              {loading ? "Salvando..." : (view === "edit-quiz" ? "Atualizar" : "Criar")}
            </button>
          </div>
        </div>
      )}

      {/* CRIAR/EDITAR PERGUNTA */}
      {(view === "create-question" || view === "edit-question") && (
        <div style={styles.content}>
          <button style={styles.btnBack} onClick={() => { resetQuestionForm(); setView("list"); }}>← Voltar</button>
          <h2>{view === "edit-question" ? "Editar Pergunta" : "Criar Pergunta"}</h2>
          <p>Questionário: <strong>{selectedQuiz?.titulo}</strong></p>
          <div style={styles.formBox}>
            <input style={styles.input} placeholder="Pergunta*" value={questionForm.pergunta} onChange={(e) => setQuestionForm({ ...questionForm, pergunta: e.target.value })} />
            <input style={styles.input} placeholder="Subtítulo" value={questionForm.subtitulo} onChange={(e) => setQuestionForm({ ...questionForm, subtitulo: e.target.value })} />
            <input style={styles.input} placeholder="Campo BD*" value={questionForm.campo_bd} onChange={(e) => setQuestionForm({ ...questionForm, campo_bd: e.target.value })} />
            <input style={styles.input} placeholder="URL Imagem" value={questionForm.imagem_url} onChange={(e) => setQuestionForm({ ...questionForm, imagem_url: e.target.value })} />
            <input type="number" style={styles.input} placeholder="Ordem" value={questionForm.ordem} onChange={(e) => setQuestionForm({ ...questionForm, ordem: parseInt(e.target.value) || 1 })} />
            <label style={{ display: "block", marginBottom: "1rem" }}>
              <input type="checkbox" checked={questionForm.obrigatoria} onChange={(e) => setQuestionForm({ ...questionForm, obrigatoria: e.target.checked })} /> Obrigatória
            </label>
            <button style={styles.btnSubmit} onClick={view === "edit-question" ? handleEditQuestion : handleCreateQuestion} disabled={loading}>
              {loading ? "Salvando..." : (view === "edit-question" ? "Atualizar" : "Criar e Adicionar Opções")}
            </button>
          </div>
        </div>
      )}

      {/* CRIAR/EDITAR OPÇÃO */}
      {(view === "create-option" || view === "edit-option") && (
        <div style={styles.content}>
          <button style={styles.btnBack} onClick={() => { resetOptionForm(); setView("list"); }}>✓ Finalizar</button>
          <h2>{view === "edit-option" ? "Editar Opção" : "Adicionar Opções"}</h2>
          <p>Pergunta: <strong>{selectedQuestion?.pergunta}</strong></p>
          <div style={styles.formBox}>
            <input style={styles.input} placeholder="Valor (BD)*" value={optionForm.valor} onChange={(e) => setOptionForm({ ...optionForm, valor: e.target.value })} />
            <input style={styles.input} placeholder="Texto (usuário vê)*" value={optionForm.texto} onChange={(e) => setOptionForm({ ...optionForm, texto: e.target.value })} />
            <input type="number" style={styles.input} placeholder="Ordem" value={optionForm.ordem} onChange={(e) => setOptionForm({ ...optionForm, ordem: parseInt(e.target.value) || 1 })} />
            <button style={styles.btnSubmit} onClick={view === "edit-option" ? handleEditOption : handleCreateOption} disabled={loading}>
              {loading ? "Salvando..." : (view === "edit-option" ? "Atualizar Opção" : "+ Adicionar Opção")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem" },
  header: { background: "white", padding: "2rem", borderRadius: 12, marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  content: { background: "white", padding: "2rem", borderRadius: 12, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  btnPrimary: { background: "#F2A518", color: "white", border: "none", padding: "0.75rem 1.5rem", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  btnSecondary: { background: "#667eea", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer" },
  btnEdit: { background: "#10b981", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer" },
  btnDanger: { background: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer" },
  btnBack: { background: "transparent", border: "2px solid #667eea", color: "#667eea", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer", marginBottom: "1rem" },
  btnSubmit: { background: "#10b981", color: "white", border: "none", padding: "1rem", borderRadius: 8, cursor: "pointer", fontWeight: 600, width: "100%", marginTop: "1rem" },
  miniBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "0.9rem", padding: "2px 4px", marginLeft: "4px" },
  miniBtn2: { background: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: "0.75rem", padding: "4px 8px", borderRadius: 4 },
  empty: { textAlign: "center", padding: "4rem 2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" },
  card: { border: "2px solid #e5e7eb", borderRadius: 12, padding: "1.5rem" },
  cardHeader: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" },
  icon: { fontSize: "2rem" },
  description: { color: "#6b7280", marginBottom: "1rem", lineHeight: 1.5, fontSize: "0.9rem" },
  meta: { display: "flex", gap: "1rem", fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" },
  cardActions: { display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" },
  questionList: { marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e5e7eb" },
  questionItem: { padding: "0.75rem", background: "#f9fafb", borderRadius: 6, marginTop: "0.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.9rem" },
  optionChip: { display: "inline-block", marginRight: 8, marginTop: 4, background: "#e0e7ff", padding: "4px 8px", borderRadius: 8, fontSize: 11 },
  formBox: { marginTop: "2rem" },
  input: { width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: 8, fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: 8, fontSize: "1rem", marginBottom: "1rem", resize: "vertical" as const, boxSizing: "border-box" },
};