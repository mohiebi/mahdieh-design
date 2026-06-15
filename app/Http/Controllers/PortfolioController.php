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

    public function process(): Response
    {
        return Inertia::render('process');
    }

    public function service(string $service): Response
    {
        $definition = $this->serviceDefinitions()[$service] ?? null;

        abort_unless($definition, 404);

        $matchLabels = collect($definition['matchLabels'])->map(fn (string $label) => strtolower($label));
        $relatedProjects = $this->publishedProjects()
            ->filter(function (Project $project) use ($matchLabels): bool {
                return $project->services->pluck('label')->contains(
                    fn (string $label) => $matchLabels->contains(strtolower($label))
                );
            })
            ->values();

        unset($definition['matchLabels']);

        return Inertia::render('services/show', [
            'service' => $definition,
            'projects' => fn () => $relatedProjects->map(fn (Project $project) => $this->projectPayload($project)),
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

    private function serviceDefinitions(): array
    {
        return [
            'brand-strategy' => [
                'slug' => 'brand-strategy',
                'number' => '01',
                'title' => 'Brand Strategy',
                'summary' => 'Strategic foundations for brands that need direction before design.',
                'description' => [
                    'Brand strategy clarifies what a brand stands for, who it is speaking to, and how it should behave before the visual system begins.',
                    'This work can include positioning, naming, narrative, brand architecture, campaign concepts, and the creative compass that keeps every touchpoint aligned.',
                ],
                'focus' => ['Positioning', 'Naming', 'Narrative', 'Brand architecture', 'Campaign concept'],
                'matchLabels' => ['Brand strategy', 'Brand naming', 'Brand design', 'Personal brand', 'Campaign concept'],
            ],
            'visual-identity' => [
                'slug' => 'visual-identity',
                'number' => '02',
                'title' => 'Visual Identity',
                'summary' => 'Logo, type, color, and visual systems that can scale across real brand use.',
                'description' => [
                    'Visual identity turns strategy into a recognizable system. The goal is not only a mark, but a visual language that can move across print, digital, packaging, and spatial moments.',
                    'Each system is designed for consistency and flexibility, with enough structure to support future teams, campaigns, and content.',
                ],
                'focus' => ['Logo design', 'Visual language', 'Typography', 'Color systems', 'Identity guidelines'],
                'matchLabels' => ['Visual identity', 'Logo design', 'Logo system', 'Brand design'],
            ],
            'packaging-design' => [
                'slug' => 'packaging-design',
                'number' => '03',
                'title' => 'Packaging Design',
                'summary' => 'Packaging systems that make products clear, memorable, and shelf-ready.',
                'description' => [
                    'Packaging design translates a brand into product moments people can hold, compare, purchase, and remember.',
                    'The work focuses on shelf clarity, hierarchy, material behavior, product family systems, and the details that make packaging feel both practical and distinctive.',
                ],
                'focus' => ['Packaging systems', 'Product hierarchy', 'Shelf impact', 'Material direction', 'Product line rules'],
                'matchLabels' => ['Packaging design', 'Product line system'],
            ],
            'environmental-design' => [
                'slug' => 'environmental-design',
                'number' => '04',
                'title' => 'Environmental Design',
                'summary' => 'Spatial graphics and branded environments that carry identity into the physical world.',
                'description' => [
                    'Environmental design brings the identity system into physical space, from signage and wall graphics to branded touchpoints that shape how people navigate and feel a place.',
                    'The work connects spatial rhythm, material context, and brand recognition so the environment feels coherent without becoming decorative noise.',
                ],
                'focus' => ['Environmental graphics', 'Signage', 'Spatial identity', 'Wayfinding', 'Branded touchpoints'],
                'matchLabels' => ['Environmental graphics'],
            ],
        ];
    }
}
