"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "./layout";

interface User {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  sobre?: string;
}

interface LayoutProps {
 children: React.ReactNode;
  onSave?: () => void;   // salvar
  onReset?: () => void;  // redefinir
}


export default function ConfiguracoesPage({ onSave, onReset }: LayoutProps) {
  const [user, setUser] = useState<User>({
    nome: "",
    sobrenome: "",
    sobre: "",
  });
  const [initialUser, setInitialUser] = useState<User>({ ...user });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  // Carrega os dados do usuário logado
  useEffect(() => {
    fetch("/api/usuarios/perfil")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser({
            nome: data.nome || "",
            sobrenome: data.sobrenome || "",
            sobre: data.sobre || "",
          });
          setInitialUser({
            nome: data.nome || "",
            sobrenome: data.sobrenome || "",
            sobre: data.sobre || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const res = await fetch("/api/usuarios/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setMensagem("Perfil atualizado com sucesso!");
      setInitialUser({ ...user });
    } else {
      setMensagem(data.error || "Erro ao atualizar.");
    }
  } catch (err) {
    setMensagem("Erro no servidor.");
  }
};

  const handleReset = () => {
    setUser({ ...initialUser });
    setMensagem(""); // limpa a mensagem
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <Layout>
      <main>
      <div className="informa">
        <h4>EDITE SEU PERFIL</h4>
        <p>
        Mantenha seus dados pessoais privados. As informações que você
        adiciona aqui ficam visíveis apenas para você.
        </p>
      </div>

      <figure id="perf">
        <Image
        src="/logo-oasis-icon.ico"
        alt="Foto de perfil"
        width={50}
        height={50}
        />
        <figcaption>
        <p id="foto">Foto</p>
        <p id="Alterar">Alterar</p>
        </figcaption>
      </figure>

      <form id="form">
        <div className="nome-sobre">
        <div className="campos-texto" id="caixa-nome">
          <p>Nome</p>
          <input
          type="text"
          name="nome"
          value={user.nome}
          onChange={handleChange}
          className="req"
          />
          <span className="sp">Mínimo 3 caracteres</span>
        </div>

        <div className="campos-texto" id="caixa-sobrenome">
          <p>Sobrenome</p>
          <input
          type="text"
          name="sobrenome"
          value={user.sobrenome}
          onChange={handleChange}
          className="req"
          />
          <span className="sp">Mínimo 3 caracteres</span>
        </div>
        </div>

        <div className="campos-texto req" id="caixa-sobre">
        <p>Sobre</p>
        <input
          type="text"
          name="sobre"
          value={user.sobre}
          onChange={handleChange}
        />
        </div>
      </form>

      <footer>
        <button type="button" onClick={handleReset}>Redefinir</button>
        <button type="button" onClick={handleSave}>Salvar</button>
      </footer>

      {mensagem && <p>{mensagem}</p>}
      </main>
    </Layout>
  );
}
