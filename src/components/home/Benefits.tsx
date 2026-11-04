import { CreditCard, ShieldCheck, Truck, UserRoundCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const BENEFICIOS = [
  { icone: UserRoundCheck, titulo: "Atendimento especializado", texto: "A equipe ajuda você a escolher o colchão certo para o seu peso e o seu jeito de dormir." },
  { icone: CreditCard, titulo: "Pagamento facilitado", texto: "Até 12x no cartão ou preço especial à vista no PIX." },
  { icone: Truck, titulo: "Frete grátis em Uberlândia", texto: "Entregamos sem custo em toda Uberlândia, com rapidez e cuidado." },
  { icone: ShieldCheck, titulo: "Direto da fábrica", texto: "Ortobom, Castor, Orthocrin e Polar originais, com garantia e preço de fábrica." },
];

export function Benefits() {
  return (
    <section className="border-b border-linha py-14 sm:py-16">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-linha">
          {BENEFICIOS.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="revela lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <Icone className="size-8 text-rubi-600" strokeWidth={1.5} />
              <h3 className="mt-4 font-extrabold text-tinta">{titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-suave">{texto}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
