"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "./layout";

interface User {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  sobre?: string;
  url_foto?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  onSave?: () => void;
  onReset?: () => void;
}

export default function EditarPerfilPage({ onSave, onReset }: LayoutProps) {
  const [user, setUser] = useState<User>({
    nome: "",
    sobrenome: "",
    sobre: "",
    url_foto: "",
  });
  const [initialUser, setInitialUser] = useState<User>({ ...user });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [previewFoto, setPreviewFoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega os dados do usuário logado
  useEffect(() => {
    fetch("/api/usuarios/perfil")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          const userData = {
            nome: data.nome || "",
            sobrenome: data.sobrenome || "",
            sobre: data.sobre || "",
            url_foto: data.url_foto || "",
          };
          setUser(userData);
          setInitialUser(userData);
          setPreviewFoto(data.url_foto || "/logo-oasis-icon.ico");
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

  // Handler para quando o usuário seleciona uma foto
  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validações
    if (!file.type.startsWith("image/")) {
      setMensagem("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMensagem("A imagem deve ter no máximo 5MB.");
      return;
    }

    // Preview imediato
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFoto(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadFoto(file);
  };

  // Função para fazer upload da foto
  const uploadFoto = async (file: File) => {
    setUploadingFoto(true);
    setMensagem("");

    try {
      const formData = new FormData();
      formData.append("foto", file);

      // Envia sem Authorization header - o cookie será enviado automaticamente
      const res = await fetch("/api/usuarios/upload-foto", {
        method: "POST",
        credentials: "include", // Garante que os cookies sejam enviados
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Foto atualizada com sucesso!");
        setUser((prev) => ({ ...prev, url_foto: data.url_foto }));
        setInitialUser((prev) => ({ ...prev, url_foto: data.url_foto }));
      } else {
        setMensagem(data.error || "Erro ao fazer upload da foto.");
        // Reverte preview em caso de erro
        setPreviewFoto(user.url_foto || "/logo-oasis-icon.ico");
      }
    } catch (err) {
      setMensagem("Erro no servidor ao fazer upload.");
      setPreviewFoto(user.url_foto || "/logo-oasis-icon.ico");
    } finally {
      setUploadingFoto(false);
    }
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
    setPreviewFoto(initialUser.url_foto || "/logo-oasis-icon.ico");
    setMensagem("");
  };

  // Trigger do input file
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="page-perfil-wrapper">
      <Layout onCancel={handleReset} onSave={handleSave} isLoading={loading}>
        <main>
          <Link
            href="/"
            className="btn-voltar"
            style={{
              display: "inline-block",
              marginBottom: "30px",
              color: "var(--accent-color)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ← Voltar
          </Link>

          {loading && (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#666" }}
            >
              <p>Carregando suas informações...</p>
            </div>
          )}

          {!loading && (
            <>
              <div className="informa">
                <h4>EDITE SEU PERFIL</h4>
                <p>
                  Mantenha seus dados pessoais privados. As informações que você
                  adiciona aqui ficam visíveis apenas para você.
                </p>
              </div>

              <figure id="perf">
                <div style={{ position: "relative" }}>
                  <Image
                    src={previewFoto || "/logo-oasis-icon.ico"}
                    alt="Foto de perfil"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      opacity: uploadingFoto ? 0.5 : 1,
                    }}
                  />
                  {uploadingFoto && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Enviando...
                    </div>
                  )}
                </div>
                <figcaption>
                  <p id="foto">Foto</p>
                  <p
                    id="Alterar"
                    onClick={triggerFileInput}
                    style={{
                      cursor: uploadingFoto ? "not-allowed" : "pointer",
                      opacity: uploadingFoto ? 0.5 : 1,
                    }}
                  >
                    {uploadingFoto ? "Enviando..." : "Alterar"}
                  </p>
                  <input
                    ref={fileInputRef}
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
                    backgroundColor: mensagem.includes("sucesso")
                      ? "#d4edda"
                      : "#f8d7da",
                    color: mensagem.includes("sucesso") ? "#155724" : "#721c24",
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
            </>
          )}
        </main>
      </Layout>
    </div>
  );
}