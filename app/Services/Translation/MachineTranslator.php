<?php

namespace App\Services\Translation;

interface MachineTranslator
{
    public function isConfigured(): bool;

    public function providerName(): string;

    public function maxTextsPerRequest(): int;

    public function maxRequestBytes(): int;

    /**
     * @param  array<int, string>  $texts
     * @return array<int, string>
     */
    public function translate(array $texts, string $targetLang, ?string $sourceLang = 'en'): array;

    public function supportsTargetLanguage(string $targetLang): bool;
}
