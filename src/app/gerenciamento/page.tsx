"use client";

import { useState, useEffect } from "react";
import "@/styles/gerenciamento-conta.css";

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

  useEffect(() => {
    fetch("/api/usuarios/perfil")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setEmail(data.email || "");
          setTelefone(data.telefone || "");
          setDataNascimento(data.data_nascimento?.split("T")[0] || "");
          setGenero(data.id_genero || null);
        }
      })
      .catch(err => console.error(err));

    fetch("/api/generos")
      .then(res => res.ok ? res.json() : [])
      .then(lista => setGeneros(lista))
      .catch(err => console.error(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genero) return alert("Selecione um gênero");

    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telefone, data_nascimento: dataNascimento, genero }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Dados atualizados!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) return alert("Senhas não coincidem");
    if (novaSenha.length < 6) return alert("Senha muito curta");

    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      if (!res.ok) throw new Error("Erro ao alterar senha");
      alert("Senha alterada!");
      setShowPasswordModal(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmacaoTexto.toUpperCase() !== "EXCLUIR") {
      return alert("Digite EXCLUIR para confirmar");
    }

    try {
      const res = await fetch("/api/usuarios/excluir", { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      alert("Conta excluída!");
      window.location.href = "/";
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="config-body">
        <aside>
          <a className="barra-lateral" href="/editar-perfil">Editar Perfil</a>
          <a className="barra-lateral active" href="#">Gerenciamento de Conta</a>
        </aside>

        <main>
          <section>
            <form onSubmit={handleSave}>
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
                  <input type="password" id="senha" value="************" disabled />
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
                  <option value="">Selecione um gênero...</option>
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

              <div className="form-actions">
                <button type="submit" className="btn-salvar">Salvar</button>
              </div>
            </form>
          </section>
        </main>
      </div>

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
              <div className="form-actions">
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" className="btn-cancelar" onClick={() => { setShowPasswordModal(false); setSenhaAtual(""); setNovaSenha(""); setConfirmarSenha(""); }}>Cancelar</button>
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
            <div className="form-actions">
              <button type="button" className="btn-excluir-confirmar" onClick={handleDeleteAccount} disabled={confirmacaoTexto.toUpperCase() !== "EXCLUIR"}>Excluir Permanentemente</button>
              <button type="button" className="btn-cancelar" onClick={() => { setShowDeleteModal(false); setConfirmacaoTexto(""); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}