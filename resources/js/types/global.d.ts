import type { PageProps as InertiaPageProps } from '@inertiajs/core';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

export type SharedPageProps = InertiaPageProps & {
  auth: {
    user: AuthUser | null;
  };
  flash: {
    success?: string | null;
    error?: string | null;
  };
  calendlyUrl?: string | null;
  contactEmail?: string | null;
};
