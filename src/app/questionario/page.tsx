"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/cabecalho/header";
import Footer from "@/components/rodape/footer";

const PerguntaPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Header />
      <main>
        {/* Conteúdo da página de perguntas */}
      </main>
      <Footer />
    </>
  );
};

export default PerguntaPage;