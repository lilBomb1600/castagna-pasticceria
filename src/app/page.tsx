import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer, Gelato, Reviews, TableQR, TheCase, Visit } from "@/components/Sections";
import { ShopSchema } from "@/components/ShopSchema";
import { getMenu } from "@/data/live-menu";

export default async function Home() {
  const menu = await getMenu();
  return (
    <>
      <ShopSchema />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <TheCase menu={menu} />
        <Gelato menu={menu} />
        <TableQR menu={menu} />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
