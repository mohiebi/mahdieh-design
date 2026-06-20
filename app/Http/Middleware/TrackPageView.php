<?php

namespace App\Http\Middleware;

use App\Models\PageView;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackPageView
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (
            $request->isMethod('GET')
            && ! $request->header('X-Inertia-Partial-Data') // skip partial reloads only
            && $response->getStatusCode() < 300
        ) {
            $resource = $this->detectResource($request->getPathInfo());

            if ($resource !== null) {
                PageView::create([
                    'path' => $request->getPathInfo(),
                    'locale' => $resource['locale'],
                    'resource_type' => $resource['type'],
                    'resource_slug' => $resource['slug'],
                    'visited_at' => now(),
                ]);
            }
        }

        return $response;
    }

    /**
     * Returns ['type', 'slug', 'locale'] when the path is a project or package detail page,
     * null otherwise.
     *
     * @return array{type: string, slug: string, locale: string}|null
     */
    private function detectResource(string $path): ?array
    {
        // /projects/{slug}  or  /de/projects/{slug}
        if (preg_match('#^(?:/de)?/projects/([^/]+)$#', $path, $m)) {
            $locale = str_starts_with($path, '/de') ? 'de' : 'en';
            return ['type' => 'project', 'slug' => $m[1], 'locale' => $locale];
        }

        // /packages/{slug}  or  /packages/{slug}/fa  or  /de/packages/{slug}
        if (preg_match('#^(?:/de)?/packages/([^/]+?)(?:/fa)?$#', $path, $m)) {
            $locale = str_starts_with($path, '/de') ? 'de' : (str_ends_with($path, '/fa') ? 'fa' : 'en');
            return ['type' => 'package', 'slug' => $m[1], 'locale' => $locale];
        }

        return null;
    }
}
