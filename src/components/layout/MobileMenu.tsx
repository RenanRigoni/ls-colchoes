"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV, WHATSAPP_GERAL } from "@/lib/links";
import { LOJA } from "@/data/loja";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fechar = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Abrir menu"
        className="grid size-11 place-items-center rounded-full text-tinta hover:bg-rubi-50 lg:hidden"
      >
        <Menu className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(e) => e.target === dialogRef.current && fechar()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(340px,86vw)] bg-vinho-900 p-0 text-white backdrop:bg-vinho-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col p-6">
          <button type="button" onClick={fechar} aria-label="Fechar menu" className="ml-auto grid size-11 place-items-center rounded-full hover:bg-white/10">
            <X className="size-6" />
          </button>
          <nav aria-label="Menu" className="mt-6">
            <ul className="space-y-1 text-2xl font-bold">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={fechar} className="block rounded-xl px-3 py-3 hover:bg-white/10">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-4">
            <a
              href={WHATSAPP_GERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-wpp px-6 py-4 font-bold hover:bg-wpp-escuro"
            >
              <WhatsAppIcon /> Falar no WhatsApp
            </a>
            <p className="text-center text-sm text-rubi-300">{LOJA.whatsappExibicao}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
