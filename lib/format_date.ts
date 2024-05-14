interface DateTimeFormatOptions {
  formatMatcher?: "basic" | "best fit" | "best fit" | undefined
  dateStyle?: "full" | "long" | "medium" | "short" | undefined
  timeStyle?: "full" | "long" | "medium" | "short" | undefined
  dayPeriod?: "narrow" | "short" | "long" | undefined
  fractionalSecondDigits?: 1 | 2 | 3 | undefined
}

export const formatDate = (date: Date, options?: DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "long",
    ...options,
  }).format(new Date(date))
}
