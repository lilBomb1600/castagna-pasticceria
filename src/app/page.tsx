import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer, Gelato, Reviews, TableQR, TheCase, Visit } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <TheCase />
        <Gelato />
        <TableQR />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
