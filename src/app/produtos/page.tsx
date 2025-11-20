// file: app/produtos/page.tsx - CÓDIGO ATUALIZADO

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Header, Footer } from "@/components";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/produtos.module.css";

// -----------------------------------------------------
// Interface e Componentes Fixos
// -----------------------------------------------------
interface ProdutoData {
    id_produto: number;
    nome: string;
    tag_principal: string; 
    url_imagem: string | null; 
    id_tag: number; 
    url_loja: string | null; 
}

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevronIcon} width="20" height="20" >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

interface FilterOption {
    id: number | string | null; 
    nome: string;
}

interface FilterProps {
    label: string;
    currentValue: string; 
    options: FilterOption[];
    onFilterChange: (id: number | string | null) => void;
    currentId: number | string | null;
    disabled?: boolean;
}

const FilterDropdown: React.FC<FilterProps> = ({ label, currentValue, options, onFilterChange, currentId, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    const getOptionKey = (id: number | string | null) => (id === null ? 'null' : String(id));

    const handleOptionClick = (id: number | string | null) => {
        if(disabled) return;
        onFilterChange(id); 
        setIsOpen(false); 
    };
    
    const handleButtonClick = () => { if (!disabled) setIsOpen(!isOpen) }

    return (
        <div className={`${styles.filterDropdownContainer} ${isOpen ? styles.active : ''} ${disabled ? styles.disabled : ''}`} ref={containerRef} >
            <div className={styles.filterLabel}>{label}</div>
            <button className={styles.filterContent} onClick={handleButtonClick} aria-expanded={isOpen} disabled={disabled} >
                <span className={styles.filterValue}>{currentValue}</span>
                <div className={styles.filterIconCircle}><ChevronDownIcon /></div>
            </button>
            {isOpen && options.length > 1 && (
                <ul className={styles.dropdownOptionsList}>
                    {options.map(option => (
                        <li key={getOptionKey(option.id)} onClick={() => handleOptionClick(option.id)} className={currentId === option.id ? styles.selected : ''} >
                            {option.nome}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// -----------------------------------------------------
// FiltrosBarra
// -----------------------------------------------------

interface FiltrosBarraProps {
    currentTagId: number | null;
    onTagChange: (id: string | number | null) => void;
    currentCategoriaId: number | null;
    onCategoriaChange: (id: string | number | null) => void;
    currentCabeloId: number | null;
    onCabeloChange: (id: string | number | null) => void;
    currentPeleId: number | null;
    onPeleChange: (id: string | number | null) => void;
    currentMarca: string | null;
    onMarcaChange: (id: string | number | null) => void;
}

const FiltrosBarra: React.FC<FiltrosBarraProps> = ({ 
    currentTagId, onTagChange,
    currentCategoriaId, onCategoriaChange,
    currentCabeloId, onCabeloChange,
    currentPeleId, onPeleChange,
    currentMarca, onMarcaChange,
}) => {
    const [tagOptions, setTagOptions] = useState<FilterOption[]>([{ id: null, nome: "TODOS" }]);
    const [categoriaOptions, setCategoriaOptions] = useState<FilterOption[]>([{ id: null, nome: "TODAS" }]);
    const [cabeloOptions, setCabeloOptions] = useState<FilterOption[]>([{ id: null, nome: "TODOS" }]);
    const [peleOptions, setPeleOptions] = useState<FilterOption[]>([{ id: null, nome: "TODOS" }]);
    const [marcaOptions, setMarcaOptions] = useState<FilterOption[]>([{ id: null, nome: "TODAS" }]);
    const [loadingFilters, setLoadingFilters] = useState(true);

    const fetchOptions = useCallback(async (endpoint: string, setter: React.Dispatch<React.SetStateAction<FilterOption[]>>, allLabel: string, idKey: string, nameKey: string = 'nome') => {
        try {
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error(`Falha ao carregar ${endpoint}`);
            const data = await res.json();
            const formattedData = data.map((item: any) => ({
                id: item[idKey], 
                nome: item[nameKey].toUpperCase(),
            }));
            setter([{ id: null, nome: allLabel }, ...formattedData]); 
        } catch (e) {
            setter([{ id: null, nome: allLabel }]);
        }
    }, []);

    useEffect(() => {
        setLoadingFilters(true);
        Promise.all([
            fetchOptions('/api/tags', setTagOptions, "TODOS", 'id_tag'), 
            fetchOptions('/api/categorias', setCategoriaOptions, "TODAS", 'id_categoria'),
            fetchOptions('/api/tipos-cabelo', setCabeloOptions, "TODOS", 'id_tipo_cabelo'), 
            fetchOptions('/api/tipos-pele', setPeleOptions, "TODOS", 'id_tipo_pele'),
            fetchOptions('/api/marcas', setMarcaOptions, "TODAS", 'nome'),
        ]).finally(() => {
            setLoadingFilters(false);
        });
    }, [fetchOptions]);

    const getFilterName = (options: FilterOption[], currentId: number | string | null) => {
        return options.find(t => t.id === currentId)?.nome || options[0].nome;
    }

    return (
        <div className={styles.filtrosBarraFundo}>
            <div className={styles.filtrosBarraWrapper}>
                <FilterDropdown label="PRODUTOS" currentValue={getFilterName(tagOptions, currentTagId)} currentId={currentTagId} options={tagOptions} onFilterChange={onTagChange} disabled={loadingFilters} />
                <FilterDropdown
                    label="MARCA"
                    currentValue={getFilterName(marcaOptions, currentMarca)}
                    currentId={currentMarca}
                    options={marcaOptions}
                    onFilterChange={onMarcaChange}
                    disabled={loadingFilters}
                />
                <FilterDropdown label="CATEGORIA" currentValue={getFilterName(categoriaOptions, currentCategoriaId)} currentId={currentCategoriaId} options={categoriaOptions} onFilterChange={onCategoriaChange} disabled={loadingFilters} />
                <FilterDropdown label="TIPO DE CABELO" currentValue={getFilterName(cabeloOptions, currentCabeloId)} currentId={currentCabeloId} options={cabeloOptions} onFilterChange={onCabeloChange} disabled={loadingFilters} />
                <FilterDropdown label="TIPO DE PELE" currentValue={getFilterName(peleOptions, currentPeleId)} currentId={currentPeleId} options={peleOptions} onFilterChange={onPeleChange} disabled={loadingFilters} />
            </div>
        </div>
    );
};

// -----------------------------------------------------
// ProdutoCard
// -----------------------------------------------------

const ProdutoCard: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
    const imageSrc = produto.url_imagem || '/images/produtos/default-placeholder.png';

    return (
        <div className={styles.produtoCard}>
            <div className={styles.cardInnerWrapper}>
                <Image
                    src={imageSrc}
                    width={150}
                    height={150}
                    alt={produto.nome}
                    className={styles.produtoCardImage}
                    unoptimized={true}
                    priority={true}
                />
                <div className={styles.cardText}>
                    <p className={styles.cardTag}>{produto.tag_principal}</p>
                    <h2 className={styles.cardTitle}>{produto.nome.toUpperCase()}</h2>
                </div>
                <Link href={`/produtos/${produto.id_produto}`}>
                    <button className={styles.cardButton}>
                        VER MAIS
                    </button>
                </Link>
            </div>
        </div>
    );
};


// -----------------------------------------------------
// ProdutosGrid
// -----------------------------------------------------

interface ProdutosGridProps {
    tagId: number | null;
    categoriaId: number | null;
    cabeloId: number | null;
    peleId: number | null;
    marca: string | null;
}

const ProdutosGrid: React.FC<ProdutosGridProps> = ({ tagId, categoriaId, cabeloId, peleId, marca }) => {
    const [produtos, setProdutos] = useState<ProdutoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchProdutos = useCallback(async (pageNum: number, append: boolean = false) => {
        if (append) setLoadingMore(true);
        else { setLoading(true); setProdutos([]); }
        setErro(null);

        try {
            const params = new URLSearchParams();
            if (tagId !== null) params.append('id_tag', String(tagId)); 
            if (categoriaId !== null) params.append('id_categoria', String(categoriaId)); 
            if (cabeloId !== null) params.append('id_tipo_cabelo', String(cabeloId)); 
            if (peleId !== null) params.append('id_tipo_pele', String(peleId)); 
            if (marca !== null) params.append('marca', marca);
            
            params.append('page', String(pageNum));
            params.append('limit', '8');
            
            const url = `/api/produtos?${params.toString()}`; 
            const res = await fetch(url); 
            if (!res.ok) { setErro('Falha ao carregar produtos.'); return; }
            
            const data = await res.json();
            const produtosArray = Array.isArray(data) ? data : data.produtos || [];
            const paginationData = data.pagination || { hasMore: false };
            
            if (append) setProdutos(prev => [...prev, ...produtosArray]);
            else setProdutos(produtosArray);
            
            setHasMore(paginationData.hasMore);
        } catch (e) {
            setErro('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [tagId, categoriaId, cabeloId, peleId, marca]);

    useEffect(() => {
        setPage(1);
        fetchProdutos(1, false);
    }, [tagId, categoriaId, cabeloId, peleId, marca]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProdutos(nextPage, true);
    };

    if (loading) return <div className={styles.loadingMessage}>Carregando produtos...</div>;
    if (erro) return <div className={styles.errorMessage}>{erro}</div>;

    return (
        <>
            <section className={styles.produtosGridSection}>
                <div className={styles.produtosGridWrapper}>
                    {produtos.length > 0 ? (
                        produtos.map((produto) => <ProdutoCard key={produto.id_produto} produto={produto} />)
                    ) : (
                        <p>Nenhum produto encontrado com os filtros selecionados.</p>
                    )}
                </div>
            </section>

            {hasMore && (
                <div className={styles.loadMoreContainer}>
                    <button className={styles.loadMoreButton} onClick={handleLoadMore} disabled={loadingMore}>
                        {loadingMore ? 'CARREGANDO...' : 'CARREGAR MAIS PRODUTOS'}
                    </button>
                </div>
            )}
        </>
    );
};

// -----------------------------------------------------
// Componente principal (ProdutosPage)
// -----------------------------------------------------
export default function ProdutosPage() {
    const [tagFiltroId, setTagFiltroId] = useState<number | null>(null);
    const [categoriaFiltroId, setCategoriaFiltroId] = useState<number | null>(null);
    const [cabeloFiltroId, setCabeloFiltroId] = useState<number | null>(null);
    const [peleFiltroId, setPeleFiltroId] = useState<number | null>(null);
    const [marcaFiltro, setMarcaFiltro] = useState<string | null>(null);

    // Funções "wrapper" para garantir a segurança dos tipos
    const handleTagChange = (id: string | number | null) => {
        if (typeof id === 'number' || id === null) setTagFiltroId(id);
    };
    const handleCategoriaChange = (id: string | number | null) => {
        if (typeof id === 'number' || id === null) setCategoriaFiltroId(id);
    };
    const handleCabeloChange = (id: string | number | null) => {
        if (typeof id === 'number' || id === null) setCabeloFiltroId(id);
    };
    const handlePeleChange = (id: string | number | null) => {
        if (typeof id === 'number' || id === null) setPeleFiltroId(id);
    };
    const handleMarcaChange = (id: string | number | null) => {
        if (typeof id === 'string' || id === null) setMarcaFiltro(id);
    };

    return (
        <div className={styles.wrapper}>
            <Header className={styles.headerTransparente}/>
            <main>
                <h1>PRODUTOS RECOMENDADOS</h1>
                <p>Encontre itens de cuidado para cabelo, pele <br></br> e muito mais.</p>
            </main>

            <section className={styles.s1}>
                <Image src="/images/produtos/marca (1).png" alt="SalonLine" width={200} height={60} />
                <Image src="/images/produtos/marca (2).png" alt="Kolene" width={200} height={60} />
                <Image src="/images/produtos/marca (3).png" alt="WidiCare" width={200} height={60} />
                <Image src="/images/produtos/marca (4).png" alt="Nivea" width={200} height={60} />
                <Image src="/images/produtos/marca (5).png" alt="Principia" width={200} height={60} />
            </section>

            <Link href='/cronograma-capilar'>
                <figure>
                    <Image src="/images/produtos/quiz.png" alt="quiz-cronograma-capilar" width={600} height={120} />
                </figure>
            </Link>

            <section className={styles.s2}>
                <div className={styles.linhaTexto}><h1>TIPOS DE CABELO</h1><div className={styles.linha}></div></div>
                <div className={styles.imagensS2}>
                    <Image src="/images/produtos/cabelo (1).png" alt="Ondulados" width={200} height={100} />
                    <Image src="/images/produtos/cabelo (2).png" alt="Cacheados" width={200} height={100} />
                    <Image src="/images/produtos/cabelo (3).png" alt="Crespo" width={200} height={100} />
                    <Image src="/images/produtos/cabelo (4).png" alt="C/Química" width={200} height={100} />
                </div>
                <div className={styles.linhaTexto}><div className={styles.linha2}></div><h1>TIPOS DE PELE</h1></div>
                <div className={styles.imagensS2}>
                    <Image src="/images/produtos/pele (1).png" alt="" width={200} height={100} />
                    <Image src="/images/produtos/pele (2).png" alt="" width={200} height={100} />
                    <Image src="/images/produtos/pele (3).png" alt="" width={200} height={100} />
                    <Image src="/images/produtos/pele (4).png" alt="" width={200} height={100} />
                </div>
            </section>

            <div className={styles.produtosLayoutWrapper}>
                <FiltrosBarra
                    currentTagId={tagFiltroId} onTagChange={handleTagChange}
                    currentCategoriaId={categoriaFiltroId} onCategoriaChange={handleCategoriaChange}
                    currentCabeloId={cabeloFiltroId} onCabeloChange={handleCabeloChange}
                    currentPeleId={peleFiltroId} onPeleChange={handlePeleChange}
                    currentMarca={marcaFiltro} onMarcaChange={handleMarcaChange}
                />

                <ProdutosGrid
                    tagId={tagFiltroId}
                    categoriaId={categoriaFiltroId}
                    cabeloId={cabeloFiltroId}
                    peleId={peleFiltroId}
                    marca={marcaFiltro}
                />
            </div>

            <Footer />
        </div>
    );
}