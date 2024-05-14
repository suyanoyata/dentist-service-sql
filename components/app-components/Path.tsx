import { ChevronRight } from "lucide-react"
import { Text } from "./typography"

export default function Path({ children }: { children: string }) {
  return (
    <div className="ml-4 mt-3 flex flex-row items-center gap-1 select-none">
      <Text variant="h6" className="text-zinc-600">
        Головна
      </Text>
      <ChevronRight className="text-zinc-600" size={18} />
      <Text variant="h6">{children}</Text>
    </div>
  )
}
