import { routes } from "@/constants/sidebar.routes"
import SidebarSelect from "./SidebarSelect.component"

export const Sidebar = ({ selected }: { selected: number }) => {
  return (
    <div className="duration-300 transition-all h-screen bg-[#fafafa] overflow-y-scroll w-0 min-w-0 md:min-w-[230px] pt-2">
      {routes.map((route, index) => (
        <SidebarSelect
          key={route.select}
          route={route}
          index={index}
          selected={selected}
        />
      ))}
    </div>
  )
}
