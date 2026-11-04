import { WHATSAPP_GERAL } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_GERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="group fixed right-5 bottom-5 z-30 flex items-center gap-2 rounded-full bg-wpp p-4 text-white shadow-xl shadow-wpp/30 transition hover:-translate-y-1 hover:bg-wpp-escuro sm:right-7 sm:bottom-7"
    >
      <span className="absolute inset-0 -z-10 motion-safe:animate-ping rounded-full bg-wpp/40 [animation-duration:2.5s]" aria-hidden="true" />
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
