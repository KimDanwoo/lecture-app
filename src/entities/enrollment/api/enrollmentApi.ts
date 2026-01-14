import { http } from '@/shared/api/http';
import { enrollmentPaths } from '@/entities/enrollment/api/enrollmentPaths';

export type EnrollBatchBody = { courseIds: number[] };
export type EnrollBatchResponse = {
	success?: number[];
	failed?: Array<{ courseId?: number; id?: number; message?: string; reason?: string }>;
	[key: string]: unknown;
};

export const enrollmentApi = {
	enrollBatch(body: EnrollBatchBody) {
		return http.post<EnrollBatchResponse>(enrollmentPaths.batch, body);
	},
} as const;

