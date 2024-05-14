import { Text } from "@/components/app-components/typography";

export const StatsCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-w-[270px] w-[270px] bg-[#fafafa] rounded-md mt-2 p-2 select-none">
      <Text variant="h6">{title}</Text>
      <Text variant="p" className="text-zinc-500">
        {children}
      </Text>
    </div>
  );
};
