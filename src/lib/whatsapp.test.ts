import { describe, expect, it } from "vitest";
import { buildProductMessage, buildWhatsAppUrl, productUrl } from "./whatsapp";
import type { Produto } from "@/types/produto";

const produto: Produto = {
  id: "1",
  codigo: "LS-0012",
  slug: "castor-silver-star-air-pocket",
  nome: "Colchão Castor Silver Star Air Pocket",
  marca: "castor",
  categoria: "colchoes",
  resumo: "",
  descricao: "",
  destaques: [],
  especificacoes: {},
  rotuloVariacao: "Tamanho",
  variacoes: [
    { nome: "Queen", medidas: "1,58 x 1,98 m", precoVista: 2345, precoPrazo: 2760 },
  ],
  imagens: [],
  emDestaque: true,
  ativo: true,
};

const SITE = "https://renanrigoni.github.io/ls-colchoes";

describe("productUrl", () => {
  it("monta URL absoluta com barra final", () => {
    expect(productUrl(SITE, produto.slug)).toBe(
      `${SITE}/produto/castor-silver-star-air-pocket/`,
    );
  });

  it("não duplica barra quando o site termina com /", () => {
    expect(productUrl(`${SITE}/`, "x")).toBe(`${SITE}/produto/x/`);
  });
});

describe("buildProductMessage", () => {
  const msg = buildProductMessage({
    produto,
    variacao: produto.variacoes[0],
    url: productUrl(SITE, produto.slug),
  });

  it("inclui nome em negrito, código, variação com medidas e preços", () => {
    expect(msg).toContain("*Colchão Castor Silver Star Air Pocket*");
    expect(msg).toContain("Código: LS-0012");
    expect(msg).toContain("Tamanho: Queen (1,58 x 1,98 m)");
    expect(msg).toContain("À vista no PIX: R$ 2.345,00");
    expect(msg).toContain("ou 12x de R$ 230,00 no cartão");
  });

  it("termina com o link do produto", () => {
    expect(msg.trim().endsWith(`${SITE}/produto/castor-silver-star-air-pocket/`)).toBe(true);
  });

  it("usa o rótulo da variação do produto (ex.: Modelo para sofá)", () => {
    const sofa = { ...produto, rotuloVariacao: "Modelo" };
    const m = buildProductMessage({ produto: sofa, variacao: produto.variacoes[0], url: "u" });
    expect(m).toContain("Modelo: Queen");
  });
});

describe("buildWhatsAppUrl", () => {
  it("usa wa.me com o número e o texto codificado", () => {
    const url = buildWhatsAppUrl("5518991533576", "Olá! *Teste* & 100%");
    expect(url.startsWith("https://wa.me/5518991533576?text=")).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe("Olá! *Teste* & 100%");
  });

  it("rejeita número com caracteres que não são dígitos", () => {
    expect(() => buildWhatsAppUrl("(18) 99153-3576", "x")).toThrow();
  });
});
