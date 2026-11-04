import type { CategoriaId, Produto, Variacao } from "@/types/produto";

export type Ordenacao = "destaque" | "menor-preco" | "maior-preco" | "nome";

export const ORDENACOES: { id: Ordenacao; nome: string }[] = [
  { id: "destaque", nome: "Destaques" },
  { id: "menor-preco", nome: "Menor preço" },
  { id: "maior-preco", nome: "Maior preço" },
  { id: "nome", nome: "Nome (A a Z)" },
];

export function menorPreco(produto: Produto): Variacao {
  return produto.variacoes.reduce((min, v) => (v.precoVista < min.precoVista ? v : min));
}

type Filtros = { categoria?: string | null; marca?: string | null };

/** Filtros vêm da URL: valor que não bate com nenhum produto é ignorado em vez de zerar a lista. */
export function filterProducts(produtos: readonly Produto[], { categoria, marca }: Filtros): Produto[] {
  const ativos = produtos.filter((p) => p.ativo);
  const categoriaValida = categoria && ativos.some((p) => p.categoria === categoria);
  const marcaValida = marca && ativos.some((p) => p.marca === marca);
  return ativos.filter(
    (p) =>
      (!categoriaValida || p.categoria === categoria) && (!marcaValida || p.marca === marca),
  );
}

export function sortProducts(produtos: readonly Produto[], ordem: Ordenacao): Produto[] {
  const copia = [...produtos];
  switch (ordem) {
    case "menor-preco":
      return copia.sort((a, b) => menorPreco(a).precoVista - menorPreco(b).precoVista);
    case "maior-preco":
      return copia.sort((a, b) => menorPreco(b).precoVista - menorPreco(a).precoVista);
    case "nome":
      return copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    case "destaque":
      return copia.sort((a, b) => Number(b.emDestaque) - Number(a.emDestaque));
  }
}

export function contarPorCategoria(produtos: readonly Produto[]): Partial<Record<CategoriaId, number>> {
  return produtos
    .filter((p) => p.ativo)
    .reduce<Partial<Record<CategoriaId, number>>>((acc, p) => ({ ...acc, [p.categoria]: (acc[p.categoria] ?? 0) + 1 }), {});
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function searchProducts(produtos: readonly Produto[], consulta: string): Produto[] {
  const termo = normalizar(consulta);
  if (!termo) return [];
  const ativos = produtos
    .filter((p) => p.ativo)
    .map((p) => ({ p, texto: normalizar(`${p.nome} ${p.marca} ${p.codigo} ${p.linha ?? ""}`) }));
  // Frase exata primeiro (código "LS-0101"); senão, todas as palavras em qualquer ordem ("castor colchão").
  const exatos = ativos.filter(({ texto }) => texto.includes(termo));
  if (exatos.length > 0) return exatos.map(({ p }) => p);
  const palavras = termo.split(" ");
  return ativos.filter(({ texto }) => palavras.every((palavra) => texto.includes(palavra))).map(({ p }) => p);
}
