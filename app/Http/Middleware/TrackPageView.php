<?php

namespace App\Http\Middleware;

use App\Models\PageView;
use Closure;
use Illuminate\Http\Request;

use Symfony\Component\HttpFoundation\Response;

class TrackPageView
{
    // Substring matches against User-Agent (case-insensitive)
    private const BOT_PATTERNS = [
        'bot', 'crawl', 'spider', 'slurp', 'mediapartners',
        'facebookexternalhit', 'whatsapp', 'twitterbot', 'linkedinbot',
        'pinterest', 'semrush', 'ahrefs', 'mozbot', 'screaming',
        'lighthouse', 'pagespeed', 'headlesschrome', 'phantomjs',
        'wget', 'curl/', 'python-requests', 'go-http-client',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (
            $request->isMethod('GET')
            && ! $request->header('X-Inertia-Partial-Data')
            && $response->getStatusCode() < 300
            && ! $request->user()?->is_admin
            && ! $this->isBot($request->userAgent() ?? '')
        ) {
            $resource = $this->detectResource($request->getPathInfo());

            if ($resource !== null) {
                $hash = hash('sha256',
                    $request->ip() . $resource['type'] . $resource['slug'] . now()->toDateString()
                );

                PageView::insertOrIgnore([[
                    'path'          => $request->getPathInfo(),
                    'locale'        => $resource['locale'],
                    'resource_type' => $resource['type'],
                    'resource_slug' => $resource['slug'],
                    'visitor_hash'  => $hash,
                    'visited_at'    => now(),
                ]]);
            }
        }

        return $response;
    }

    /**
     * @return array{type: string, slug: string, locale: string}|null
     */
    private function detectResource(string $path): ?array
    {
        if (preg_match('#^(?:/de)?/projects/([^/]+)$#', $path, $m)) {
            return ['type' => 'project', 'slug' => $m[1], 'locale' => str_starts_with($path, '/de') ? 'de' : 'en'];
        }

        if (preg_match('#^(?:/de)?/packages/([^/]+?)(?:/fa)?$#', $path, $m)) {
            $locale = str_starts_with($path, '/de') ? 'de' : (str_ends_with($path, '/fa') ? 'fa' : 'en');
            return ['type' => 'package', 'slug' => $m[1], 'locale' => $locale];
        }

        return null;
    }

    private function isBot(string $ua): bool
    {
        if ($ua === '') {
            return true;
        }

        $ua = strtolower($ua);
        foreach (self::BOT_PATTERNS as $pattern) {
            if (str_contains($ua, $pattern)) {
                return true;
            }
        }

        return false;
    }
}
