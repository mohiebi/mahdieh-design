<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Project;
use App\Models\Recommendation;
use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    private const PROJECT_SCOPES = ['popular', 'recent'];
    private const LOCALES = ['en', 'de'];

    public function home(): Response
    {
        return $this->homeFor('en');
    }

    public function homeLocalized(string $locale): Response
    {
        return $this->homeFor($this->locale($locale));
    }

    private function homeFor(string $locale): Response
    {
        return Inertia::render('home', [
            'locale' => $locale,
            'projects' => fn () => $this->publishedProjects()->map(fn (Project $project) => $this->projectPayload($project, $locale)),
            'recommendations' => fn () => Recommendation::active()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (Recommendation $r) => [
                    'id' => $r->id,
                    'name' => $r->name,
                    'role' => $this->localized($r, 'role', $locale),
                    'company' => $this->localized($r, 'company', $locale),
                    'quote' => $this->localized($r, 'quote', $locale),
                    'linkedin_url' => $r->linkedin_url,
                    'avatar_path' => $r->avatar_path,
                ]),
        ]);
    }

    public function index(Request $request): Response
    {
        return $this->indexFor($request, 'en');
    }

    public function indexLocalized(Request $request, string $locale): Response
    {
        return $this->indexFor($request, $this->locale($locale));
    }

    private function indexFor(Request $request, string $locale): Response
    {
        $scope = $this->projectScope($request->query('scope'));

        return Inertia::render('projects/index', [
            'locale' => $locale,
            'projects' => fn () => $this->publishedProjects($scope)->map(fn (Project $project) => $this->projectPayload($project, $locale)),
            'scope' => $scope,
        ]);
    }

    public function process(): Response
    {
        return $this->processFor('en');
    }

    public function processLocalized(string $locale): Response
    {
        return $this->processFor($this->locale($locale));
    }

    private function processFor(string $locale): Response
    {
        return Inertia::render('process', [
            'locale' => $locale,
        ]);
    }

    public function services(): Response
    {
        return $this->servicesFor('en');
    }

    public function servicesLocalized(string $locale): Response
    {
        return $this->servicesFor($this->locale($locale));
    }

    private function servicesFor(string $locale): Response
    {
        $services = Service::active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Service $s) => $this->servicePayload($s, $locale));

        $packages = Package::active()
            ->with('services')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Package $p) => $this->packagePayload($p, $locale));

        return Inertia::render('services/index', [
            'locale' => $locale,
            'services' => $services,
            'packages' => $packages,
        ]);
    }

    private function packagePayload(Package $p, string $locale): array
    {
        $paymentTerms = match ($locale) {
            'fa' => $p->payment_terms_fa ?? $p->payment_terms,
            'de' => $p->payment_terms_de ?? $p->payment_terms,
            default => $p->payment_terms,
        };

        return [
            'id' => $p->id,
            'slug' => $p->slug,
            'title' => $this->localized($p, 'title', $locale),
            'summary' => $this->localized($p, 'summary', $locale),
            'deliverables' => $this->localized($p, 'deliverables', $locale) ?? [],
            'price_toman' => $p->price_toman,
            'price_eur' => $p->price_eur,
            'price_usd' => $p->price_usd,
            'duration_days' => $p->duration_days,
            'payment_terms' => $paymentTerms,
            'is_featured' => $p->is_featured,
            'services' => $p->services->map(fn (Service $s) => [
                'slug' => $s->slug,
                'title' => $this->localized($s, 'title', $locale),
                'number' => $s->number,
            ])->values()->toArray(),
        ];
    }

    public function servicesFa(): Response
    {
        return $this->servicesFor('fa');
    }

    public function package(string $slug): Response
    {
        return $this->packageShowFor('en', $slug);
    }

    public function packageFa(string $slug): Response
    {
        return $this->packageShowFor('fa', $slug);
    }

    public function packageShowLocalized(string $locale, string $slug): Response
    {
        return $this->packageShowFor($this->locale($locale), $slug);
    }

    private function packageShowFor(string $locale, string $slug): Response
    {
        $pkg = Package::with('services')->where('slug', $slug)->active()->first();

        abort_unless($pkg, 404);

        $matchLabels = $pkg->services
            ->flatMap(fn (Service $s) => collect($s->match_labels ?? []))
            ->map(fn (string $l) => strtolower($l))
            ->unique();

        $relatedProjects = $this->publishedProjects()
            ->filter(function (Project $project) use ($matchLabels): bool {
                return $project->services->pluck('label')->contains(
                    fn (string $label) => $matchLabels->contains(strtolower($label))
                );
            })
            ->values();

        return Inertia::render('packages/show', [
            'locale' => $locale,
            'package' => $this->packagePayload($pkg, $locale),
            'projects' => fn () => $relatedProjects->map(fn (Project $project) => $this->projectPayload($project, $locale)),
        ]);
    }

    public function service(string $service): Response
    {
        return $this->serviceFor('en', $service);
    }

    public function serviceFa(string $service): Response
    {
        return $this->serviceFor('fa', $service);
    }

    public function serviceLocalized(string $locale, string $service): Response
    {
        return $this->serviceFor($this->locale($locale), $service);
    }

    private function serviceFor(string $locale, string $service): Response
    {
        $svc = Service::where('slug', $service)->active()->first();

        abort_unless($svc, 404);

        $matchLabels = collect($svc->match_labels)->map(fn (string $label) => strtolower($label));
        $relatedProjects = $this->publishedProjects()
            ->filter(function (Project $project) use ($matchLabels): bool {
                return $project->services->pluck('label')->contains(
                    fn (string $label) => $matchLabels->contains(strtolower($label))
                );
            })
            ->values();

        return Inertia::render('services/show', [
            'locale' => $locale,
            'service' => $this->servicePayload($svc, $locale),
            'projects' => fn () => $relatedProjects->map(fn (Project $project) => $this->projectPayload($project, $locale)),
        ]);
    }

    private function servicePayload(Service $s, string $locale): array
    {
        return [
            'slug' => $s->slug,
            'number' => $s->number,
            'title' => $this->localized($s, 'title', $locale),
            'summary' => $this->localized($s, 'summary', $locale),
            'description' => $this->localized($s, 'description', $locale) ?? [],
            'focus' => $this->localized($s, 'focus', $locale) ?? [],
        ];
    }

    public function show(Project $project): Response
    {
        return $this->showFor('en', $project);
    }

    public function showLocalized(string $locale, Project $project): Response
    {
        return $this->showFor($this->locale($locale), $project);
    }

    private function showFor(string $locale, Project $project): Response
    {
        abort_unless($project->is_published, 404);

        $projects = $this->publishedProjects();
        $index = $projects->search(fn (Project $item) => $item->is($project));
        $previous = $projects->get(($index - 1 + $projects->count()) % $projects->count());
        $next = $projects->get(($index + 1) % $projects->count());

        return Inertia::render('projects/show', [
            'locale' => $locale,
            'project' => fn () => $this->projectPayload($project->loadMissing(['sections', 'services', 'media']), $locale),
            'previousProject' => fn () => $this->projectPayload($previous, $locale),
            'nextProject' => fn () => $this->projectPayload($next, $locale),
        ]);
    }

    private function publishedProjects(string $scope = 'popular'): Collection
    {
        $query = Project::query()
            ->with(['sections', 'services', 'media'])
            ->published();

        if ($scope === 'recent') {
            $query->recentOrder();
        } else {
            $query->popularOrder();
        }

        return $query->get();
    }

    private function projectScope(mixed $scope): string
    {
        return in_array($scope, self::PROJECT_SCOPES, true) ? $scope : 'popular';
    }

    private function projectPayload(Project $project, string $locale = 'en'): array
    {
        $media = $project->media;
        $cover = $media->firstWhere('is_cover', true) ?? $media->firstWhere('type', 'image');

        return [
            'slug' => $project->slug,
            'title' => $this->localized($project, 'title', $locale),
            'client' => $project->client,
            'year' => $project->year,
            'category' => $this->localized($project, 'category', $locale),
            'description' => $this->localized($project, 'description', $locale),
            'image' => $cover?->url ?? '/project-media/covers/work-arianet.jpg',
            'services' => $project->services->map(fn ($service) => $this->localized($service, 'label', $locale))->values(),
            'location' => $this->localized($project, 'location', $locale),
            'credit' => $this->localized($project, 'credit', $locale),
            'content' => $project->sections->map(fn ($section) => $this->localized($section, 'body', $locale))->values(),
            'videos' => $media->where('type', 'video')->pluck('url')->values(),
            'galleryImages' => $media->where('type', 'image')->reject(fn ($item) => $item->is_cover)->pluck('url')->values(),
        ];
    }

    private function locale(string $locale): string
    {
        return in_array($locale, self::LOCALES, true) ? $locale : 'en';
    }

    private function localized(object $model, string $field, string $locale): mixed
    {
        if ($locale === 'en') {
            return $model->{$field};
        }

        $localizedField = "{$field}_{$locale}";
        $value = $model->{$localizedField} ?? null;

        return filled($value) ? $value : $model->{$field};
    }
}
