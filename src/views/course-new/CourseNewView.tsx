import { cookies } from 'next/headers';
import Link from 'next/link';

import { auth } from '@/shared/config';
import { AUTH_ROLES } from '@/shared/lib/auth/model/constants';
import { cn } from '@/shared/lib/classnames';
import { NewCourseForm } from '@/views/course-new/ui';

export async function CourseNewView() {
  const cookieStore = await cookies();
  const role = cookieStore.get(auth.roleCookieName)?.value ?? null;

  if (role !== AUTH_ROLES.INSTRUCTOR) {
    return (
      <section className="mx-auto w-full max-w-md" aria-label="강의 등록 권한 안내">
        <div
          className={cn(
            'rounded-xl border p-6 text-sm',
            'border-black/10 bg-white text-zinc-700 dark:border-white/15 dark:bg-black dark:text-zinc-300',
          )}
        >
          강의 등록은 <b>강사(INSTRUCTOR)</b>만 가능합니다.
        </div>
        <div className="mt-4 flex gap-2">
          <Link className="underline" href="/login">
            로그인
          </Link>
          <Link className="underline" href="/">
            홈으로
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-md" aria-label="강의 등록 폼">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        강사(INSTRUCTOR) 계정으로 로그인한 경우에만 등록할 수 있어요.
      </p>

      <NewCourseForm />
    </section>
  );
}
