<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Translation\CmsAutoTranslator;
use Illuminate\Http\RedirectResponse;

class AutoTranslationController extends Controller
{
    public function __invoke(CmsAutoTranslator $translator): RedirectResponse
    {
        if (! $translator->isConfigured()) {
            return back()->with('error', "{$translator->providerName()} is not configured. Add the provider API key on the server first.");
        }

        $result = $translator->translateMissing();
        $message = "Auto-translation finished: {$result['translated']} translated, {$result['skipped']} skipped, {$result['failed']} failed.";

        if ($result['messages'] !== []) {
            $message .= ' '.implode(' ', array_slice($result['messages'], 0, 3));
        }

        return back()->with($result['failed'] > 0 ? 'error' : 'success', $message);
    }
}
