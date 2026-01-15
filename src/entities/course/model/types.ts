import type { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';

export type CourseSortOptions = (typeof COURSE_SORT_OPTIONS)[keyof typeof COURSE_SORT_OPTIONS];
export type CourseSort = CourseSortOptions;

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

type CourseListMeta = {
  number?: number;
  pageable?: { pageNumber?: number; pageSize?: number };
  page?: number;
  size?: number;
  last?: boolean;
  totalPages?: number;
};

export type CourseListResponse =
  | Course[]
  | ({
      content?: Course[];
      items?: Course[];
      data?: Course[];
      courses?: Course[];
    } & CourseListMeta);
