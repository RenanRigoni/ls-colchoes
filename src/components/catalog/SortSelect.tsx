"use client";

import { ChevronDown } from "lucide-react";
import { ORDENACOES, type Ordenacao } from "@/lib/catalog";

type Props = { value: Ordenacao; onChange: (valor: Ordenacao) => void };

export function SortSelect({ value, onChange }: Props) {
  return (
    <label className="relative inline-flex items-center self-start md:self-auto">
      <span className="sr-only">Ordenar por</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Ordenacao)}
        className="h-12 cursor-pointer appearance-none rounded-full border border-linha bg-white pr-11 pl-5 text-sm font-semibold text-tinta shadow-sm transition hover:border-rubi-300 focus-visible:border-rubi-500 focus-visible:ring-2 focus-visible:ring-rubi-500 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {ORDENACOES.map((o) => (
          <option key={o.id} value={o.id}>
            {o.id === "destaque" ? "Ordenar por" : o.nome}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 size-4 text-tinta" />
    </label>
  );
}
