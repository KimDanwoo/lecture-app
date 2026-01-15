import type { ReactNode } from 'react';

type Props = {
  role: string | null;
  allowedRoles: readonly string[];
  fallback: ReactNode;
  children: ReactNode;
};

export function RoleGuard({ role, allowedRoles, fallback, children }: Props) {
  if (!role || !allowedRoles.includes(role)) return <>{fallback}</>;
  return <>{children}</>;
}
