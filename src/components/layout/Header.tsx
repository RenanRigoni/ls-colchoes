import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_GERAL } from "@/lib/links";
import { NavLinks } from "./NavLinks";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linha/70 bg-white/90 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-6 sm:h-20">
        <Logo className="h-11 w-auto sm:h-14" />
        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-6">
          <SearchDialog />
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2.5 rounded-xl bg-vinho-900 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-vinho-900/20 transition hover:-translate-y-0.5 hover:bg-vinho-800 sm:flex"
          >
            <WhatsAppIcon className="size-5" />
            Fale conosco
          </a>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
