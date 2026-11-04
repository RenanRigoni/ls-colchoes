import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { asset } from "@/lib/asset";

type Props = {
  nome: string;
  /** Sem imagem = card "Todas". */
  imagem?: string;
  /** Só aparece no compacto (filtro do catálogo). */
  quantidade?: number;
  variante?: "grande" | "compacto";
};

/** Conteúdo visual do card de categoria. Quem usa decide se é Link (home) ou botão de filtro (catálogo). */
export function CategoryTile({ nome, imagem, quantidade, variante = "grande" }: Props) {
  const isGrande = variante === "grande";
  const rotulo = isGrande || quantidade === undefined ? "Ver modelos" : `${quantidade} ${quantidade === 1 ? "modelo" : "modelos"}`;

  return (
    <>
      <span
        className={`relative grid w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-rubi-100/70 to-white ${
          isGrande ? "aspect-[5/4]" : "h-16"
        }`}
      >
        {imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(imagem)}
            alt=""
            width={isGrande ? 240 : 96}
            height={isGrande ? 192 : 64}
            loading={isGrande ? "eager" : "lazy"}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-saida) group-hover:scale-110"
          />
        ) : (
          <LayoutGrid className="size-7 text-vinho-900 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
        )}
      </span>
      <span className={`flex w-full items-end justify-between gap-2 ${isGrande ? "mt-3 px-1" : "mt-2"}`}>
        <span className="min-w-0">
          <span className={`block leading-tight font-bold text-balance text-tinta ${isGrande ? "text-[15px]" : "text-[13px]"}`}>{nome}</span>
          <span className="mt-0.5 block text-xs whitespace-nowrap text-suave">{rotulo}</span>
        </span>
        {isGrande && (
          <span className="hidden size-8 shrink-0 place-items-center rounded-full bg-fundo text-tinta transition group-hover:bg-rubi-500 group-hover:text-white sm:grid">
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </span>
    </>
  );
}
