<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()
                ->withCount(['sections', 'services', 'media'])
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (Project $project) => [
                    'id' => $project->id,
                    'slug' => $project->slug,
                    'title' => $project->title,
                    'client' => $project->client,
                    'year' => $project->year,
                    'category' => $project->category,
                    'sort_order' => $project->sort_order,
                    'is_published' => $project->is_published,
                    'sections_count' => $project->sections_count,
                    'services_count' => $project->services_count,
                    'media_count' => $project->media_count,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        DB::transaction(function () use ($data): void {
            $project = Project::create($data['project']);
            $this->syncRelations($project, $data);
        });

        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        $project->load(['sections', 'services', 'media']);

        return Inertia::render('admin/projects/form', [
            'project' => [
                'id' => $project->id,
                'slug' => $project->slug,
                'title' => $project->title,
                'client' => $project->client,
                'year' => $project->year,
                'category' => $project->category,
                'description' => $project->description,
                'location' => $project->location,
                'credit' => $project->credit,
                'sort_order' => $project->sort_order,
                'is_published' => $project->is_published,
                'sections' => $project->sections->map(fn ($section) => $section->body)->values(),
                'services' => $project->services->map(fn ($service) => $service->label)->values(),
                'media' => $project->media->sortBy('sort_order')->values()->map(fn ($media) => [
                    'type' => $media->type,
                    'url' => $media->url,
                    'alt_text' => $media->alt_text,
                    'is_cover' => $media->is_cover,
                    'sort_order' => $media->sort_order,
                ]),
            ],
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request, $project);

        DB::transaction(function () use ($project, $data): void {
            $project->update($data['project']);
            $this->syncRelations($project, $data);
        });

        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }

    private function validated(Request $request, ?Project $project = null): array
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('projects', 'slug')->ignore($project?->id)],
            'title' => ['required', 'string', 'max:255'],
            'client' => ['required', 'string', 'max:255'],
            'year' => ['required', 'string', 'max:20'],
            'category' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'credit' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'sections' => ['array'],
            'sections.*' => ['nullable', 'string'],
            'services' => ['array'],
            'services.*' => ['nullable', 'string', 'max:255'],
            'media' => ['array'],
            'media.*.type' => ['nullable', Rule::in(['image', 'video'])],
            'media.*.url' => ['nullable', 'string', 'max:2048'],
            'media.*.file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,webm', 'max:102400'],
            'media.*.upload' => ['nullable', 'array'],
            'media.*.upload.name' => ['required_with:media.*.upload', 'string', 'max:255'],
            'media.*.upload.type' => ['required_with:media.*.upload', 'string', Rule::in([
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
                'video/mp4',
                'video/webm',
            ])],
            'media.*.upload.data' => ['required_with:media.*.upload', 'string'],
            'media.*.alt_text' => ['nullable', 'string', 'max:255'],
            'media.*.is_cover' => ['boolean'],
        ]);

        return [
            'project' => [
                'slug' => $validated['slug'],
                'title' => $validated['title'],
                'client' => $validated['client'],
                'year' => $validated['year'],
                'category' => $validated['category'],
                'description' => $validated['description'],
                'location' => $validated['location'] ?? null,
                'credit' => $validated['credit'] ?? null,
                'sort_order' => $validated['sort_order'],
                'is_published' => $request->boolean('is_published'),
            ],
            'sections' => collect($validated['sections'] ?? [])->filter(fn ($value) => trim((string) $value) !== '')->values(),
            'services' => collect($validated['services'] ?? [])->filter(fn ($value) => trim((string) $value) !== '')->values(),
            'media' => collect($validated['media'] ?? [])
                ->filter(fn ($value) => filled($value['url'] ?? null) || isset($value['file']) || isset($value['upload']))
                ->map(function ($value) {
                    $value['type'] = $this->mediaType($value);

                    return $value;
                })
                ->values(),
        ];
    }

    private function syncRelations(Project $project, array $data): void
    {
        $project->sections()->delete();
        foreach ($data['sections'] as $index => $body) {
            $project->sections()->create(['body' => $body, 'sort_order' => $index]);
        }

        $project->services()->delete();
        foreach ($data['services'] as $index => $label) {
            $project->services()->create(['label' => $label, 'sort_order' => $index]);
        }

        $project->media()->delete();
        $coverAssigned = false;
        foreach ($data['media'] as $index => $media) {
            $isCover = (bool) ($media['is_cover'] ?? false);
            $coverAssigned = $coverAssigned || $isCover;
            $url = $this->storedMediaUrl($project, $media);

            $project->media()->create([
                'type' => $this->mediaType($media),
                'url' => $url,
                'alt_text' => $media['alt_text'] ?? null,
                'is_cover' => $isCover,
                'sort_order' => $index,
            ]);
        }

        if (! $coverAssigned) {
            $project->media()->where('type', 'image')->orderBy('sort_order')->first()?->update(['is_cover' => true]);
        }
    }

    private function storedMediaUrl(Project $project, array $media): string
    {
        if (isset($media['upload'])) {
            return $this->storedEncodedMediaUrl($project, $media['upload']);
        }

        if (! isset($media['file'])) {
            return $media['url'];
        }

        $file = $media['file'];
        $directory = public_path("img/project-media/{$project->slug}");
        File::ensureDirectoryExists($directory);

        $baseName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'media';
        $extension = $file->getClientOriginalExtension();
        $fileName = "{$baseName}-".Str::lower(Str::random(8)).".{$extension}";

        $file->move($directory, $fileName);

        return "/img/project-media/{$project->slug}/".rawurlencode($fileName);
    }

    private function mediaType(array $media): string
    {
        $mime = $media['upload']['type'] ?? null;

        if (! $mime && isset($media['file'])) {
            $mime = $media['file']->getMimeType();
        }

        if (is_string($mime) && str_starts_with($mime, 'video/')) {
            return 'video';
        }

        if (is_string($mime) && str_starts_with($mime, 'image/')) {
            return 'image';
        }

        return $media['type'] ?? 'image';
    }

    private function storedEncodedMediaUrl(Project $project, array $upload): string
    {
        if (! preg_match('/^data:(?<mime>[-\w.\/]+);base64,(?<data>.+)$/', $upload['data'], $matches)) {
            abort(422, 'The uploaded media data is invalid.');
        }

        $bytes = base64_decode($matches['data'], true);
        if ($bytes === false) {
            abort(422, 'The uploaded media data is invalid.');
        }

        $directory = public_path("img/project-media/{$project->slug}");
        File::ensureDirectoryExists($directory);

        $extension = match ($upload['type']) {
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/gif' => 'gif',
            'video/mp4' => 'mp4',
            'video/webm' => 'webm',
            default => pathinfo($upload['name'], PATHINFO_EXTENSION) ?: 'bin',
        };

        $baseName = Str::slug(pathinfo($upload['name'], PATHINFO_FILENAME)) ?: 'media';
        $fileName = "{$baseName}-".Str::lower(Str::random(8)).".{$extension}";

        File::put("{$directory}/{$fileName}", $bytes);

        return "/img/project-media/{$project->slug}/".rawurlencode($fileName);
    }
}
