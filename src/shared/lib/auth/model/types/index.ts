import { AUTH_ROLES } from '@/shared/lib/auth/model/constants';

export type Role = typeof AUTH_ROLES.STUDENT | typeof AUTH_ROLES.INSTRUCTOR;
