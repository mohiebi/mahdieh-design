import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";
import { Footer } from "@/components/Contact";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Mahdieh" },
      { name: "description", content: "A curated archive of identities, campaigns and product work from 2022 to 2026." },
      { property: "og:title", content: "Projects — Mahdieh" },
      { property: "og:description", content: "A curated archive of identities, campaigns and product work." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-16">
        <Work />
      </main>
      <Footer />
    </div>
  );
}
