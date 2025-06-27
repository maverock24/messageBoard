/**
 * Formats a timestamp string into a localized date/time string
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * Validates if a string is not empty or just whitespace
 */
export const isValidString = (str: string): boolean => {
  return str.trim().length > 0;
};

/**
 * Creates a debounced version of a function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
