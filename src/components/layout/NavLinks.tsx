"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/links";

function ativo(pathname: string, href: string): boolean {
  const atual = pathname.replace(/\/+$/, "") || "/";
  const alvo = href.replace(/\/+$/, "") || "/";
  if (alvo === "/") return atual === "/";
  // /produto/x também conta como "Produtos"
  if (alvo === "/produtos") return atual.startsWith("/produto");
  return atual.startsWith(alvo);
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-9 text-[15px] font-semibold text-tinta">
      {NAV.map((item) => {
        const isAtivo = ativo(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isAtivo ? "page" : undefined}
              className="relative py-2 transition-colors hover:text-rubi-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-rubi-500 after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
