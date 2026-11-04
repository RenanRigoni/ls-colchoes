import { describe, expect, it } from "vitest";
import { formatBRL, valorParcela, PARCELAS } from "./format";

describe("formatBRL", () => {
  it("formata com separador de milhar e vírgula decimal", () => {
    expect(formatBRL(2345)).toBe("R$ 2.345,00");
  });

  it("usa espaço comum depois do R$ (sem NBSP)", () => {
    expect(formatBRL(99.9)).not.toContain(" ");
    expect(formatBRL(99.9)).toBe("R$ 99,90");
  });
});

describe("valorParcela", () => {
  it("divide o preço a prazo em 12 parcelas arredondadas", () => {
    expect(PARCELAS).toBe(12);
    expect(valorParcela(2167)).toBeCloseTo(180.58, 2);
  });
});
