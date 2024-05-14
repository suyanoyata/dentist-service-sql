import { formatCount } from "@/lib/format_count"

const month_stats = {
  title: "Більше пацієнтів 😷",
  body: (count: number, percent: number) => {
    return (
      <>
        За цей місяць до нас {count == 1 ? "звернувся" : "звернулось"}{" "}
        <span className="text-[#222]">{count}</span>{" "}
        {formatCount(count, ["пацієнт", "пацієнта", "пацієнтів"])}. Це на{" "}
        <span className="text-[#222]">{percent}% </span> більше ніж минулого
        місяця.
      </>
    )
  },
}

const visits = (count: number) => {
  return formatCount(count, ["відвідування", "відвідування", "відвідувань"])
}

const week_stats = {
  title: "Відвідування цього тижня 🗓️",
  body: (count: number) => {
    return (
      <>
        Цього тижня залишилось <span className="text-[#222]">{count}</span>{" "}
        {visits(count)}.
      </>
    )
  },
}

export const stats_strings = {
  month_stats,
  week_stats,
}
