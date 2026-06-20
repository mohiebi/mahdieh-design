<?php

namespace App\Services\Translation;

use App\Models\BriefQuestion;
use App\Models\Package;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Models\ProjectService;
use App\Models\Recommendation;
use App\Models\Service;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class CmsAutoTranslator
{
    public function __construct(private readonly MachineTranslator $translator)
    {
    }

    public function isConfigured(): bool
    {
        return $this->translator->isConfigured();
    }

    public function providerName(): string
    {
        return $this->translator->providerName();
    }

    /**
     * @return array{translated: int, skipped: int, failed: int, messages: array<int, string>}
     */
    public function translateMissing(): array
    {
        $result = [
            'translated' => 0,
            'skipped' => 0,
            'failed' => 0,
            'messages' => [],
        ];

        if (! $this->isConfigured()) {
            $result['messages'][] = "Configure {$this->providerName()} before running auto-translation.";

            return $result;
        }

        $targetLang = config('services.translation.german_target_lang', 'de');
        $this->translateJobs($targetLang, $this->germanJobs($result), $result);

        $this->translatePersianBriefJobs($result);
        $this->translatePersianServicePackageJobs($result);

        return $result;
    }

    /**
     * Build German translation jobs for all translatable models.
     *
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     * @return array<int, array<string, mixed>>
     */
    private function germanJobs(array &$result): array
    {
        $jobs = [];

        // ── Projects ──────────────────────────────────────────────────────────
        Project::query()
            ->with(['sections', 'services'])
            ->orderBy('id')
            ->each(function (Project $project) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $project, 'title', 'title_de', "Project {$project->id} title");
                $this->queueField($jobs, $result, $project, 'category', 'category_de', "Project {$project->id} category");
                $this->queueField($jobs, $result, $project, 'description', 'description_de', "Project {$project->id} description");
                $this->queueField($jobs, $result, $project, 'location', 'location_de', "Project {$project->id} location");
                $this->queueField($jobs, $result, $project, 'credit', 'credit_de', "Project {$project->id} credit");

                $project->sections->each(function (ProjectSection $section) use (&$jobs, &$result): void {
                    $this->queueField($jobs, $result, $section, 'body', 'body_de', "Project section {$section->id} body");
                });

                $project->services->each(function (ProjectService $service) use (&$jobs, &$result): void {
                    $this->queueField($jobs, $result, $service, 'label', 'label_de', "Project service {$service->id} label");
                });
            });

        // ── Recommendations ───────────────────────────────────────────────────
        Recommendation::query()
            ->orderBy('id')
            ->each(function (Recommendation $recommendation) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $recommendation, 'role', 'role_de', "Recommendation {$recommendation->id} role");
                $this->queueField($jobs, $result, $recommendation, 'company', 'company_de', "Recommendation {$recommendation->id} company");
                $this->queueField($jobs, $result, $recommendation, 'quote', 'quote_de', "Recommendation {$recommendation->id} quote");
            });

        // ── Brief questions ───────────────────────────────────────────────────
        BriefQuestion::query()
            ->orderBy('id')
            ->each(function (BriefQuestion $question) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $question, 'label', 'label_de', "Brief question {$question->id} label");
                $this->queueField($jobs, $result, $question, 'hint', 'hint_de', "Brief question {$question->id} hint");
                $this->queueField($jobs, $result, $question, 'placeholder', 'placeholder_de', "Brief question {$question->id} placeholder");
            });

        // ── Services ──────────────────────────────────────────────────────────
        Service::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->each(function (Service $service) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $service, 'title', 'title_de', "Service {$service->id} title");
                $this->queueField($jobs, $result, $service, 'summary', 'summary_de', "Service {$service->id} summary");
                $this->queueArrayField($jobs, $result, $service, 'description', 'description_de', "Service {$service->id} description");
                $this->queueArrayField($jobs, $result, $service, 'focus', 'focus_de', "Service {$service->id} focus");
            });

        // ── Packages ──────────────────────────────────────────────────────────
        Package::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->each(function (Package $package) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $package, 'title', 'title_de', "Package {$package->id} title");
                $this->queueField($jobs, $result, $package, 'summary', 'summary_de', "Package {$package->id} summary");
                $this->queueField($jobs, $result, $package, 'payment_terms', 'payment_terms_de', "Package {$package->id} payment terms");
                $this->queueArrayField($jobs, $result, $package, 'deliverables', 'deliverables_de', "Package {$package->id} deliverables");
            });

        return $jobs;
    }

    /**
     * Translate missing Persian text for Services and Packages.
     *
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function translatePersianServicePackageJobs(array &$result): void
    {
        $jobs = [];

        Service::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->each(function (Service $service) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $service, 'title', 'title_fa', "Service {$service->id} Persian title");
                $this->queueField($jobs, $result, $service, 'summary', 'summary_fa', "Service {$service->id} Persian summary");
                $this->queueArrayField($jobs, $result, $service, 'description', 'description_fa', "Service {$service->id} Persian description");
                $this->queueArrayField($jobs, $result, $service, 'focus', 'focus_fa', "Service {$service->id} Persian focus");
            });

        Package::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->each(function (Package $package) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $package, 'title', 'title_fa', "Package {$package->id} Persian title");
                $this->queueField($jobs, $result, $package, 'summary', 'summary_fa', "Package {$package->id} Persian summary");
                $this->queueField($jobs, $result, $package, 'payment_terms', 'payment_terms_fa', "Package {$package->id} Persian payment terms");
                $this->queueArrayField($jobs, $result, $package, 'deliverables', 'deliverables_fa', "Package {$package->id} Persian deliverables");
            });

        if ($jobs === []) {
            return;
        }

        $targetLang = (string) config('services.translation.persian_target_lang', 'fa');

        try {
            if (! $this->translator->supportsTargetLanguage($targetLang)) {
                throw new TranslationException("{$this->providerName()} does not currently report {$targetLang} as a translation target language.");
            }
        } catch (Throwable $exception) {
            $result['failed'] += count($jobs);
            $result['messages'][] = 'Persian service/package translation skipped: '.$exception->getMessage();

            return;
        }

        $this->translateJobs($targetLang, $jobs, $result);
    }

    /**
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function translatePersianBriefJobs(array &$result): void
    {
        $jobs = [];

        BriefQuestion::query()
            ->orderBy('id')
            ->each(function (BriefQuestion $question) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $question, 'label', 'label_fa', "Brief question {$question->id} Persian label");
                $this->queueField($jobs, $result, $question, 'hint', 'hint_fa', "Brief question {$question->id} Persian hint");
                $this->queueField($jobs, $result, $question, 'placeholder', 'placeholder_fa', "Brief question {$question->id} Persian placeholder");
            });

        if ($jobs === []) {
            return;
        }

        $targetLang = (string) config('services.translation.persian_target_lang', 'fa');

        try {
            if (! $this->translator->supportsTargetLanguage($targetLang)) {
                throw new TranslationException("{$this->providerName()} does not currently report {$targetLang} as a translation target language.");
            }
        } catch (Throwable $exception) {
            $result['failed'] += count($jobs);
            $result['messages'][] = 'Persian brief translation skipped: '.$exception->getMessage();

            return;
        }

        $this->translateJobs($targetLang, $jobs, $result);
    }

    /**
     * Translate a list of jobs in batches, handling both scalar and array-item jobs.
     * Array-item jobs carry an `array_group` key; their translated values are accumulated
     * and saved together as a JSON array once all items in the group are resolved.
     *
     * @param  array<int, array<string, mixed>>  $jobs
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function translateJobs(string $targetLang, array $jobs, array &$result): void
    {
        // Accumulator for array-field groups: group_key => {model, target_attribute, total, items[]}
        /** @var array<string, array{model: Model, target_attribute: string, total: int, label: string, items: array<int, string>}> */
        $arrayGroups = [];

        foreach ($this->batches($jobs, $targetLang) as $batch) {
            try {
                $translations = $this->translator->translate(
                    array_column($batch, 'source'),
                    $targetLang,
                    'en',
                );
            } catch (Throwable $exception) {
                $result['failed'] += count($batch);
                $result['messages'][] = "{$this->providerName()} {$targetLang} batch failed: {$exception->getMessage()}";

                continue;
            }

            foreach ($batch as $index => $job) {
                $translatedText = $translations[$index] ?? '';

                if (isset($job['array_group'])) {
                    // Accumulate — do not save yet
                    $key = $job['array_group'];
                    $arrayGroups[$key] ??= [
                        'model' => $job['model'],
                        'target_attribute' => $job['target_attribute'],
                        'total' => $job['array_total'],
                        'label' => $job['label'],
                        'items' => [],
                    ];
                    $arrayGroups[$key]['items'][$job['array_index']] = $translatedText;
                } else {
                    try {
                        $job['model']->forceFill([
                            $job['target_attribute'] => $translatedText,
                        ])->save();
                        $result['translated']++;
                    } catch (Throwable) {
                        $result['failed']++;
                        $result['messages'][] = "{$job['label']} could not be saved.";
                    }
                }
            }
        }

        // Save all fully-resolved array groups
        foreach ($arrayGroups as $group) {
            if (count($group['items']) < $group['total']) {
                // Some items failed in a batch — count as failed
                $result['failed']++;
                $result['messages'][] = "{$group['label']} array was only partially translated.";

                continue;
            }

            ksort($group['items']); // Restore original index order

            try {
                $group['model']->forceFill([
                    $group['target_attribute'] => array_values($group['items']),
                ])->save();
                $result['translated']++;
            } catch (Throwable) {
                $result['failed']++;
                $result['messages'][] = "{$group['label']} array could not be saved.";
            }
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $jobs
     * @return array<int, array<int, array<string, mixed>>>
     */
    private function batches(array $jobs, string $targetLang): array
    {
        $batches = [];
        $batch = [];

        foreach ($jobs as $job) {
            $candidate = [...$batch, $job];

            if ($batch !== [] && (count($candidate) > $this->translator->maxTextsPerRequest() || $this->requestBytes($candidate, $targetLang) > $this->translator->maxRequestBytes())) {
                $batches[] = $batch;
                $batch = [$job];

                continue;
            }

            $batch = $candidate;
        }

        if ($batch !== []) {
            $batches[] = $batch;
        }

        return $batches;
    }

    /**
     * @param  array<int, array{source: string}>  $jobs
     */
    private function requestBytes(array $jobs, string $targetLang): int
    {
        $payload = json_encode([
            'text' => array_column($jobs, 'source'),
            'target_lang' => $targetLang,
            'source_lang' => 'en',
        ], JSON_THROW_ON_ERROR);

        return strlen($payload);
    }

    /**
     * Queue a single scalar (string) field for translation.
     *
     * @param  array<int, array<string, mixed>>  $jobs
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function queueField(
        array &$jobs,
        array &$result,
        Model $model,
        string $sourceAttribute,
        string $targetAttribute,
        string $label,
    ): void {
        $source = $model->getAttribute($sourceAttribute);
        $target = $model->getAttribute($targetAttribute);

        if (! $this->hasText($source) || $this->hasText($target)) {
            $result['skipped']++;

            return;
        }

        $jobs[] = [
            'model' => $model,
            'source' => trim((string) $source),
            'target_attribute' => $targetAttribute,
            'label' => $label,
        ];
    }

    /**
     * Queue each item in a JSON array field as a separate translation job.
     * Items are associated by `array_group` key and reconstructed into an array on save.
     *
     * @param  array<int, array<string, mixed>>  $jobs
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function queueArrayField(
        array &$jobs,
        array &$result,
        Model $model,
        string $sourceAttribute,
        string $targetAttribute,
        string $label,
    ): void {
        $source = $model->getAttribute($sourceAttribute);
        $target = $model->getAttribute($targetAttribute);

        // Skip when source is empty or target already has content
        if (! is_array($source) || $source === [] || (is_array($target) && $target !== [])) {
            $result['skipped']++;

            return;
        }

        $items = array_values(array_filter(
            array_map('strval', $source),
            static fn (string $s) => trim($s) !== '',
        ));

        if ($items === []) {
            $result['skipped']++;

            return;
        }

        $groupKey = spl_object_id($model).':'.$targetAttribute;

        foreach ($items as $index => $item) {
            $jobs[] = [
                'model' => $model,
                'source' => trim($item),
                'target_attribute' => $targetAttribute,
                'label' => "{$label}[{$index}]",
                'array_group' => $groupKey,
                'array_index' => $index,
                'array_total' => count($items),
            ];
        }
    }

    private function hasText(mixed $value): bool
    {
        return is_string($value) ? trim($value) !== '' : filled($value);
    }
}
