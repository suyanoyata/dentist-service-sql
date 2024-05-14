import Path from "@/components/app-components/Path"
import PatientsTable from "@/components/app-components/PatientsTable"
import { Sidebar } from "@/components/app-components/Sidebar"
import { routes } from "@/constants/sidebar.routes"

export default function Page() {
  const selected = 1
  return (
    <main className="flex flex-row bg-[white]">
      <Sidebar selected={selected} />
      <div className="flex flex-col w-screen">
        <Path>{routes[selected].title}</Path>
        <PatientsTable />
      </div>
    </main>
  )
}
