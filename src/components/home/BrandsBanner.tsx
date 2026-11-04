import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MARCAS_VITRINE as MARCAS } from "@/data/marcas";
import { asset } from "@/lib/asset";

export function BrandsBanner() {
  return (
    <section className="grao relative isolate overflow-hidden bg-vinho-900 text-white">
      <div className="absolute -top-40 -left-40 -z-10 size-[30rem] rounded-full bg-rubi-500/20 blur-[120px]" />
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1fr_1.1fr_0.95fr] lg:gap-8 lg:py-20">
        <div className="revela">
          <h2 className="text-3xl leading-[1.08] font-extrabold tracking-tight sm:text-[2.6rem]">
            Grandes marcas.
            <br />
            Preço de fábrica
            <br />
            <span className="destaque text-ouro-claro">para o seu sono.</span>
          </h2>
          <Link
            href="/produtos/"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ouro px-7 py-3.5 font-extrabold text-vinho-950 transition hover:-translate-y-0.5 hover:bg-ouro-claro"
          >
            Ver produtos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="revela grid grid-cols-2 gap-3">
          {MARCAS.map((m) => (
            <li key={m.id}>
              <Link
                href={`/produtos/?marca=${m.id}`}
                aria-label={`Ver produtos ${m.nome}`}
                className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 transition duration-300 hover:-translate-y-0.5 hover:border-ouro/60 hover:bg-white/10"
              >
                {m.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(m.logo)} alt={m.nome} loading="lazy" className="max-h-11 w-auto max-w-[78%] object-contain brightness-0 invert" />
                ) : (
                  <span className="text-3xl font-black tracking-tight">{m.nome}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative hidden h-full min-h-72 overflow-hidden rounded-3xl lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/banner-marcas.webp")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vinho-950/50 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
