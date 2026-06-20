<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only([
                    'id',
                    'name',
                    'email',
                    'is_admin',
                ]),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'calendlyUrl' => config('services.calendly_url'),
            'contactEmail' => config('services.contact_email'),
            // Default OG — individual pages override by passing their own 'og' prop
            'og' => [
                'title'       => 'Mahdieh Baghoolizadeh — Brand Identity Designer',
                'description' => 'Brand identity, visual systems, and packaging design. Tehran-based creative studio.',
                'image'       => url('/og-image.svg'),
                'url'         => url()->current(),
            ],
        ];
    }
}
