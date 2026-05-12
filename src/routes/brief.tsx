import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { Brief } from "@/components/Brief";
import { useSession } from "@/hooks/use-session";

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
  const navigate = useNavigate();
  const { session, loading } = useSession();

  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/signup", search: { redirect: "/brief" } });
    }
  }, [session, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {loading || !session ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Loading…
            </span>
          </div>
        ) : (
          <Brief />
        )}
      </main>
      <Footer />
    </div>
  );
}
