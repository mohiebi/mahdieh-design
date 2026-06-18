<?php

namespace App\Providers;

use App\Services\Translation\AzureTranslator;
use App\Services\Translation\DeepLTranslator;
use App\Services\Translation\MachineTranslator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MachineTranslator::class, function (): MachineTranslator {
            return match (strtolower((string) config('services.translation.provider', 'azure'))) {
                'deepl' => $this->app->make(DeepLTranslator::class),
                default => $this->app->make(AzureTranslator::class),
            };
        });
    }

    public function boot(): void
    {
        //
    }
}
