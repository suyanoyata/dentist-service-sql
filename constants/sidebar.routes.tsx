import { Stethoscope, Users } from "lucide-react";

export const routes = [
  {
    icon: (selected: boolean) => (
      <Users size={20} color={selected ? "#222" : "#676767"} />
    ),
    title: "Пацієнти",
    select: "patients",
  },
  {
    icon: (selected: boolean) => (
      <Stethoscope size={20} color={selected ? "#222" : "#676767"} />
    ),
    title: "Лікарі",
    select: "dentists",
  },
];
