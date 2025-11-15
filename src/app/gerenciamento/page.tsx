"use client";

import { useState, useEffect } from "react";
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

  // Estados para a função Redefinir
  const [initialData, setInitialData] = useState({
    email: "",
    telefone: "",
    dataNascimento: "",
    genero: null as number | null,
  });


  useEffect(() => {
    // Busca dados do perfil
    fetch("/api/usuarios/perfil")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
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
          setInitialData(fetchedData); // Guarda o estado inicial
        }
      })

    // Busca lista de gêneros
    fetch("/api/usuarios/generos")
      .then(res => res.ok ? res.json() : [])
      .then(lista => setGeneros(lista))
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genero) {
        setMensagem("Por favor, selecione um gênero.");
        return;
    };

    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telefone, data_nascimento: dataNascimento, id_genero: genero }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMensagem("Dados atualizados com sucesso!");
    } catch (err: any) {
      setMensagem(err.message);
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
      if (!res.ok) throw new Error(data.error);
      setMensagem("Senha alterada com sucesso!");
      setShowPasswordModal(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: any)      {
      setMensagem(err.message);
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

  // Função Redefinir agora restaura para os dados iniciais
  const handleReset = () => {
    setEmail(initialData.email);
    setTelefone(initialData.telefone);
    setDataNascimento(initialData.dataNascimento);
    setGenero(initialData.genero);
    setMensagem(""); // Limpa qualquer mensagem de feedback
  };


  return (
    <div className="page-gerenciamento-wrapper">
      <Layout onCancel={handleReset} onSave={(e?: React.FormEvent) => {
        // Trigger form submit
        const form = document.getElementById('gerenciamento-form') as HTMLFormElement;
        form?.requestSubmit();
      }}>

        <main>
        <section>
          {/* MELHORIA: Adicionado id ao form e removido o onClick do botão salvar */}
          <form id="gerenciamento-form" onSubmit={handleSave}>
            <h1>GERENCIE SUA CONTA</h1>
            <p id="faca-alteracoes">Faça alterações nas suas informações pessoais ou no tipo de conta.</p>

            <h2 className="section-title">Sua Conta</h2>

            <div className="form-group">
              <label htmlFor="E-mail-privado">Email - Privado *</label>
              <input type="email" id="E-mail-privado" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group password-group">
              <label htmlFor="senha">Senha</label>
              <div className="password-container">
                <input type="password" id="senha" value="************" disabled readOnly />
                <a href="#" className="alterar-link" onClick={(e) => { e.preventDefault(); setShowPasswordModal(true); }}>Alterar</a>
              </div>
            </div>

            <h2 className="section-title" id="info-pessoais">Informações Pessoais</h2>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" />
            </div>

            <div className="form-group">
              <label htmlFor="data-nascimento">Data de nascimento</label>
              <input type="date" id="data-nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="genero">Gênero *</label>
              <select id="genero" value={genero ?? ""} onChange={(e) => setGenero(Number(e.target.value))} required>
                <option value="" disabled>Selecione um gênero...</option>
                {generos.map((g) => (
                  <option key={g.id_genero} value={g.id_genero}>{g.nome}</option>
                ))}
              </select>
            </div>

            <h2 className="section-title" id="exclusao">Exclusão</h2>
            <div id="exclua">
              <p>Exclua permanentemente seus dados e tudo que estiver associado à sua conta</p>
              <a href="#" className="excluir-link" onClick={(e) => { e.preventDefault(); setShowDeleteModal(true); }}>Excluir sua conta</a>
            </div>
          </form>
        </section>

        {mensagem && <p className="feedback-message">{mensagem}</p>}
      </main>

      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Senha Atual *</label>
                <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nova Senha * (mínimo 6 caracteres)</label>
                <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required minLength={6} />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha *</label>
                <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required minLength={6} />
              </div>
              {/* BOTÕES DO MODAL DE SENHA CORRIGIDOS */}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowPasswordModal(false); setSenhaAtual(""); setNovaSenha(""); setConfirmarSenha(""); }}>Cancelar</button>
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
              <label>Para confirmar, digite <strong>EXCLUIR</strong> abaixo:</label>
              <input type="text" value={confirmacaoTexto} onChange={(e) => setConfirmacaoTexto(e.target.value)} placeholder="Digite EXCLUIR" />
            </div>
            {/* BOTÕES DO MODAL DE EXCLUSÃO CORRIGIDOS */}
            <div className="form-actions">
              <button type="button" className="btn btn-danger" onClick={handleDeleteAccount} disabled={confirmacaoTexto.toUpperCase() !== "EXCLUIR"}>Excluir Permanentemente</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowDeleteModal(false); setConfirmacaoTexto(""); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      </Layout>
    </div>
  );
}