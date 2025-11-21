import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const produtos = [
  // ===== SHAMPOO (ID_TAG: 2) - 5 produtos =====
  {
    nome: "Shampoo Salon Line Tratamento Nutritivo",
    marca: "Salon Line",
    descricao: "Shampoo nutritivo com óleo de coco para cabelos afro e cacheados",
    composicao: "Água, Sulfato de Sódio Lauril, Óleo de Coco, Bisabolol, Proteína Hidrolisada",
    qualidades: "Nutrição intensiva, Anti-frizz, Hidratação profunda, Sem parabenos",
    mais_detalhes: "Indicado para cabelos secos e danificados. Promove maciez e brilho. Fragrância delicada.",
    preco: 12.90,
    url_loja: "https://www.belezanaweb.com.br/salon-line-shampoo-nutritivo",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 2, // Shampoo
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Shampoo Skala Expert Argan",
    marca: "Skala",
    descricao: "Shampoo com óleo de argan para restauração e brilho",
    composicao: "Água, Sulfato de Sódio Lauril, Óleo de Argan, Queratina, Vitamina E",
    qualidades: "Restauração, Brilho intenso, Maciez, Proteção térmica",
    mais_detalhes: "Fórmula enriquecida com óleo de argan marroquino. Adequado para todos os tipos de cabelo.",
    preco: 8.90,
    url_loja: "https://www.skala.com.br/shampoo-argan",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 2, // Shampoo
    id_tipo_cabelo: 5, // Todos os tipos
  },
  {
    nome: "Shampoo Lola Cosmetics Creme de Onça",
    marca: "Lola Cosmetics",
    descricao: "Shampoo protetor para cabelos afros com extrato de copaíba",
    composicao: "Água, Cocoamidopropil Betaína, Extrato de Copaíba, Mel, Pantenol",
    qualidades: "Proteção UV, Anti-inflamtório, Hidratação, Vegano",
    mais_detalhes: "Desenvolvido especialmente para cabelos afros e crespos. Contém plantas amazônicas.",
    preco: 24.90,
    url_loja: "https://www.lolacosmeticos.com.br/creme-de-onca-shampoo",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 2, // Shampoo
    id_tipo_cabelo: 3, // Crespo
  },
  {
    nome: "Shampoo Niely Gold Cachos",
    marca: "Niely Gold",
    descricao: "Shampoo definidor com açúcar cristal para cachos",
    composicao: "Água, Sulfato de Amônio Lauril Éter, Açúcar, Proteína de Trigo, Glicerina",
    qualidades: "Definição de cachos, Leveza, Anti-frizz, Brilho natural",
    mais_detalhes: "Especialmente formulado para valorizar e definir todos os tipos de cachos.",
    preco: 6.90,
    url_loja: "https://www.niely.com.br/shampoo-cachos",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 2, // Shampoo
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Shampoo Natura Ekos Açaí",
    marca: "Natura",
    descricao: "Shampoo com extrato de açaí da Amazônia",
    composicao: "Água, Coco-glucósido, Extrato de Açaí, Óleos Essenciais, Vitaminas",
    qualidades: "Limpeza suave, Antioxidante, Fragrância natural, Ecocert",
    mais_detalhes: "Linha sustentável com ingredientes da Amazônia. Frasco com 280ml.",
    preco: 22.00,
    url_loja: "https://www.natura.com.br/ekos-acai-shampoo",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 2, // Shampoo
    id_tipo_cabelo: 5, // Todos os tipos
  },

  // ===== CONDICIONADOR (ID_TAG: 1) - 5 produtos =====
  {
    nome: "Condicionador Salon Line Tratamento Nutritivo",
    marca: "Salon Line",
    descricao: "Condicionador com óleo de coco para nutrição intensiva",
    composicao: "Água, Óleo de Coco, Cetil Álcool, Bisabolol, Pantenol",
    qualidades: "Nutrição, Maciez extrema, Hidratação profunda, Anti-frizz",
    mais_detalhes: "Complementa perfeitamente o shampoo. Deixa cabelos sedosos e leves.",
    preco: 12.90,
    url_loja: "https://www.belezanaweb.com.br/salon-line-condicionador",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 1, // Condicionador
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Condicionador Skala Expert Argan",
    marca: "Skala",
    descricao: "Condicionador reparador com óleo de argan",
    composicao: "Água, Óleo de Argan, Cetearil Álcool, Queratina, Vitamina E",
    qualidades: "Reparação, Brilho, Proteção, Maciez",
    mais_detalhes: "Fórmula premium com argan marroquino puro. Indicado para cabelos secos e danificados.",
    preco: 8.90,
    url_loja: "https://www.skala.com.br/condicionador-argan",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 1, // Condicionador
    id_tipo_cabelo: 5, // Todos os tipos
  },
  {
    nome: "Condicionador Lola Cosmetics Donna Jaspe",
    marca: "Lola Cosmetics",
    descricao: "Condicionador definiidor com argila negra para cachos",
    composicao: "Água, Argila Negra, Manteiga de Karitê, Óleo de Jojoba, Extrato de Bambú",
    qualidades: "Definição, Hidratação, Vegano, Cruelty-free",
    mais_detalhes: "Detoxifica enquanto hidrata. Perfeito para cabelos cacheados e afros.",
    preco: 26.90,
    url_loja: "https://www.lolacosmeticos.com.br/donna-jaspe-condicionador",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 1, // Condicionador
    id_tipo_cabelo: 3, // Crespo
  },
  {
    nome: "Condicionador Niely Gold Cachos",
    marca: "Niely Gold",
    descricao: "Condicionador definidor para realçar e definir cachos",
    composicao: "Água, Óleo de Coco, Açúcar, Panthenol, Proteína de Trigo",
    qualidades: "Definição, Hidratação, Leveza, Brilho",
    mais_detalhes: "Fórmula cremosa que define sem pesar. Deixa os cachos soltos e brilhosos.",
    preco: 6.90,
    url_loja: "https://www.niely.com.br/condicionador-cachos",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 1, // Condicionador
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Condicionador Natura Ekos Açaí",
    marca: "Natura",
    descricao: "Condicionador nutritivo com antioxidantes de açaí",
    composicao: "Água, Óleo de Coco, Extrato de Açaí, Vitaminas C e E, Óleos Essenciais",
    qualidades: "Nutrição, Antioxidante, Fragrância amazônica, Sustentável",
    mais_detalhes: "Fórmula leve com 200ml. Ideal para uso diário em todos os cabelos.",
    preco: 22.00,
    url_loja: "https://www.natura.com.br/ekos-acai-condicionador",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 1, // Condicionador
    id_tipo_cabelo: 5, // Todos os tipos
  },

  // ===== MÁSCARA CAPILAR (ID_TAG: 3) - 5 produtos =====
  {
    nome: "Máscara Capilar Skala Expert Argan",
    marca: "Skala",
    descricao: "Máscara intensiva com óleo de argan para hidratação profunda",
    composicao: "Água, Óleo de Argan, Manteiga de Karitê, Queratina, Ceramidas",
    qualidades: "Hidratação intensa, Reparação, Brilho extremo, Proteção",
    mais_detalhes: "Aplique aos fios e deixe agir por 10-15 minutos. Transformação visível.",
    preco: 15.90,
    url_loja: "https://www.skala.com.br/mascara-argan",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 3, // Máscara capilar
    id_tipo_cabelo: 5, // Todos os tipos
  },
  {
    nome: "Máscara Lola Cosmetics Abacaxi com Gengibre",
    marca: "Lola Cosmetics",
    descricao: "Máscara energizante com abacaxi e gengibre para estimular raízes",
    composicao: "Água, Extrato de Abacaxi, Gengibre, Pantenol, Proteínas Vegetais",
    qualidades: "Energizante, Estimula crescimento, Vegano, Aroma tropical",
    mais_detalhes: "Tratamento capilar que trabalha no couro cabeludo. Use 2x por semana.",
    preco: 28.90,
    url_loja: "https://www.lolacosmeticos.com.br/abacaxi-gengibre-mascara",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 3, // Máscara capilar
    id_tipo_cabelo: 3, // Crespo
  },
  {
    nome: "Máscara Salon Line Tratamento Nutritivo",
    marca: "Salon Line",
    descricao: "Máscara hidratante com óleo de coco e manteiga de karitê",
    composicao: "Óleo de Coco, Manteiga de Karitê, Cetil Álcool, Bisabolol, Pantenol",
    qualidades: "Hidratação, Maciez, Nutrição profunda, Anti-frizz",
    mais_detalhes: "Máscara luxuosa de 300ml. Ideal para cabelos ressecados. Resultado em 1 uso.",
    preco: 14.90,
    url_loja: "https://www.belezanaweb.com.br/salon-line-mascara",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 3, // Máscara capilar
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Máscara Niely Gold Cachos",
    marca: "Niely Gold",
    descricao: "Máscara capilar para definição e hidratação de cachos",
    composicao: "Água, Óleo de Coco, Açúcar Cristal, Pantenol, Silicones",
    qualidades: "Definição perfeita, Hidratação, Brilho natural, Leveza",
    mais_detalhes: "Tubo de 200ml. Aplique nas pontas e detenha por 15 minutos.",
    preco: 7.90,
    url_loja: "https://www.niely.com.br/mascara-cachos",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 3, // Máscara capilar
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Máscara Natura Ekos Açaí",
    marca: "Natura",
    descricao: "Máscara regeneradora com açaí e óleos amazônicos",
    composicao: "Água, Óleo de Coco, Extrato de Açaí, Óleos Essenciais, Vitaminas",
    qualidades: "Regeneração, Antioxidante, Fragrância natural, Ecocert",
    mais_detalhes: "Pote de 200ml. Máscara semanal para todo tipo de cabelo. Resultado profissional.",
    preco: 28.00,
    url_loja: "https://www.natura.com.br/ekos-acai-mascara",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 3, // Máscara capilar
    id_tipo_cabelo: 5, // Todos os tipos
  },

  // ===== SÉRUM FACIAL (ID_TAG: 5) - 5 produtos =====
  {
    nome: "Sérum Facial O Boticário Renovador Noturno",
    marca: "O Boticário",
    descricao: "Sérum anti-idade com retinol e vitamina C para renovação noturna",
    composicao: "Água, Retinol, Vitamina C Estável, Ácido Hialurônico, Niacinamida",
    qualidades: "Anti-idade, Renovação, Clareamento, Firmeza",
    mais_detalhes: "Use à noite para regeneração celular. Frasco de 30ml com conta-gotas.",
    preco: 149.90,
    url_loja: "https://www.boticario.com.br/serum-renovador-noturno",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 5, // Sérum facial
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Sérum Natura Tododia Vitamina C",
    marca: "Natura",
    descricao: "Sérum facial com vitamina C pura para luminosidade",
    composicao: "Água, Vitamina C Pura, Ácido Hialurônico, Extrato de Morango, Glicerina",
    qualidades: "Luminosidade, Antioxidante, Firmeza, Clareamento",
    mais_detalhes: "Frasco de 30ml. Aplique na pele limpa pela manhã. Resultado em 7 dias.",
    preco: 119.90,
    url_loja: "https://www.natura.com.br/tododia-vitamina-c",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 5, // Sérum facial
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Sérum Facial Eudora Hydraderm Plus",
    marca: "Eudora",
    descricao: "Sérum hidratante com ácido hialurônico e água micelar",
    composicao: "Água Micelar, Ácido Hialurônico, Glicerina, Niacinamida, Extrato de Café",
    qualidades: "Hidratação intensa, Anti-idade, Leveza, Brilho",
    mais_detalhes: "Tubo de 40ml. Fórmula leve e absorção rápida. Dermatologicamente testado.",
    preco: 94.90,
    url_loja: "https://www.eudora.com.br/hydraderm-plus-serum",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 5, // Sérum facial
    id_tipo_pele: 1, // Normal
    id_tipo_cabelo: null,
  },
  {
    nome: "Sérum Facial Granado Vitamina E",
    marca: "Granado",
    descricao: "Sérum antioxidante com vitamina E e azeite de oliva",
    composicao: "Azeite de Oliva, Vitamina E, Ácido Hialurônico, Glicerina, Extrato de Camomila",
    qualidades: "Antioxidante, Nutrição, Proteção, Firmeza",
    mais_detalhes: "Frasco de 30ml. Fórmula luxuosa com ingredientes naturais. Uso noturno.",
    preco: 124.90,
    url_loja: "https://www.granado.com.br/serum-vitamina-e",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 5, // Sérum facial
    id_tipo_pele: 2, // Seca
    id_tipo_cabelo: null,
  },
  {
    nome: "Sérum Facial Avon Anew Clinical",
    marca: "Avon",
    descricao: "Sérum anti-rugas com ácido kójico e vitamina C",
    composicao: "Ácido Kójico, Vitamina C, Ácido Hialurônico, Niacinamida, Extrato de Chá Verde",
    qualidades: "Anti-rugas, Clareamento, Firmeza, Luminosidade",
    mais_detalhes: "Tratamento completo anti-idade. Frasco de 30ml. Resultados em 4 semanas.",
    preco: 189.90,
    url_loja: "https://www.avon.com.br/anew-clinical-serum",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 5, // Sérum facial
    id_tipo_pele: 3, // Mista
    id_tipo_cabelo: null,
  },

  // ===== HIDRATANTE CORPORAL (ID_TAG: 6) - 5 produtos =====
  {
    nome: "Hidratante Corporal O Boticário Ucuúba",
    marca: "O Boticário",
    descricao: "Hidratante corporal com manteiga de ucuúba e cacau",
    composicao: "Água, Manteiga de Ucuúba, Óleo de Cacau, Glicerina, Vitamina E",
    qualidades: "Hidratação 48h, Nutrição profunda, Fragrância delicada, Absorção rápida",
    mais_detalhes: "Frasco de 200ml. Aplicar diariamente na pele ainda úmida após banho.",
    preco: 45.90,
    url_loja: "https://www.boticario.com.br/hidratante-ucuuba",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 6, // Hidratante corporal
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Hidratante Corporal Natura Ekos Pitanga",
    marca: "Natura",
    descricao: "Creme corporal com pitanga e óleos amazônicos",
    composicao: "Água, Óleo de Coco, Extrato de Pitanga, Óleos Essenciais, Vitaminas",
    qualidades: "Hidratação sustentável, Antioxidante, Fragrância tropical, Ecocert",
    mais_detalhes: "Pote de 200ml. Aroma natural de pitanga amazônica. Textura leve e macia.",
    preco: 54.90,
    url_loja: "https://www.natura.com.br/ekos-pitanga-creme",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 6, // Hidratante corporal
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Hidratante Corporal Granado Tradicional",
    marca: "Granado",
    descricao: "Creme corporal clássico com glicerina de coco",
    composicao: "Água, Glicerina de Coco, Óleo Mineral, Lanolina, Vitamina E",
    qualidades: "Hidratação duradoura, Maciez, Proteção, Tradição desde 1870",
    mais_detalhes: "Lata de 250ml. Fórmula testada há gerações. Ideal para pele seca.",
    preco: 38.90,
    url_loja: "https://www.granado.com.br/hidratante-tradicional",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 6, // Hidratante corporal
    id_tipo_pele: 2, // Seca
    id_tipo_cabelo: null,
  },
  {
    nome: "Hidratante Corporal Sundown Protetor Solar",
    marca: "Sundown",
    descricao: "Hidratante corporal com proteção solar FPS 30",
    composicao: "Água, Filtros Solares, Glicerina, Óleo de Coco, Vitamina E",
    qualidades: "Hidratação + proteção UV, Antienvelhecimento, Absorção rápida",
    mais_detalhes: "Frasco de 200ml. Proteja enquanto hidrata. Ideal para pele oleosa.",
    preco: 42.90,
    url_loja: "https://www.sundown.com.br/hidratante-fps30",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 6, // Hidratante corporal
    id_tipo_pele: 4, // Oleosa
    id_tipo_cabelo: null,
  },
  {
    nome: "Hidratante Corporal Eudora Manteiga Cacau",
    marca: "Eudora",
    descricao: "Creme corporal gourmet com manteiga de cacau",
    composicao: "Água, Manteiga de Cacau, Óleo de Argan, Glicerina, Vitaminas C e E",
    qualidades: "Nutrição luxuosa, Aroma chocolate, Fermeza, Fragrância gourmet",
    mais_detalhes: "Pote de 250ml. Textura cremosa e perfumada. Hidratação por 72 horas.",
    preco: 67.90,
    url_loja: "https://www.eudora.com.br/manteiga-cacau-creme",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 6, // Hidratante corporal
    id_tipo_pele: 1, // Normal
    id_tipo_cabelo: null,
  },

  // ===== ÓLEO CAPILAR (ID_TAG: 7) - 5 produtos =====
  {
    nome: "Óleo Capilar Lola Cosmetics Abacaxi",
    marca: "Lola Cosmetics",
    descricao: "Óleo capilar com extrato de abacaxi para nutritivo",
    composicao: "Óleo de Coco, Extrato de Abacaxi, Óleo de Jojoba, Vitamina E, Pantenol",
    qualidades: "Nutrição, Brilho natural, Vegano, Aroma tropical",
    mais_detalhes: "Frasco de 60ml com pipeta. Use nas pontas e raízes. Anti-frizz poderoso.",
    preco: 32.90,
    url_loja: "https://www.lolacosmeticos.com.br/oleo-abacaxi",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 7, // Óleo capilar
    id_tipo_cabelo: 3, // Crespo
  },
  {
    nome: "Óleo Capilar Salon Line Nutritivo",
    marca: "Salon Line",
    descricao: "Óleo capilar finalizador com argan e coco",
    composicao: "Óleo de Argan, Óleo de Coco, Óleo de Jojoba, Vitamina E, Bisabolol",
    qualidades: "Nutrição, Brilho, Anti-frizz, Penteabilidade",
    mais_detalhes: "Spray de 100ml. Aplique nas pontas úmidas ou secas. Resultado imediato.",
    preco: 18.90,
    url_loja: "https://www.belezanaweb.com.br/salon-line-oleo",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 7, // Óleo capilar
    id_tipo_cabelo: 4, // Cacheado
  },
  {
    nome: "Óleo Capilar Skala Expert Argan",
    marca: "Skala",
    descricao: "Óleo finalizador premium com argan marroquino",
    composicao: "Óleo de Argan, Óleo de Jojoba, Vitamina E, Pantenol, Extrato de Camomila",
    qualidades: "Brilho intenso, Nutrição, Proteção térmica, Fragância suave",
    mais_detalhes: "Frasco de 70ml. Uso antes do secador para proteção térmica.",
    preco: 22.90,
    url_loja: "https://www.skala.com.br/oleo-argan",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 7, // Óleo capilar
    id_tipo_cabelo: 5, // Todos os tipos
  },
  {
    nome: "Óleo Capilar Natura Ekos Coco",
    marca: "Natura",
    descricao: "Óleo capilar com coco e óleos essenciais amazônicos",
    composicao: "Óleo de Coco, Óleos Essenciais, Vitamina E, Pantenol, Extrato de Guaraná",
    qualidades: "Nutrição amazônica, Brilho, Fragrância natural, Ecocert",
    mais_detalhes: "Frasco de 60ml. Uso diário nas pontas. Cabelos macios e brilhantes.",
    preco: 28.90,
    url_loja: "https://www.natura.com.br/ekos-oleo-coco",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 7, // Óleo capilar
    id_tipo_cabelo: 5, // Todos os tipos
  },
  {
    nome: "Óleo Capilar Niely Gold Cachos",
    marca: "Niely Gold",
    descricao: "Óleo nutritivo para definição e hidratação de cachos",
    composicao: "Óleo de Coco, Óleo de Jojoba, Vitamina E, Pantenol, Glicerina",
    qualidades: "Definição, Hidratação, Leveza, Brilho natural",
    mais_detalhes: "Spray de 120ml. Finalizador ideal para cachos e crespos.",
    preco: 11.90,
    url_loja: "https://www.niely.com.br/oleo-cachos",
    url_imagem: null,
    id_categoria: 1, // Cabelo
    id_tag: 7, // Óleo capilar
    id_tipo_cabelo: 4, // Cacheado
  },

  // ===== PROTETOR SOLAR (ID_TAG: 8) - 5 produtos =====
  {
    nome: "Protetor Solar O Boticário Boti.Sun FPS 70",
    marca: "O Boticário",
    descricao: "Protetor solar facial com cor e toque seco",
    composicao: "Água, Filtros Solares Minerais, Niacinamida, Ácido Hialurônico, Vitamina E",
    qualidades: "FPS 70, Toque seco, Com cor, Anti-shine, Resistente à água",
    mais_detalhes: "Tubo de 40ml. Aplicar generosamente no rosto. Reaplique a cada 2 horas.",
    preco: 79.90,
    url_loja: "https://www.boticario.com.br/boti-sun-fps70",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 8, // Protetor solar
    id_tipo_pele: 3, // Mista
    id_tipo_cabelo: null,
  },
  {
    nome: "Protetor Solar Natura Fotoequilíbrio FPS 60",
    marca: "Natura",
    descricao: "Protetor solar facial com toque seco para pele oleosa",
    composicao: "Água, Filtros Solares, Toque Seco, Niacinamida, Aloe Vera, Vitaminas",
    qualidades: "FPS 60, Toque seco, Sem óleo, Resistente à água, Vegano",
    mais_detalhes: "Frasco de 50ml. Textura gel-creme. Ideal para pele oleosa a mista.",
    preco: 89.90,
    url_loja: "https://www.natura.com.br/fotoequilibrio-fps60",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 8, // Protetor solar
    id_tipo_pele: 4, // Oleosa
    id_tipo_cabelo: null,
  },
  {
    nome: "Protetor Solar Episol Color FPS 70",
    marca: "Episol",
    descricao: "Protetor solar com cor e proteção máxima",
    composicao: "Água, Filtros Solares, Pigmentos Minerais, Vitamina E, Ácido Hialurônico",
    qualidades: "FPS 70, Com cor, Cobertura alta, Matte, Resistente à água",
    mais_detalhes: "Frasco de 40ml. 5 tons disponíveis. Uso diário recomendado.",
    preco: 55.90,
    url_loja: "https://www.episol.com.br/color-fps70",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 8, // Protetor solar
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Protetor Solar Sundown FPS 50 Praia",
    marca: "Sundown",
    descricao: "Protetor solar corporal para praia e piscina",
    composicao: "Água, Filtros Solares, Óleo de Coco, Vitamina E, Aloe Vera",
    qualidades: "FPS 50, À prova d'água, Resistente suor, Proteção forte",
    mais_detalhes: "Frasco de 200ml. Aplicar 15 minutos antes da exposição solar.",
    preco: 38.90,
    url_loja: "https://www.sundown.com.br/praia-fps50",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 8, // Protetor solar
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Protetor Solar Granado Facial FPS 50",
    marca: "Granado",
    descricao: "Protetor solar facial com ingredientes naturais",
    composicao: "Óleo de Coco, Filtros Solares, Antioxidantes, Vitamina E, Extrato de Camomila",
    qualidades: "FPS 50, Natural, Hidratante, Toque leve, Cruelty-free",
    mais_detalhes: "Tubo de 50ml. Formulação clássica desde 1870. Uso diário.",
    preco: 64.90,
    url_loja: "https://www.granado.com.br/facial-fps50",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 8, // Protetor solar
    id_tipo_pele: 2, // Seca
    id_tipo_cabelo: null,
  },

  // ===== SABONETE (ID_TAG: 14) - 5 produtos =====
  {
    nome: "Sabonete Granado Tradicional",
    marca: "Granado",
    descricao: "Sabonete clássico com glicerina de coco",
    composicao: "Óleo de Coco, Glicerina, Água, Sal Marinho, Extrato de Camomila",
    qualidades: "Limpeza suave, Hidratante, Tradição desde 1870, Cruelty-free",
    mais_detalhes: "Barra de 90g. Indicado para todos os tipos de pele. Aroma suave.",
    preco: 7.90,
    url_loja: "https://www.granado.com.br/sabonete-tradicional",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 14, // Sabonete
    id_tipo_pele: 1, // Normal
    id_tipo_cabelo: null,
  },
  {
    nome: "Sabonete Natura Ekos Coco",
    marca: "Natura",
    descricao: "Sabonete com coco e óleos amazônicos",
    composicao: "Óleo de Coco, Óleos Essenciais, Glicerina, Extrato de Guaraná, Água",
    qualidades: "Limpeza suave, Fragrância tropical, Vegano, Ecocert",
    mais_detalhes: "Barra de 100g. Aroma natural amazônico. Sustentável.",
    preco: 9.90,
    url_loja: "https://www.natura.com.br/ekos-sabonete-coco",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 14, // Sabonete
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Sabonete O Boticário Aqua Fresh",
    marca: "O Boticário",
    descricao: "Sabonete refrescante com toque aquático",
    composicao: "Água, Óleo Vegetal, Glicerina, Fragrância Aquática, Vitamina E",
    qualidades: "Limpeza refrescante, Aroma aquático, Toque leve, Suave",
    mais_detalhes: "Barra de 85g. Ideal para pele sensível. Uso diário.",
    preco: 6.90,
    url_loja: "https://www.boticario.com.br/sabonete-aqua-fresh",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 14, // Sabonete
    id_tipo_pele: 1, // Normal
    id_tipo_cabelo: null,
  },
  {
    nome: "Sabonete Lola Cosmetics Banho de Leite",
    marca: "Lola Cosmetics",
    descricao: "Sabonete nutritivo com proteínas de leite",
    composicao: "Proteína de Leite, Óleo de Coco, Glicerina, Extrato de Camomila, Aloe",
    qualidades: "Nutrição, Maciez extrema, Vegano, Hidratante",
    mais_detalhes: "Barra de 90g. Para pele seca e sensível. Aroma delicado.",
    preco: 11.90,
    url_loja: "https://www.lolacosmeticos.com.br/sabonete-banho-leite",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 14, // Sabonete
    id_tipo_pele: 2, // Seca
    id_tipo_cabelo: null,
  },
  {
    nome: "Sabonete Eudora Charcoal Detox",
    marca: "Eudora",
    descricao: "Sabonete detoxificante com carvão ativado",
    composicao: "Carvão Ativado, Óleo de Coco, Glicerina, Extrato de Chá Verde, Vitamina E",
    qualidades: "Detox, Limpeza profunda, Matte, Cruelty-free",
    mais_detalhes: "Barra de 85g. Para pele oleosa e mista. Remove impurezas.",
    preco: 8.90,
    url_loja: "https://www.eudora.com.br/sabonete-charcoal",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 14, // Sabonete
    id_tipo_pele: 4, // Oleosa
    id_tipo_cabelo: null,
  },

  // ===== COLÔNIA (ID_TAG: 1638) - 5 produtos =====
  {
    nome: "Colônia Natura Ekos Pitanga",
    marca: "Natura",
    descricao: "Colônia com fragrância tropical de pitanga",
    composicao: "Álcool, Extrato de Pitanga, Óleos Essenciais, Antioxidantes",
    qualidades: "Aroma tropical, Duração 6h, Vegana, Ecocert",
    mais_detalhes: "Frasco de 150ml. Fragrância leve e refrescante. Ideal para dia.",
    preco: 68.90,
    url_loja: "https://www.natura.com.br/ekos-colonia-pitanga",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 1638, // Colônia
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Colônia O Boticário Aqua Ocean",
    marca: "O Boticário",
    descricao: "Colônia aquática com aroma oceânico refrescante",
    composicao: "Álcool, Fragrância Aquática, Musgo de Carvalho, Sândalo, Almíscares",
    qualidades: "Aroma aquático, Duração 8h, Luxuosa, Versátil",
    mais_detalhes: "Frasco de 160ml. Para homens e mulheres. Uso diário.",
    preco: 89.90,
    url_loja: "https://www.boticario.com.br/colonia-aqua-ocean",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 1638, // Colônia
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Colônia Granado Clássica",
    marca: "Granado",
    descricao: "Colônia tradicional com fragrância floral elegante",
    composicao: "Álcool, Fragrância Floral, Jasmim, Rosa Absoluta, Almíscares",
    qualidades: "Aroma clássico, Duração 7h, Tradição desde 1870, Premium",
    mais_detalhes: "Frasco de 150ml. Aroma sofisticado e duradouro.",
    preco: 98.90,
    url_loja: "https://www.granado.com.br/colonia-classica",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 1638, // Colônia
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Colônia Eudora Amour",
    marca: "Eudora",
    descricao: "Colônia feminina com fragrância romântica",
    composicao: "Álcool, Fragrância Floral, Patchouli, Âmbar, Almíscares",
    qualidades: "Aroma sensual, Duração 8h, Presença marcante",
    mais_detalhes: "Frasco de 160ml. Fragrância sofisticada para dia e noite.",
    preco: 119.90,
    url_loja: "https://www.eudora.com.br/colonia-amour",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 1638, // Colônia
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
  {
    nome: "Colônia Lola Cosmetics Citrus",
    marca: "Lola Cosmetics",
    descricao: "Colônia refrescante com aromas cítricos e especiarias",
    composicao: "Álcool, Limão Siciliano, Laranja, Cravo, Canela, Cedro",
    qualidades: "Aroma cítrico fresco, Duração 6h, Vegana, Unissex",
    mais_detalhes: "Frasco de 150ml. Fragrância leve e energizante. Uso diário.",
    preco: 79.90,
    url_loja: "https://www.lolacosmeticos.com.br/colonia-citrus",
    url_imagem: null,
    id_categoria: 2, // Pele
    id_tag: 1638, // Colônia
    id_tipo_pele: 5, // Todos os tipos
    id_tipo_cabelo: null,
  },
];

async function seedProdutos() {
  try {
    console.log("🏗️ Criando banco de dados com 45 produtos reais...\n");

    // Limpar produtos existentes (opcional)
    await prisma.produto.deleteMany({});
    console.log("✅ Banco limpo\n");

    // Criar produtos
    console.log("📦 Adicionando 45 produtos estruturados...\n");

    for (const produto of produtos) {
      const created = await prisma.produto.create({
        data: produto,
      });
      console.log(
        `✅ ${created.marca} - ${created.nome} (R$ ${created.preco})`
      );
    }

    console.log("\n🎉 45 produtos criados com sucesso!");
    console.log("📊 Distribuição:");
    console.log("   - 5 produtos SHAMPOO");
    console.log("   - 5 produtos CONDICIONADOR");
    console.log("   - 5 produtos MÁSCARA CAPILAR");
    console.log("   - 5 produtos SÉRUM FACIAL");
    console.log("   - 5 produtos HIDRATANTE CORPORAL");
    console.log("   - 5 produtos ÓLEO CAPILAR");
    console.log("   - 5 produtos PROTETOR SOLAR");
    console.log("   - 5 produtos SABONETE");
    console.log("   - 5 produtos COLÔNIA");

    console.log("\n✅ Marcas incluídas:");
    console.log(
      "   Brasileiro: Salon Line, Skala, Lola Cosmetics, Niely Gold, Natura, O Boticário, Granado, Eudora, Episol, Sundown, Avon"
    );

    console.log("\n⏳ url_imagem: Deixada vazia para você adicionar depois");
  } catch (error) {
    console.error("❌ Erro ao criar produtos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedProdutos();
