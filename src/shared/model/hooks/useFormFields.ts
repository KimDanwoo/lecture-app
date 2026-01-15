import { useCallback, useState } from 'react';

/**
 * @description 폼 필드 사용
 * @param initialValues - 초기 값
 * @returns 폼 필드 사용 결과
 */
export function useFormFields<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { values, setValues, setField };
}
