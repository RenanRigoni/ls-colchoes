"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

type Props = { imagens: string[]; nome: string };

export function ProductGallery({ imagens, nome }: Props) {
  const [ativa, setAtiva] = useState(0);

  return (
    <div className="min-w-0 lg:sticky lg:top-28">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-linha/70 bg-gradient-to-br from-fundo via-white to-rubi-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={ativa}
          src={asset(imagens[ativa])}
          alt={`${nome}, foto ${ativa + 1} de ${imagens.length}`}
          className="anima-surgir size-full object-contain"
        />
      </div>
      {imagens.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-2 sm:flex sm:gap-3" aria-label="Fotos do produto">
          {imagens.map((img, i) => (
            <li key={img}>
              <button
                type="button"
                onClick={() => setAtiva(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === ativa}
                className="aspect-square w-full cursor-pointer overflow-hidden rounded-xl border-2 border-linha bg-white p-1.5 transition hover:border-rubi-300 aria-pressed:border-rubi-500"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(img)} alt="" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
