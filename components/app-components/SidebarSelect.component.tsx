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
      style={{
        borderLeftWidth: 2,
        // borderLeftWidth: selected == index ? 2 : 0,
        borderColor: selected == index ? "#e99a00" : "inherit",
      }}
      className={`flex items-center gap-3 ${selected == index ? "bg-[#fbf7f1]" : "bg-white"} ${selected !== index ? "hover:bg-[#fffbf6] hover:border-b-[#e99a00]" : "bg-inherit"} duration-100 py-2 pl-4 select-none`}
    >
      {route.icon(selected == index)}
      <Link href={`/${route.select}`}>
        <Text
          variant="p"
          className={selected == index ? "text-[#222]" : "text-[#676767]"}
        >
          {route.title}
        </Text>
      </Link>
    </div>
  );
}
