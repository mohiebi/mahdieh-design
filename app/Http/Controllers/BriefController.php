<?php

namespace App\Http\Controllers;

use App\Models\BriefQuestion;
use App\Models\BriefSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BriefController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('brief/show', [
            'questions' => fn () => BriefQuestion::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (BriefQuestion $question) => [
                    'id' => (string) $question->id,
                    'label' => $question->label,
                    'hint' => $question->hint,
                    'type' => $question->type,
                    'placeholder' => $question->placeholder,
                    'required' => $question->is_required,
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $questions = BriefQuestion::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $answers = collect($request->input('answers', []));

        foreach ($questions as $question) {
            $answer = trim((string) $answers->get((string) $question->id, ''));

            if ($question->is_required && $answer === '') {
                throw ValidationException::withMessages([
                    "answers.{$question->id}" => 'This question is required.',
                ]);
            }

            if ($question->type === 'email' && $answer !== '' && ! filter_var($answer, FILTER_VALIDATE_EMAIL)) {
                throw ValidationException::withMessages([
                    "answers.{$question->id}" => 'Please enter a valid email address.',
                ]);
            }
        }

        DB::transaction(function () use ($request, $questions, $answers): void {
            $submission = BriefSubmission::create([
                'user_id' => $request->user()->id,
                'status' => 'new',
                'submitted_at' => now(),
            ]);

            foreach ($questions as $question) {
                $submission->answers()->create([
                    'brief_question_id' => $question->id,
                    'question_label' => $question->label,
                    'question_hint' => $question->hint,
                    'question_type' => $question->type,
                    'question_required' => $question->is_required,
                    'answer' => trim((string) $answers->get((string) $question->id, '')),
                    'sort_order' => $question->sort_order,
                ]);
            }
        });

        return back()->with('success', 'Brief received.');
    }
}
