import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { AuthShell, AuthField, AuthSubmit } from "@/components/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

type Search = { redirect?: string };

export const Route = createFileRoute("/signup")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Create account — Mahdieh Baghoolizadeh" },
      { name: "description", content: "Create your account to start a project brief with Mahdieh Baghoolizadeh." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/signup" }) as Search;
  const { session, loading: sessionLoading } = useSession();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const target = search.redirect || "/brief";

  useEffect(() => {
    if (!sessionLoading && session) navigate({ to: target });
  }, [session, sessionLoading, navigate, target]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${target}`,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      navigate({ to: target });
    } else {
      setInfo("Check your email to confirm your account, then sign in to continue.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <AuthShell
          eyebrow="Create account"
          title={<>Start your <em className="text-accent not-italic font-normal">brief</em>.</>}
          subtitle="A quick account so we can save your answers and stay in touch about your project."
          footer={
            <>
              Already have an account?{" "}
              <Link to="/login" search={{ redirect: target }} className="text-foreground hover:text-accent transition-colors">
                Sign in →
              </Link>
            </>
          }
        >
          <form onSubmit={onSubmit}>
            <AuthField id="name" label="Full name" value={fullName} onChange={setFullName} placeholder="Your name" autoComplete="name" required />
            <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" required />
            <AuthField id="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" required />

            {error && <p className="mb-6 text-sm text-destructive font-mono">{error}</p>}
            {info && <p className="mb-6 text-sm text-accent font-mono">{info}</p>}

            <AuthSubmit label="Create account & continue" loading={loading} />
          </form>
        </AuthShell>
      </main>
      <Footer />
    </div>
  );
}
