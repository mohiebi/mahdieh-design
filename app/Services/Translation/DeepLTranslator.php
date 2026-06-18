<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class DeepLTranslator implements MachineTranslator
{
    public function isConfigured(): bool
    {
        return filled($this->authKey());
    }

    public function providerName(): string
    {
        return 'DeepL';
    }

    public function maxTextsPerRequest(): int
    {
        return 50;
    }

    public function maxRequestBytes(): int
    {
        return 120000;
    }

    /**
     * @param  array<int, string>  $texts
     * @return array<int, string>
     */
    public function translate(array $texts, string $targetLang, ?string $sourceLang = 'en'): array
    {
        if (! $this->isConfigured()) {
            throw new TranslationException('DeepL is not configured.');
        }

        if ($texts === []) {
            return [];
        }

        if (count($texts) > $this->maxTextsPerRequest()) {
            throw new TranslationException('DeepL accepts up to 50 texts per request.');
        }

        $payload = [
            'text' => array_values($texts),
            'target_lang' => $this->normalizeLanguage($targetLang),
        ];

        if ($sourceLang !== null) {
            $payload['source_lang'] = $this->normalizeLanguage($sourceLang);
        }

        $response = $this->request()
            ->post($this->url('/v2/translate'), $payload);

        if ($response->failed()) {
            throw new TranslationException("DeepL translate request failed with status {$response->status()}.");
        }

        $translations = $response->json('translations');

        if (! is_array($translations) || count($translations) !== count($texts)) {
            throw new TranslationException('DeepL returned an unexpected translation response.');
        }

        return collect($translations)
            ->map(fn (array $translation) => (string) ($translation['text'] ?? ''))
            ->all();
    }

    public function supportsTargetLanguage(string $targetLang): bool
    {
        if (! $this->isConfigured()) {
            return false;
        }

        $response = $this->request()
            ->get($this->url('/v3/languages'), ['resource' => 'translate_text']);

        if ($response->failed()) {
            throw new TranslationException("DeepL languages request failed with status {$response->status()}.");
        }

        $languages = $response->json();

        if (! is_array($languages)) {
            throw new TranslationException('DeepL returned an unexpected languages response.');
        }

        $target = $this->normalizeLanguage($targetLang);

        return collect($languages)->contains(function (array $language) use ($target): bool {
            $code = $language['language'] ?? $language['code'] ?? $language['language_code'] ?? null;

            return is_string($code) && $this->normalizeLanguage($code) === $target;
        });
    }

    private function request(): \Illuminate\Http\Client\PendingRequest
    {
        return Http::acceptJson()
            ->asJson()
            ->timeout(30)
            ->retry(2, 250)
            ->withHeaders([
                'Authorization' => 'DeepL-Auth-Key '.$this->authKey(),
            ]);
    }

    private function authKey(): ?string
    {
        $authKey = config('services.deepl.auth_key');

        return is_string($authKey) ? trim($authKey) : null;
    }

    private function url(string $path): string
    {
        $baseUrl = rtrim((string) config('services.deepl.api_base_url', 'https://api-free.deepl.com'), '/');

        return $baseUrl.$path;
    }

    private function normalizeLanguage(string $language): string
    {
        return strtoupper(trim($language));
    }
}
