"use client";

import { useState, useEffect } from "react";
import "@/styles/gerenciamento-conta.css";

export default function GerenciamentoConta() {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState<"ele" | "ela">("ela");
  

  // controle do modal de senha
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // carregar dados do usuário
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/usuarios/perfil");
        if (!res.ok) return;
        const data = await res.json();
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
        setDataNascimento(data.data_nascimento?.split("T")[0] || "");
        setGenero(data.genero || "ela");
        
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }
    fetchUser();
  }, []);

  // salva alterações pessoais ()
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          telefone,
          data_nascimento: dataNascimento,
          genero,
         
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar alterações");
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações.");
    }
  }

  // alterar senha
  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      const res = await fetch("/api/usuarios/pessoais", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar senha");
      alert("Senha alterada com sucesso!");
      setShowPasswordModal(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      console.error(err);
      alert("Erro ao alterar senha.");
    }
  }

  // excluir conta
  async function handleDeleteAccount() {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;
    try {
      const res = await fetch("/api/usuarios/excluir", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir conta");
      alert("Conta excluída com sucesso!");
      window.location.href = "/"; // redireciona após exclusão
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir conta.");
    }
  }

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
              <p id="faca-alteracoes">
                Faça alterações nas suas informações pessoais ou no tipo de conta.
              </p>

              <h2 className="section-title">Sua Conta</h2>

              <div className="form-group">
                <label htmlFor="E-mail-privado">Email - Privado</label>
                <input
                  type="email"
                  id="E-mail-privado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group password-group">
                <label htmlFor="senha">Senha</label>
                <div className="password-container">
                  <input type="password" id="senha" value="************" disabled />
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
                <label htmlFor="genero">Pronome</label>
                <div id="gen3" className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      value="ele"
                      id="masculino"
                      name="genero"
                      checked={genero === "ele"}
                      onChange={(e) => setGenero(e.target.value as "ele" | "ela")}
                    />
                    <label htmlFor="masculino">Ele</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      value="ela"
                      id="feminino"
                      name="genero"
                      checked={genero === "ela"}
                      onChange={(e) => setGenero(e.target.value as "ele" | "ela")}
                    />
                    <label htmlFor="feminino">Ela</label>
                  </div>
                </div>
              </div>

             

            

              <h2 className="section-title" id="exclusao">
                Exclusão
              </h2>
              <div id="exclua">
                <p>Exclua permanentemente seus dados e tudo que estiver associado à sua conta</p>
                <a href="#" className="excluir-link" onClick={handleDeleteAccount}>
                  Excluir sua conta
                </a>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>

      {/* Modal de alteração de senha */}
      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Senha Atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" className="btn-cancelar" onClick={() => setShowPasswordModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
