import type { Marca, MarcaId } from "@/types/produto";

export const MARCAS: Marca[] = [
  { id: "ortobom", nome: "Ortobom", logo: "/marcas/ortobom-logo.png" },
  { id: "castor", nome: "Castor", logo: "/marcas/castor-logo.png" },
  { id: "orthocrin", nome: "Orthocrin" },
  { id: "polar", nome: "Polar" },
  { id: "omega", nome: "Omega" },
  { id: "ls", nome: "L&S" },
];

/** Marcas exibidas no banner da home (a linha própria L&S fica de fora). */
export const MARCAS_VITRINE = MARCAS.filter((m) => m.id !== "ls" && m.id !== "omega");

export function nomeMarca(id: MarcaId): string {
  return MARCAS.find((m) => m.id === id)?.nome ?? id;
}
