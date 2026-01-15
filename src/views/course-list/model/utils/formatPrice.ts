/**
 * @description 가격 포맷팅
 * @param price - 가격
 * @returns 가격 포맷팅 결과
 */
export function formatPrice(price: number) {
  try {
    return new Intl.NumberFormat('ko-KR').format(price);
  } catch {
    return String(price);
  }
}
