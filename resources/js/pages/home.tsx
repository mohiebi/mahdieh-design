import { Head } from '@inertiajs/react';
import { About } from '@/components/components/About';
import { Contact, Footer } from '@/components/components/Contact';
import { Hero } from '@/components/components/Hero';
import { Nav } from '@/components/components/Nav';
import { Services } from '@/components/components/Services';
import { Work } from '@/components/components/Work';
import type { Project } from '@/data/projects';

type Props = {
  projects: Project[];
};

export default function Home({ projects }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Mahdieh Baghoolizadeh" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Work projects={projects} limit={3} showMoreLink />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
