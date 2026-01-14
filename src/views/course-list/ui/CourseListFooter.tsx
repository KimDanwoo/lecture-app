'use client';

type Props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
};

export function CourseListFooter({ hasNextPage, isFetchingNextPage, sentinelRef }: Props) {
  return (
    <div className="grid gap-2">
      {hasNextPage ? (
        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          {isFetchingNextPage ? '더 불러오는 중...' : '스크롤하면 더 불러옵니다.'}
        </div>
      ) : (
        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">마지막 강의까지 불러왔습니다.</div>
      )}
      <div ref={sentinelRef} />
    </div>
  );
}
