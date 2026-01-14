import { prefetchInfiniteCoursesBff } from '@/entities/course/model/hooks';
import { getAuthFromCookies } from '@/shared/lib/auth';
import { getRequestOrigin } from '@/shared/lib/next';
import { ReactQueryHydrate } from '@/shared/lib/react-query';
import { toCourseListSort } from '@/views/course-list/model/types';
import { CourseList } from '@/views/course-list/ui';
import { CourseSortOptions } from '@/views/course-list/ui/CourseSortOptions';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

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
      <div className="sticky top-16 z-40 -mx-4 border-b border-black/10 bg-zinc-50/90 px-4 pb-4 backdrop-blur sm:top-20 sm:-mx-6 sm:px-6 dark:border-white/15 dark:bg-black/70">
        <CourseSortOptions currentSort={sort} />
      </div>

      <ReactQueryHydrate state={dehydratedState}>
        <CourseList key={`${role ?? 'guest'}-${sort}`} role={role} sort={sort} />
      </ReactQueryHydrate>
    </section>
  );
}
