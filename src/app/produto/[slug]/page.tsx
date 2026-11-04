import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { SpecsTable } from "@/components/product/SpecsTable";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUTOS, getProduto } from "@/data/produtos";
import { nomeMarca } from "@/data/marcas";
import { nomeCategoria } from "@/data/categorias";
import { LOJA, SITE_URL } from "@/data/loja";
import { menorPreco } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";
import { productUrl } from "@/lib/whatsapp";

type Params = { slug: string };
type Props = { params: Promise<Params> };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PRODUTOS.filter((p) => p.ativo).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) return {};
  const descricao = `${produto.resumo} A partir de ${formatBRL(menorPreco(produto).precoVista)} à vista ou em até 12x no cartão. Cód. ${produto.codigo}.`;
  return {
    title: produto.nome,
    description: descricao,
    alternates: { canonical: `produto/${produto.slug}/` },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: LOJA.nome,
      title: produto.nome,
      description: descricao,
      url: `produto/${produto.slug}/`,
      images: [{ url: `produtos/${produto.slug}/og.jpg`, width: 1200, height: 630, alt: produto.nome }],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) notFound();

  const relacionados = PRODUTOS.filter((p) => p.ativo && p.id !== produto.id && p.categoria === produto.categoria).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    sku: produto.codigo,
    brand: { "@type": "Brand", name: nomeMarca(produto.marca) },
    description: produto.descricao,
    image: produto.imagens.map((img) => `${SITE_URL}${img}`),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: Math.min(...produto.variacoes.map((v) => v.precoVista)),
      highPrice: Math.max(...produto.variacoes.map((v) => v.precoVista)),
      offerCount: produto.variacoes.length,
      url: productUrl(SITE_URL, produto.slug),
      seller: { "@type": "Organization", name: LOJA.nome },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="border-b border-linha bg-fundo">
        <Container>
          <nav aria-label="Você está em" className="flex flex-wrap items-center gap-x-1.5 py-1 text-sm text-suave">
            <Link href="/" className="inline-block py-3 hover:text-rubi-600">
              Início
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/produtos/" className="inline-block py-3 hover:text-rubi-600">
              Produtos
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href={`/produtos/?categoria=${produto.categoria}`} className="inline-block py-3 hover:text-rubi-600">
              {nomeCategoria(produto.categoria)}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="truncate font-medium text-tinta" aria-current="page">
              {produto.nome}
            </span>
          </nav>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-14">
        <ProductGallery imagens={produto.imagens} nome={produto.nome} />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/produtos/?marca=${produto.marca}`} className="-my-3 inline-block py-3 text-sm font-extrabold tracking-[0.2em] text-rubi-600 uppercase hover:underline">
              {nomeMarca(produto.marca)}
            </Link>
            <span className="rounded-full bg-fundo px-3 py-1 text-xs font-semibold text-suave">Cód. {produto.codigo}</span>
          </div>
          <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-balance text-vinho-900 sm:text-4xl">{produto.nome}</h1>
          <p className="mt-4 text-lg leading-relaxed text-texto">{produto.resumo}</p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {produto.destaques.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-sm font-semibold text-tinta">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-rubi-100 text-rubi-600">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ProductPurchase produto={produto} />
          </div>
        </div>
      </Container>

      <Container className="grid gap-10 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <section>
          <h2 className="text-2xl font-extrabold text-vinho-900">Sobre o produto</h2>
          <p className="mt-4 text-lg leading-relaxed text-texto">{produto.descricao}</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-vinho-900">Especificações</h2>
          <div className="mt-4">
            <SpecsTable especificacoes={produto.especificacoes} />
          </div>
        </section>
      </Container>

      {relacionados.length > 0 && (
        <section className="border-t border-linha bg-fundo py-16">
          <Container>
            <h2 className="text-2xl font-extrabold text-vinho-900 sm:text-3xl">Você também pode gostar</h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {relacionados.map((p) => (
                <li key={p.id} className="flex">
                  <ProductCard produto={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
