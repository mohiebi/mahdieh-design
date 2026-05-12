import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { AuthShell, AuthField, AuthSubmit } from "@/components/AuthShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Reset password — Mahdieh Baghoolizadeh" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/brief" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <AuthShell
          eyebrow="Reset password"
          title={<>Set a new <em className="text-accent not-italic font-normal">password</em>.</>}
          subtitle="Enter a new password for your account."
        >
          <form onSubmit={onSubmit}>
            <AuthField id="password" label="New password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" required />
            {error && <p className="mb-6 text-sm text-destructive font-mono">{error}</p>}
            <AuthSubmit label="Update password" loading={loading} />
          </form>
        </AuthShell>
      </main>
      <Footer />
    </div>
  );
}
