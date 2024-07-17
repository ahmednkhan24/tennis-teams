export function generateCombinations<T, K>(
  arr: Array<T>,
  mapper: (t1: T, t2: T) => K
): K[] {
  return arr.flatMap((p1, i) => arr.slice(i + 1).map((p2) => mapper(p1, p2)));
}
