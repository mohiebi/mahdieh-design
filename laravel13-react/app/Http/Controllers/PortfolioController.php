<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('home', [
            'projects' => fn () => $this->publishedProjects()->map(fn (Project $project) => $this->projectPayload($project)),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('projects/index', [
            'projects' => fn () => $this->publishedProjects()->map(fn (Project $project) => $this->projectPayload($project)),
        ]);
    }

    public function show(Project $project): Response
    {
        abort_unless($project->is_published, 404);

        $projects = $this->publishedProjects();
        $index = $projects->search(fn (Project $item) => $item->is($project));
        $previous = $projects->get(($index - 1 + $projects->count()) % $projects->count());
        $next = $projects->get(($index + 1) % $projects->count());

        return Inertia::render('projects/show', [
            'project' => fn () => $this->projectPayload($project->loadMissing(['sections', 'services', 'media'])),
            'previousProject' => fn () => $this->projectPayload($previous),
            'nextProject' => fn () => $this->projectPayload($next),
        ]);
    }

    private function publishedProjects(): Collection
    {
        return Project::query()
            ->with(['sections', 'services', 'media'])
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    private function projectPayload(Project $project): array
    {
        $media = $project->media;
        $cover = $media->firstWhere('is_cover', true) ?? $media->firstWhere('type', 'image');

        return [
            'slug' => $project->slug,
            'title' => $project->title,
            'client' => $project->client,
            'year' => $project->year,
            'category' => $project->category,
            'description' => $project->description,
            'image' => $cover?->url ?? '/project-media/covers/work-arianet.jpg',
            'services' => $project->services->pluck('label')->values(),
            'location' => $project->location,
            'credit' => $project->credit,
            'content' => $project->sections->pluck('body')->values(),
            'videos' => $media->where('type', 'video')->pluck('url')->values(),
            'galleryImages' => $media->where('type', 'image')->reject(fn ($item) => $item->is_cover)->pluck('url')->values(),
        ];
    }
}
