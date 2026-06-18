<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Recommendation;
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

    public function service(string $service): Response
    {
        return $this->serviceFor('en', $service);
    }

    public function serviceLocalized(string $locale, string $service): Response
    {
        return $this->serviceFor($this->locale($locale), $service);
    }

    private function serviceFor(string $locale, string $service): Response
    {
        $definition = $this->serviceDefinitions($locale)[$service] ?? null;

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
            'locale' => $locale,
            'service' => $definition,
            'projects' => fn () => $relatedProjects->map(fn (Project $project) => $this->projectPayload($project, $locale)),
        ]);
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

    private function serviceDefinitions(string $locale = 'en'): array
    {
        $definitions = [
            'brand-strategy' => [
                'slug' => 'brand-strategy',
                'number' => '01',
                'title' => [
                    'en' => 'Brand Strategy',
                    'fa' => 'استراتژی برند',
                    'de' => 'Brand Strategy',
                ],
                'summary' => [
                    'en' => 'Strategic foundations for brands that need direction before design.',
                    'fa' => 'بنیان‌های استراتژیک برای برندهایی که پیش از طراحی به جهت نیاز دارند.',
                    'de' => 'Strategische Grundlagen für Marken, die vor dem Design Richtung brauchen.',
                ],
                'description' => [
                    'en' => [
                        'Brand strategy clarifies what a brand stands for, who it is speaking to, and how it should behave before the visual system begins.',
                        'This work can include positioning, naming, narrative, brand architecture, campaign concepts, and the creative compass that keeps every touchpoint aligned.',
                    ],
                    'fa' => [
                        'استراتژی برند روشن می‌کند برند چه چیزی را نمایندگی می‌کند، با چه کسی حرف می‌زند و پیش از آغاز سیستم بصری چگونه باید رفتار کند.',
                        'این کار می‌تواند شامل جایگاه‌یابی، نام‌گذاری، روایت، معماری برند، کانسپت کمپین و قطب‌نمای خلاقی باشد که همه نقاط تماس را هم‌راستا نگه می‌دارد.',
                    ],
                    'de' => [
                        'Brand Strategy klärt, wofür eine Marke steht, mit wem sie spricht und wie sie sich verhalten soll, bevor das visuelle System beginnt.',
                        'Dazu gehören Positionierung, Naming, Narrative, Markenarchitektur, Kampagnenkonzepte und ein kreativer Kompass für konsistente Touchpoints.',
                    ],
                ],
                'focus' => [
                    'en' => ['Positioning', 'Naming', 'Narrative', 'Brand architecture', 'Campaign concept'],
                    'fa' => ['جایگاه‌یابی', 'نام‌گذاری', 'روایت', 'معماری برند', 'کانسپت کمپین'],
                    'de' => ['Positionierung', 'Naming', 'Narrative', 'Markenarchitektur', 'Kampagnenkonzept'],
                ],
                'matchLabels' => ['Brand strategy', 'Brand naming', 'Brand design', 'Personal brand', 'Campaign concept'],
            ],
            'visual-identity' => [
                'slug' => 'visual-identity',
                'number' => '02',
                'title' => ['en' => 'Visual Identity', 'fa' => 'هویت بصری', 'de' => 'Visual Identity'],
                'summary' => [
                    'en' => 'Logo, type, color, and visual systems that can scale across real brand use.',
                    'fa' => 'لوگو، تایپ، رنگ و سیستم‌های بصری که در استفاده واقعی برند مقیاس‌پذیرند.',
                    'de' => 'Logo, Typografie, Farbe und visuelle Systeme für reale Markennutzung.',
                ],
                'description' => [
                    'en' => [
                        'Visual identity turns strategy into a recognizable system. The goal is not only a mark, but a visual language that can move across print, digital, packaging, and spatial moments.',
                        'Each system is designed for consistency and flexibility, with enough structure to support future teams, campaigns, and content.',
                    ],
                    'fa' => [
                        'هویت بصری استراتژی را به سیستمی قابل تشخیص تبدیل می‌کند. هدف فقط یک نشانه نیست، بلکه زبان بصری‌ای است که در چاپ، دیجیتال، بسته‌بندی و فضا حرکت می‌کند.',
                        'هر سیستم برای ثبات و انعطاف طراحی می‌شود، با ساختاری کافی برای پشتیبانی از تیم‌ها، کمپین‌ها و محتوای آینده.',
                    ],
                    'de' => [
                        'Visual Identity verwandelt Strategie in ein wiedererkennbares System - nicht nur ein Zeichen, sondern eine visuelle Sprache für Print, Digital, Packaging und Raum.',
                        'Jedes System ist konsistent und flexibel genug, um Teams, Kampagnen und Inhalte langfristig zu tragen.',
                    ],
                ],
                'focus' => [
                    'en' => ['Logo design', 'Visual language', 'Typography', 'Color systems', 'Identity guidelines'],
                    'fa' => ['طراحی لوگو', 'زبان بصری', 'تایپوگرافی', 'سیستم رنگ', 'راهنمای هویت'],
                    'de' => ['Logo Design', 'Visuelle Sprache', 'Typografie', 'Farbsysteme', 'Identity Guidelines'],
                ],
                'matchLabels' => ['Visual identity', 'Logo design', 'Logo system', 'Brand design'],
            ],
            'packaging-design' => [
                'slug' => 'packaging-design',
                'number' => '03',
                'title' => ['en' => 'Packaging Design', 'fa' => 'طراحی بسته‌بندی', 'de' => 'Packaging Design'],
                'summary' => [
                    'en' => 'Packaging systems that make products clear, memorable, and shelf-ready.',
                    'fa' => 'سیستم‌های بسته‌بندی که محصول را روشن، ماندگار و آماده قفسه می‌کنند.',
                    'de' => 'Verpackungssysteme, die Produkte klar, merkfähig und regalbereit machen.',
                ],
                'description' => [
                    'en' => [
                        'Packaging design translates a brand into product moments people can hold, compare, purchase, and remember.',
                        'The work focuses on shelf clarity, hierarchy, material behavior, product family systems, and the details that make packaging feel both practical and distinctive.',
                    ],
                    'fa' => [
                        'طراحی بسته‌بندی برند را به لحظه‌هایی از محصول تبدیل می‌کند که مردم می‌توانند لمس، مقایسه، خرید و به خاطر بسپارند.',
                        'تمرکز کار بر وضوح در قفسه، سلسله‌مراتب، رفتار متریال، سیستم خانواده محصول و جزئیاتی است که بسته‌بندی را کاربردی و متمایز می‌کند.',
                    ],
                    'de' => [
                        'Packaging Design übersetzt eine Marke in Produktmomente, die Menschen halten, vergleichen, kaufen und erinnern können.',
                        'Der Fokus liegt auf Klarheit im Regal, Hierarchie, Materialverhalten, Produktfamilien und Details, die praktisch und markant wirken.',
                    ],
                ],
                'focus' => [
                    'en' => ['Packaging systems', 'Product hierarchy', 'Shelf impact', 'Material direction', 'Product line rules'],
                    'fa' => ['سیستم بسته‌بندی', 'سلسله‌مراتب محصول', 'اثرگذاری در قفسه', 'جهت متریال', 'قواعد خط محصول'],
                    'de' => ['Packaging Systeme', 'Produkthierarchie', 'Shelf Impact', 'Materialrichtung', 'Produktlinien-Regeln'],
                ],
                'matchLabels' => ['Packaging design', 'Product line system'],
            ],
            'environmental-design' => [
                'slug' => 'environmental-design',
                'number' => '04',
                'title' => ['en' => 'Environmental Design', 'fa' => 'طراحی محیطی', 'de' => 'Environmental Design'],
                'summary' => [
                    'en' => 'Spatial graphics and branded environments that carry identity into the physical world.',
                    'fa' => 'گرافیک فضایی و محیط‌های برندمحور که هویت را وارد جهان فیزیکی می‌کنند.',
                    'de' => 'Räumliche Grafik und Markenräume, die Identität in die physische Welt tragen.',
                ],
                'description' => [
                    'en' => [
                        'Environmental design brings the identity system into physical space, from signage and wall graphics to branded touchpoints that shape how people navigate and feel a place.',
                        'The work connects spatial rhythm, material context, and brand recognition so the environment feels coherent without becoming decorative noise.',
                    ],
                    'fa' => [
                        'طراحی محیطی سیستم هویت را وارد فضا می‌کند؛ از تابلو و گرافیک دیواری تا نقاط تماس برند که مسیر حرکت و حس افراد نسبت به مکان را شکل می‌دهند.',
                        'این کار ریتم فضایی، زمینه متریال و شناخت برند را به هم وصل می‌کند تا محیط منسجم باشد، بدون آنکه به تزئینات اضافه تبدیل شود.',
                    ],
                    'de' => [
                        'Environmental Design bringt das Identitätssystem in den Raum - von Signage und Wandgrafik bis zu Touchpoints, die Orientierung und Gefühl prägen.',
                        'Die Arbeit verbindet räumlichen Rhythmus, Materialkontext und Wiedererkennung, damit der Ort kohärent wirkt, ohne dekorativ zu rauschen.',
                    ],
                ],
                'focus' => [
                    'en' => ['Environmental graphics', 'Signage', 'Spatial identity', 'Wayfinding', 'Branded touchpoints'],
                    'fa' => ['گرافیک محیطی', 'تابلو و نشانه‌گذاری', 'هویت فضایی', 'مسیریابی', 'نقاط تماس برند'],
                    'de' => ['Environmental Graphics', 'Signage', 'Räumliche Identität', 'Wayfinding', 'Brand Touchpoints'],
                ],
                'matchLabels' => ['Environmental graphics'],
            ],
        ];

        return collect($definitions)
            ->map(function (array $definition) use ($locale): array {
                foreach (['title', 'summary', 'description', 'focus'] as $key) {
                    $definition[$key] = $definition[$key][$locale] ?? $definition[$key]['en'];
                }

                return $definition;
            })
            ->all();
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
