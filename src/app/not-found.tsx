import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_GERAL } from "@/lib/links";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <p aria-hidden="true" className="text-8xl font-black text-rubi-100">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-vinho-900">Esta página foi tirar um cochilo.</h1>
      <p className="mt-3 max-w-md text-texto">O endereço não existe ou o produto saiu do catálogo. Veja os outros produtos ou fale com a gente.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/produtos/" className="rounded-full bg-vinho-900 px-7 py-3.5 font-bold text-white hover:bg-rubi-600">
          Ver produtos
        </Link>
        <a href={WHATSAPP_GERAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-wpp px-7 py-3.5 font-bold text-white hover:bg-wpp-escuro">
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </Container>
  );
}
