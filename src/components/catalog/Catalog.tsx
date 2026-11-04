"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { PRODUTOS } from "@/data/produtos";
import { CATEGORIAS } from "@/data/categorias";
import { MARCAS } from "@/data/marcas";
import { contarPorCategoria, filterProducts, ORDENACOES, sortProducts, type Ordenacao } from "@/lib/catalog";
import { WHATSAPP_GERAL } from "@/lib/links";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "./SortSelect";
import { CategoryTile } from "./CategoryTile";

type Chip = { id: string | null; nome: string };

function Chips({ titulo, opcoes, ativo, onSelect }: { titulo: string; opcoes: Chip[]; ativo: string | null; onSelect: (id: string | null) => void }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-bold tracking-[0.2em] text-suave uppercase">{titulo}</p>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="group" aria-label={titulo}>
        {opcoes.map((o) => {
          const isAtivo = o.id === ativo;
          return (
            <button
              key={o.id ?? "todos"}
              type="button"
              aria-pressed={isAtivo}
              onClick={() => onSelect(o.id)}
              className="min-h-11 shrink-0 cursor-pointer rounded-full border border-linha bg-white px-4 py-2.5 text-sm font-semibold text-tinta transition hover:border-rubi-300 hover:text-rubi-600 aria-pressed:border-vinho-900 aria-pressed:bg-vinho-900 aria-pressed:text-white"
            >
              {o.nome}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const QUANTIDADES = contarPorCategoria(PRODUTOS);
const TOTAL = PRODUTOS.filter((p) => p.ativo).length;

function FiltroCategorias({ ativo, onSelect }: { ativo: string | null; onSelect: (id: string | null) => void }) {
  const opcoes = [{ id: null, nome: "Todas", imagem: undefined, quantidade: TOTAL }, ...CATEGORIAS.map((c) => ({ ...c, quantidade: QUANTIDADES[c.id] ?? 0 }))];
  return (
    <div className="min-w-0">
      <p className="mb-2.5 text-xs font-bold tracking-[0.2em] text-suave uppercase">Categoria</p>
      <div
        role="group"
        aria-label="Categoria"
        className="-mx-5 flex snap-x scroll-px-5 gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-7"
      >
        {opcoes.map((o) => (
          <button
            key={o.id ?? "todas"}
            type="button"
            aria-pressed={o.id === ativo}
            onClick={() => onSelect(o.id)}
            className="group flex w-28 shrink-0 cursor-pointer snap-start flex-col rounded-2xl border border-linha bg-white p-2 text-left transition duration-300 ease-(--ease-saida) hover:-translate-y-0.5 hover:border-rubi-300 aria-pressed:border-vinho-900 aria-pressed:shadow-[0_0_0_2px_var(--color-vinho-900)] sm:w-auto"
          >
            <CategoryTile nome={o.nome} imagem={o.imagem} quantidade={o.quantidade} variante="compacto" />
          </button>
        ))}
      </div>
    </div>
  );
}

function valido<T extends string>(valor: string | null, permitidos: readonly { id: T }[]): T | null {
  return permitidos.some((p) => p.id === valor) ? (valor as T) : null;
}

export function Catalog() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const categoria = valido(params.get("categoria"), CATEGORIAS);
  const marca = valido(params.get("marca"), MARCAS);
  const ordem = valido(params.get("ordem"), ORDENACOES) ?? "destaque";

  const lista = sortProducts(filterProducts(PRODUTOS, { categoria, marca }), ordem);

  function atualizar(chave: string, valor: string | null) {
    const novo = new URLSearchParams(params.toString());
    if (valor) novo.set(chave, valor);
    else novo.delete(chave);
    const qs = novo.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="grid gap-6 rounded-3xl border border-linha/70 bg-white p-5 shadow-card sm:p-6">
        <FiltroCategorias ativo={categoria} onSelect={(id) => atualizar("categoria", id)} />
        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <Chips titulo="Marca" opcoes={[{ id: null, nome: "Todas" }, ...MARCAS]} ativo={marca} onSelect={(id) => atualizar("marca", id)} />
          </div>
          <SortSelect value={ordem} onChange={(o: Ordenacao) => atualizar("ordem", o === "destaque" ? null : o)} />
        </div>
      </div>

      <p className="mt-8 text-sm text-suave" aria-live="polite">
        {lista.length} {lista.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {lista.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-linha bg-fundo px-6 py-16 text-center">
          <SearchX className="size-10 text-suave" />
          <p className="mt-4 text-lg font-bold text-tinta">Nenhum produto com esses filtros.</p>
          <p className="mt-1 text-texto">
            Tente outra combinação ou{" "}
            <a href={WHATSAPP_GERAL} target="_blank" rel="noopener noreferrer" className="font-semibold text-rubi-600 underline underline-offset-4">
              pergunte no WhatsApp
            </a>
            : temos mais modelos na loja.
          </p>
        </div>
      ) : (
        <>
        <h2 className="sr-only">Lista de produtos</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {lista.map((p, i) => (
            <li key={p.id} className="flex">
              <ProductCard produto={p} isPrioritario={i < 4} />
            </li>
          ))}
        </ul>
        </>
      )}
    </>
  );
}
