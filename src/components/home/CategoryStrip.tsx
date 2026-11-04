import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CategoryTile } from "@/components/catalog/CategoryTile";
import { CATEGORIAS } from "@/data/categorias";

export function CategoryStrip() {
  return (
    <section aria-labelledby="titulo-categorias" className="relative z-10 -mt-14 sm:-mt-20">
      <Container>
        <div className="rounded-[2rem] border border-white/60 bg-white/95 p-4 shadow-[0_30px_70px_-30px_rgb(6_21_40/0.45)] backdrop-blur sm:p-6">
          <div className="mb-4 flex items-baseline justify-between gap-4 px-1">
            <h2 id="titulo-categorias" className="text-lg font-extrabold tracking-tight text-tinta sm:text-xl">
              O que você procura?
            </h2>
            <Link href="/produtos/" className="-my-3 shrink-0 py-3 text-sm font-bold text-rubi-600 underline-offset-4 hover:underline">
              Ver tudo
            </Link>
          </div>
          <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {CATEGORIAS.map((c) => (
              <li key={c.id} className="w-[42%] shrink-0 snap-start min-[480px]:w-[42%] sm:w-auto">
                <Link
                  href={`/produtos/?categoria=${c.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-linha/80 bg-white p-2.5 transition duration-300 ease-(--ease-saida) hover:-translate-y-1 hover:border-rubi-300 hover:shadow-card-hover"
                >
                  <CategoryTile nome={c.nome} imagem={c.imagem} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
