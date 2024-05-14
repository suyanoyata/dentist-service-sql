import { Text } from "@/components/app-components/typography"
import { routes } from "@/constants/sidebar.routes"
import { ChevronRight } from "lucide-react"
import { ClientSideCards } from "./components/ClientSide.cards"
import { Sidebar } from "@/components/app-components/Sidebar"
import { api } from "@/lib/axios"
import { api_routes } from "@/constants/app.routes"
import Path from "@/components/app-components/Path"

export default async function Page() {
  const selected = 0
  let err = ""
  const stats = await api
    .get(api_routes.stats)
    .then((r) => {
      console.log(r)
      return r.data.data
    })
    .catch((e) => {
      console.log(e)
      err = e.code
    })

  const statsCount = [
    {
      title: "Кількість пацієнтів",
      count: stats?.stats_count?.patients,
    },
    {
      title: "Кількість лікарів",
      count: stats?.stats_count?.dentists,
    },
    {
      title: "Кількість відвідувань",
      count: stats?.stats_count?.visits,
    },
    {
      title: "Відвідування місяця",
      count: stats?.stats_count?.this_month_visits,
    },
  ] as const

  const ResponseRender = () => {
    if (!stats) {
      return (
        <div className="w-full flex items-center justify-center h-screen">
          <Text variant="sm" className="text-zinc-500">
            Відсутнє підключення з базою даних або сервером (
            <span className="text-black">{err}</span>)
          </Text>
        </div>
      )
    }

    return (
      <>
        <ClientSideCards stats={stats} />
        <Text variant="h6" className="mt-2 ">
          Статистика
        </Text>
        <div className="min-w-[330px] w-[330px] bg-[#fafafa] rounded-md p-2 select-none mt-1 flex flex-wrap gap-4">
          {statsCount.map((stat) => (
            <div className="w-[145px]" key={stat.title}>
              <Text variant="sm">{stat.title}</Text>
              <Text variant="h3" className="text-zinc-500">
                {stat.count}
              </Text>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <main className="flex flex-row bg-[#f6f6f6]">
      <Sidebar selected={selected} />
      <div className="w-full h-screen md:h-auto bg-white">
        <Path>{routes[selected].title}</Path>
        <main className="mx-4">
          <ResponseRender />
        </main>
      </div>
    </main>
  )
}
