import { QueryClient } from '@tanstack/react-query';

import type { CoursePage } from '@/entities/course/api';
import type { Course, CourseListResponse, CourseSort } from '@/entities/course/model';
import { courseKeys } from '@/entities/course/model/services';

function normalizeCourses(res: CourseListResponse): Course[] {
  if (Array.isArray(res)) return res;
  return (res.content ?? res.items ?? res.data ?? res.courses ?? []) as Course[];
}

function getPageInfo(res: CourseListResponse) {
  if (Array.isArray(res)) return { page: 0, last: true };
  const page = res.number ?? res.pageable?.pageNumber ?? res.page ?? 0;
  const last = res.last ?? (typeof res.totalPages === 'number' ? page >= res.totalPages - 1 : undefined);
  return { page, last: Boolean(last) };
}

async function fetchCoursesPageViaBff(args: {
  origin: string;
  cookie?: string;
  page: number;
  size: number;
  sort: CourseSort;
}): Promise<CoursePage> {
  const qs = new URLSearchParams({
    page: String(args.page),
    size: String(args.size),
    sort: args.sort,
  });

  const res = await fetch(`${args.origin}/api/courses?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(args.cookie ? { cookie: args.cookie } : {}),
    },
  });

  const data = (await res.json().catch(() => ({}))) as CourseListResponse;
  const items = normalizeCourses(data);
  const info = getPageInfo(data);
  const hasNext = !info.last;

  return { items, page: info.page, size: args.size, hasNext, nextPage: hasNext ? info.page + 1 : undefined };
}

export async function prefetchInfiniteCoursesBff(args: {
  queryClient: QueryClient;
  origin: string;
  cookie?: string;
  size: number;
  sort: CourseSort;
}) {
  await args.queryClient.prefetchInfiniteQuery({
    queryKey: courseKeys.infinite({ size: args.size, sort: args.sort }),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchCoursesPageViaBff({
        origin: args.origin,
        cookie: args.cookie,
        page: pageParam,
        size: args.size,
        sort: args.sort,
      }),
    getNextPageParam: (lastPage: CoursePage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
  });
}
