import { QueryClient } from '@tanstack/react-query';

import type { CourseListResponse, CoursePage, CourseSort } from '@/entities/course/model';
import { courseKeys } from '@/entities/course/model/services';

import { getPageInfo, normalizeCourses } from '../utils';

/**
 * @description 강의 코스 목록 조회 (BFF)
 */
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

/**
 * @description 강의 코스 무한 스크롤 조회 (BFF)
 */
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
