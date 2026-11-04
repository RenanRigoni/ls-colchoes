export const PARCELAS = 12;

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** "R$ 2.345,00" — troca o espaço não separável do Intl por espaço comum (mensagem do WhatsApp). */
export function formatBRL(valor: number): string {
  return brl.format(valor).replace(/ /g, " ");
}

export function valorParcela(precoPrazo: number, parcelas: number = PARCELAS): number {
  return Math.round((precoPrazo / parcelas) * 100) / 100;
}
