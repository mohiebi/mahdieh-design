import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { Brief } from "@/components/Brief";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Project Brief — Mahdieh Baghoolizadeh" },
      { name: "description", content: "Tell me about your project. Answer 15 short questions to start a brand or identity collaboration with Mahdieh Baghoolizadeh." },
      { property: "og:title", content: "Project Brief — Mahdieh Baghoolizadeh" },
      { property: "og:description", content: "Answer 15 short questions to start a brand or identity collaboration." },
    ],
  }),
  component: BriefPage,
});

function BriefPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Brief />
      </main>
      <Footer />
    </div>
  );
}
