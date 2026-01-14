export function formatPrice(price: number) {
  try {
    return new Intl.NumberFormat('ko-KR').format(price);
  } catch {
    return String(price);
  }
}

