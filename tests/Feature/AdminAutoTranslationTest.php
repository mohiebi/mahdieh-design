<?php

use App\Models\BriefQuestion;
use App\Models\Project;
use App\Models\Recommendation;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

it('blocks non-admin users from auto-translating cms content', function (): void {
    config([
        'services.translation.provider' => 'azure',
        'services.azure_translator.key' => 'test-key',
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/admin/translations/autofill')
        ->assertForbidden();
});

it('returns a clear error when the translation provider is not configured', function (): void {
    config([
        'services.translation.provider' => 'azure',
        'services.azure_translator.key' => null,
    ]);

    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post('/admin/translations/autofill')
        ->assertRedirect()
        ->assertSessionHas('error', 'Azure Translator is not configured. Add the provider API key on the server first.');

    Http::assertNothingSent();
});

it('fills missing CMS translations without overwriting existing content', function (): void {
    config([
        'services.translation.provider' => 'azure',
        'services.translation.german_target_lang' => 'de',
        'services.translation.persian_target_lang' => 'fa',
        'services.azure_translator.key' => 'test-key',
        'services.azure_translator.endpoint' => 'https://azure-translator.test',
        'services.azure_translator.region' => 'westeurope',
    ]);

    Http::fake(function (Request $request) {
        if (Str::contains($request->url(), '/languages')) {
            return Http::response([
                'translation' => [
                    'de' => ['name' => 'German'],
                    'fa' => ['name' => 'Persian'],
                ],
            ]);
        }

        parse_str((string) parse_url($request->url(), PHP_URL_QUERY), $query);
        $payload = $request->data();
        $target = $query['to'];

        return Http::response([
            ...collect($payload)
                ->map(fn (array $item) => [
                    'translations' => [
                        ['text' => "{$target}: {$item['Text']}", 'to' => $target],
                    ],
                ])
                ->all(),
        ]);
    });

    $admin = User::factory()->admin()->create();
    $project = Project::create([
        'slug' => 'brand-system',
        'title' => 'Brand System',
        'client' => 'Client',
        'year' => '2026',
        'category' => 'Identity',
        'description' => 'A focused identity project.',
        'location' => '',
        'credit' => 'Manual credit',
        'credit_de' => 'Bestehende Angabe',
        'sort_order' => 0,
        'is_published' => true,
    ]);
    $section = $project->sections()->create([
        'body' => 'A detailed section.',
        'sort_order' => 0,
    ]);
    $service = $project->services()->create([
        'label' => 'Strategy',
        'sort_order' => 0,
    ]);
    $recommendation = Recommendation::create([
        'name' => 'Client Name',
        'role' => 'Founder',
        'company' => 'Existing Company',
        'company_de' => 'Bestehendes Unternehmen',
        'quote' => 'Excellent collaboration.',
        'sort_order' => 0,
        'is_active' => true,
    ]);
    $question = BriefQuestion::create([
        'label' => 'What are we making?',
        'label_fa' => 'Manual Persian text',
        'hint' => 'Share the project context.',
        'type' => 'long',
        'placeholder' => 'Tell me about it.',
        'is_required' => true,
        'is_active' => true,
        'sort_order' => 0,
    ]);

    $this->actingAs($admin)
        ->post('/admin/translations/autofill')
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($project->refresh())
        ->title_de->toBe('de: Brand System')
        ->category_de->toBe('de: Identity')
        ->description_de->toBe('de: A focused identity project.')
        ->location_de->toBeNull()
        ->credit_de->toBe('Bestehende Angabe')
        ->and($section->refresh()->body_de)->toBe('de: A detailed section.')
        ->and($service->refresh()->label_de)->toBe('de: Strategy')
        ->and($recommendation->refresh()->role_de)->toBe('de: Founder')
        ->and($recommendation->company_de)->toBe('Bestehendes Unternehmen')
        ->and($recommendation->quote_de)->toBe('de: Excellent collaboration.')
        ->and($question->refresh()->label_de)->toBe('de: What are we making?')
        ->and($question->hint_de)->toBe('de: Share the project context.')
        ->and($question->placeholder_de)->toBe('de: Tell me about it.')
        ->and($question->label_fa)->toBe('Manual Persian text')
        ->and($question->hint_fa)->toBe('fa: Share the project context.')
        ->and($question->placeholder_fa)->toBe('fa: Tell me about it.');

    Http::assertSent(fn (Request $request) => Str::contains($request->url(), '/languages'));
});

it('batches requests and preserves partial successes when a later provider batch fails', function (): void {
    config([
        'services.translation.provider' => 'azure',
        'services.azure_translator.key' => 'test-key',
        'services.azure_translator.endpoint' => 'https://azure-translator.test',
    ]);

    for ($index = 1; $index <= 51; $index++) {
        Project::create([
            'slug' => "project-{$index}",
            'title' => "Project {$index}",
            'client' => 'Client',
            'year' => '2026',
            'category' => 'Identity',
            'category_de' => 'Kategorie',
            'description' => 'Description',
            'description_de' => 'Beschreibung',
            'sort_order' => $index,
            'is_published' => true,
        ]);
    }

    $translateCalls = 0;

    Http::fake(function (Request $request) use (&$translateCalls) {
        $payload = $request->data();
        $translateCalls++;

        if ($translateCalls > 1) {
            return Http::response(['message' => 'quota exceeded'], 456);
        }

        return Http::response([
            ...collect($payload)
                ->map(fn (array $item) => [
                    'translations' => [
                        ['text' => "de: {$item['Text']}", 'to' => 'de'],
                    ],
                ])
                ->all(),
        ]);
    });

    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post('/admin/translations/autofill')
        ->assertRedirect()
        ->assertSessionHas('error', fn (string $message) => str_contains($message, '50 translated, 204 skipped, 1 failed'));

    expect(Project::whereNotNull('title_de')->count())->toBe(50)
        ->and(Project::whereNull('title_de')->count())->toBe(1);
});
