'use client';

import { AUTH_ROLES } from '@/entities/auth/model/constants';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { useUserStore } from '@/features/auth/model/store';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavKey = 'home' | 'login' | 'signup' | 'coursesNew';

type NavItem = {
  key: NavKey;
  href: string;
  label: string;
  matchPath: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: ROUTES.HOME, label: '홈', matchPath: ROUTES.HOME },
  { key: 'coursesNew', href: ROUTES.COURSES_NEW, label: '강의 등록', matchPath: ROUTES.COURSES_NEW },
  { key: 'login', href: ROUTES.LOGIN, label: '로그인', matchPath: ROUTES.LOGIN },
  { key: 'signup', href: ROUTES.SIGNUP, label: '회원가입', matchPath: ROUTES.SIGNUP },
] as const;

function titleForPath(pathname: string) {
  if (pathname === ROUTES.LOGIN) return '로그인';
  if (pathname === ROUTES.SIGNUP) return '회원가입';
  if (pathname === ROUTES.HOME) return '수강신청';
  if (pathname === ROUTES.COURSES_NEW) return '강의 등록';
  return '수강신청';
}

export function AppHeader({ className = '' }: { className?: string }) {
  const pathname = usePathname() ?? ROUTES.HOME;
  const title = titleForPath(pathname);

  const user = useUserStore((s) => s.user);
  const isAuthed = Boolean(user);
  const canCreateCourse = user?.role === AUTH_ROLES.INSTRUCTOR;

  const navCandidates = NAV_ITEMS.filter((item) => {
    if (item.key === 'coursesNew') return canCreateCourse;
    if (item.key === 'login' || item.key === 'signup') return !isAuthed;
    return true;
  });

  const filtered = navCandidates.filter((x) => x.matchPath !== pathname);
  const navItems = filtered.length >= 2 ? filtered : navCandidates;

  return (
    <header className={['flex h-full items-center justify-between gap-4', className].join(' ')}>
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{title}</h1>
      </div>

      <nav aria-label="주요 메뉴">
        <ul className="flex shrink-0 items-center gap-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {isAuthed ? (
            <li>
              <LogoutButton />
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
