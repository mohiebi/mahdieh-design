<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BriefQuestion;
use App\Models\BriefSubmission;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'publishedProjects' => Project::where('is_published', true)->count(),
                'briefQuestions' => BriefQuestion::count(),
                'newSubmissions' => BriefSubmission::where('status', 'new')->count(),
            ],
            'recentSubmissions' => BriefSubmission::query()
                ->with('user:id,name,email')
                ->latest('submitted_at')
                ->limit(5)
                ->get()
                ->map(fn (BriefSubmission $submission) => [
                    'id' => $submission->id,
                    'status' => $submission->status,
                    'submitted_at' => $submission->submitted_at?->toDateTimeString(),
                    'user' => $submission->user?->only(['name', 'email']),
                ]),
        ]);
    }
}
