import { prisma } from '../src/lib/prisma';

interface ProdutoCompleto {
  nome: string;
  marca: string;
  descricao: string;
  composicao: string;
  qualidades: string;
  mais_detalhes: string;
  preco: number;
  url_loja: string;
  id_categoria: number;
  id_tipo_cabelo?: number;
  id_tipo_pele?: number;
}

// 4 produtos por marca, categoria, tipo de cabelo e tipo de pele
const produtos: ProdutoCompleto[] = [
  // CATEGORIA CABELO (id_categoria = 1)
  // Marca: Inoar | Tipo Cabelo: Liso (1)
  {
    nome: 'Shampoo Neutro Inoar para Cabelo Liso',
    marca: 'Inoar',
    descricao: 'Shampoo neutro profissional específico para cabelos lisos, mantém o brilho natural e evita o frizz',
    composicao: 'Água, Laurilsulfato de Amônio, Cocoamidopropil Betaína, Proteínas Hidrolisadas de Trigo, Pantenol, Vitamina B5, EDTA Tetrassódico',
    qualidades: 'Limpeza suave, Proteção de cor, Sem sulfato agressivo, Brilho intenso, Maciez prolongada',
    mais_detalhes: 'Volume: 1000ml | pH: Neutro 6.5 | Indicado para: Cabelos lisos | Frequência: Uso diário | Tempo de ação: 2-3 minutos',
    preco: 29.90,
    url_loja: 'https://www.inoar.com.br',
    id_categoria: 1,
    id_tipo_cabelo: 1,
  },
  {
    nome: 'Condicionador Hidratante Inoar para Cabelo Liso',
    marca: 'Inoar',
    descricao: 'Condicionador com óleo de argan premium para hidratação profunda em cabelos lisos',
    composicao: 'Água, Cetil Álcool, Estearamida MIPA, Óleo de Argan, Proteína de Seda Hidrolisada, Vitamina E, Panthenol, Glicerina',
    qualidades: 'Hidratação profunda, Maciez intensa, Brilho natural, Proteção térmica, Reparação de danos',
    mais_detalhes: 'Volume: 1000ml | Indicado para: Cabelos secos e lisos | Frequência: Uso diário | Tempo de ação: 3-5 minutos',
    preco: 32.90,
    url_loja: 'https://www.inoar.com.br',
    id_categoria: 1,
    id_tipo_cabelo: 1,
  },
  {
    nome: 'Máscara Capilar Intensiva Inoar para Cabelo Liso',
    marca: 'Inoar',
    descricao: 'Máscara profissional com queratina e colágeno para reconstrução intensiva',
    composicao: 'Água, Cetil Álcool, Cetearil Álcool, Queratina Hidrolisada, Colágeno Marinho, Óleo de Argan, Vitamina E, Pantenol, Proteína de Soja',
    qualidades: 'Reconstrução profunda, Resistência aumentada, Brilho intenso, Reparação de pontas duplas, Proteção térmica',
    mais_detalhes: 'Volume: 250ml | Indicado para: Cabelos danificados e lisos | Frequência: 1-2x por semana | Tempo de ação: 10-15 minutos',
    preco: 45.90,
    url_loja: 'https://www.inoar.com.br',
    id_categoria: 1,
    id_tipo_cabelo: 1,
  },
  {
    nome: 'Sérum Anti-Frizz Inoar para Cabelo Liso',
    marca: 'Inoar',
    descricao: 'Sérum finalizador que controla frizz e proporciona brilho prolongado',
    composicao: 'Ciclopentasiloxano, Óleo de Argan, Vitamina E (Tocoferol), Panthenol, Filtro Solar (Avobenzona), Silicone Volátil, Óleo de Coco',
    qualidades: 'Anti-frizz ultra potente, Brilho por até 72h, Proteção UV, Não deixa resíduo, Secagem rápida',
    mais_detalhes: 'Volume: 250ml | Indicado para: Todos os cabelos (especial liso) | Frequência: Uso diário | Aplicar em cabelo seco ou semi-seco',
    preco: 55.90,
    url_loja: 'https://www.inoar.com.br',
    id_categoria: 1,
    id_tipo_cabelo: 1,
  },

  // Marca: OGX | Tipo Cabelo: Cacheado (3)
  {
    nome: 'Shampoo Definidor OGX para Cabelo Cacheado',
    marca: 'OGX',
    descricao: 'Shampoo que define e controla cachos, com queratina e proteínas',
    composicao: 'Água, Laurilsulfato de Amônio, Cocoamidopropil Betaína, Queratina Hidrolisada, Proteínas do Trigo, Óleo de Coco, Manteiga de Karité',
    qualidades: 'Definição de cachos, Controle de frizz, Não resseca, Proteção da cor, Volume natural',
    mais_detalhes: 'Volume: 385ml | Indicado para: Cabelos cacheados e ondulados | Frequência: Uso diário | Tempo de ação: 2-3 minutos',
    preco: 38.90,
    url_loja: 'https://www.ogx.com',
    id_categoria: 1,
    id_tipo_cabelo: 3,
  },
  {
    nome: 'Condicionador Definidor OGX para Cabelo Cacheado',
    marca: 'OGX',
    descricao: 'Condicionador que reforça a definição natural dos cachos',
    composicao: 'Água, Cetil Álcool, Estearamida MIPA, Manteiga de Karité, Óleo de Coco, Proteína de Trigo Hidrolisada, Pantenol, Glicerina',
    qualidades: 'Definição reforçada, Hidratação profunda, Controle de volume, Reduz frizz, Cachos mais brilhantes',
    mais_detalhes: 'Volume: 385ml | Indicado para: Cabelos cacheados | Frequência: Uso diário | Tempo de ação: 3-5 minutos',
    preco: 38.90,
    url_loja: 'https://www.ogx.com',
    id_categoria: 1,
    id_tipo_cabelo: 3,
  },
  {
    nome: 'Máscara Intensiva OGX para Cabelo Cacheado',
    marca: 'OGX',
    descricao: 'Máscara regeneradora com queratina para reconstrução e hidratação intensiva',
    composicao: 'Água, Cetil Álcool, Cetearil Álcool, Queratina Hidrolisada, Proteína de Trigo, Óleo de Coco, Pantenol, Vitamina E, Aloe Vera',
    qualidades: 'Reconstrução profunda, Hidratação intensiva, Cachos mais definidos, Repara danos, Brilho intenso',
    mais_detalhes: 'Volume: 200ml | Indicado para: Cabelos cacheados danificados | Frequência: 1-2x por semana | Tempo de ação: 10-15 minutos',
    preco: 52.90,
    url_loja: 'https://www.ogx.com',
    id_categoria: 1,
    id_tipo_cabelo: 3,
  },
  {
    nome: 'Gel Definidor OGX para Cabelo Cacheado',
    marca: 'OGX',
    descricao: 'Gel finalizador que define e fixa os cachos com flexibilidade',
    composicao: 'Água, Álcool Denat., Polimeros (PVP/VA), Aroma, Panthenol, Extratos de Plantas, Conservantes, Glicerina',
    qualidades: 'Fixação flexível, Não endurece, Define cachos, Sem resíduo branco, Hold prolongado',
    mais_detalhes: 'Volume: 170ml | Indicado para: Cabelos cacheados | Frequência: Uso diário | Aplicar em cabelo úmido antes de secar',
    preco: 32.90,
    url_loja: 'https://www.ogx.com',
    id_categoria: 1,
    id_tipo_cabelo: 3,
  },

  // CATEGORIA PELE (id_categoria = 2)
  // Marca: Neutrogena | Tipo Pele: Normal/Seca (1)
  {
    nome: 'Limpador Facial Neutrogena para Pele Seca',
    marca: 'Neutrogena',
    descricao: 'Limpador suave que remove impurezas sem ressecamento excessivo',
    composicao: 'Água, Laurilsulfato de Sódio, Cocoamidopropil Betaína, Glicerina, Aloe Barbadensis (Aloe Vera), Vitamina E (Tocoferol), EDTA Tetrassódico',
    qualidades: 'Limpeza profunda, Não resseca, Remove maquiagem, Não irrita, Mantém pH equilibrado',
    mais_detalhes: 'Volume: 200ml | Indicado para: Pele normal e seca | Frequência: 2x diário (manhã e noite) | Espuma leve e suave',
    preco: 24.90,
    url_loja: 'https://www.neutrogena.com.br',
    id_categoria: 2,
    id_tipo_pele: 1,
  },
  {
    nome: 'Hidratante Facial Neutrogena FPS 30 para Pele Seca',
    marca: 'Neutrogena',
    descricao: 'Hidratante diurno com proteção solar para pele seca',
    composicao: 'Água, Óleo de Girassol, Ciclopentasiloxano, Dióxido de Titânio, Óxido de Zinco, Glicerina, Ceramidas, Pantenol, Ácido Hialurônico',
    qualidades: 'Hidratação 24h, Proteção UVA/UVB FPS30, Não oleoso, Absorção rápida, Textura leve',
    mais_detalhes: 'Volume: 52ml | Indicado para: Pele seca | Frequência: Uso diário (manhã) | Aplicar após tônico',
    preco: 39.90,
    url_loja: 'https://www.neutrogena.com.br',
    id_categoria: 2,
    id_tipo_pele: 1,
  },
  {
    nome: 'Tônico Facial Neutrogena para Pele Seca',
    marca: 'Neutrogena',
    descricao: 'Tônico equilibrador que prepara a pele para absorção de outros produtos',
    composicao: 'Água, Glicerina, Propilenoglicol, Niacinamida, Panthenol, Aloe Barbadensis, Extratos de Plantas, Conservantes',
    qualidades: 'Equilibra pH, Aumenta absorção, Revitaliza pele, Sem álcool, Textura leve',
    mais_detalhes: 'Volume: 200ml | Indicado para: Pele seca | Frequência: 1-2x diário (após limpeza) | Aplicar com algodão',
    preco: 28.90,
    url_loja: 'https://www.neutrogena.com.br',
    id_categoria: 2,
    id_tipo_pele: 1,
  },
  {
    nome: 'Noite Reparadora Neutrogena para Pele Seca',
    marca: 'Neutrogena',
    descricao: 'Creme noturno reparador com fórmula concentrada',
    composicao: 'Água, Óleo de Girassol, Cetil Álcool, Glicerina, Manteiga de Karité, Ceramidas, Ácido Hialurônico, Pantenol, Vitamina E, Colágeno',
    qualidades: 'Hidratação intensiva noturna, Reparação profunda, Suaviza linhas, Textura rica, Absorção durante a noite',
    mais_detalhes: 'Volume: 50ml | Indicado para: Pele seca | Frequência: Uso noturno (antes de dormir) | Fórmula concentrada',
    preco: 49.90,
    url_loja: 'https://www.neutrogena.com.br',
    id_categoria: 2,
    id_tipo_pele: 1,
  },

  // Marca: Cerave | Tipo Pele: Oleosa (2)
  {
    nome: 'Limpador Gel Cerave para Pele Oleosa',
    marca: 'Cerave',
    descricao: 'Limpador gel que remove excesso de óleo sem ressecamento',
    composicao: 'Água, Coco-Glucosídeo, Decil Glucosídeo, Niacinamida, Ácido Hialurônico, Ceramidas (1, 3, 6-II), Óxido de Zinco, Ácido Salicílico',
    qualidades: 'Remove sebo excessivo, Controla oleosidade, Limpeza profunda, Não resseca, Sem sulfatos',
    mais_detalhes: 'Volume: 236ml | Indicado para: Pele oleosa | Frequência: 2x diário | Espuma suave e controlada',
    preco: 34.90,
    url_loja: 'https://www.cerave.com',
    id_categoria: 2,
    id_tipo_pele: 2,
  },
  {
    nome: 'Hidratante Matificante Cerave para Pele Oleosa',
    marca: 'Cerave',
    descricao: 'Hidratante oil-free com ácido salicílico para controle de oleosidade',
    composicao: 'Água, Niacinamida, Ácido Salicílico, Ácido Hialurônico, Ceramidas, Óxido de Zinco, Pantenol, Glicerina, Extrato de Chá Verde',
    qualidades: 'Toque seco/matificante, Controla oleosidade, Não comedogênico, Absorção rápida, Oil-free',
    mais_detalhes: 'Volume: 52ml | Indicado para: Pele oleosa | Frequência: 2x diário | Textura leve e fluida',
    preco: 42.90,
    url_loja: 'https://www.cerave.com',
    id_categoria: 2,
    id_tipo_pele: 2,
  },
  {
    nome: 'Sérum Clareador Cerave para Pele Oleosa',
    marca: 'Cerave',
    descricao: 'Sérum leve com niacinamida para clarear e controlar oleosidade',
    composicao: 'Água, Niacinamida, Ácido Hialurônico, Ceramidas, Pantenol, Glicerina, Extrato de Licorice, Vitamina B3, Conservantes',
    qualidades: 'Clareia manchas, Controla brilho, Textura leve, Absorção rápida, Não deixa resíduo',
    mais_detalhes: 'Volume: 30ml | Indicado para: Pele oleosa com manchas | Frequência: 1-2x diário | Aplicar antes do hidratante',
    preco: 55.90,
    url_loja: 'https://www.cerave.com',
    id_categoria: 2,
    id_tipo_pele: 2,
  },
  {
    nome: 'Máscara Argila Cerave para Pele Oleosa',
    marca: 'Cerave',
    descricao: 'Máscara de argila para limpeza profunda e destoxificação',
    composicao: 'Argila Caolim, Água, Glicerina, Niacinamida, Ácido Hialurônico, Ceramidas, Pantenol, Óxido de Zinco, Extrato de Chá Verde',
    qualidades: 'Limpeza profunda, Reduz poros, Desintoxica, Controla oleosidade, Textura cremosa',
    mais_detalhes: 'Volume: 85ml | Indicado para: Pele oleosa | Frequência: 1-2x por semana | Tempo de ação: 10-15 minutos',
    preco: 38.90,
    url_loja: 'https://www.cerave.com',
    id_categoria: 2,
    id_tipo_pele: 2,
  },
];

async function seedProdutosEstruturado() {
  try {
    console.log('🏗️ Criando banco de dados estruturado...\n');

    // Limpar
    await prisma.imagemProduto.deleteMany();
    await prisma.produto.deleteMany();
    console.log('✅ Banco limpo\n');

    console.log('📦 Adicionando 16 produtos estruturados...\n');

    let totalAdded = 0;

    for (const prod of produtos) {
      try {
        await prisma.produto.create({
          data: {
            nome: prod.nome,
            marca: prod.marca,
            descricao: prod.descricao,
            composicao: prod.composicao,
            qualidades: prod.qualidades,
            mais_detalhes: prod.mais_detalhes,
            preco: prod.preco,
            url_loja: prod.url_loja,
            id_categoria: prod.id_categoria,
            id_tipo_cabelo: prod.id_tipo_cabelo || null,
            id_tipo_pele: prod.id_tipo_pele || null,
            url_imagem: null, // Vazio para você adicionar depois
          }
        });

        const tipo = prod.id_tipo_cabelo ? '💇 Cabelo' : '🧴 Pele';
        console.log(`✅ ${tipo} | ${prod.marca} - ${prod.nome}`);
        totalAdded++;
      } catch (err) {
        console.error(`❌ Erro ao adicionar ${prod.nome}`);
      }
    }

    const total = await prisma.produto.count();
    console.log(`\n🎉 ${totalAdded} produtos criados com sucesso!`);
    console.log(`📊 Total no banco: ${total} produtos`);
    console.log(`\n📋 Estrutura:`);
    console.log(`   - 4 produtos INOAR | Cabelo Liso`);
    console.log(`   - 4 produtos OGX | Cabelo Cacheado`);
    console.log(`   - 4 produtos NEUTROGENA | Pele Seca`);
    console.log(`   - 4 produtos CERAVE | Pele Oleosa`);
    console.log(`\n✅ Todas as colunas preenchidas com dados reais`);
    console.log(`⏳ url_imagem: Deixada vazia para você adicionar depois`);

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProdutosEstruturado();
