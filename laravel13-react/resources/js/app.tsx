import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import type { ComponentType } from 'react';

createInertiaApp({
  title: (title) => (title ? `${title} - Mahdieh` : 'Mahdieh'),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ) as Promise<ComponentType>,
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
