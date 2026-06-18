<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BriefQuestion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BriefQuestionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/brief-questions/index', [
            'questions' => BriefQuestion::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/brief-questions/form', [
            'question' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        BriefQuestion::create($this->validated($request));

        return redirect()->route('admin.brief-questions.index')->with('success', 'Brief question created.');
    }

    public function edit(BriefQuestion $briefQuestion): Response
    {
        return Inertia::render('admin/brief-questions/form', [
            'question' => $briefQuestion,
        ]);
    }

    public function update(Request $request, BriefQuestion $briefQuestion): RedirectResponse
    {
        $briefQuestion->update($this->validated($request));

        return redirect()->route('admin.brief-questions.index')->with('success', 'Brief question updated.');
    }

    public function destroy(BriefQuestion $briefQuestion): RedirectResponse
    {
        $briefQuestion->delete();

        return redirect()->route('admin.brief-questions.index')->with('success', 'Brief question deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'label_fa' => ['nullable', 'string', 'max:255'],
            'label_de' => ['nullable', 'string', 'max:255'],
            'hint' => ['nullable', 'string'],
            'hint_fa' => ['nullable', 'string'],
            'hint_de' => ['nullable', 'string'],
            'type' => ['required', Rule::in(['short', 'long', 'email'])],
            'placeholder' => ['nullable', 'string', 'max:255'],
            'placeholder_fa' => ['nullable', 'string', 'max:255'],
            'placeholder_de' => ['nullable', 'string', 'max:255'],
            'is_required' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        return [
            ...$data,
            'is_required' => $request->boolean('is_required'),
            'is_active' => $request->boolean('is_active'),
        ];
    }
}
