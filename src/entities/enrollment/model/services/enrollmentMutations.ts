import { useMutation, useQueryClient } from '@tanstack/react-query';

import { courseKeys } from '@/entities/course/model/services';
import { enrollmentApi } from '@/entities/enrollment/api';

/**
 * @description 수강신청 배치
 */
export function useEnrollBatchMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentApi.enrollBatch,
    onSuccess: () => {
      // 좌석/신청자 수가 바뀔 수 있으니 강의 목록 갱신
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
}
