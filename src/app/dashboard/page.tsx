"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components";

type Usuario = {
  id_usuario: number;
  nome: string;
  sobrenome?: string;
  email: string;
  telefone?: string;
  data_nascimento?: string;
  data_cadastro: string;
  sobre?: string;
  genero: {
    nome: string;
    sigla: string;
  };
  tipo_cabelo?: {
    nome: string;
    descricao?: string;
  };
};

export default function Dashboard() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se há usuário logado
    const usuarioData = sessionStorage.getItem("usuario");
    
    if (!usuarioData) {
      // Se não estiver logado, redireciona para login
      router.push("/login");
      return;
    }

    try {
      const usuario = JSON.parse(usuarioData);
      setUsuario(usuario);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      router.push("/login");
    } finally {
      setCarregando(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    router.push("/");
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  const nomeCompleto = usuario.sobrenome 
    ? `${usuario.nome} ${usuario.sobrenome}` 
    : usuario.nome;

  const dataCadastro = new Date(usuario.data_cadastro).toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Cabeçalho do Dashboard */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Olá, {usuario.nome}! 👋
              </h1>
              <p className="text-purple-100">
                Bem-vindo(a) de volta à sua conta Oasis
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card de Perfil */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="ml-4 text-xl font-bold">Meu Perfil</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nome Completo</p>
                <p className="font-semibold">{nomeCompleto}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <p className="font-semibold text-sm">{usuario.email}</p>
              </div>
              {usuario.telefone && (
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-semibold">{usuario.telefone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Gênero</p>
                <p className="font-semibold">{usuario.genero.nome}</p>
              </div>
              {usuario.tipo_cabelo && (
                <div>
                  <p className="text-sm text-gray-500">Tipo de Cabelo</p>
                  <p className="font-semibold">{usuario.tipo_cabelo.nome}</p>
                </div>
              )}
            </div>
            <Link href="/editar-perfil">
              <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
                Editar Perfil
              </button>
            </Link>
          </div>

          {/* Card de Favoritos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="ml-4 text-xl font-bold">Favoritos</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Acesse seus produtos e artigos favoritos
            </p>
            <Link href="/favoritos">
              <button className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
                Ver Favoritos
              </button>
            </Link>
          </div>

          {/* Card de Avaliações */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h2 className="ml-4 text-xl font-bold">Avaliações</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Suas avaliações de produtos
            </p>
            <Link href="/minhas-avaliacoes">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                Ver Avaliações
              </button>
            </Link>
          </div>
        </div>

        {/* Seção Sobre Mim */}
        {usuario.sobre && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Sobre Mim</h2>
            <p className="text-gray-700">{usuario.sobre}</p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Estatísticas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">0</p>
              <p className="text-sm text-gray-600">Produtos Favoritos</p>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-600">0</p>
              <p className="text-sm text-gray-600">Avaliações Feitas</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{dataCadastro}</p>
              <p className="text-sm text-gray-600">Membro desde</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">0</p>
              <p className="text-sm text-gray-600">Artigos Lidos</p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/hair-care">
              <div className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer">
                <span className="text-4xl mb-2 block">💇</span>
                <p className="font-semibold">Hair Care</p>
              </div>
            </Link>
            <Link href="/skincare">
              <div className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition cursor-pointer">
                <span className="text-4xl mb-2 block">✨</span>
                <p className="font-semibold">Skincare</p>
              </div>
            </Link>
            <Link href="/tela-de-produto">
              <div className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                <span className="text-4xl mb-2 block">🛍️</span>
                <p className="font-semibold">Produtos</p>
              </div>
            </Link>
            <Link href="/">
              <div className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition cursor-pointer">
                <span className="text-4xl mb-2 block">🏠</span>
                <p className="font-semibold">Início</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}