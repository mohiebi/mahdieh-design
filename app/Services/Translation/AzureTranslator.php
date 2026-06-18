<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class AzureTranslator implements MachineTranslator
{
    public function isConfigured(): bool
    {
        return filled($this->key());
    }

    public function providerName(): string
    {
        return 'Azure Translator';
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
            throw new TranslationException('Azure Translator is not configured.');
        }

        if ($texts === []) {
            return [];
        }

        if (count($texts) > $this->maxTextsPerRequest()) {
            throw new TranslationException('Azure Translator accepts up to 50 texts per request in this app.');
        }

        $query = [
            'api-version' => '3.0',
            'to' => $this->normalizeLanguage($targetLang),
        ];

        if ($sourceLang !== null) {
            $query['from'] = $this->normalizeLanguage($sourceLang);
        }

        $response = $this->request()
            ->post($this->url('/translate', $query), collect($texts)->map(fn (string $text) => [
                'Text' => $text,
            ])->all());

        if ($response->failed()) {
            throw new TranslationException("Azure Translator request failed with status {$response->status()}.");
        }

        $items = $response->json();

        if (! is_array($items) || count($items) !== count($texts)) {
            throw new TranslationException('Azure Translator returned an unexpected translation response.');
        }

        return collect($items)
            ->map(function (array $item): string {
                $translations = $item['translations'] ?? null;

                if (! is_array($translations) || ! isset($translations[0]) || ! is_array($translations[0])) {
                    throw new TranslationException('Azure Translator returned a translation without text.');
                }

                return (string) ($translations[0]['text'] ?? '');
            })
            ->all();
    }

    public function supportsTargetLanguage(string $targetLang): bool
    {
        $response = Http::acceptJson()
            ->timeout(30)
            ->retry(2, 250)
            ->get($this->url('/languages', [
                'api-version' => '3.0',
                'scope' => 'translation',
            ]));

        if ($response->failed()) {
            throw new TranslationException("Azure Translator languages request failed with status {$response->status()}.");
        }

        $languages = $response->json('translation');

        if (! is_array($languages)) {
            throw new TranslationException('Azure Translator returned an unexpected languages response.');
        }

        return array_key_exists($this->normalizeLanguage($targetLang), $languages);
    }

    private function request(): \Illuminate\Http\Client\PendingRequest
    {
        $headers = [
            'Ocp-Apim-Subscription-Key' => $this->key(),
        ];

        if (filled($this->region())) {
            $headers['Ocp-Apim-Subscription-Region'] = $this->region();
        }

        return Http::acceptJson()
            ->asJson()
            ->timeout(30)
            ->retry(2, 250)
            ->withHeaders($headers);
    }

    /**
     * @param  array<string, string>  $query
     */
    private function url(string $path, array $query = []): string
    {
        $baseUrl = rtrim((string) config('services.azure_translator.endpoint', 'https://api.cognitive.microsofttranslator.com'), '/');
        $url = $baseUrl.$path;

        if ($query !== []) {
            $url .= '?'.http_build_query($query);
        }

        return $url;
    }

    private function key(): ?string
    {
        $key = config('services.azure_translator.key');

        return is_string($key) ? trim($key) : null;
    }

    private function region(): ?string
    {
        $region = config('services.azure_translator.region');

        return is_string($region) ? trim($region) : null;
    }

    private function normalizeLanguage(string $language): string
    {
        return strtolower(trim($language));
    }
}
