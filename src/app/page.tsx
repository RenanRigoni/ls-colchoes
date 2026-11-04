import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { BrandsBanner } from "@/components/home/BrandsBanner";
import { HowToBuy } from "@/components/home/HowToBuy";
import { Benefits } from "@/components/home/Benefits";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = { alternates: { canonical: "./" } };

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedGrid />
      <BrandsBanner />
      <Benefits />
      <HowToBuy />
      <Faq />
    </>
  );
}
