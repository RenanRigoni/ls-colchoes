import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_GERAL } from "@/lib/links";

// Respostas provisórias: validar com o dono da loja antes de publicar.
const PERGUNTAS = [
  {
    p: "Vocês entregam no meu bairro?",
    r: "O frete é grátis para toda Uberlândia. Fora da cidade, chame no WhatsApp com o seu endereço que a gente confirma o prazo e o valor.",
  },
  {
    p: "Quais são as formas de pagamento?",
    r: "À vista no PIX, com o melhor preço, ou no cartão de crédito em até 12x. Outras formas a gente combina no atendimento.",
  },
  {
    p: "O preço do site é o preço final?",
    r: "É o preço de referência. As ofertas valem enquanto durar o estoque, e condições especiais e combos com box a gente passa no atendimento.",
  },
  {
    p: "Qual colchão é melhor para mim?",
    r: "Depende do seu peso, de como você dorme (de lado, de costas ou de bruços) e se tem dor nas costas. Conte isso pra gente no WhatsApp que indicamos as melhores opções.",
  },
  {
    p: "Os produtos têm garantia?",
    r: "Sim. Todos os produtos são originais e têm garantia de fábrica. A loja também tem box baú com estrutura super reforçada e pistão a gás.",
  },
  {
    p: "Posso ver o produto pessoalmente?",
    r: "Pode, e vale a pena deitar no colchão antes de escolher. A loja fica na Av. José Fonseca e Silva, 1.189, no Jardim Patrícia, em Uberlândia.",
  },
];

export function Faq() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-rubi-600 uppercase">Dúvidas frequentes</p>
          <h2 className="mt-3 text-3xl leading-[1.08] font-extrabold tracking-tight text-vinho-900 sm:text-[2.75rem]">
            Ficou alguma <span className="destaque text-rubi-600">dúvida?</span>
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-texto">Aqui estão as perguntas que mais recebemos. Se a sua não estiver na lista, é só chamar.</p>
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-wpp px-7 py-3.5 font-bold text-white transition hover:bg-wpp-escuro"
          >
            <WhatsAppIcon /> Tirar dúvida no WhatsApp
          </a>
        </div>
        <div className="divide-y divide-linha border-y border-linha">
          {PERGUNTAS.map(({ p, r }) => (
            <details key={p} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-tinta transition hover:text-rubi-600 [&::-webkit-details-marker]:hidden">
                {p}
                <Plus className="size-5 shrink-0 text-rubi-500 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-texto">{r}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
