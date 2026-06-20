<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/packages/index', [
            'packages' => Package::with('services')->orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/packages/form', [
            'package' => null,
            'services' => Service::orderBy('sort_order')->get(['id', 'title', 'number']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request, null);
        $serviceIds = $request->input('service_ids', []);

        $pkg = Package::create($data);
        $pkg->services()->sync($serviceIds);

        return redirect()->route('admin.packages.index')->with('success', 'Package created.');
    }

    public function edit(Package $package): Response
    {
        return Inertia::render('admin/packages/form', [
            'package' => $package->load('services'),
            'services' => Service::orderBy('sort_order')->get(['id', 'title', 'number']),
        ]);
    }

    public function update(Request $request, Package $package): RedirectResponse
    {
        $data = $this->validated($request, $package->id);
        $serviceIds = $request->input('service_ids', []);

        $package->update($data);
        $package->services()->sync($serviceIds);

        return redirect()->route('admin.packages.index')->with('success', 'Package updated.');
    }

    public function destroy(Package $package): RedirectResponse
    {
        $package->services()->detach();
        $package->delete();

        return redirect()->route('admin.packages.index')->with('success', 'Package deleted.');
    }

    public function move(Request $request, Package $package): RedirectResponse
    {
        $direction = $request->validate(['direction' => 'required|in:up,down'])['direction'];
        $ids = Package::orderBy('sort_order')->orderBy('id')->pluck('id')->toArray();
        $pos = array_search($package->id, $ids, true);

        if ($pos === false) return back();

        $swapPos = $direction === 'up' ? $pos - 1 : $pos + 1;
        if ($swapPos < 0 || $swapPos >= count($ids)) return back();

        [$ids[$pos], $ids[$swapPos]] = [$ids[$swapPos], $ids[$pos]];
        foreach ($ids as $index => $id) {
            Package::where('id', $id)->update(['sort_order' => $index]);
        }

        return back()->with('success', 'Order updated.');
    }

    private function validated(Request $request, ?int $packageId = null): array
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:100', 'regex:/^[a-z0-9-]+$/', Rule::unique('packages', 'slug')->ignore($packageId)],
            'title' => ['required', 'string', 'max:255'],
            'title_fa' => ['nullable', 'string', 'max:255'],
            'title_de' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'summary_fa' => ['nullable', 'string'],
            'summary_de' => ['nullable', 'string'],
            'deliverables' => ['required', 'array', 'min:1'],
            'deliverables.*' => ['required', 'string'],
            'deliverables_fa' => ['nullable', 'array'],
            'deliverables_fa.*' => ['nullable', 'string'],
            'deliverables_de' => ['nullable', 'array'],
            'deliverables_de.*' => ['nullable', 'string'],
            'price_toman' => ['nullable', 'numeric', 'min:0'],
            'price_eur' => ['nullable', 'numeric', 'min:0'],
            'price_usd' => ['nullable', 'numeric', 'min:0'],
            'duration_days' => ['nullable', 'integer', 'min:1'],
            'payment_terms' => ['nullable', 'string', 'max:255'],
            'payment_terms_fa' => ['nullable', 'string', 'max:255'],
            'payment_terms_de' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        return [
            ...$validated,
            'is_featured' => $request->boolean('is_featured'),
            'is_active' => $request->boolean('is_active'),
        ];
    }
}
