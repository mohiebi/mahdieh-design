<?php

use App\Models\BriefQuestion;
use App\Models\BriefSubmission;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\File;

it('blocks non-admin users from admin routes', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)->get('/admin')->assertForbidden();
});

it('allows admins to create and update projects', function (): void {
    $admin = User::factory()->admin()->create();

    $payload = [
        'slug' => 'test-project',
        'title' => 'Test Project',
        'client' => 'Client',
        'year' => '2026',
        'category' => 'Branding',
        'description' => 'A project description.',
        'location' => '',
        'credit' => '',
        'sort_order' => 3,
        'is_published' => true,
        'sections' => ['First paragraph.'],
        'services' => ['Identity'],
        'media' => [
            [
                'type' => 'image',
                'url' => '',
                'upload' => [
                    'name' => 'cover.gif',
                    'type' => 'image/gif',
                    'data' => 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
                ],
                'alt_text' => 'Cover',
                'is_cover' => true,
            ],
        ],
    ];

    $this->actingAs($admin)->post('/admin/projects', $payload)->assertRedirect('/admin/projects');

    $project = Project::where('slug', 'test-project')->firstOrFail();
    expect($project->sections)->toHaveCount(1)
        ->and($project->services)->toHaveCount(1)
        ->and($project->media)->toHaveCount(1)
        ->and(File::exists(public_path(ltrim($project->media->first()->url, '/'))))->toBeTrue();

    $this->actingAs($admin)->put("/admin/projects/{$project->slug}", [
        ...$payload,
        'title' => 'Updated Project',
        'is_published' => false,
        'media' => [
            ['type' => 'image', 'url' => $project->media->first()->url, 'alt_text' => 'Cover', 'is_cover' => true],
        ],
    ])->assertRedirect('/admin/projects');

    expect($project->refresh()->title)->toBe('Updated Project')
        ->and($project->is_published)->toBeFalse();

    expect($project->media->first()->url)->toStartWith('/img/project-media/test-project/');

    File::deleteDirectory(public_path('img/project-media/test-project'));
});

it('allows admins to manage brief questions', function (): void {
    $admin = User::factory()->admin()->create();

    $payload = [
        'label' => 'What are we making?',
        'hint' => 'A short project overview.',
        'type' => 'long',
        'placeholder' => 'Tell me about it.',
        'is_required' => true,
        'is_active' => true,
        'sort_order' => 2,
    ];

    $this->actingAs($admin)->post('/admin/brief-questions', $payload)->assertRedirect('/admin/brief-questions');

    $question = BriefQuestion::firstOrFail();
    $this->actingAs($admin)->put("/admin/brief-questions/{$question->id}", [
        ...$payload,
        'sort_order' => 1,
        'is_active' => false,
    ])->assertRedirect('/admin/brief-questions');

    expect($question->refresh()->sort_order)->toBe(1)
        ->and($question->is_active)->toBeFalse();
});

it('only renders published project pages publicly', function (): void {
    Project::create([
        'slug' => 'published',
        'title' => 'Published',
        'client' => 'Client',
        'year' => '2026',
        'category' => 'Branding',
        'description' => 'Visible.',
        'sort_order' => 0,
        'is_published' => true,
    ]);

    Project::create([
        'slug' => 'draft',
        'title' => 'Draft',
        'client' => 'Client',
        'year' => '2026',
        'category' => 'Branding',
        'description' => 'Hidden.',
        'sort_order' => 1,
        'is_published' => false,
    ]);

    $this->get('/projects/published')->assertOk();
    $this->get('/projects/draft')->assertNotFound();
});

it('redirects guests away from the brief', function (): void {
    $this->get('/brief')->assertRedirect('/login');
});

it('stores submitted brief answers with a question snapshot', function (): void {
    $user = User::factory()->create();
    $question = BriefQuestion::create([
        'label' => 'Your email?',
        'hint' => 'Best contact email.',
        'type' => 'email',
        'placeholder' => 'name@example.com',
        'is_required' => true,
        'is_active' => true,
        'sort_order' => 0,
    ]);

    $this->actingAs($user)->post('/brief', [
        'answers' => [(string) $question->id => 'hello@example.com'],
    ])->assertRedirect();

    $submission = BriefSubmission::with('answers')->firstOrFail();
    expect($submission->user_id)->toBe($user->id)
        ->and($submission->answers)->toHaveCount(1)
        ->and($submission->answers->first()->question_label)->toBe('Your email?')
        ->and($submission->answers->first()->answer)->toBe('hello@example.com');
});
