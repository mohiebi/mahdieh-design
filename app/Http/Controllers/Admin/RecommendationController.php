<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RecommendationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/recommendations/index', [
            'recommendations' => Recommendation::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/recommendations/form', [
            'recommendation' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['avatar_path'] = $this->storeAvatar($request);

        Recommendation::create($data);

        return redirect()->route('admin.recommendations.index')->with('success', 'Recommendation created.');
    }

    public function edit(Recommendation $recommendation): Response
    {
        return Inertia::render('admin/recommendations/form', [
            'recommendation' => $recommendation,
        ]);
    }

    public function update(Request $request, Recommendation $recommendation): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->boolean('remove_avatar')) {
            $data['avatar_path'] = null;
        } else {
            $newAvatar = $this->storeAvatar($request);
            if ($newAvatar !== null) {
                $data['avatar_path'] = $newAvatar;
            }
        }

        $recommendation->update($data);

        return redirect()->route('admin.recommendations.index')->with('success', 'Recommendation updated.');
    }

    public function destroy(Recommendation $recommendation): RedirectResponse
    {
        $recommendation->delete();

        return redirect()->route('admin.recommendations.index')->with('success', 'Recommendation deleted.');
    }

    public function move(Request $request, Recommendation $recommendation): RedirectResponse
    {
        $direction = $request->validate(['direction' => 'required|in:up,down'])['direction'];

        $ids = Recommendation::orderBy('sort_order')->orderBy('id')->pluck('id')->toArray();
        $pos = array_search($recommendation->id, $ids, true);

        if ($pos === false) {
            return back();
        }

        $swapPos = $direction === 'up' ? $pos - 1 : $pos + 1;

        if ($swapPos < 0 || $swapPos >= count($ids)) {
            return back();
        }

        [$ids[$pos], $ids[$swapPos]] = [$ids[$swapPos], $ids[$pos]];

        foreach ($ids as $index => $id) {
            Recommendation::where('id', $id)->update(['sort_order' => $index]);
        }

        return back()->with('success', 'Order updated.');
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        return [
            ...$validated,
            'is_active' => $request->boolean('is_active'),
        ];
    }

    private function storeAvatar(Request $request): ?string
    {
        $upload = $request->input('avatar_upload');
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
            default => pathinfo($upload['name'] ?? 'avatar', PATHINFO_EXTENSION) ?: 'jpg',
        };

        $baseName = Str::slug(pathinfo($upload['name'] ?? 'avatar', PATHINFO_FILENAME)) ?: 'avatar';
        $fileName = "{$baseName}-".Str::lower(Str::random(8)).".{$extension}";
        $directory = public_path('img/recommendations');

        File::ensureDirectoryExists($directory);
        File::put("{$directory}/{$fileName}", $bytes);

        return "/img/recommendations/{$fileName}";
    }
}
