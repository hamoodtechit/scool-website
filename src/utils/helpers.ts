/**
 * Standard utility to pause execution for a given number of milliseconds.
 * Useful for mocking network latency in development.
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts all numeric characters from a string and returns them as a number.
 * Useful for normalizing IDs.
 */
export function extractNumericId(idString: string): number {
  if (!idString) return 0;
  const numericStr = idString.replace(/\D/g, "");
  return numericStr ? parseInt(numericStr, 10) : 0;
}
