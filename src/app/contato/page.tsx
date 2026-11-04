import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Phone, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { ENDERECO_COMPLETO, LOJA } from "@/data/loja";
import { MAPS_EMBED, MAPS_ROTA, WHATSAPP_GERAL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contato e onde estamos",
  alternates: { canonical: "contato/" },
  description: `Fale com a ${LOJA.nome} pelo WhatsApp ${LOJA.whatsappExibicao} ou visite a loja na ${ENDERECO_COMPLETO}.`,
};

export default function ContatoPage() {
  const canais = [
    { icone: <WhatsAppIcon className="size-6" />, titulo: "WhatsApp", valor: LOJA.whatsappExibicao, href: WHATSAPP_GERAL, externo: true },
    { icone: <Phone className="size-6" />, titulo: "Ligar", valor: LOJA.telefoneExibicao, href: `tel:+55${LOJA.telefone}`, externo: false },
    { icone: <MapPin className="size-6" />, titulo: "Endereço", valor: `${LOJA.endereco.rua}, ${LOJA.endereco.bairro}`, href: MAPS_ROTA, externo: true },
    { icone: <InstagramIcon className="size-6" />, titulo: "Instagram", valor: LOJA.instagramUsuario, href: LOJA.instagram, externo: true },
  ];

  return (
    <>
      <PageHeader eyebrow="Contato" titulo="Fale com a gente ou venha deitar nos colchões.">
        Atendimento pelo WhatsApp, por telefone ou na loja, no {LOJA.endereco.bairro}, em {LOJA.endereco.cidade}.
      </PageHeader>

      <Container className="relative z-10 -mt-8 pb-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {canais.map((c) => (
            <li key={c.titulo}>
              <a
                href={c.href}
                {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col rounded-3xl border border-linha/70 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-rubi-50 text-vinho-900 transition group-hover:bg-vinho-900 group-hover:text-white">{c.icone}</span>
                <span className="mt-5 text-sm font-semibold text-suave">{c.titulo}</span>
                <span className="mt-0.5 font-bold break-words text-tinta">{c.valor}</span>
              </a>
            </li>
          ))}
        </ul>

        <section aria-labelledby="onde-estamos" className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-rubi-600 uppercase">Onde estamos</p>
            <h2 id="onde-estamos" className="mt-3 text-3xl font-extrabold tracking-tight text-vinho-900">
              Venha conhecer a loja
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-6 shrink-0 text-rubi-500" />
                <div>
                  <p className="font-bold text-tinta">Endereço</p>
                  <p className="text-texto">
                    {LOJA.endereco.rua}, {LOJA.endereco.bairro}
                    <br />
                    {LOJA.endereco.cidade}/{LOJA.endereco.uf}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-6 shrink-0 text-rubi-500" />
                <div>
                  <p className="font-bold text-tinta">Horário de funcionamento</p>
                  <ul className="text-texto">
                    {LOJA.horarios.map((h) => (
                      <li key={h.dias}>
                        {h.dias}: {h.horas}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <Truck className="mt-1 size-6 shrink-0 text-rubi-500" />
                <div>
                  <p className="font-bold text-tinta">Região atendida</p>
                  <p className="text-texto">Frete grátis para {LOJA.regiao}. Fora da cidade, consulte no WhatsApp.</p>
                </div>
              </li>
            </ul>
            <a
              href={MAPS_ROTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-vinho-900 px-7 py-3.5 font-bold text-white transition hover:bg-rubi-600"
            >
              <Navigation className="size-4" /> Como chegar
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-linha shadow-card">
            <iframe
              title={`Mapa: ${ENDERECO_COMPLETO}`}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[460px]"
            />
          </div>
        </section>
      </Container>
    </>
  );
}
