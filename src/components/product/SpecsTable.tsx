import type { Especificacoes } from "@/types/produto";

const ROTULOS: Record<keyof Especificacoes, string> = {
  tipo: "Tipo",
  molas: "Molas",
  altura: "Altura",
  firmeza: "Firmeza",
  suportaAte: "Suporta até",
  garantia: "Garantia",
  revestimento: "Revestimento",
  estrutura: "Estrutura",
  medidas: "Medidas",
};

type Props = { especificacoes: Especificacoes };

export function SpecsTable({ especificacoes }: Props) {
  const linhas = (Object.keys(ROTULOS) as (keyof Especificacoes)[]).filter((k) => especificacoes[k]);
  if (linhas.length === 0) return null;

  return (
    <dl className="divide-y divide-linha overflow-hidden rounded-2xl border border-linha">
      {linhas.map((k) => (
        <div key={k} className="grid grid-cols-[minmax(110px,35%)_1fr] gap-4 px-5 py-3.5 text-sm even:bg-fundo/60">
          <dt className="font-semibold text-tinta">{ROTULOS[k]}</dt>
          <dd className="text-texto">{especificacoes[k]}</dd>
        </div>
      ))}
    </dl>
  );
}
