// file: app/produtos/page.tsx

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; 
import { Header, Footer } from "@/components";

import Image from "next/image";
import Link from "next/link"; // Mantemos o import caso haja necessidade futura

import "@/styles/produtos.css";

// -----------------------------------------------------
// Interface e Componentes Fixos
// -----------------------------------------------------
interface ProdutoData {
    id_produto: number;
    nome: string;
    tag_principal: string; 
    url_imagem: string;
    id_tag: number; 
    url_loja: string; // Incluído na API
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


interface FilterOption {
    id: number | null;
    nome: string;
}

interface FilterProps {
    label: string;
    currentValue: string; 
    options: FilterOption[];
    onFilterChange: (id: number | null) => void;
    currentId: number | null; 
}

// Dropdown customizado
const FilterDropdown: React.FC<FilterProps> = ({ label, currentValue, options, onFilterChange, currentId }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleOptionClick = (id: number | null) => {
        onFilterChange(id); 
        setIsOpen(false); 
    };

    return (
        <div 
            className={`filter-dropdown-container ${isOpen ? 'active' : ''}`} 
            ref={containerRef}
        >
            <div className="filter-label">{label}</div>
            
            <button 
                className="filter-content"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="filter-value">{currentValue}</span>
                <div className="filter-icon-circle">
                    <ChevronDownIcon />
                </div>
            </button>

            {isOpen && (
                <ul className="dropdown-options-list">
                    {options.map(option => (
                        <li 
                            key={option.id === null ? 'null' : option.id} 
                            onClick={() => handleOptionClick(option.id)}
                            className={currentId === option.id ? 'selected' : ''}
                        >
                            {option.nome}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


// -----------------------------------------------------
// Tipo de dado para as tags
// -----------------------------------------------------
interface TagData {
    id: number | null; 
    nome: string;
}

interface FiltrosBarraProps {
    currentTagId: number | null;
    onTagChange: (id: number | null) => void;
}

const FiltrosBarra: React.FC<FiltrosBarraProps> = ({ currentTagId, onTagChange }) => {
    // Mock das tags (baseado nos IDs que você tem: 1=condicionador, 2=shampoo, 3=mascara)
    const tags: TagData[] = [
        { id: null, nome: "TODAS" },
        { id: 2, nome: "SHAMPOO" },
        { id: 1, nome: "CONDICIONADOR" },
        { id: 3, nome: "MÁSCARA CAPILAR" },
    ];
    
    // Encontra o nome da tag selecionada (para exibir como currentValue)
    const currentTagName = tags.find(t => t.id === currentTagId)?.nome || "TODAS";

    return (
        <div className="filtros-barra-fundo">
            <div className="filtros-barra-wrapper">
                <FilterDropdown 
                    label="CATEGORIA" 
                    currentValue={currentTagName} 
                    currentId={currentTagId}
                    options={tags}
                    onFilterChange={onTagChange}
                />
                
                {/* Outros Filtros (Usando a nova estrutura) */}
                <FilterDropdown 
                    label="TIPO" 
                    currentValue="TODOS" 
                    currentId={null} 
                    options={[{id: null, nome: "TODOS"}, {id: 99, nome: "CAPILAR"}]} 
                    onFilterChange={() => {}} 
                />
                <FilterDropdown 
                    label="TIPO DE PELE" 
                    currentValue="TODOS" 
                    currentId={null} 
                    options={[{id: null, nome: "TODOS"}]} 
                    onFilterChange={() => {}}
                />
                <FilterDropdown 
                    label="TIPO DE CABELO" 
                    currentValue="TODOS" 
                    currentId={null} 
                    options={[{id: null, nome: "TODOS"}]} 
                    onFilterChange={() => {}}
                />
                <FilterDropdown 
                    label="PREÇO" 
                    currentValue="TODOS" 
                    currentId={null} 
                    options={[{id: null, nome: "TODOS"}]} 
                    onFilterChange={() => {}}
                />
            </div>
        </div>
    );
};


const ProdutoCard: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
    
    // Usa uma imagem de fallback ou URL vazia caso url_imagem seja null/vazio.
    const imageSrc = produto.url_imagem || '/images/produtos/default-placeholder.png'; 
    
    return (
        <div className="produto-card">
            <div className="card-inner-wrapper">
                <Image 
                    src={imageSrc}
                    width={150} 
                    height={150} 
                    alt={produto.nome} 
                    className="produto-card-image" 
                    unoptimized={true} 
                    priority={true} 
                />
                <div className="card-text">
                    <p className="card-tag">{produto.tag_principal}</p>
                    <h2 className="card-title">{produto.nome.toUpperCase()}</h2>
                </div>
                {/* 🚩 CORREÇÃO FINAL: Usando Link do Next.js para redirecionamento externo */}
                <Link 
                    href={produto.url_loja} 
                    passHref
                    target="_blank" // Abre em nova aba
                    rel="noopener noreferrer" 
                >
                    {/* O componente Link deve envolver a âncora (a), que deve envolver o botão */}
                    <button className="card-button">VER MAIS</button>
                </Link>
            </div>
        </div>
    );
};


// -----------------------------------------------------
// ProdutosGrid: Busca dados com base no filtro
// -----------------------------------------------------
const ProdutosGrid: React.FC<{ tagId: number | null }> = ({ tagId }) => {
    const [produtos, setProdutos] = useState<ProdutoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    const fetchProdutos = useCallback(async () => {
        setLoading(true);
        setErro(null);

        try {
            let url = '/api/produtos';
            if (tagId !== null) {
                url = `/api/produtos?id_tag=${tagId}`; 
            }
            
            const res = await fetch(url); 
            
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
    }, [tagId]); 

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]); 

    if (loading) {
        return <div className="loading-message">Carregando produtos...</div>;
    }

    if (erro) {
        return <div className="error-message">{erro}</div>;
    }
    
    const cartoes = produtos.map((produto) => (
        <ProdutoCard key={produto.id_produto} produto={produto} />
    ));

    return (
        <section id="produtos-grid-section">
            <div className="produtos-grid-wrapper">
                {cartoes.length > 0 ? cartoes : <p>Nenhum produto encontrado na categoria selecionada.</p>}
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

// -----------------------------------------------------
// Componente principal
// -----------------------------------------------------
export default function ProdutosPage() {
    const [tagFiltroId, setTagFiltroId] = useState<number | null>(null);

    return (
        <>
            
            <main>
                <h1>PRODUTOS RECOMENDADOS</h1>
                <p>Encontre itens de cuidado para cabelo, pele <br></br> e muito mais.</p>
            </main>

            <section id="s1">
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

            <FiltrosBarra currentTagId={tagFiltroId} onTagChange={setTagFiltroId} />
            
            <ProdutosGrid tagId={tagFiltroId} />

            <LoadMoreButton />
            
            
        </>
    );
}
