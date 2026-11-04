import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ENDERECO_COMPLETO, LOJA } from "@/data/loja";
import { NAV, WHATSAPP_GERAL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="bg-vinho-900 text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Logo className="h-16 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Colchões, conjuntos com box e box baú direto da fábrica, com frete grátis para {LOJA.regiao}.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-rubi-500">
              <InstagramIcon />
            </a>
            <a href={WHATSAPP_GERAL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-wpp">
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-xs font-bold tracking-[0.2em] text-rubi-300 uppercase">Navegação</h2>
          <ul className="mt-3 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-3 text-white/80 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-rubi-300 uppercase">Atendimento</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5">
              <WhatsAppIcon className="mt-0.5 size-4 shrink-0" /> {LOJA.whatsappExibicao}
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {ENDERECO_COMPLETO}
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-1">
          <p className="text-2xl leading-snug font-semibold text-white">
            Conforto hoje.
            <br />
            Mais qualidade de vida sempre.
          </p>
          <span className="mt-4 block h-1 w-14 rounded-full bg-rubi-500" />
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-xs text-white/50 sm:flex-row sm:justify-between sm:pb-6">
          <p>© {new Date().getFullYear()} {LOJA.nome}. Todos os direitos reservados.</p>
          <p>Site de demonstração · preços e condições ilustrativos.</p>
        </Container>
      </div>
    </footer>
  );
}
