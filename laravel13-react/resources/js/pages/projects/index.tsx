import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Work } from '@/components/components/Work';
import type { Project } from '@/data/projects';

type Props = {
  projects: Project[];
};

export default function ProjectsIndex({ projects }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Projects">
        <meta
          name="description"
          content="A curated archive of identities, campaigns and product work from 2022 to 2026."
        />
      </Head>
      <Nav />
      <main className="pt-16">
        <Work projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
