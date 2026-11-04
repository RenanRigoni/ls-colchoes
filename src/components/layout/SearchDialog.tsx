"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { PRODUTOS } from "@/data/produtos";
import { nomeMarca } from "@/data/marcas";
import { searchProducts, menorPreco } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";
import { asset } from "@/lib/asset";

const MAX_RESULTADOS = 6;

export function SearchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [consulta, setConsulta] = useState("");
  const resultados = searchProducts(PRODUTOS, consulta).slice(0, MAX_RESULTADOS);

  function abrir() {
    dialogRef.current?.showModal();
  }

  function fechar() {
    dialogRef.current?.close();
    setConsulta("");
  }

  function abrirPrimeiro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const primeiro = resultados[0];
    if (!primeiro) return;
    fechar();
    router.push(`/produto/${primeiro.slug}/`);
  }

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        aria-label="Buscar produtos"
        className="grid size-11 place-items-center rounded-full text-tinta transition hover:bg-rubi-50 hover:text-rubi-600"
      >
        <Search className="size-5" strokeWidth={2.2} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Buscar produtos"
        onClose={() => setConsulta("")}
        onClick={(e) => e.target === dialogRef.current && fechar()}
        className="m-0 mx-auto mt-[10vh] w-[min(640px,calc(100%-2rem))] rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-vinho-950/60 backdrop:backdrop-blur-sm"
      >
        <form role="search" onSubmit={abrirPrimeiro} className="flex items-center gap-3 border-b border-linha px-5">
          <Search className="size-5 shrink-0 text-suave" />
          <label htmlFor="busca" className="sr-only">
            Buscar por nome, marca ou código
          </label>
          <input
            id="busca"
            type="search"
            autoFocus
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar colchão, box baú, marca ou código (ex.: LS-0101)"
            className="h-16 w-full bg-transparent text-base text-tinta outline-none placeholder:text-suave"
          />
          <button type="button" onClick={fechar} aria-label="Fechar busca" className="grid size-11 place-items-center rounded-full text-suave hover:bg-fundo">
            <X className="size-5" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="sr-only" aria-live="polite">
            {consulta.trim() ? `${resultados.length} resultados` : ""}
          </p>
          {consulta.trim() === "" && <p className="px-4 py-6 text-sm text-suave">Digite o nome do produto, a marca ou o código de referência.</p>}
          {consulta.trim() !== "" && resultados.length === 0 && (
            <p className="px-4 py-6 text-sm text-suave">Nada encontrado para &quot;{consulta}&quot;. Chame a gente no WhatsApp que a gente ajuda.</p>
          )}
          <ul>
            {resultados.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/produto/${p.slug}/`}
                  onClick={fechar}
                  className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-rubi-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(p.imagens[0])} alt="" className="size-14 shrink-0 rounded-lg bg-fundo object-contain p-1" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold tracking-wide text-rubi-600 uppercase">{nomeMarca(p.marca)}</span>
                    <span className="block truncate font-semibold text-tinta">{p.nome}</span>
                    <span className="block text-xs text-suave">
                      {p.codigo} · a partir de {formatBRL(menorPreco(p).precoVista)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
