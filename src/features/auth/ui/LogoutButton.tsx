'use client';

import { useRouter } from 'next/navigation';

import { useLogoutMutation } from '@/features/auth/model/services';
import { Button } from '@/shared/ui';

export function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  async function onLogout() {
    await logoutMutation.mutateAsync().catch(() => undefined);
    router.push('/');
    router.refresh();
  }

  return (
    <Button type="button" className="h-10 px-3" onClick={onLogout}>
      로그아웃
    </Button>
  );
}
