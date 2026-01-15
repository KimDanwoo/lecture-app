import type { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';

// 강의 코스 정렬 옵션
export type CourseSortOptions = (typeof COURSE_SORT_OPTIONS)[keyof typeof COURSE_SORT_OPTIONS];

// 강의 코스 정렬
export type CourseSort = CourseSortOptions;

// 강의 코스
export type Course = {
  id: number;
  title: string;
  description?: string;
  instructorName?: string;
  maxStudents: number;
  currentStudents: number;
  price: number;
  availableSeats?: number;
  isFull?: boolean;
};

// 강의 코스 목록 메타 데이터
type CourseListMeta = {
  number?: number;
  pageable?: { pageNumber?: number; pageSize?: number };
  page?: number;
  size?: number;
  last?: boolean;
  totalPages?: number;
};

// 강의 코스 목록 응답
export type CourseListResponse =
  | Course[]
  | ({
      content?: Course[];
      items?: Course[];
      data?: Course[];
      courses?: Course[];
    } & CourseListMeta);

// 강의 코스 페이지 정보
export type CoursePageInfo = { page: number; size: number; last: boolean };

// 강의 코스 페이지
export type CoursePage = {
  items: Course[];
  page: number;
  size: number;
  hasNext: boolean;
  nextPage?: number;
};

// 강의 코스 목록 조회 파라미터
export type GetCoursesParams = {
  page?: number;
  size?: number;
  sort?: CourseSortOptions;
};
