import { Sidebar } from "@/components/app-components/Sidebar"
import DentistsTable from "./components/DentistsTable"
import Path from "@/components/app-components/Path"
import { routes } from "@/constants/sidebar.routes"

export default async function Page() {
  const selected = 2

  return (
    <main className="flex flex-row bg-[white]">
      <Sidebar selected={selected} />
      <div className="flex flex-col w-screen">
        <Path>{routes[selected].title}</Path>
        <DentistsTable />
      </div>
    </main>
  )
}
