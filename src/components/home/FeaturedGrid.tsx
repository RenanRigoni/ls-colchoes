"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/catalog/SortSelect";
import { PRODUTOS } from "@/data/produtos";
import { sortProducts, type Ordenacao } from "@/lib/catalog";

const QTD_HOME = 8;
const VITRINE = sortProducts(
  PRODUTOS.filter((p) => p.ativo),
  "destaque",
).slice(0, QTD_HOME);

export function FeaturedGrid() {
  const router = useRouter();

  // A home mostra só a vitrine; ordenar leva ao catálogo inteiro já ordenado.
  function handleOrdenar(ordem: Ordenacao) {
    router.push(ordem === "destaque" ? "/produtos/" : `/produtos/?ordem=${ordem}`);
  }

  return (
    <section id="produtos" className="py-20 sm:py-28">
      <Container>
        <div className="revela flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-rubi-600 uppercase">Nossos produtos</p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-tight text-balance text-vinho-900 sm:text-[2.75rem]">
              Ofertas da loja, com preço <span className="destaque text-rubi-600">direto da fábrica.</span>
            </h2>
            <p className="mt-4 text-texto">Os conjuntos e colchões que mais saem, com o preço à vista e em 12x.</p>
          </div>
          <SortSelect value="destaque" onChange={handleOrdenar} />
        </div>

        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {VITRINE.map((p, i) => (
            <li key={p.id} className="flex w-[80%] shrink-0 snap-start sm:w-auto">
              <ProductCard produto={p} isPrioritario={i < 4} />
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/produtos/"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-vinho-900 px-8 py-3.5 font-bold text-vinho-900 transition hover:bg-vinho-900 hover:text-white"
          >
            Ver todos os produtos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
