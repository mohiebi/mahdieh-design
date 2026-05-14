import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Footer } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects - Mahdieh" },
      {
        name: "description",
        content: "A curated archive of identities, campaigns and product work from 2022 to 2026.",
      },
      { property: "og:title", content: "Projects - Mahdieh" },
      {
        property: "og:description",
        content: "A curated archive of identities, campaigns and product work.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isArchivePage = pathname === "/projects";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      {isArchivePage ? (
        <main className="pt-16">
          <Work />
        </main>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}
