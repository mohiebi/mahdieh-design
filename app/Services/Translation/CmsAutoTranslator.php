<?php

namespace App\Services\Translation;

use App\Models\BriefQuestion;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Models\ProjectService;
use App\Models\Recommendation;
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

        $this->translateJobs(config('services.translation.german_target_lang', 'de'), $this->germanJobs($result), $result);
        $this->translatePersianBriefJobs($result);

        return $result;
    }

    /**
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     * @return array<int, array{model: Model, source: string, target_attribute: string, label: string}>
     */
    private function germanJobs(array &$result): array
    {
        $jobs = [];

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

        Recommendation::query()
            ->orderBy('id')
            ->each(function (Recommendation $recommendation) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $recommendation, 'role', 'role_de', "Recommendation {$recommendation->id} role");
                $this->queueField($jobs, $result, $recommendation, 'company', 'company_de', "Recommendation {$recommendation->id} company");
                $this->queueField($jobs, $result, $recommendation, 'quote', 'quote_de', "Recommendation {$recommendation->id} quote");
            });

        BriefQuestion::query()
            ->orderBy('id')
            ->each(function (BriefQuestion $question) use (&$jobs, &$result): void {
                $this->queueField($jobs, $result, $question, 'label', 'label_de', "Brief question {$question->id} label");
                $this->queueField($jobs, $result, $question, 'hint', 'hint_de', "Brief question {$question->id} hint");
                $this->queueField($jobs, $result, $question, 'placeholder', 'placeholder_de', "Brief question {$question->id} placeholder");
            });

        return $jobs;
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
     * @param  array<int, array{model: Model, source: string, target_attribute: string, label: string}>  $jobs
     * @param  array{translated: int, skipped: int, failed: int, messages: array<int, string>}  $result
     */
    private function translateJobs(string $targetLang, array $jobs, array &$result): void
    {
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
                try {
                    $job['model']->forceFill([
                        $job['target_attribute'] => $translations[$index] ?? '',
                    ])->save();
                    $result['translated']++;
                } catch (Throwable) {
                    $result['failed']++;
                    $result['messages'][] = "{$job['label']} could not be saved.";
                }
            }
        }
    }

    /**
     * @param  array<int, array{model: Model, source: string, target_attribute: string, label: string}>  $jobs
     * @return array<int, array<int, array{model: Model, source: string, target_attribute: string, label: string}>>
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
     * @param  array<int, array{model: Model, source: string, target_attribute: string, label: string}>  $jobs
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

    private function hasText(mixed $value): bool
    {
        return is_string($value) ? trim($value) !== '' : filled($value);
    }
}
