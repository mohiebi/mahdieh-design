import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { AuthShell, AuthField, AuthSubmit } from "@/components/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Mahdieh Baghoolizadeh" },
      { name: "description", content: "Sign in to continue your project brief." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" }) as Search;
  const { session, loading: sessionLoading } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const target = search.redirect || "/brief";

  useEffect(() => {
    if (!sessionLoading && session) navigate({ to: target });
  }, [session, sessionLoading, navigate, target]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: target });
  };

  const onForgot = async () => {
    if (!email) {
      setError("Enter your email above first, then click forgot password.");
      return;
    }
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setError("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <AuthShell
          eyebrow="Sign in"
          title={<>Welcome <em className="text-accent not-italic font-normal">back</em>.</>}
          subtitle="Sign in to continue your brief or update your answers."
          footer={
            <>
              New here?{" "}
              <Link to="/signup" search={{ redirect: target }} className="text-foreground hover:text-accent transition-colors">
                Create an account →
              </Link>
            </>
          }
        >
          <form onSubmit={onSubmit}>
            <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" required />
            <AuthField id="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" autoComplete="current-password" required />

            {error && <p className="mb-6 text-sm text-destructive font-mono">{error}</p>}

            <div className="flex flex-wrap items-center gap-6">
              <AuthSubmit label="Sign in" loading={loading} />
              <button
                type="button"
                onClick={onForgot}
                className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </AuthShell>
      </main>
      <Footer />
    </div>
  );
}
