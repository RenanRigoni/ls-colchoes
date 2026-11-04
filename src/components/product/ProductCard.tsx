import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Produto } from "@/types/produto";
import { nomeMarca } from "@/data/marcas";
import { menorPreco } from "@/lib/catalog";
import { formatBRL, PARCELAS, valorParcela } from "@/lib/format";
import { asset } from "@/lib/asset";

type Props = { produto: Produto; isPrioritario?: boolean };

export function ProductCard({ produto, isPrioritario = false }: Props) {
  const preco = menorPreco(produto);
  const temVariasOpcoes = produto.variacoes.length > 1;
  const href = `/produto/${produto.slug}/`;

  return (
    <article className="@container group relative flex w-full flex-col overflow-hidden rounded-2xl border border-linha/70 bg-white shadow-card transition duration-300 ease-(--ease-saida) hover:-translate-y-1 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-rubi-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-fundo to-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(produto.imagens[0])}
          alt={produto.nome}
          loading={isPrioritario ? "eager" : "lazy"}
          className="size-full object-cover transition duration-700 ease-(--ease-saida) group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs @min-[15rem]:top-3 @min-[15rem]:left-3 @min-[15rem]:px-2.5 @min-[15rem]:py-1 font-semibold tracking-wide text-suave shadow-sm backdrop-blur">
          {produto.codigo}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-3 pb-3 @min-[15rem]:px-5 @min-[15rem]:pt-4 @min-[15rem]:pb-5">
        <p className="text-sm font-extrabold tracking-tight text-vinho-900 @min-[15rem]:text-lg">{nomeMarca(produto.marca)}</p>
        <h3 className="mt-0.5 line-clamp-3 text-[13px] leading-snug font-bold text-tinta @min-[15rem]:line-clamp-none @min-[15rem]:text-[15px]">
          <Link href={href} className="after:absolute after:inset-0">
            {produto.nome}
          </Link>
        </h3>
        <p className="mt-1.5 hidden line-clamp-2 text-sm leading-relaxed text-texto @min-[15rem]:block">{produto.resumo}</p>

        <div className="mt-auto pt-3 @min-[15rem]:pt-4">
          <div className="border-t border-dashed border-linha pt-2.5 @min-[15rem]:pt-3">
          <p className="text-xs text-suave">
            {temVariasOpcoes ? (
              <>
                a partir de<span className="@min-[15rem]:hidden"> no PIX</span>
              </>
            ) : (
              "à vista no PIX"
            )}
          </p>
          <p className="text-[15px] font-extrabold tracking-tight whitespace-nowrap text-vinho-900 @min-[15rem]:text-xl">
            {formatBRL(preco.precoVista)}
            {temVariasOpcoes && <span className="ml-1.5 hidden text-xs font-semibold text-suave @min-[15rem]:inline">no PIX</span>}
          </p>
          <p className="text-xs leading-snug font-medium text-rubi-600">
            ou {PARCELAS}x de {formatBRL(valorParcela(preco.precoPrazo))} no cartão
          </p>
          </div>
        </div>

        <span aria-hidden="true" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-vinho-900 py-2.5 text-xs @min-[15rem]:mt-4 @min-[15rem]:py-3 @min-[15rem]:text-sm font-bold text-white transition group-hover:bg-rubi-600">
          Ver detalhes
          <ArrowRight className="hidden size-4 transition-transform group-hover:translate-x-1 @min-[15rem]:block" />
        </span>
      </div>
    </article>
  );
}
