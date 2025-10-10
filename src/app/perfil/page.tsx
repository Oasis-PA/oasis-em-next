"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../styles/editar-perfil.css";

interface User {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  sobre?: string;
  url_foto?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  onSave?: () => void;   // salvar
  onReset?: () => void;  // redefinir
}

export default function EditarPerfilPage({ onSave, onReset }: LayoutProps) {
  const [user, setUser] = useState<User>({
    nome: "",
    sobrenome: "",
    sobre: "",
  });
  const [initialUser, setInitialUser] = useState<User>({ ...user });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

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
            url_foto: data.url_foto || "",
          });
          setInitialUser({
            nome: data.nome || "",
            sobrenome: data.sobrenome || "",
            sobre: data.sobre || "",
            url_foto: data.url_foto || "",
          });
          if (data.url_foto) {
            setFotoPreview(data.url_foto);
          }
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
        method: "PUT",
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
    setMensagem("");
    setFotoPreview(initialUser.url_foto || null);
  };

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validações no frontend
    if (!file.type.startsWith("image/")) {
      setMensagem("Por favor, selecione uma imagem válida.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMensagem("A imagem deve ter no máximo 5MB.");
      return;
    }

    // Preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload da imagem
    setUploadingFoto(true);
    setMensagem("");

    try {
      const formData = new FormData();
      formData.append("foto", file);

      const res = await fetch("/api/usuarios/upload-foto", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Foto atualizada com sucesso!");
        setUser((prev) => ({ ...prev, url_foto: data.url_foto }));
        setInitialUser((prev) => ({ ...prev, url_foto: data.url_foto }));
      } else {
        setMensagem(data.error || "Erro ao atualizar foto.");
        setFotoPreview(user.url_foto || null);
      }
    } catch (err) {
      setMensagem("Erro ao fazer upload da foto.");
      setFotoPreview(user.url_foto || null);
    } finally {
      setUploadingFoto(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="layout-container">
        <aside id="aside-lateral">
          <div className="conte-navbar">
            <Link href="/perfil" id="Editar-perfil">
              Editar Perfil
            </Link>
            <Link href="/gerenciamento">Gerenciamento de Conta</Link>
          </div>
        </aside>
        <div className="layout-content">
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
            src={fotoPreview || "/logo-oasis-icon.ico"}
            alt="Foto de perfil"
            width={50}
            height={50}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <figcaption>
            <p id="foto">Foto</p>
            <label htmlFor="foto-input" style={{ cursor: "pointer" }}>
              <p id="Alterar">
                {uploadingFoto ? "Enviando..." : "Alterar"}
              </p>
            </label>
            <input
              id="foto-input"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ display: "none" }}
              disabled={uploadingFoto}
            />
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
          <button type="button" onClick={handleReset}>
            Redefinir
          </button>
          <button id="salvs" type="button" onClick={handleSave}>
            Salvar
          </button>
        </footer>

        {mensagem && <p>{mensagem}</p>}
          </main>
        </div>
      </div>
  );
}