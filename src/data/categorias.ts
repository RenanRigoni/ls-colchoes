import type { Categoria, CategoriaId } from "@/types/produto";

// imagem: foto do produto usada como "recorte" nos cards de categoria.
export const CATEGORIAS: Categoria[] = [
  { id: "conjuntos", nome: "Colchão + Box", imagem: "/produtos/conjunto-ortobom-airtech-spring-pocket/1.webp" },
  { id: "conjuntos-bau", nome: "Colchão + Box Baú", imagem: "/produtos/conjunto-box-bau-polar-d33/1.webp" },
  { id: "colchoes", nome: "Colchões", imagem: "/produtos/ortobom-exclusivo-sleep/1.webp" },
  { id: "box-bau", nome: "Cama Box Baú", imagem: "/produtos/cama-box-bau-super-reforcada/2.webp" },
];

export function nomeCategoria(id: CategoriaId): string {
  return CATEGORIAS.find((c) => c.id === id)?.nome ?? id;
}
