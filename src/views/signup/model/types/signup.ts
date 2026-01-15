import type { Role } from '@/shared/lib/auth';

/**
 * @description 회원가입 폼 값
 * @returns 회원가입 폼 값
 */
export type SignupFormValues = {
  role: Role;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
};
