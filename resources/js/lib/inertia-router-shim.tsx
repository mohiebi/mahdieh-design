import { Link as InertiaLink, usePage } from '@inertiajs/react';
import type { ComponentProps, ReactNode } from 'react';

type LinkProps = Omit<ComponentProps<typeof InertiaLink>, 'href'> & {
  to: string;
  params?: Record<string, string | number>;
  search?: Record<string, string | number | boolean | null | undefined>;
  activeProps?: { className?: string };
  children?: ReactNode;
};

function hrefFrom(to: string, params?: LinkProps['params'], search?: LinkProps['search']) {
  let href = to.replace(/\$([A-Za-z_]+)/g, (_, key: string) => String(params?.[key] ?? ''));

  if (search) {
    const query = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') query.set(key, String(value));
    });
    const queryString = query.toString();
    if (queryString) href += `?${queryString}`;
  }

  return href;
}

export function Link({ to, params, search, activeProps, className = '', ...props }: LinkProps) {
  const { url } = usePage();
  const href = hrefFrom(to, params, search);
  const currentPath = url.split('?')[0];
  const activeClass = currentPath === href.split('?')[0] ? activeProps?.className ?? '' : '';

  return (
    <InertiaLink
      href={href}
      className={[className, activeClass].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
