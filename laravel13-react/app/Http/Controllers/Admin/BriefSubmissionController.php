<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BriefSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BriefSubmissionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/brief-submissions/index', [
            'status' => $request->query('status'),
            'submissions' => BriefSubmission::query()
                ->with('user:id,name,email')
                ->when($request->query('status'), fn ($query, $status) => $query->where('status', $status))
                ->latest('submitted_at')
                ->latest('id')
                ->get()
                ->map(fn (BriefSubmission $submission) => [
                    'id' => $submission->id,
                    'status' => $submission->status,
                    'submitted_at' => $submission->submitted_at?->toDateTimeString(),
                    'user' => $submission->user?->only(['name', 'email']),
                ]),
        ]);
    }

    public function show(BriefSubmission $briefSubmission): Response
    {
        $briefSubmission->load(['user:id,name,email', 'answers']);

        return Inertia::render('admin/brief-submissions/show', [
            'submission' => [
                'id' => $briefSubmission->id,
                'status' => $briefSubmission->status,
                'submitted_at' => $briefSubmission->submitted_at?->toDateTimeString(),
                'user' => $briefSubmission->user?->only(['name', 'email']),
                'answers' => $briefSubmission->answers->map(fn ($answer) => [
                    'id' => $answer->id,
                    'question_label' => $answer->question_label,
                    'question_hint' => $answer->question_hint,
                    'question_type' => $answer->question_type,
                    'question_required' => $answer->question_required,
                    'answer' => $answer->answer,
                    'sort_order' => $answer->sort_order,
                ]),
            ],
        ]);
    }

    public function update(Request $request, BriefSubmission $briefSubmission): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'reviewed', 'archived'])],
        ]);

        $briefSubmission->update($data);

        return back()->with('success', 'Submission status updated.');
    }
}
