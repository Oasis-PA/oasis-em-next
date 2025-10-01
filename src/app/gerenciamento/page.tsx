"use client";

import { useState, useEffect } from "react";
import "@/styles/gerenciamento-conta.css";

export default function GerenciamentoConta() {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState<number | null>(null);
  const [generos, setGeneros] = useState<{ id_genero: number; nome: string }[]>([]);

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
        console.log("Status perfil:", res.status);
        
        if (!res.ok) {
          console.error("Erro ao buscar perfil");
          return;
        }
        
        const data = await res.json();
        console.log("Dados do usuário:", data);
        
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
        setDataNascimento(data.data_nascimento?.split("T")[0] || "");
        setGenero(data.id_genero || null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    async function fetchGeneros() {
      try {
        const res = await fetch("/api/usuarios/generos");
        console.log("Status gêneros:", res.status);
        
        if (!res.ok) {
          console.error("Erro ao buscar gêneros:", res.statusText);
          return;
        }
        
        const lista = await res.json();
        console.log("Gêneros carregados:", lista);
        setGeneros(lista);
      } catch (err) {
        console.error("Erro ao buscar gêneros:", err);
      }
    }

    fetchUser();
    fetchGeneros();
  }, []);

  // salva alterações pessoais
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    // Validação: genero é obrigatório
    if (!genero) {
      alert("Por favor, selecione um gênero");
      return;
    }

    console.log("Enviando dados:", {
      email,
      telefone,
      data_nascimento: dataNascimento,
      genero,
    });

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

      const data = await res.json();
      console.log("Resposta:", data);

      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar alterações");
      }

      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao salvar alterações: " + (err as Error).message);
    }
  }

  // alterar senha
  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos de senha");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (novaSenha.length < 6) {
      alert("A nova senha deve ter no mínimo 6 caracteres");
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
        throw new Error(data.error || "Erro ao atualizar senha");
      }

      alert("Senha alterada com sucesso!");
      setShowPasswordModal(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao alterar senha: " + (err as Error).message);
    }
  }

  // excluir conta
  async function handleDeleteAccount() {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!")) {
      return;
    }

    try {
      const res = await fetch("/api/usuarios/excluir", {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao excluir conta");
      }

      alert("Conta excluída com sucesso!");
      window.location.href = "/";
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao excluir conta: " + (err as Error).message);
    }
  }

  return (
    <>
      <div className="config-body">
        <aside>
          <a className="barra-lateral" href="/editar-perfil">
            Editar Perfil
          </a>
          <a className="barra-lateral active" href="#">
            Gerenciamento de Conta
          </a>
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
                  <option value="">Selecione um gênero...</option>
                  {generos.map((g) => (
                    <option key={g.id_genero} value={g.id_genero}>
                      {g.nome}
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="section-title" id="exclusao">
                Exclusão
              </h2>
              <div id="exclua">
                <p>Exclua permanentemente seus dados e tudo que estiver associado à sua conta</p>
                <a
                  href="#"
                  className="excluir-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteAccount();
                  }}
                >
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
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn-cancelar"
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
    </>
  );
}