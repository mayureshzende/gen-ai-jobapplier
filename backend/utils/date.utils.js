export const getTodaysDate = () => {
  const today = new Date();

  // 1. Get the day and pad it with a leading zero if it's a single digit (e.g., "01")
  const day = String(today.getDate()).padStart(2, "0");

  // 2. Get the short month name (e.g., "Jul") and convert it to lowercase ("jul")
  const month = today.toLocaleString("en-US", { month: "short" }).toLowerCase();

  // 3. Get the 4-digit year (e.g., 2026)
  const year = today.getFullYear();

  // 4. Combine them together
  const formattedDate = `${day}${month}${year}`;
  return formattedDate;
  // console.log(formattedDate); // Output: "01jul2026"
};
