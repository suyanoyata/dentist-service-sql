export function count(value: any) {
  return Array.isArray(value) ? value.length : 0
}

/**
 *
 * @param first Takes current aka primary value
 * @param second Takes previous aka secondary value
 * @returns Percent difference between these two values
 */

export function percent_difference(first: number, second: number) {
  const diff = ((first - second) / second) * 100

  return diff > 0 ? diff.toFixed() : 0
}
