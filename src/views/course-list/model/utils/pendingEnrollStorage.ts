const PENDING_ENROLL_STORAGE_KEY = 'lecture_pending_enroll';

/**
 * @description 세션 스토리지 가져오기
 * @returns 세션 스토리지
 */
function getSessionStorage() {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

/**
 * @description 선택된 강의 ID 정규화
 * @param input - 선택된 강의 ID
 * @returns 선택된 강의 ID 정규화 결과
 */
function normalizeSelectedIds(input: unknown): number[] {
  if (!Array.isArray(input)) return [];
  return input.filter((x): x is number => typeof x === 'number' && Number.isFinite(x));
}

/**
 * @description 수강신청 선택 목록 읽기
 * @returns 수강신청 선택 목록
 */
export function readPendingEnrollSelection(): number[] {
  const storage = getSessionStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(PENDING_ENROLL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && 'selectedIds' in parsed) {
      const ids = (parsed as { selectedIds?: unknown }).selectedIds;
      return normalizeSelectedIds(ids);
    }
  } catch {
    return [];
  }
  return [];
}

/**
 * @description 수강신청 선택 목록 쓰기
 * @param selectedIds - 선택된 강의 ID 목록
 * @returns 수강신청 선택 목록 쓰기 결과
 */
export function writePendingEnrollSelection(selectedIds: number[]) {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    storage.setItem(PENDING_ENROLL_STORAGE_KEY, JSON.stringify({ selectedIds }));
  } catch {
    // ignore
  }
}

/**
 * @description 수강신청 선택 목록 제거
 * @returns 수강신청 선택 목록 제거 결과
 */
export function clearPendingEnrollSelection() {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    storage.removeItem(PENDING_ENROLL_STORAGE_KEY);
  } catch {
    // ignore
  }
}
