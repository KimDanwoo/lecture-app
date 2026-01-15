'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUserStore } from '@/features/auth/model/store';
import { LogoutButton } from '@/features/auth/ui';
import { ROUTES } from '@/shared/config';
import { AUTH_ROLES } from '@/shared/lib/auth/model/constants';
import { cn } from '@/shared/lib/classnames';

type NavKey = 'home' | 'login' | 'signup' | 'coursesNew';

type NavItem = {
  key: NavKey;
  href: string;
  label: string;
  matchPath: string;
};

type NavContext = { isAuthed: boolean; canCreateCourse: boolean };
type NavVisibility = Partial<Record<NavKey, (ctx: NavContext) => boolean>>;

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: ROUTES.HOME, label: '홈', matchPath: ROUTES.HOME },
  { key: 'coursesNew', href: ROUTES.COURSES_NEW, label: '강의 등록', matchPath: ROUTES.COURSES_NEW },
  { key: 'login', href: ROUTES.LOGIN, label: '로그인', matchPath: ROUTES.LOGIN },
  { key: 'signup', href: ROUTES.SIGNUP, label: '회원가입', matchPath: ROUTES.SIGNUP },
] as const;

const NAV_VISIBILITY: NavVisibility = {
  coursesNew: ({ canCreateCourse }) => canCreateCourse,
  login: ({ isAuthed }) => !isAuthed,
  signup: ({ isAuthed }) => !isAuthed,
};

function titleForPath(pathname: string) {
  const matched = NAV_ITEMS.find((item) => item.matchPath === pathname);
  return matched?.label ?? '수강신청';
}

export function AppHeader({ className = '' }: { className?: string }) {
  const pathname = usePathname() ?? ROUTES.HOME;
  const title = titleForPath(pathname);

  const user = useUserStore((s) => s.user);
  const isAuthed = Boolean(user);
  const canCreateCourse = user?.role === AUTH_ROLES.INSTRUCTOR;

  const navCandidates = NAV_ITEMS.filter((item) => {
    const rule = NAV_VISIBILITY[item.key];
    return rule ? rule({ isAuthed, canCreateCourse }) : true;
  });

  const filtered = navCandidates.filter((x) => x.matchPath !== pathname);
  const navItems = filtered.length >= 2 ? filtered : navCandidates;

  return (
    <header className={cn('w-full flex h-full items-center justify-between gap-4', className)}>
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
                  'rounded-xl px-3 py-2 text-sm font-medium',
                  'text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10',
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
