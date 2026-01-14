import { COURSE_SORT_OPTIONS } from './constants';

export type Course = {
  id: number;
  title: string;
  description?: string | null;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats?: number;
  isFull?: boolean;
  price: number;
  createdAt?: string;
};

export type CourseListResponse =
  | Course[]
  | {
      content?: Course[];
      items?: Course[];
      data?: Course[];
      courses?: Course[];
      pageable?: {
        pageNumber?: number;
        pageSize?: number;
        offset?: number;
        paged?: boolean;
        unpaged?: boolean;
      };
      last?: boolean;
      first?: boolean;
      number?: number;
      size?: number;
      numberOfElements?: number;
      empty?: boolean;
      totalElements?: number;
      totalPages?: number;
      page?: number;
    };

export type CourseSortOptions = (typeof COURSE_SORT_OPTIONS)[keyof typeof COURSE_SORT_OPTIONS];
