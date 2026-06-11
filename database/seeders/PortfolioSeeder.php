<?php

namespace Database\Seeders;

use App\Models\BriefQuestion;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->projects() as $order => $item) {
            $project = Project::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'title' => $item['title'],
                    'client' => $item['client'],
                    'year' => $item['year'],
                    'category' => $item['category'],
                    'description' => $item['description'],
                    'location' => $item['location'] ?? null,
                    'credit' => $item['credit'] ?? null,
                    'sort_order' => $order,
                    'is_published' => true,
                ],
            );

            $project->sections()->delete();
            foreach ($item['content'] as $index => $body) {
                $project->sections()->create(['body' => $body, 'sort_order' => $index]);
            }

            $project->services()->delete();
            foreach ($item['services'] as $index => $label) {
                $project->services()->create(['label' => $label, 'sort_order' => $index]);
            }

            $project->media()->delete();
            $this->seedMedia($project, $item['cover']);
        }

        if (BriefQuestion::count() === 0) {
            foreach ($this->questions() as $index => $question) {
                BriefQuestion::create([...$question, 'sort_order' => $index]);
            }
        }
    }

    private function seedMedia(Project $project, string $cover): void
    {
        $project->media()->create([
            'type' => Str::endsWith($cover, ['.mp4', '.webm']) ? 'video' : 'image',
            'url' => $cover,
            'alt_text' => "{$project->title} cover",
            'is_cover' => true,
            'sort_order' => 0,
        ]);

        $directory = public_path("project-media/{$project->slug}");
        if (! File::isDirectory($directory)) {
            return;
        }

        $files = collect(File::files($directory))
            ->sortBy(fn ($file) => str($file->getFilename())->lower()->toString(), SORT_NATURAL)
            ->values();

        $sort = 1;
        foreach ($files as $file) {
            $name = $file->getFilename();
            $extension = strtolower($file->getExtension());
            $url = "/project-media/{$project->slug}/".str_replace('%2F', '/', rawurlencode($name));

            if ($url === $cover || str_starts_with($name, 'cover.')) {
                continue;
            }

            if (! in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm'], true)) {
                continue;
            }

            $project->media()->create([
                'type' => in_array($extension, ['mp4', 'webm'], true) ? 'video' : 'image',
                'url' => $url,
                'alt_text' => "{$project->title} media",
                'is_cover' => false,
                'sort_order' => $sort++,
            ]);
        }
    }

    private function projects(): array
    {
        return [
            [
                'slug' => 'arianet',
                'title' => 'Arianet',
                'client' => 'MCI',
                'year' => '2025',
                'category' => 'Business Collaboration',
                'description' => 'A telecom collaboration identity built around speed, trust, and a clear launch message.',
                'cover' => '/project-media/arianet/cover.webp',
                'services' => ['Brand strategy', 'Campaign concept', 'Visual identity'],
                'credit' => 'Portfolio source: Nexa Inc.',
                'content' => [
                    'Arianet frames a business collaboration around the line Speed Is Life. The identity uses confident contrast, fast composition, and simple messaging to make telecom infrastructure feel direct and energetic.',
                    'The system is designed for a launch context: memorable enough for campaign use, but structured enough to support service communication across digital and presentation surfaces.',
                ],
            ],
            [
                'slug' => 'pooyesh',
                'title' => 'Pooyesh',
                'client' => 'Royan Fertility Center',
                'year' => '2022',
                'category' => 'Branding Project',
                'description' => 'A soft and reassuring healthcare identity for a fertility center, spanning logo, visual identity, and environmental graphics.',
                'cover' => '/project-media/covers/work-pooyesh.jpg',
                'services' => ['Logo design', 'Visual identity', 'Environmental graphics'],
                'location' => 'Isfahan, Iran',
                'content' => [
                    'Pooyesh is the patient-facing brand for Royan Fertility Center. Its visual language is built to feel warm, careful, and emotionally steady for a sensitive healthcare journey.',
                    'The portfolio shows the identity moving from the mark into physical space, with environmental graphics and printed materials carrying the same calm visual rhythm.',
                ],
            ],
            [
                'slug' => 'arex',
                'title' => 'Arex',
                'client' => 'Arex',
                'year' => '2024',
                'category' => 'Brand Design',
                'description' => 'A secure and efficient visual system for a digital transaction facilitator.',
                'cover' => '/project-media/arex/cover.webp',
                'services' => ['Brand design', 'Logo system', 'Visual identity'],
                'credit' => 'In collaboration with Wilma Studio.',
                'content' => [
                    'Arex is positioned as a digital transaction facilitator, so the brand needed to communicate security, movement, and operational clarity in a compact system.',
                    'The resulting identity uses strong geometry and a restrained visual language that can work across product, communication, and trust-building brand moments.',
                ],
            ],
            [
                'slug' => 'seper',
                'title' => 'Dr. Sep',
                'client' => 'Dr. Sep',
                'year' => '2026',
                'category' => 'Personal Brand',
                'description' => 'A personal brand for an AI explorer, built around independent thinking and an editorial visual voice.',
                'cover' => '/project-media/seper/cover.webp',
                'services' => ['Brand strategy', 'Personal brand', 'Editorial direction'],
                'location' => 'England',
                'content' => [
                    'Seper is a personal brand for an AI explorer, shaped around the idea of forging a path before the map exists. The identity gives that thought a quiet but distinctive visual presence.',
                    'The system favors clear hierarchy, editorial pacing, and a sense of exploration that can support articles, talks, digital profiles, and long-form thinking.',
                ],
            ],
            [
                'slug' => 'xima',
                'title' => 'Xima',
                'client' => 'Xima',
                'year' => '2021',
                'category' => 'Branding Project',
                'description' => 'A construction company identity balancing respect for the past with a forward-building perspective.',
                'cover' => '/project-media/covers/work-xima.jpg',
                'services' => ['Logo design', 'Visual identity'],
                'content' => [
                    'Xima is a construction company identity with a clear positioning idea: believing in the past while building the future. The brand uses that tension as its visual anchor.',
                    'The identity is direct and architectural, giving the company a system that can work across business stationery, signage, site material, and presentation use.',
                ],
            ],
            [
                'slug' => 'ako',
                'title' => 'Ako',
                'client' => 'Mohammad Aghajari',
                'year' => '2023',
                'category' => 'Real Estate Brand',
                'description' => 'Naming and visual identity for Ako Real Estate Group, a Tehran-based real estate brand.',
                'cover' => '/project-media/ako/cover.webp',
                'services' => ['Brand naming', 'Visual identity', 'Brand design'],
                'location' => 'Tehran, Iran',
                'content' => [
                    'Ako is a real estate group identity developed from naming through visual language. The work gives the brand a polished, high-trust presence for a competitive property market.',
                    'The project focuses on a clean mark, refined layout behavior, and a visual system that can adapt from corporate communication to real estate listing and client-facing material.',
                ],
            ],
            [
                'slug' => 'gilaneh',
                'title' => 'Gilaneh',
                'client' => 'Gilaneh',
                'year' => '2023',
                'category' => 'Branding Project',
                'description' => 'Brand and packaging design for an Iranian grill house in Vancouver.',
                'cover' => '/project-media/gilaneh/cover.webp',
                'services' => ['Logo design', 'Visual identity', 'Packaging design'],
                'location' => 'Vancouver, Canada',
                'content' => [
                    'Gilaneh brings an Iranian grill house identity into a Vancouver restaurant context. The brand blends a hospitality voice with cultural memory and a strong packaging system.',
                    "The work extends from the core logo into menus, takeaway packaging, and brand surfaces that need to feel recognizable both in-store and in customers' hands.",
                ],
            ],
            [
                'slug' => 'zeevash',
                'title' => 'Zeevash',
                'client' => 'Zeevash Pharmacy',
                'year' => '2023',
                'category' => 'Brand Strategy',
                'description' => 'A pharmacy identity and packaging system with clinical clarity and approachable retail behavior.',
                'cover' => '/project-media/zeevash/cover.webp',
                'services' => ['Brand strategy', 'Visual identity', 'Packaging design'],
                'location' => 'Tehran, Iran',
                'content' => [
                    'Zeevash is a pharmacy brand system that needs to feel trustworthy, organized, and approachable. The visual direction keeps the experience clear without becoming cold.',
                    'The portfolio presents the identity across packaging and pharmacy touchpoints, giving the brand a flexible system for health, retail, and service communication.',
                ],
            ],
            [
                'slug' => 'milan',
                'title' => 'Milan',
                'client' => 'Milan',
                'year' => '2024',
                'category' => 'Motion Design',
                'description' => 'A motion-led project with a full video set and a dedicated cover image for the portfolio archive.',
                'cover' => '/project-media/milan/cover.jpg',
                'services' => ['Motion design', 'Video direction', 'Campaign assets'],
                'content' => [
                    'Milan is presented as a motion-focused portfolio project. The project page prioritizes the video set first, using the cover image for listings and the page hero.',
                    'The media package includes multiple motion exports for different campaign and story formats, giving the project page a more dynamic case-study rhythm.',
                ],
            ],
            [
                'slug' => 'ayeneh-khaneh',
                'title' => 'Ayeneh Khaneh',
                'client' => 'Ayeneh Khaneh',
                'year' => '2020',
                'category' => 'Branding Project',
                'description' => 'Logo, visual identity, and UI design for a design and construction company.',
                'cover' => '/project-media/covers/work-ayeneh-khaneh.jpg',
                'services' => ['Logo design', 'Visual identity', 'UI design'],
                'content' => [
                    'Ayeneh Khaneh is a design and construction company identity. The project connects architectural structure with a refined brand language that can live across print and digital touchpoints.',
                    'The system includes UI design alongside the core visual identity, so the brand can present its work with a consistent tone from portfolio material to web interfaces.',
                ],
            ],
            [
                'slug' => 'phownix',
                'title' => 'Phownix',
                'client' => 'Phownix Mobile Equipment',
                'year' => '2023',
                'category' => 'Packaging Design',
                'description' => 'A bold packaging system for mobile equipment products, designed for shelf impact and fast recognition.',
                'cover' => '/project-media/phownix/cover.webp',
                'services' => ['Packaging design', 'Product line system'],
                'content' => [
                    'Phownix needed packaging that could compete quickly in a mobile equipment category where recognition and hierarchy matter at a glance.',
                    'The design creates a strong product-family feel, using assertive typography and repeatable structure so each item can stand alone while still belonging to the same system.',
                ],
            ],
            [
                'slug' => 'palo-santo',
                'title' => 'Palo Santo',
                'client' => 'Palo Santo',
                'year' => '2022',
                'category' => 'Branding Project',
                'description' => 'A classic and neoclassical furniture identity rooted in craft, detail, and restraint.',
                'cover' => '/project-media/covers/work-palosanto.jpg',
                'services' => ['Logo design', 'Visual identity'],
                'content' => [
                    'Palo Santo is a furniture brand with a classic and neoclassical character. The identity needed to feel crafted, established, and attentive to detail.',
                    'The visual system keeps the mark and layouts restrained, letting materials, furniture forms, and brand tone carry the sense of quality.',
                ],
            ],
            [
                'slug' => 'tabesh',
                'title' => 'Tabesh',
                'client' => 'Tabesh Brand Center',
                'year' => '2022',
                'category' => 'Branding Project',
                'description' => 'A brand development center identity spanning logo, visual identity, and environmental graphics.',
                'cover' => '/project-media/covers/work-tabesh.jpg',
                'services' => ['Logo design', 'Visual identity', 'Environmental graphics'],
                'content' => [
                    'Tabesh is a brand development center, so its own identity needed to feel flexible, strategic, and capable of holding many kinds of brand work.',
                    'The portfolio shows a system that can move through printed matter, environmental graphics, and presentation contexts without losing its editorial discipline.',
                ],
            ],
        ];
    }

    private function questions(): array
    {
        return collect(range(1, 15))->map(fn (int $number) => [
            'label' => "Question {$number}",
            'label_fa' => "سوال {$number}",
            'hint' => 'Placeholder - replace this with the final brief question in the CMS.',
            'hint_fa' => 'این یک متن نمونه است - آن را با سوال نهایی در پنل مدیریت جایگزین کنید.',
            'type' => $number === 2 ? 'email' : ($number <= 4 ? 'short' : 'long'),
            'placeholder' => 'Your answer...',
            'placeholder_fa' => 'پاسخ شما...',
            'is_required' => true,
            'is_active' => true,
        ])->all();
    }
}
