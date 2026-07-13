// Format date as "day-Month-year" (e.g., "21-August-2026")
export const formatDateLong = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};

// Format date as "MMM YYYY" (e.g., "Aug 2026")
export const formatDateShort = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Convert date object to YYYY-MM string for month-year input
export const dateToMonthYear = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

// Convert YYYY-MM string to Date object
export const monthYearToDate = (monthYearString) => {
  if (!monthYearString) return '';
  const [year, month] = monthYearString.split('-');
  return new Date(year, parseInt(month) - 1, 1).toISOString();
};
