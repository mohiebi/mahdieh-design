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
    private const LOCALES = ['en', 'fa', 'de'];

    public function show(): Response
    {
        return $this->showFor('en');
    }

    public function showFa(): Response
    {
        return $this->showFor('fa');
    }

    public function showDe(): Response
    {
        return $this->showFor('de');
    }

    private function showFor(string $locale): Response
    {
        return Inertia::render('brief/show', [
            'locale' => $locale,
            'questions' => fn () => $this->questionsFor($locale),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $locale = $this->locale((string) $request->input('locale', 'en'));

        $questions = BriefQuestion::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $answers = collect($request->input('answers', []));

        $requiredMessage = match ($locale) {
            'fa' => 'پاسخ به این سوال الزامی است.',
            'de' => 'Diese Frage ist erforderlich.',
            default => 'This question is required.',
        };
        $emailMessage = match ($locale) {
            'fa' => 'لطفاً یک ایمیل معتبر وارد کنید.',
            'de' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            default => 'Please enter a valid email address.',
        };

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
                    'question_label' => $this->localized($question, 'label', $locale),
                    'question_hint' => $this->localized($question, 'hint', $locale),
                    'question_type' => $question->type,
                    'question_required' => $question->is_required,
                    'answer' => trim((string) $answers->get((string) $question->id, '')),
                    'sort_order' => $question->sort_order,
                ]);
            }
        });

        return match ($locale) {
            'fa' => redirect()->route('brief.thanks.fa'),
            'de' => redirect()->route('localized.brief.thanks.de'),
            default => redirect()->route('brief.thanks'),
        };
    }

    public function thanks(): Response
    {
        return $this->thanksFor('en');
    }

    public function thanksFa(): Response
    {
        return $this->thanksFor('fa');
    }

    public function thanksDe(): Response
    {
        return $this->thanksFor('de');
    }

    private function thanksFor(string $locale): Response
    {
        return Inertia::render('brief/thanks', [
            'locale' => $locale,
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
                'label' => $this->localized($question, 'label', $locale),
                'hint' => $this->localized($question, 'hint', $locale),
                'type' => $question->type,
                'placeholder' => $this->localized($question, 'placeholder', $locale),
                'required' => $question->is_required,
            ]);
    }

    private function locale(string $locale): string
    {
        return in_array($locale, self::LOCALES, true) ? $locale : 'en';
    }

    private function localized(BriefQuestion $question, string $field, string $locale): ?string
    {
        if ($locale === 'en') {
            return $question->{$field};
        }

        $localizedField = "{$field}_{$locale}";
        $value = $question->{$localizedField} ?? null;

        return filled($value) ? $value : $question->{$field};
    }
}
