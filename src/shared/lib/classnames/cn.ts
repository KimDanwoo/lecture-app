export type CnArg = string | false | null | undefined;

/**
 * className 유틸 (cn/cx)
 * - falsy(false/null/undefined)는 무시하고 문자열만 합칩니다.
 */
export function cn(...args: CnArg[]) {
  return args.filter(Boolean).join(' ');
}
