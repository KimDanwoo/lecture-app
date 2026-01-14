import { CourseListView } from '@/views/course-list';

export default async function Page({ searchParams }: { searchParams?: Promise<{ sort?: string }> }) {
  return <CourseListView searchParams={searchParams} />;
}
