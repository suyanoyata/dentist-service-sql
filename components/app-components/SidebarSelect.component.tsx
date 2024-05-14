import { Text } from "@/components/app-components/typography";
import Link from "next/link";

type Route = {
  icon: (selected: boolean) => React.ReactNode;
  title: string;
  select: string;
};

export default function SidebarSelect({
  selected,
  index,
  route,
}: {
  selected: number;
  index: number;
  route: Route;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${selected == index ? "bg-[#222]" : "inherit"} mx-3 my-1 rounded-xl duration-100 py-2 pl-4 select-none`}
    >
      {route.icon(selected == index)}
      <Link href={`/${route.select}`}>
        <Text
          variant="p"
          className={selected == index ? "text-white" : "text-[#676767]"}
        >
          {route.title}
        </Text>
      </Link>
    </div>
  );
}
