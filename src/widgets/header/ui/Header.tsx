import { AUTH_ROLES } from '@/entities/auth/model/constants';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { ROUTES } from '@/shared/config';
import { getAuthFromCookies } from '@/shared/lib/auth';
import Link from 'next/link';

export async function Header({ className = '' }: { className?: string }) {
  const { hasToken, role } = await getAuthFromCookies();

  return (
    <header className={['mb-8 flex items-center justify-between gap-4', className].join(' ')}>
      <div className="flex items-center gap-4">
        <Link href={ROUTES.HOME} className="text-lg font-semibold tracking-tight">
          수강 신청
        </Link>
        <nav className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          {role === AUTH_ROLES.INSTRUCTOR ? (
            <Link className="hover:underline" href={ROUTES.COURSES_NEW}>
              강의 등록
            </Link>
          ) : null}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {hasToken ? (
          <LogoutButton />
        ) : (
          <>
            <Link
              className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              href={ROUTES.SIGNUP}
            >
              회원가입
            </Link>
            <Link
              className="rounded-xl bg-zinc-950 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
              href={ROUTES.LOGIN}
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
