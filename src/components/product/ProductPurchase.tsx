"use client";

import { useState } from "react";
import { Check, ShieldCheck, Truck } from "lucide-react";
import type { Produto } from "@/types/produto";
import { LOJA, SITE_URL } from "@/data/loja";
import { formatBRL, PARCELAS, valorParcela } from "@/lib/format";
import { buildProductMessage, buildWhatsAppUrl, productUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = { produto: Produto };

export function ProductPurchase({ produto }: Props) {
  const [indice, setIndice] = useState(0);
  const variacao = produto.variacoes[indice];
  const mensagem = buildProductMessage({ produto, variacao, url: productUrl(SITE_URL, produto.slug) });
  const linkWhatsApp = buildWhatsAppUrl(LOJA.whatsapp, mensagem);
  const temEscolha = produto.variacoes.length > 1;

  return (
    <div className="rounded-3xl border border-linha bg-white p-6 shadow-card sm:p-7">
      <fieldset>
        <legend className="text-sm font-bold text-tinta">
          {produto.rotuloVariacao}
          {temEscolha && <span className="font-medium text-suave"> · escolha uma opção</span>}
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {produto.variacoes.map((v, i) => (
            <label
              key={v.nome}
              className="relative cursor-pointer rounded-xl border-2 border-linha px-3.5 py-3 transition hover:border-rubi-300 has-checked:border-rubi-500 has-checked:bg-rubi-50 has-focus-visible:ring-2 has-focus-visible:ring-rubi-500 has-focus-visible:ring-offset-2"
            >
              <input type="radio" name="variacao" value={i} checked={i === indice} onChange={() => setIndice(i)} className="sr-only" />
              <span className="block text-sm font-bold text-tinta">{v.nome}</span>
              <span className="block text-xs text-suave">{v.medidas}</span>
              {i === indice && <Check className="absolute top-2.5 right-2.5 size-4 text-rubi-500" strokeWidth={3} />}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 rounded-2xl bg-fundo p-5" aria-live="polite">
        <p className="text-xs font-semibold tracking-wide text-suave uppercase">À vista no PIX</p>
        <p className="text-4xl font-extrabold tracking-tight text-vinho-900">{formatBRL(variacao.precoVista)}</p>
        <p className="mt-1 text-sm font-semibold text-rubi-600">
          ou {PARCELAS}x de {formatBRL(valorParcela(variacao.precoPrazo))} no cartão
        </p>
      </div>

      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="comprar-whatsapp"
        className="mt-5 flex items-center justify-center gap-3 rounded-full bg-wpp px-6 py-4 text-lg font-bold text-white shadow-lg shadow-wpp/25 transition hover:-translate-y-0.5 hover:bg-wpp-escuro"
      >
        <WhatsAppIcon className="size-6" />
        Comprar pelo WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-suave">
        A mensagem já vai com o produto, o código {produto.codigo} e o {produto.rotuloVariacao.toLowerCase()} escolhido.
      </p>

      <ul className="mt-6 grid gap-3 border-t border-linha pt-5 text-sm text-texto sm:grid-cols-2">
        <li className="flex items-center gap-2.5">
          <Truck className="size-5 shrink-0 text-rubi-500" /> Entrega em {LOJA.regiao}
        </li>
        <li className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 shrink-0 text-rubi-500" /> Garantia de fábrica
        </li>
      </ul>
    </div>
  );
}
