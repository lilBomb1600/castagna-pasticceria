import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer, Gelato, Reviews, TableQR, TheCase, Visit } from "@/components/Sections";
import { getMenu } from "@/data/live-menu";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo/config";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

export default async function Home() {
  const menu = await getMenu();
  return (
    <>
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
