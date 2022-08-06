import { MILLISECONDS_IN_A_DAY } from './constants';

export function getFormattedDate(date) {
  const todayDate = new Date().toLocaleDateString();
  const comparisonDate = new Date(date).toLocaleDateString();
  const dateInterval = Date.parse(todayDate) - Date.parse(comparisonDate);

  if (todayDate === comparisonDate) return '오늘';
  if (todayDate !== comparisonDate && dateInterval <= MILLISECONDS_IN_A_DAY) return '어제';

  return new Date(date).toISOString().slice(0, 10);
}

export function getFormattedPrice(price) {
  return price.toLocaleString();
}
