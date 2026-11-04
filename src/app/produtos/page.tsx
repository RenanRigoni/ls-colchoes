import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Catalog } from "@/components/catalog/Catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUTOS } from "@/data/produtos";
import { filterProducts, sortProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Colchões, conjuntos com cama box, box baú e colchões de espuma e molas das marcas Ortobom, Castor, Orthocrin e Polar.",
  alternates: { canonical: "produtos/" },
};

/** HTML estático já sai com todos os produtos (robôs e prévia de link); os filtros entram quando o JS carrega. */
function CatalogoEstatico() {
  const lista = sortProducts(filterProducts(PRODUTOS, {}), "destaque");
  return (
    <>
      <div className="h-64 animate-pulse rounded-3xl bg-white shadow-card" />
      <h2 className="sr-only">Lista de produtos</h2>
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {lista.map((p, i) => (
          <li key={p.id} className="flex">
            <ProductCard produto={p} isPrioritario={i < 4} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ProdutosPage() {
  return (
    <>
      <PageHeader eyebrow="Catálogo" titulo="Todos os produtos">
        Filtre por categoria ou marca, escolha o seu e chame a gente no WhatsApp para fechar o pedido.
      </PageHeader>
      <Container className="relative z-10 -mt-8 pb-24">
        {/* useSearchParams exige Suspense no export estático */}
        <Suspense fallback={<CatalogoEstatico />}>
          <Catalog />
        </Suspense>
      </Container>
    </>
  );
}
