import type { MetadataRoute } from "next";
import { PRODUTOS } from "@/data/produtos";
import { SITE_URL } from "@/data/loja";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "produtos/", "sobre/", "contato/"].map((p) => ({ url: `${SITE_URL}/${p}` }));
  const produtos = PRODUTOS.filter((p) => p.ativo).map((p) => ({ url: `${SITE_URL}/produto/${p.slug}/` }));
  return [...paginas, ...produtos];
}
