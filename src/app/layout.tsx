import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LOJA, SITE_URL } from "@/data/loja";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Só para palavras de destaque nos títulos (itálico).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: "italic",
  weight: "600",
  variable: "--font-fraunces",
  display: "swap",
});

const DESCRICAO = "Colchões Ortobom, Castor, Orthocrin e Polar, conjuntos com box e box baú em Uberlândia/MG. Direto da fábrica, frete grátis em Uberlândia e até 12x no cartão. Orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${LOJA.nome} | Colchões e box baú em Uberlândia/MG`,
    template: `%s | ${LOJA.nome}`,
  },
  description: DESCRICAO,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: LOJA.nome,
    description: DESCRICAO,
    images: [{ url: "og-default.jpg", width: 1200, height: 630, alt: LOJA.nome }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2b070a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
