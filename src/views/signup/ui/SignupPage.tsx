'use client';

import { AUTH_ROLES } from '@/entities/auth/model/constants';
import type { Role } from '@/shared/lib/auth';
import { Button, Input, Select } from '@/shared/ui';
import { useSignupForm } from '@/views/signup/model/hooks';

export function SignupPage() {
  const { values, setField, setRole, onSubmit, isPending } = useSignupForm();

  return (
    <section className="mx-auto w-full max-w-md" aria-label="회원가입 폼">
      <form onSubmit={onSubmit} className="grid gap-4">
        <Select label="회원 유형" value={values.role} onChange={(e) => setRole(e.target.value as Role)}>
          <option value="STUDENT">{AUTH_ROLES.STUDENT} (수강생)</option>
          <option value="INSTRUCTOR">{AUTH_ROLES.INSTRUCTOR} (강사)</option>
        </Select>

        <Input
          label="이메일"
          type="email"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          placeholder="user@example.com"
          required
        />

        <Input
          label="비밀번호"
          type="password"
          value={values.password}
          onChange={(e) => setField('password', e.target.value)}
          placeholder="Test1234"
          required
        />

        <Input
          label="비밀번호 확인"
          type="password"
          value={values.passwordConfirm}
          onChange={(e) => setField('passwordConfirm', e.target.value)}
          placeholder="Test1234"
          required
        />

        <Input
          label="이름"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="홍길동"
          required
        />

        <Input
          label="휴대폰 번호"
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          placeholder="010-1234-5678"
          required
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : '회원가입'}
        </Button>
      </form>
    </section>
  );
}
