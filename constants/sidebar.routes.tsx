import { BarChart3, Stethoscope, Users } from "lucide-react"

const colors = ["white", "#676767"]
const style = "min-w-[20px]"

export const routes = [
  {
    icon: (selected: boolean) => (
      <BarChart3
        size={20}
        className={style}
        color={selected ? colors[0] : colors[1]}
      />
    ),
    title: "Статистика",
    select: "stats",
  },
  {
    icon: (selected: boolean) => (
      <Users
        size={20}
        className={style}
        color={selected ? colors[0] : colors[1]}
      />
    ),
    title: "Пацієнти",
    select: "patients",
  },
  {
    icon: (selected: boolean) => (
      <Stethoscope
        size={20}
        className={style}
        color={selected ? colors[0] : colors[1]}
      />
    ),
    title: "Лікарі",
    select: "dentists",
  },
] as const
