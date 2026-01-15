const PENDING_ENROLL_STORAGE_KEY = 'lecture_pending_enroll';

function getSessionStorage() {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

function normalizeSelectedIds(input: unknown): number[] {
  if (!Array.isArray(input)) return [];
  return input.filter((x): x is number => typeof x === 'number' && Number.isFinite(x));
}

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

export function writePendingEnrollSelection(selectedIds: number[]) {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    storage.setItem(PENDING_ENROLL_STORAGE_KEY, JSON.stringify({ selectedIds }));
  } catch {
    // ignore
  }
}

export function clearPendingEnrollSelection() {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    storage.removeItem(PENDING_ENROLL_STORAGE_KEY);
  } catch {
    // ignore
  }
}
