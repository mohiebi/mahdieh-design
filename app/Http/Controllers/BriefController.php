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
            'locale' => 'en',
            'questions' => fn () => $this->questionsFor('en'),
        ]);
    }

    public function showFa(): Response
    {
        return Inertia::render('brief/show', [
            'locale' => 'fa',
            'questions' => fn () => $this->questionsFor('fa'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $locale = $request->input('locale') === 'fa' ? 'fa' : 'en';

        $questions = BriefQuestion::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $answers = collect($request->input('answers', []));

        $requiredMessage = $locale === 'fa' ? 'پاسخ به این سوال الزامی است.' : 'This question is required.';
        $emailMessage = $locale === 'fa' ? 'لطفاً یک ایمیل معتبر وارد کنید.' : 'Please enter a valid email address.';

        foreach ($questions as $question) {
            $answer = trim((string) $answers->get((string) $question->id, ''));

            if ($question->is_required && $answer === '') {
                throw ValidationException::withMessages([
                    "answers.{$question->id}" => $requiredMessage,
                ]);
            }

            if ($question->type === 'email' && $answer !== '' && ! filter_var($answer, FILTER_VALIDATE_EMAIL)) {
                throw ValidationException::withMessages([
                    "answers.{$question->id}" => $emailMessage,
                ]);
            }
        }

        DB::transaction(function () use ($request, $questions, $answers, $locale): void {
            $submission = BriefSubmission::create([
                'user_id' => $request->user()->id,
                'status' => 'new',
                'locale' => $locale,
                'submitted_at' => now(),
            ]);

            foreach ($questions as $question) {
                $submission->answers()->create([
                    'brief_question_id' => $question->id,
                    'question_label' => $locale === 'fa' ? ($question->label_fa ?? $question->label) : $question->label,
                    'question_hint' => $locale === 'fa' ? ($question->hint_fa ?? $question->hint) : $question->hint,
                    'question_type' => $question->type,
                    'question_required' => $question->is_required,
                    'answer' => trim((string) $answers->get((string) $question->id, '')),
                    'sort_order' => $question->sort_order,
                ]);
            }
        });

        return $locale === 'fa' ? redirect()->route('brief.thanks.fa') : redirect()->route('brief.thanks');
    }

    public function thanks(): Response
    {
        return Inertia::render('brief/thanks', [
            'locale' => 'en',
            'calendlyUrl' => config('services.calendly_url'),
        ]);
    }

    public function thanksFa(): Response
    {
        return Inertia::render('brief/thanks', [
            'locale' => 'fa',
            'calendlyUrl' => config('services.calendly_url'),
        ]);
    }

    private function questionsFor(string $locale): \Illuminate\Support\Collection
    {
        return BriefQuestion::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (BriefQuestion $question) => [
                'id' => (string) $question->id,
                'label' => $locale === 'fa' ? ($question->label_fa ?? $question->label) : $question->label,
                'hint' => $locale === 'fa' ? ($question->hint_fa ?? $question->hint) : $question->hint,
                'type' => $question->type,
                'placeholder' => $locale === 'fa' ? ($question->placeholder_fa ?? $question->placeholder) : $question->placeholder,
                'required' => $question->is_required,
            ]);
    }
}
