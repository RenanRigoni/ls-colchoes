import type { ReactNode } from "react";
import { Container } from "./Container";

type Props = { eyebrow: string; titulo: string; children?: ReactNode };

export function PageHeader({ eyebrow, titulo, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-vinho-900 text-white">
      <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-rubi-500/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 left-1/3 -z-10 h-64 w-[36rem] -rotate-6 bg-placa/25 blur-2xl" />
      <Container className="py-14 sm:py-20">
        <p className="anima-subir text-xs font-semibold tracking-[0.35em] text-rubi-300 uppercase">{eyebrow}</p>
        <h1 className="anima-surgir mt-4 max-w-3xl text-4xl leading-tight font-extrabold text-balance tracking-tight [animation-delay:80ms] sm:text-5xl">{titulo}</h1>
        {children && <div className="anima-subir mt-4 max-w-2xl text-lg text-white/80 [animation-delay:160ms]">{children}</div>}
      </Container>
    </section>
  );
}
