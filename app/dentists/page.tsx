import SidebarSelect from "@/components/app-components/SidebarSelect.component";
import { Text } from "@/components/app-components/typography";
import PatientsTable from "@/components/app-components/PatientsTable";
import { routes } from "@/constants/sidebar.routes";
import axios from "axios";

export default async function Page() {
  const selected = 1;

  // -- feat: add card where will be displayed count of new patients compared to previous month

  const dentists = await axios
    .get("http://localhost:3001/dentists")
    .then((response) => {
      return response.data;
    });

  return (
    <main className="flex flex-row bg-[#f6f6f6]">
      <div className="w-[200px] h-screen bg-white overflow-y-scroll border-r hidden md:block">
        {routes.map((route, index) => (
          <SidebarSelect
            key={route.select}
            route={route}
            index={index}
            selected={selected}
          />
        ))}
      </div>
      <div className="w-full h-screen md:h-auto">
        <div className="bg-white h-12 w-full flex items-center border-b px-6">
          <Text variant="h4" className="select-none">
            {routes[0].title}
          </Text>
        </div>
        <div className="bg-white m-4 rounded-sm">
          <PatientsTable />
        </div>
      </div>
    </main>
  );
}
