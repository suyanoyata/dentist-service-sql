/**
 *
 * @param count takes a number
 * @param titles takes an array from which we will format it, example: ["работник", "работника", "работников"]
 * @returns formatted count
 */

export const formatCount = (count: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const built = {
    count,
    titles:
      titles[
        count % 100 > 4 && count % 100 < 20
          ? 2
          : cases[count % 10 < 5 ? count % 10 : 5]
      ],
  }

  return `${built.titles}`
  // return `${built.count} ${built.titles}`
}
