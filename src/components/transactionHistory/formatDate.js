/**
 * 날짜 문자열을 'YY.MM.DD' 형식으로 변환
 * @param {string} isoDate - 예: '2025-04-01T00:00:00'
 * @returns {string} - 예: '25.04.01'
 */
export function formatDateToShort(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return '';

  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
