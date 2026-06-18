<?php

return [
    'calendly_url' => env('CALENDLY_URL'),
    'contact_email' => env('CONTACT_EMAIL'),
    'translation' => [
        'provider' => env('TRANSLATION_PROVIDER', 'azure'),
        'german_target_lang' => env('TRANSLATION_GERMAN_TARGET_LANG', 'de'),
        'persian_target_lang' => env('TRANSLATION_PERSIAN_TARGET_LANG', 'fa'),
    ],
    'azure_translator' => [
        'key' => env('AZURE_TRANSLATOR_KEY'),
        'endpoint' => env('AZURE_TRANSLATOR_ENDPOINT', 'https://api.cognitive.microsofttranslator.com'),
        'region' => env('AZURE_TRANSLATOR_REGION'),
    ],
    'deepl' => [
        'auth_key' => env('DEEPL_AUTH_KEY'),
        'api_base_url' => env('DEEPL_API_BASE_URL', 'https://api-free.deepl.com'),
    ],
];
