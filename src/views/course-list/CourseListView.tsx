import { dehydrate, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

import { prefetchInfiniteCoursesBff } from '@/entities/course/model/services';
import { getAuthFromCookies } from '@/shared/lib/auth/utils';
import { cn } from '@/shared/lib/classnames';
import { getRequestOrigin } from '@/shared/lib/next';
import { ReactQueryHydrate } from '@/shared/lib/react-query';
import { toCourseListSort } from '@/views/course-list/model/types';
import { CourseList, CourseSortOptions } from '@/views/course-list/ui';

export async function CourseListView({ searchParams }: { searchParams?: Promise<{ sort?: string }> }) {
  const sp = (await searchParams) ?? {};
  const sort = toCourseListSort(sp.sort);

  const { role } = await getAuthFromCookies();

  const origin = await getRequestOrigin();
  const h = await headers();
  const cookie = h.get('cookie') ?? '';

  const queryClient = new QueryClient();

  await prefetchInfiniteCoursesBff({
    queryClient,
    origin,
    cookie,
    size: 10,
    sort,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="grid gap-4" aria-label="강의 목록">
      <div
        className={cn(
          '-mx-4 px-4 pb-4 sm:-mx-6 sm:px-6',
          'sticky top-[84px] sm:top-[84px] z-40',
          'border-b border-black/10 bg-zinc-50/90 backdrop-blur dark:border-white/15 dark:bg-black/70',
        )}
      >
        <CourseSortOptions currentSort={sort} />
      </div>

      <ReactQueryHydrate state={dehydratedState}>
        <CourseList key={`${role ?? 'guest'}-${sort}`} role={role} sort={sort} />
      </ReactQueryHydrate>
    </section>
  );
}
