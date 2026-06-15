import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Process } from '@/components/components/Process';

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Process">
        <meta
          name="description"
          content="How a project unfolds with Mahdieh Baghoolizadeh — fourteen steps from the first conversation to a finished brand identity."
        />
      </Head>
      <Nav />
      <main className="pt-16">
        <Process />
      </main>
      <Footer />
    </div>
  );
}
