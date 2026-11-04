import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUTOS, getProduto } from "./produtos";
import { CATEGORIAS } from "./categorias";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "../../public");

describe("catálogo", () => {
  it("tem slugs e códigos únicos", () => {
    expect(new Set(PRODUTOS.map((p) => p.slug)).size).toBe(PRODUTOS.length);
    expect(new Set(PRODUTOS.map((p) => p.codigo)).size).toBe(PRODUTOS.length);
  });

  it("todo produto tem ao menos uma variação com preço positivo e prazo >= à vista", () => {
    for (const p of PRODUTOS) {
      expect(p.variacoes.length, p.slug).toBeGreaterThan(0);
      for (const v of p.variacoes) {
        expect(v.precoVista, p.slug).toBeGreaterThan(0);
        expect(v.precoPrazo, p.slug).toBeGreaterThanOrEqual(v.precoVista);
      }
    }
  });

  it("todas as imagens existem em public/", () => {
    for (const p of PRODUTOS) {
      expect(p.imagens.length, p.slug).toBeGreaterThan(0);
      for (const img of p.imagens) {
        expect(existsSync(path.join(PUBLIC_DIR, img)), img).toBe(true);
      }
    }
  });

  it("toda categoria tem produto ativo", () => {
    for (const c of CATEGORIAS) {
      expect(PRODUTOS.some((p) => p.ativo && p.categoria === c.id), c.id).toBe(true);
    }
  });

  it("toda categoria tem imagem existente em public/", () => {
    for (const c of CATEGORIAS) {
      expect(existsSync(path.join(PUBLIC_DIR, c.imagem)), c.id).toBe(true);
    }
  });

  it("getProduto acha pelo slug", () => {
    expect(getProduto("ortobom-exclusive-foam")?.codigo).toBe("LS-0301");
    expect(getProduto("nao-existe")).toBeUndefined();
  });
});
