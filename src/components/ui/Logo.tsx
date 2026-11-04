import Link from "next/link";
import { asset } from "@/lib/asset";

type Props = { className?: string };

export function Logo({ className = "h-12 w-auto" }: Props) {
  return (
    <Link href="/" aria-label="L&S Colchões, página inicial" className="shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- export estático sem otimização de imagem */}
      <img src={asset("/logo.webp")} alt="L&S Colchões" width={560} height={360} className={className} />
    </Link>
  );
}
