import { Head } from '@inertiajs/react';
import { About } from '@/components/components/About';
import { Contact, Footer } from '@/components/components/Contact';
import { Hero } from '@/components/components/Hero';
import { Nav } from '@/components/components/Nav';
import { Services } from '@/components/components/Services';
import type { Recommendation } from '@/components/components/Testimonials';
import { Testimonials } from '@/components/components/Testimonials';
import { Work } from '@/components/components/Work';
import type { Project } from '@/data/projects';

type Props = {
  projects: Project[];
  recommendations: Recommendation[];
};

export default function Home({ projects, recommendations }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Mahdieh Baghoolizadeh" />
      <Nav />
      <main>
        <Hero />
        <Work projects={projects} limit={3} showMoreLink />
        <Services />
        <Testimonials recommendations={recommendations} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
