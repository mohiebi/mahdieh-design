import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { ProjectTemplate } from '@/components/components/ProjectTemplate';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  previousProject: Project;
  nextProject: Project;
};

export default function ProjectShow({ project, previousProject, nextProject }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title={project.title}>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - Mahdieh`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
      </Head>
      <Nav />
      <ProjectTemplate project={project} previousProject={previousProject} nextProject={nextProject} />
      <Footer />
    </div>
  );
}
