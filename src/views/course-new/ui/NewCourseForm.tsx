'use client';

import { Button, Input } from '@/shared/ui';
import { useNewCourseForm } from '@/views/course-new/model/hooks';

export function NewCourseForm() {
  const { values, setField, onSubmit, isPending } = useNewCourseForm();

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <Input
        label="강의 제목"
        value={values.title}
        onChange={(e) => setField('title', e.target.value)}
        required
      />
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">강의 설명</span>
        <textarea
          value={values.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="React의 기본 개념부터 Hooks까지 배웁니다."
          className="min-h-28 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:ring-2 focus:ring-zinc-400/40 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:focus:ring-zinc-200/20"
        />
      </label>
      <Input
        label="최대 수강 인원"
        type="number"
        min={1}
        value={String(values.maxStudents)}
        onChange={(e) => setField('maxStudents', Number(e.target.value))}
        required
      />
      <Input
        label="수강료(원)"
        type="number"
        min={0}
        value={String(values.price)}
        onChange={(e) => setField('price', Number(e.target.value))}
        required
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? '처리 중...' : '등록하기'}
      </Button>
    </form>
  );
}

