<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BriefQuestion;
use App\Models\BriefSubmission;
use App\Models\Package;
use App\Models\PageView;
use App\Models\Project;
use App\Services\Translation\MachineTranslator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(MachineTranslator $translator): Response
    {
        // Slug → total views for projects
        $projectViews = PageView::query()
            ->select('resource_slug', DB::raw('count(*) as count'))
            ->where('resource_type', 'project')
            ->groupBy('resource_slug')
            ->orderByDesc('count')
            ->pluck('count', 'resource_slug');

        $projects = Project::whereIn('slug', $projectViews->keys())
            ->get(['slug', 'title'])
            ->map(fn (Project $p) => [
                'title' => $p->title,
                'slug' => $p->slug,
                'count' => $projectViews[$p->slug] ?? 0,
            ])
            ->sortByDesc('count')
            ->values();

        // Slug → total views for packages
        $packageViews = PageView::query()
            ->select('resource_slug', DB::raw('count(*) as count'))
            ->where('resource_type', 'package')
            ->groupBy('resource_slug')
            ->orderByDesc('count')
            ->pluck('count', 'resource_slug');

        $packages = Package::whereIn('slug', $packageViews->keys())
            ->get(['slug', 'title'])
            ->map(fn (Package $p) => [
                'title' => $p->title,
                'slug' => $p->slug,
                'count' => $packageViews[$p->slug] ?? 0,
            ])
            ->sortByDesc('count')
            ->values();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'publishedProjects' => Project::where('is_published', true)->count(),
                'briefQuestions' => BriefQuestion::count(),
                'newSubmissions' => BriefSubmission::where('status', 'new')->count(),
            ],
            'translations' => [
                'provider' => $translator->providerName(),
                'configured' => $translator->isConfigured(),
            ],
            'recentSubmissions' => BriefSubmission::query()
                ->with('user:id,name,email')
                ->latest('submitted_at')
                ->limit(5)
                ->get()
                ->map(fn (BriefSubmission $s) => [
                    'id' => $s->id,
                    'status' => $s->status,
                    'submitted_at' => $s->submitted_at?->toDateTimeString(),
                    'user' => $s->user?->only(['name', 'email']),
                ]),
            'traffic' => [
                'today' => PageView::whereDate('visited_at', today())->count(),
                'week' => PageView::where('visited_at', '>=', now()->startOfWeek())->count(),
                'month' => PageView::where('visited_at', '>=', now()->startOfMonth())->count(),
                'total' => PageView::count(),
                'projects' => $projects,
                'packages' => $packages,
            ],
        ]);
    }
}
