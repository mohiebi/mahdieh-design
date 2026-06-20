<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/form', ['service' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['icon_path'] = $this->storeIcon($request);

        Service::create($data);

        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/form', ['service' => $service]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->boolean('remove_icon')) {
            $data['icon_path'] = null;
        } else {
            $newIcon = $this->storeIcon($request);
            if ($newIcon !== null) {
                $data['icon_path'] = $newIcon;
            }
        }

        $service->update($data);

        return redirect()->route('admin.services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted.');
    }

    public function move(Request $request, Service $service): RedirectResponse
    {
        $direction = $request->validate(['direction' => 'required|in:up,down'])['direction'];

        $ids = Service::orderBy('sort_order')->orderBy('id')->pluck('id')->toArray();
        $pos = array_search($service->id, $ids, true);

        if ($pos === false) {
            return back();
        }

        $swapPos = $direction === 'up' ? $pos - 1 : $pos + 1;

        if ($swapPos < 0 || $swapPos >= count($ids)) {
            return back();
        }

        [$ids[$pos], $ids[$swapPos]] = [$ids[$swapPos], $ids[$pos]];

        foreach ($ids as $index => $id) {
            Service::where('id', $id)->update(['sort_order' => $index]);
        }

        return back()->with('success', 'Order updated.');
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:100'],
            'number' => ['required', 'string', 'max:4'],
            'title' => ['required', 'string', 'max:255'],
            'title_fa' => ['nullable', 'string', 'max:255'],
            'title_de' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'summary_fa' => ['nullable', 'string'],
            'summary_de' => ['nullable', 'string'],
            'description' => ['required', 'array', 'min:1'],
            'description.*' => ['required', 'string'],
            'description_fa' => ['nullable', 'array'],
            'description_fa.*' => ['nullable', 'string'],
            'description_de' => ['nullable', 'array'],
            'description_de.*' => ['nullable', 'string'],
            'focus' => ['required', 'array', 'min:1'],
            'focus.*' => ['required', 'string'],
            'focus_fa' => ['nullable', 'array'],
            'focus_fa.*' => ['nullable', 'string'],
            'focus_de' => ['nullable', 'array'],
            'focus_de.*' => ['nullable', 'string'],
            'match_labels' => ['required', 'array', 'min:1'],
            'match_labels.*' => ['required', 'string'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        return [
            ...$validated,
            'is_active' => $request->boolean('is_active'),
        ];
    }

    private function storeIcon(Request $request): ?string
    {
        $upload = $request->input('icon_upload');
        if (! is_array($upload) || empty($upload['data'])) {
            return null;
        }

        if (! preg_match('/^data:(?<mime>image\/[-\w.]+);base64,(?<b64>.+)$/', $upload['data'], $m)) {
            return null;
        }

        $bytes = base64_decode($m['b64'], true);
        if ($bytes === false) {
            return null;
        }

        $extension = match ($upload['type'] ?? '') {
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/svg+xml' => 'svg',
            default => pathinfo($upload['name'] ?? 'icon', PATHINFO_EXTENSION) ?: 'png',
        };

        $baseName = Str::slug(pathinfo($upload['name'] ?? 'icon', PATHINFO_FILENAME)) ?: 'icon';
        $fileName = "{$baseName}-".Str::lower(Str::random(8)).".{$extension}";
        $directory = public_path('img/services');

        File::ensureDirectoryExists($directory);
        File::put("{$directory}/{$fileName}", $bytes);

        return "/img/services/{$fileName}";
    }
}
