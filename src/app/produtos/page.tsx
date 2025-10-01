// file: app/produtos/page.tsx (ou o nome que você usou)

"use client";

import React, { useState, useEffect } from "react"; // Adicionamos 'useEffect' e 'useState'
import { Header, Footer } from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/produtos.css";

// -----------------------------------------------------
// 🚩 NOVIDADE: Interface para tipar os dados que vêm do banco
// O nome e os campos devem corresponder ao seu modelo Prisma
// -----------------------------------------------------
interface ProdutoData {
    id_produto: number;
    nome: string;
    // Assumindo que você terá um campo para a tag principal ou a marca
    tag_principal: string; 
    url_imagem: string;
    // Adicione outros campos se necessário (ex: preco, link_loja)
}

const ChevronDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevron-icon"
        width="20"
        height="20"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


interface FilterProps {
    label: string;
    value: string;
}

const FilterDropdown: React.FC<FilterProps> = ({ label, value }) => {
    return (
        <div className="filter-dropdown-container">
            <div className="filter-label">{label}</div>
            <div className="filter-content">
                <span className="filter-value">{value}</span>
                <div className="filter-icon-circle">
                    <ChevronDownIcon />
                </div>
            </div>
        </div>
    );
};


const FiltrosBarra: React.FC = () => {
    return (
        <div className="filtros-barra-fundo">
            <div className="filtros-barra-wrapper">
                <FilterDropdown label="CATEGORIA" value="TODAS" />
                <FilterDropdown label="TIPO" value="TODOS" />
                <FilterDropdown label="TIPO DE PELE" value="TODOS" />
                <FilterDropdown label="TIPO DE CABELO" value="TODOS" />
                <FilterDropdown label="PREÇO" value="TODOS" />
            </div>
        </div>
    );
};


// -----------------------------------------------------
// 🚩 MUDANÇA: ProdutoCard agora recebe um objeto 'produto' via props
// -----------------------------------------------------
const ProdutoCard: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
    return (
        <div className="produto-card">
            <div className="card-inner-wrapper">
                {/* 🚩 DADOS DINÂMICOS: src e alt vêm do objeto 'produto' */}
                <Image 
                    src={produto.url_imagem}
                    width={150} 
                    height={150} 
                    alt={produto.nome} 
                    className="produto-card-image" 
                />
                <div className="card-text">
                    {/* 🚩 DADOS DINÂMICOS */}
                    <p className="card-tag">{produto.tag_principal}</p>
                    <h2 className="card-title">{produto.nome.toUpperCase()}</h2>
                </div>
                {/* 🚩 LINK DINÂMICO: Leva para a página de detalhes usando o ID */}
                <Link href={`/produto/${produto.id_produto}`} passHref>
                    <button className="card-button">VER MAIS</button>
                </Link>
            </div>
        </div>
    );
};


// -----------------------------------------------------
// 🚩 MUDANÇA PRINCIPAL: ProdutosGrid agora busca dados e gerencia estado
// -----------------------------------------------------
const ProdutosGrid: React.FC = () => {
    const [produtos, setProdutos] = useState<ProdutoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    // 🚩 NOVIDADE: useEffect para buscar dados da API ao carregar o componente
    useEffect(() => {
        async function fetchProdutos() {
            try {
                // 🚩 O endpoint da API que você precisa criar para listar produtos
                const res = await fetch('/api/produtos'); 
                
                if (!res.ok) {
                    setErro('Falha ao carregar produtos.');
                    return;
                }
                
                const data: ProdutoData[] = await res.json();
                setProdutos(data);

            } catch (e) {
                setErro('Erro de conexão com o servidor.');
            } finally {
                setLoading(false);
            }
        }
        fetchProdutos();
    }, []);

    if (loading) {
        return <div className="loading-message">Carregando produtos...</div>;
    }

    if (erro) {
        return <div className="error-message">{erro}</div>;
    }
    
    // 🚩 Renderiza os cartões com base nos dados reais (ou vazios)
    const cartoes = produtos.map((produto) => (
        <ProdutoCard key={produto.id_produto} produto={produto} />
    ));

    return (
        <section id="produtos-grid-section">
            <div className="produtos-grid-wrapper">
                {cartoes.length > 0 ? cartoes : <p>Nenhum produto encontrado.</p>}
            </div>
        </section>
    );
};

const LoadMoreButton: React.FC = () => {
    return (
        <div className="load-more-container">
            <button className="load-more-button">
                CARREGAR MAIS PRODUTOS
            </button>
        </div>
    );
};

export default function produtos() {
    return (
        <>
            
            <main>
                <h1>PRODUTOS RECOMENDADOS</h1>
                <p>Encontre itens de cuidado para cabelo, pele <br></br> e muito mais.</p>
            </main>

            <section id="s1">
                {/* ... (Marcas fixas) ... */}
                <img src="images/produtos/marca (1).png" alt="SalonLine" />
                <img src="images/produtos/marca (2).png" alt="Kolene" />
                <img src="images/produtos/marca (3).png" alt="WidiCare" />
                <img src="images/produtos/marca (4).png" alt="Nivea" />
                <img src="images/produtos/marca (5).png" alt="Principia" />
            </section>

            <figure>
                <img src="images/produtos/quiz.png" alt="quiz-cronograma-capilar" />
            </figure>

            <section id="s2">
                {/* ... (Tipos de cabelo e pele) ... */}
                <div className="linha-texto">
                    <h1>TIPOS DE CABELO</h1>
                    <div id="linha"></div>
                </div>
                <div className="imagens-s2">
                    <img src="images/produtos/cabelo (1).png" alt="Ondulados" />
                    <img src="images/produtos/cabelo (2).png" alt="Cacheados" />
                    <img src="images/produtos/cabelo (3).png" alt="Crespo" />
                    <img src="images/produtos/cabelo (4).png" alt="C/Química" />
                </div>
                <div className="linha-texto">
                    <div id="linha2"></div>
                    <h1>TIPOS DE PELE</h1>
                </div>
                <div className="imagens-s2">
                    <img src="images/produtos/pele (1).png" alt="" />
                    <img src="images/produtos/pele (2).png" alt="" />
                    <img src="images/produtos/pele (3).png" alt="" />
                    <img src="images/produtos/pele (4).png" alt="" />
                </div>
            </section>

            <FiltrosBarra />
            
            <ProdutosGrid />

            <LoadMoreButton />
            
            
        </>
    );
}