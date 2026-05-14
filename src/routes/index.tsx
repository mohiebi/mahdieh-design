import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work limit={3} showMoreLink />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
