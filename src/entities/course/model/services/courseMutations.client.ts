'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { courseApi } from '@/entities/course/api';
import { courseKeys } from '@/entities/course/model/services';

/**
 * @description 강의 코스 생성
 */
export function useCreateCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseApi.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
}
