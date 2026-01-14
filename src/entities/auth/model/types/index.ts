import { AUTH_ROLES } from '../constants';

export type Role = typeof AUTH_ROLES.STUDENT | typeof AUTH_ROLES.INSTRUCTOR;
