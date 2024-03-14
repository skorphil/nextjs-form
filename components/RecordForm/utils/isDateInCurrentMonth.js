export function isInCurrentMonth(unixDateInMs) {
  /**
   * Check if provided unix date is in current month
   *
   * @returns boolean
   */

  const date = new Date(unixDateInMs);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}
