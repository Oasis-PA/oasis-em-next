"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "./layout";

export default function GerenciamentoConta() {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState<number | null>(null);
  const [generos, setGeneros] = useState<{ id_genero: number; nome: string }[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmacaoTexto, setConfirmacaoTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  const [initialData, setInitialData] = useState({
    email: "",
    telefone: "",
    dataNascimento: "",
    genero: null as number | null,
  });

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      
      try {
        // Busca dados do perfil
        const resUsuario = await fetch("/api/usuarios/perfil");
        if (resUsuario.ok) {
          const data = await resUsuario.json();
          const fetchedData = {
            email: data.email || "",
            telefone: data.telefone || "",
            dataNascimento: data.data_nascimento?.split("T")[0] || "",
            genero: data.id_genero || null,
          };
          setEmail(fetchedData.email);
          setTelefone(fetchedData.telefone);
          setDataNascimento(fetchedData.dataNascimento);
          setGenero(fetchedData.genero);
          setInitialData(fetchedData);
        }

        // Busca lista de gêneros
        const resGeneros = await fetch("/api/usuarios/generos");
        if (resGeneros.ok) {
          const lista = await resGeneros.json();
          setGeneros(lista);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setMensagem("Erro ao carregar suas informações");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  // Auto-hide mensagem após 5 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!genero) {
      setMensagem("Por favor, selecione um gênero.");
      return;
    }

    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          telefone, 
          data_nascimento: dataNascimento, 
          id_genero: genero 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Erro ao atualizar dados");
      }
      
      // Atualiza o estado inicial com os novos dados salvos
      const newInitialData = {
        email,
        telefone,
        dataNascimento,
        genero,
      };
      setInitialData(newInitialData);
      
      setMensagem("Dados atualizados com sucesso!");
    } catch (err: any) {
      setMensagem(err.message || "Erro ao salvar dados");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      setMensagem("As novas senhas não coincidem.");
      return;
    }
    
    if (novaSenha.length < 6) {
      setMensagem("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Erro ao alterar senha");
      }
      
      setMensagem("Senha alterada com sucesso!");
      setShowPasswordModal(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: any) {
      setMensagem(err.message || "Erro ao alterar senha");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmacaoTexto.toUpperCase() !== "EXCLUIR") {
      setMensagem("Digite EXCLUIR para confirmar a exclusão.");
      return;
    }

    try {
      const res = await fetch("/api/usuarios/excluir", { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir a conta.");
      alert("Conta excluída com sucesso!");
      window.location.href = "/";
    } catch (err: any) {
      setMensagem(err.message);
    }
  };

  const handleReset = () => {
    setEmail(initialData.email);
    setTelefone(initialData.telefone);
    setDataNascimento(initialData.dataNascimento);
    setGenero(initialData.genero);
    setMensagem("");
  };

  return (
    <div className="page-gerenciamento-wrapper">
      <Layout 
        onCancel={handleReset} 
        onSave={handleSave}
        isLoading={loading}
      >
        <main>
          <Link 
            href="/" 
            className="btn-voltar" 
            style={{ 
              display: 'inline-block', 
              marginBottom: '30px', 
              color: 'var(--accent-color)', 
              textDecoration: 'none', 
              fontWeight: 500 
            }}
          >
            ← Voltar
          </Link>

          {loading && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              <p>Carregando suas informações...</p>
            </div>
          )}

          {!loading && (
            <section>
              <form id="gerenciamento-form" onSubmit={handleSave}>
                <h1>GERENCIE SUA CONTA</h1>
                <p id="faca-alteracoes">
                  Faça alterações nas suas informações pessoais ou no tipo de conta.
                </p>

                <h2 className="section-title">Sua Conta</h2>

                <div className="form-group">
                  <label htmlFor="E-mail-privado">Email - Privado *</label>
                  <input 
                    type="email" 
                    id="E-mail-privado" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                <div className="form-group password-group">
                  <label htmlFor="senha">Senha</label>
                  <div className="password-container">
                    <input 
                      type="password" 
                      id="senha" 
                      value="************" 
                      disabled 
                      readOnly 
                    />
                    <a 
                      href="#" 
                      className="alterar-link" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setShowPasswordModal(true); 
                      }}
                    >
                      Alterar
                    </a>
                  </div>
                </div>

                <h2 className="section-title" id="info-pessoais">
                  Informações Pessoais
                </h2>

                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input 
                    type="tel" 
                    id="telefone" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)} 
                    placeholder="(00) 00000-0000" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="data-nascimento">Data de nascimento</label>
                  <input 
                    type="date" 
                    id="data-nascimento" 
                    value={dataNascimento} 
                    onChange={(e) => setDataNascimento(e.target.value)} 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="genero">Gênero *</label>
                  <select 
                    id="genero" 
                    value={genero ?? ""} 
                    onChange={(e) => setGenero(Number(e.target.value))} 
                    required
                  >
                    <option value="" disabled>Selecione um gênero...</option>
                    {generos.map((g) => (
                      <option key={g.id_genero} value={g.id_genero}>
                        {g.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <h2 className="section-title" id="exclusao">Exclusão</h2>
                <div id="exclua">
                  <p>
                    Exclua permanentemente seus dados e tudo que estiver associado à sua conta
                  </p>
                  <a 
                    href="#" 
                    className="excluir-link" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setShowDeleteModal(true); 
                    }}
                  >
                    Excluir sua conta
                  </a>
                </div>
              </form>
            </section>
          )}

          {mensagem && (
            <div
              style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                padding: "15px 25px",
                borderRadius: "8px",
                backgroundColor: mensagem.toLowerCase().includes("sucesso")
                  ? "#d4edda"
                  : "#f8d7da",
                color: mensagem.toLowerCase().includes("sucesso") 
                  ? "#155724" 
                  : "#721c24",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                fontWeight: 500,
                fontSize: "16px",
                maxWidth: "90%",
                textAlign: "center",
              }}
            >
              {mensagem}
            </div>
          )}
        </main>

        {showPasswordModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Alterar Senha</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>Senha Atual *</label>
                  <input 
                    type="password" 
                    value={senhaAtual} 
                    onChange={(e) => setSenhaAtual(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Nova Senha * (mínimo 6 caracteres)</label>
                  <input 
                    type="password" 
                    value={novaSenha} 
                    onChange={(e) => setNovaSenha(e.target.value)} 
                    required 
                    minLength={6} 
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Nova Senha *</label>
                  <input 
                    type="password" 
                    value={confirmarSenha} 
                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                    required 
                    minLength={6} 
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Salvar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => { 
                      setShowPasswordModal(false); 
                      setSenhaAtual(""); 
                      setNovaSenha(""); 
                      setConfirmarSenha(""); 
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content modal-delete">
              <h2>⚠️ Excluir Conta</h2>
              <div className="modal-warning">
                <p><strong>Esta ação é permanente e não pode ser desfeita!</strong></p>
                <p>Ao excluir sua conta:</p>
                <ul>
                  <li>Todos os seus dados pessoais serão removidos</li>
                  <li>Suas avaliações e comentários serão excluídos</li>
                  <li>Seus favoritos serão perdidos</li>
                  <li>Você não poderá recuperar esta conta</li>
                </ul>
              </div>
              <div className="form-group">
                <label>
                  Para confirmar, digite <strong>EXCLUIR</strong> abaixo:
                </label>
                <input 
                  type="text" 
                  value={confirmacaoTexto} 
                  onChange={(e) => setConfirmacaoTexto(e.target.value)} 
                  placeholder="Digite EXCLUIR" 
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeleteAccount} 
                  disabled={confirmacaoTexto.toUpperCase() !== "EXCLUIR"}
                >
                  Excluir Permanentemente
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => { 
                    setShowDeleteModal(false); 
                    setConfirmacaoTexto(""); 
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}