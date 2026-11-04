import { MousePointerClick, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const PASSOS = [
  {
    icone: <MousePointerClick className="size-5" strokeWidth={2} />,
    titulo: "Escolha no site",
    texto: "Veja fotos, medidas e preços com calma, e escolha o tamanho que cabe no seu quarto.",
  },
  {
    icone: <WhatsAppIcon className="size-5" />,
    titulo: "Chame no WhatsApp",
    texto: 'Toque em "Comprar pelo WhatsApp". A mensagem já vai pronta com o produto, o código e o tamanho.',
  },
  {
    icone: <PackageCheck className="size-5" strokeWidth={2} />,
    titulo: "Receba em casa",
    texto: "A gente combina pagamento e entrega com você e leva até a sua casa, com frete grátis em Uberlândia.",
  },
];

export function HowToBuy() {
  return (
    <section className="bg-fundo py-20 sm:py-28">
      <Container>
        <div className="revela max-w-2xl">
          <p className="text-xs font-bold tracking-[0.3em] text-rubi-600 uppercase">Como comprar</p>
          <h2 className="mt-3 text-3xl leading-[1.08] font-extrabold tracking-tight text-balance text-vinho-900 sm:text-[2.75rem]">
            Do site para a sua casa em <span className="destaque text-rubi-600">3 passos.</span>
          </h2>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="revela border-t-2 border-vinho-900 pt-6">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-rubi-600 italic">
                  {i + 1}
                </span>
                <span className="grid size-11 place-items-center rounded-full bg-vinho-900 text-white">{p.icone}</span>
              </div>
              <h3 className="mt-6 text-xl font-extrabold text-vinho-900">{p.titulo}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-texto">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
