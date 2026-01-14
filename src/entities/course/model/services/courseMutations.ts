import { useMutation } from '@tanstack/react-query';
import { courseApi } from '@/entities/course/api/courseApi';

export function useCreateCourseMutation() {
	return useMutation({
		mutationFn: courseApi.createCourse,
	});
}

