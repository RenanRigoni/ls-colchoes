export const LOJA = {
  nome: "L&S Colchões",
  slogan: "Seu conforto começa aqui.",
  whatsapp: "5534988094472",
  whatsappExibicao: "(34) 98809-4472",
  telefone: "34988094472",
  telefoneExibicao: "(34) 98809-4472",
  instagram: "https://www.instagram.com/les_colchoes/",
  instagramUsuario: "@les_colchoes",
  endereco: {
    rua: "Av. José Fonseca e Silva, 1.189",
    bairro: "Jardim Patrícia",
    cidade: "Uberlândia",
    uf: "MG",
    cep: "38414-530",
  },
  regiao: "toda Uberlândia",
  // Placeholder: confirmar com o dono antes de publicar.
  horarios: [
    { dias: "Segunda a sexta", horas: "8h às 18h" },
    { dias: "Sábado", horas: "8h às 13h" },
  ],
} as const;

export const ENDERECO_COMPLETO = `${LOJA.endereco.rua}, ${LOJA.endereco.bairro}, ${LOJA.endereco.cidade}/${LOJA.endereco.uf}`;

export const MAPS_QUERY = encodeURIComponent(`${LOJA.endereco.rua}, ${LOJA.endereco.bairro}, ${LOJA.endereco.cidade} - ${LOJA.endereco.uf}`);

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://renanrigoni.github.io/ls-colchoes").replace(/\/+$/, "");

export const MENSAGEM_GERAL = "Olá! Vim pelo site da L&S Colchões e quero um orçamento.";
