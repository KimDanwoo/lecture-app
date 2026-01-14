import type { Role } from '@/shared/lib/auth';

export type SignupFormValues = {
  role: Role;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
};

