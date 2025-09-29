"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/produtos.css";



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


const ProdutoCard: React.FC = () => {
    return (
        <div className="produto-card">
            <div className="card-inner-wrapper">
               <Image src="/images/produtos/Rectangle-194.png" width={150} height={150} 
                alt="L'Oréal Professionnel Óleo 10 em 1" className="produto-card-image" />
                <div className="card-text">
                    <p className="card-tag">Força e vigor</p>
                    <h2 className="card-title">L'ORÉAL PROFESSIONNEL ÓLEO 10 EM 1 ABSOLUT</h2>
                </div>
                <button className="card-button">VER MAIS</button>
            </div>
        </div>
    );
};


const ProdutosGrid: React.FC = () => {
  
    const cartoes = Array.from({ length: 8 }, (_, index) => <ProdutoCard key={index} />);

    return (
        <section id="produtos-grid-section">
            <div className="produtos-grid-wrapper">
                {cartoes}
            </div>
        </section>
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

 

            <FiltrosBarra />
      
       <ProdutosGrid />

    </>
  );
}