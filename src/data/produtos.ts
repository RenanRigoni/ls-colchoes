import type { Produto, Variacao } from "@/types/produto";

/**
 * Catálogo de DEMONSTRAÇÃO montado a partir dos posts da loja no Instagram (@les_colchoes).
 * Preços marcados com "post" são os publicados pela loja (à vista e 12x no cartão);
 * os marcados com "ilustrativo" não apareceram nos posts e precisam ser confirmados.
 * Formato igual ao da futura tabela `produtos` no Supabase.
 */

const MEDIDAS = {
  Solteiro: "0,88 x 1,88 m",
  Casal: "1,38 x 1,88 m",
  Queen: "1,58 x 1,98 m",
  King: "1,93 x 2,03 m",
} as const;

type Tamanho = keyof typeof MEDIDAS;

/** Preço a prazo padrão: ~12% sobre o à vista, em 12x no cartão (média dos posts da loja). */
function prazo(vista: number): number {
  return Math.round(vista * 1.12 * 100) / 100;
}

/** Total a prazo a partir da parcela publicada no post (12x de R$ X). */
function doze(parcela: number): number {
  return Math.round(parcela * 12 * 100) / 100;
}

function t(nome: Tamanho, vista: number, precoPrazo = prazo(vista), sufixo = ""): Variacao {
  return { nome: `${nome}${sufixo}`, medidas: MEDIDAS[nome], precoVista: vista, precoPrazo };
}

/** Variação com altura do colchão no nome ("Casal 20 cm"). */
function a(nome: Tamanho, alturaCm: number, vista: number, precoPrazo = prazo(vista)): Variacao {
  return {
    nome: `${nome} ${alturaCm} cm`,
    medidas: `${MEDIDAS[nome].replace(" m", "")} x 0,${alturaCm} m`,
    precoVista: vista,
    precoPrazo,
  };
}

function fotos(slug: string, total: number): string[] {
  return Array.from({ length: total }, (_, i) => `/produtos/${slug}/${i + 1}.webp`);
}

export const PRODUTOS: Produto[] = [
  // ───────────── Conjuntos (colchão + cama box) ─────────────
  {
    id: "1",
    codigo: "LS-0101",
    slug: "conjunto-box-polar-d33",
    nome: "Conjunto Cama Box + Colchão Polar D33",
    marca: "polar",
    categoria: "conjuntos",
    linha: "Box + D33",
    resumo: "Conjunto completo com colchão de espuma D33 firme e box reforçado.",
    descricao:
      "Conjunto pronto para usar: colchão Polar de espuma D33 com 17 cm de altura sobre cama box reforçada. A espuma firme dá sustentação à coluna e aguenta o uso do dia a dia. Um dos conjuntos com melhor custo-benefício da loja.",
    destaques: ["Espuma D33 firme", "Box reforçado", "Colchão com 17 cm", "Frete grátis em Uberlândia"],
    especificacoes: {
      tipo: "Espuma D33 + cama box",
      altura: "Colchão 17 cm",
      firmeza: "Firme",
      estrutura: "Box reforçado",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 1364, doze(127.3))], // post
    imagens: fotos("conjunto-box-polar-d33", 1),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "2",
    codigo: "LS-0102",
    slug: "conjunto-ortobom-airtech-spring-pocket",
    nome: "Conjunto Cama Box + Colchão Ortobom Airtech Spring Pocket",
    marca: "ortobom",
    categoria: "conjuntos",
    linha: "Airtech Spring Pocket",
    resumo: "Molas ensacadas Ortobom com cama box, pronto para usar.",
    descricao:
      "O Airtech Spring Pocket tem molas ensacadas uma a uma, que reduzem a transferência de movimento: quem dorme do lado não sente quando você se vira. Vem com a cama box, então o conjunto já chega completo.",
    destaques: ["Molas ensacadas (Pocket)", "Menos transferência de movimento", "Qualidade Ortobom", "Conjunto completo"],
    especificacoes: {
      tipo: "Molas ensacadas + cama box",
      molas: "Spring Pocket (ensacadas)",
      firmeza: "Intermediária",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 1599, doze(133.25))], // post
    imagens: fotos("conjunto-ortobom-airtech-spring-pocket", 1),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "3",
    codigo: "LS-0103",
    slug: "orthocrin-real-vision-black",
    nome: "Conjunto Cama Box + Colchão Orthocrin Real Vision Black",
    marca: "orthocrin",
    categoria: "conjuntos",
    linha: "Real Vision Black",
    resumo: "Molas ensacadas com Pillow Top D33 e tecido matelassê.",
    descricao:
      "O Real Vision Black combina molas ensacadas de alto desempenho com uma camada extra de Pillow Top em espuma D33 e mix de espumas. O tecido matelassê é macio e resistente. Firmeza e estabilidade para a coluna, com acabamento sofisticado. Certificado Pró-Espuma.",
    destaques: ["Pillow Top D33 + mix de espumas", "Molas ensacadas", "Tecido matelassê", "Certificado Pró-Espuma"],
    especificacoes: {
      tipo: "Molas ensacadas + Pillow Top",
      molas: "Ensacadas de alto desempenho",
      revestimento: "Tecido matelassê",
      firmeza: "Intermediária",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 2413.18, doze(225.88), " + Box"), t("Queen", 2929.22, doze(274.1), " + Box")], // post
    imagens: fotos("orthocrin-real-vision-black", 2),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "4",
    codigo: "LS-0104",
    slug: "conjunto-ortobom-espuma-firme-solteiro",
    nome: "Conjunto Cama Box + Colchão Ortobom Espuma Firme",
    marca: "ortobom",
    categoria: "conjuntos",
    resumo: "Conjunto solteiro com colchão de espuma firme Ortobom.",
    descricao:
      "Conjunto solteiro com colchão Ortobom de espuma firme e cama box. Boa escolha para quarto de criança, adolescente ou de hóspedes, com qualidade Ortobom e parcelamento em até 12x.",
    destaques: ["Espuma firme", "Qualidade Ortobom", "Ótimo custo-benefício", "Até 12x no cartão"],
    especificacoes: { tipo: "Espuma + cama box", firmeza: "Firme" },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Solteiro", 990)], // ilustrativo
    imagens: fotos("conjunto-ortobom-espuma-firme-solteiro", 1),
    emDestaque: false,
    ativo: true,
  },

  // ───────────── Box baú + colchão ─────────────
  {
    id: "5",
    codigo: "LS-0201",
    slug: "conjunto-box-bau-polar-d33",
    nome: "Conjunto Cama Box Baú + Colchão Polar D33",
    marca: "polar",
    categoria: "conjuntos-bau",
    linha: "Box Baú + D33",
    resumo: "Colchão D33 firme com box baú para guardar roupa de cama e cobertor.",
    descricao:
      "Box baú com colchão Polar de espuma D33. O baú abre com pistão a gás e guarda cobertores, travesseiros e roupa de cama, liberando espaço no quarto. Você escolhe a cor do baú: bege, marrom ou preto.",
    destaques: ["Espuma D33 firme", "Baú com pistão a gás", "Cor do baú: bege, marrom ou preto", "Frete grátis em Uberlândia"],
    especificacoes: {
      tipo: "Espuma D33 + box baú",
      altura: "Colchão 17 cm",
      firmeza: "Firme",
      estrutura: "Baú com pistão a gás",
      revestimento: "Suede bege, marrom ou preto",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 1870, doze(174.9))], // post
    imagens: fotos("conjunto-box-bau-polar-d33", 1),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "6",
    codigo: "LS-0202",
    slug: "conjunto-ortobom-molas-box-bau",
    nome: "Conjunto Box Baú + Colchão Ortobom Molas Ensacadas",
    marca: "ortobom",
    categoria: "conjuntos-bau",
    resumo: "Molas ensacadas Ortobom com o espaço extra do box baú.",
    descricao:
      "Colchão Ortobom de molas ensacadas sobre box baú. As molas trabalham separadas e acompanham o corpo; o baú guarda o que não cabe no guarda-roupa. Conforto e praticidade no mesmo conjunto.",
    destaques: ["Molas ensacadas", "Baú com espaço interno", "Qualidade Ortobom", "12x no cartão"],
    especificacoes: { tipo: "Molas ensacadas + box baú", molas: "Ensacadas" },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 2130, doze(199))], // parcela do post; à vista estimado
    imagens: fotos("conjunto-ortobom-molas-box-bau", 1),
    emDestaque: false,
    ativo: true,
  },

  // ───────────── Colchões ─────────────
  {
    id: "7",
    codigo: "LS-0301",
    slug: "ortobom-exclusive-foam",
    nome: "Colchão Ortobom Exclusive Foam",
    marca: "ortobom",
    categoria: "colchoes",
    linha: "Exclusive Foam",
    resumo: "Espuma HR D33 de alta resiliência, 30 cm, sistema No Turn.",
    descricao:
      "O Exclusive Foam tem estrutura de espuma HR D33 de alta performance: não afunda e volta rápido à forma original. Com 30 cm de altura e sistema No Turn, não precisa virar, só girar. Tampo em malha premium com toque macio e fresco, laterais em camurça e tratamento antialérgico, antiácaro e antifungo.",
    destaques: ["Espuma HR D33", "30 cm de altura", "No Turn: não precisa virar", "Suporta até 150 kg por pessoa"],
    especificacoes: {
      tipo: "Espuma HR D33",
      altura: "30 cm",
      firmeza: "Firme",
      suportaAte: "150 kg por pessoa",
      revestimento: "Malha premium, laterais em camurça",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 2255, doze(210)), t("Queen", 2272.5, doze(258.76)), t("King", 3205, doze(299.13))], // post
    imagens: fotos("ortobom-exclusive-foam", 2),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "8",
    codigo: "LS-0302",
    slug: "castor-silver-star",
    nome: "Colchão Castor Silver Star",
    marca: "castor",
    categoria: "colchoes",
    linha: "Silver Star",
    resumo: "Molas Pocket ensacadas Castor, 32 cm de altura.",
    descricao:
      "O Silver Star da Castor usa molas Pocket ensacadas uma a uma, que acompanham o corpo e não passam o movimento de quem dorme do lado. Com 32 cm de altura e acabamento premium, é a escolha para quem quer qualidade e durabilidade Castor.",
    destaques: ["Molas Pocket ensacadas", "32 cm de altura", "Conforto premium", "Tecnologia e resistência Castor"],
    especificacoes: {
      tipo: "Molas ensacadas",
      molas: "Pocket®",
      altura: "32 cm",
      firmeza: "Macia",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 3070, doze(286.55)), t("Queen", 3782, doze(352.9))], // post
    imagens: fotos("castor-silver-star", 2),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "9",
    codigo: "LS-0303",
    slug: "ortobom-fit-spring-pocket",
    nome: "Colchão Ortobom Fit Spring Pocket",
    marca: "ortobom",
    categoria: "colchoes",
    linha: "Fit Spring Pocket",
    resumo: "Molas Superpocket, espuma certificada e sistema No Turn.",
    descricao:
      "O Fit Spring Pocket tem molas Superpocket ensacadas individualmente, que dão liberdade de movimento e melhor suporte ao corpo. Espuma firme certificada 100% poliuretano, tecido em malha com toque suave, bordado em matelassê e sistema No Turn, que dispensa virar o colchão e evita que ele deslize sobre a base.",
    destaques: ["Molas Superpocket", "No Turn: não precisa virar", "Espuma certificada", "Todas as medidas"],
    especificacoes: {
      tipo: "Molas ensacadas, No Turn",
      molas: "Superpocket",
      revestimento: "Malha com bordado matelassê",
      firmeza: "Intermediária",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Solteiro", 1390), t("Casal", 1890), t("Queen", 2290), t("King", 2890)], // ilustrativo
    imagens: fotos("ortobom-fit-spring-pocket", 2),
    emDestaque: false,
    ativo: true,
  },
  {
    id: "10",
    codigo: "LS-0304",
    slug: "ortobom-exclusivo-sleep",
    nome: "Colchão Ortobom Exclusivo Sleep",
    marca: "ortobom",
    categoria: "colchoes",
    linha: "Exclusivo Sleep",
    resumo: "Molas Superpocket com espuma HR de alta resiliência.",
    descricao:
      "O Exclusivo Sleep combina molas Superpocket ensacadas com espuma HR de alta densidade, que dá conforto, sustentação e durabilidade. Tecido em malha 100% poliéster com toque macio, bordado em matelassê, tecido antiderrapante e sistema No Turn.",
    destaques: ["Molas Superpocket", "Espuma HR", "No Turn: não precisa virar", "Tecido antiderrapante"],
    especificacoes: {
      tipo: "Molas ensacadas + espuma HR",
      molas: "Superpocket",
      revestimento: "Malha 100% poliéster, matelassê",
      firmeza: "Intermediária",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Solteiro", 1890), t("Casal", 2490), t("Queen", 2890), t("King", 3690)], // ilustrativo
    imagens: fotos("ortobom-exclusivo-sleep", 2),
    emDestaque: false,
    ativo: true,
  },
  {
    id: "11",
    codigo: "LS-0305",
    slug: "castor-expressive-pocket",
    nome: "Colchão Castor Expressive Pocket",
    marca: "castor",
    categoria: "colchoes",
    linha: "Expressive",
    resumo: "Lançamento Castor com molas Pocket e malha premium respirável.",
    descricao:
      "O Expressive Pocket é lançamento da Castor. As molas ensacadas Pocket® reduzem a transferência de movimento, o tecido em malha premium é macio e respirável e a qualidade é certificada Pró-Espuma INER. A linha Expressive também tem versões de espuma D33 e D45.",
    destaques: ["Molas Pocket®", "Malha premium respirável", "Certificado Pró-Espuma INER", "Lançamento Castor"],
    especificacoes: {
      tipo: "Molas ensacadas",
      molas: "Pocket®",
      revestimento: "Malha premium",
      firmeza: "Intermediária",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 2190), t("Queen", 2590)], // ilustrativo
    imagens: fotos("castor-expressive-pocket", 1),
    emDestaque: true,
    ativo: true,
  },
  {
    id: "12",
    codigo: "LS-0306",
    slug: "polar-d33-espuma-firme",
    nome: "Colchão Polar D33 Espuma Firme",
    marca: "polar",
    categoria: "colchoes",
    linha: "D33",
    resumo: "Espuma D33 firme em várias alturas, do solteiro ao queen.",
    descricao:
      "Colchão Polar de espuma D33 firme. Sustenta bem a coluna e é indicado para pessoas de até 100 kg. Disponível em várias alturas: escolha a medida e a altura que combinam com a sua cama.",
    destaques: ["Espuma D33 firme", "Várias alturas", "Ótimo custo-benefício", "Frete grátis em Uberlândia"],
    especificacoes: { tipo: "Espuma D33", firmeza: "Firme", suportaAte: "100 kg por pessoa" },
    rotuloVariacao: "Tamanho",
    variacoes: [
      a("Solteiro", 20, 567.82, doze(53.46)),
      a("Casal", 17, 738.16, doze(69.5)),
      a("Casal", 20, 883.06, doze(83.17)),
      a("Queen", 24, 1575, doze(148.29)),
    ], // post
    imagens: fotos("polar-d33-espuma-firme", 2),
    emDestaque: false,
    ativo: true,
  },
  {
    id: "13",
    codigo: "LS-0307",
    slug: "polar-d45-espuma-firme",
    nome: "Colchão Polar D45 Espuma Firme",
    marca: "polar",
    categoria: "colchoes",
    linha: "D45",
    resumo: "Espuma D45 de alta densidade para quem precisa de mais firmeza.",
    descricao:
      "Colchão Polar de espuma D45, a densidade mais alta da linha. Indicado para quem precisa de mais firmeza e para pessoas mais pesadas. Disponível em casal (20 ou 24 cm) e queen.",
    destaques: ["Espuma D45 alta densidade", "Firmeza extra", "Casal 20 ou 24 cm", "Queen 24 cm"],
    especificacoes: { tipo: "Espuma D45", firmeza: "Extra firme", suportaAte: "150 kg por pessoa" },
    rotuloVariacao: "Tamanho",
    variacoes: [
      a("Casal", 20, 1069.47, doze(100.65)),
      a("Casal", 24, 1270, doze(119.67)),
      a("Queen", 24, 1843.43, doze(173.53)),
    ], // post
    imagens: fotos("polar-d45-espuma-firme", 1),
    emDestaque: false,
    ativo: true,
  },
  {
    id: "14",
    codigo: "LS-0308",
    slug: "polar-safira-molas-ensacadas",
    nome: "Colchão Polar Safira Molas Ensacadas",
    marca: "polar",
    categoria: "colchoes",
    linha: "Safira",
    resumo: "Molas ensacadas tamanho queen, 25 cm de altura.",
    descricao:
      "O Safira tem molas ensacadas que acompanham o corpo e diminuem a transferência de movimento. Medida queen com 25 cm de altura, com laterais em tecido escuro e tampo acolchoado.",
    destaques: ["Molas ensacadas", "Queen 1,58 x 1,98 m", "25 cm de altura", "Preço de fecha mês"],
    especificacoes: { tipo: "Molas ensacadas", altura: "25 cm", firmeza: "Intermediária" },
    rotuloVariacao: "Tamanho",
    variacoes: [a("Queen", 25, 1099, doze(103.48))], // post
    imagens: fotos("polar-safira-molas-ensacadas", 1),
    emDestaque: false,
    ativo: true,
  },
  {
    id: "15",
    codigo: "LS-0309",
    slug: "omega-d33-espuma-firme",
    nome: "Colchão Omega D33 Espuma Firme",
    marca: "omega",
    categoria: "colchoes",
    linha: "D33",
    resumo: "Espuma D33 firme, casal 17 cm, o mais em conta da loja.",
    descricao:
      "Colchão Omega de espuma D33 firme, medida casal com 17 cm de altura. Opção econômica para quem quer trocar o colchão sem gastar muito.",
    destaques: ["Espuma D33 firme", "Casal 17 cm", "Menor preço da loja"],
    especificacoes: { tipo: "Espuma D33", altura: "17 cm", firmeza: "Firme" },
    rotuloVariacao: "Tamanho",
    variacoes: [a("Casal", 17, 599, doze(56.49))], // post
    imagens: fotos("omega-d33-espuma-firme", 1),
    emDestaque: false,
    ativo: true,
  },

  // ───────────── Cama box baú (só a base) ─────────────
  {
    id: "16",
    codigo: "LS-0401",
    slug: "cama-box-bau-super-reforcada",
    nome: "Cama Box Baú Super Reforçada",
    marca: "ls",
    categoria: "box-bau",
    linha: "Box Baú",
    resumo: "Estrutura super reforçada, pistão a gás e amplo espaço interno.",
    descricao:
      "Box baú com estrutura super reforçada, feita para durar. Abre com pistão a gás, de forma suave e segura, e o espaço interno guarda roupa de cama, cobertores, travesseiros e malas. Acabamento premium. Use com o colchão que você já tem ou monte um conjunto.",
    destaques: ["Estrutura super reforçada", "Pistão a gás", "Amplo espaço interno", "Acabamento premium"],
    especificacoes: {
      tipo: "Base box baú",
      estrutura: "Super reforçada, pistão a gás",
      revestimento: "Suede (consulte as cores)",
    },
    rotuloVariacao: "Tamanho",
    variacoes: [t("Casal", 1090, doze(101.73)), t("Queen", 1399, doze(130.57))], // post
    imagens: fotos("cama-box-bau-super-reforcada", 2),
    emDestaque: true,
    ativo: true,
  },
];

export function getProduto(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug && p.ativo);
}
