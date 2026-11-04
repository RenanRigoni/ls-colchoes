import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Benefits } from "@/components/home/Benefits";
import { MARCAS_VITRINE as MARCAS } from "@/data/marcas";
import { LOJA } from "@/data/loja";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sobre a loja",
  alternates: { canonical: "sobre/" },
  description: `Conheça a ${LOJA.nome}: loja de colchões e camas box em Uberlândia/MG, com as melhores marcas e atendimento de perto.`,
};

// Texto provisório: revisar com o dono (história, ano de abertura, equipe).
const VALORES = [
  { icone: HeartHandshake, titulo: "Atendimento de perto", texto: "Você conversa com quem conhece o produto e ajuda a escolher sem pressa." },
  { icone: Award, titulo: "Marcas de confiança", texto: "Ortobom, Castor, Orthocrin e Polar. Produtos originais, direto da fábrica e com garantia." },
  { icone: MapPin, titulo: "Aqui no Jardim Patrícia", texto: "Loja física na Av. José Fonseca e Silva, com frete grátis para toda Uberlândia." },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader eyebrow="Sobre nós" titulo="Uma loja feita para você dormir melhor.">
        A {LOJA.nome} fica no Jardim Patrícia, em Uberlândia, e vende colchões, conjuntos com box e box baú das melhores marcas, direto da fábrica, com atendimento na loja e pelo WhatsApp.
      </PageHeader>

      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/sobre.webp")} alt="Colchões expostos na loja L&S Colchões" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card-hover" />
          <div className="absolute -right-3 -bottom-6 rounded-2xl bg-vinho-900 px-6 py-5 text-white shadow-xl sm:-right-6">
            <p className="text-3xl font-extrabold">12x</p>
            <p className="text-sm text-white/75">no cartão de crédito</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-vinho-900 sm:text-4xl">A gente ajuda você a escolher.</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-texto">
            <p>
              A gente sabe que trocar de colchão não é compra de todo dia. Por isso o atendimento começa perguntando como você dorme, se sente dor nas costas e quanto quer
              investir.
            </p>
            <p>
              Na loja você deita nos modelos, compara molas ensacadas, espuma D33 e D45 e sai sabendo o que está levando. Se preferir resolver de casa, o catálogo do site mostra os
              preços e o WhatsApp fecha o pedido.
            </p>
          </div>
          <Link href="/produtos/" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-vinho-900 px-7 py-3.5 font-bold text-white transition hover:bg-rubi-600">
            Conhecer os produtos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <section className="bg-fundo py-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {VALORES.map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo} className="rounded-3xl border border-linha/70 bg-white p-7 shadow-card">
                <Icone className="size-9 text-rubi-500" strokeWidth={1.6} />
                <h3 className="mt-5 text-xl font-extrabold text-vinho-900">{titulo}</h3>
                <p className="mt-2 leading-relaxed text-texto">{texto}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-suave uppercase">Marcas que trabalhamos</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {MARCAS.map((m) => (
                <li key={m.id}>
                  {m.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(m.logo)} alt={m.nome} loading="lazy" height={40} width={120} className="h-8 max-w-28 w-auto object-contain opacity-70 sm:h-10 sm:max-w-36 brightness-0 transition hover:opacity-100" />
                  ) : (
                    <span className="text-3xl font-black text-black/70">{m.nome}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Benefits />
    </>
  );
}
