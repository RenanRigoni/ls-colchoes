import { LOJA, MAPS_QUERY, MENSAGEM_GERAL } from "@/data/loja";
import { buildWhatsAppUrl } from "./whatsapp";

export const WHATSAPP_GERAL = buildWhatsAppUrl(LOJA.whatsapp, MENSAGEM_GERAL);
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_ROTA = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/produtos/", label: "Produtos" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/contato/", label: "Contato" },
] as const;
