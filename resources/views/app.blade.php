<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $og = $page['props']['og'] ?? [];
            $ogTitle       = $og['title']       ?? 'Mahdieh Baghoolizadeh';
            $ogDescription = $og['description'] ?? 'Brand identity, visual systems, and packaging design.';
            $ogImage       = $og['image']       ?? url('/og-image.svg');
            $ogUrl         = $og['url']         ?? url()->current();
        @endphp

        {{-- Open Graph --}}
        <meta property="og:type"        content="website">
        <meta property="og:site_name"   content="Mahdieh Baghoolizadeh">
        <meta property="og:title"       content="{{ $ogTitle }}">
        <meta property="og:description" content="{{ $ogDescription }}">
        <meta property="og:image"       content="{{ $ogImage }}">
        <meta property="og:url"         content="{{ $ogUrl }}">

        {{-- Twitter / X Card --}}
        <meta name="twitter:card"        content="summary_large_image">
        <meta name="twitter:title"       content="{{ $ogTitle }}">
        <meta name="twitter:description" content="{{ $ogDescription }}">
        <meta name="twitter:image"       content="{{ $ogImage }}">

        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
