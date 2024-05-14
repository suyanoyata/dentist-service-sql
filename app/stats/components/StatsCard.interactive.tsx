"use client";
import { Text } from "@/components/app-components/typography";

export const StatsCardInteractive = ({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: () => void;
}) => {
  return (
    <div
      onClick={action}
      className="min-w-[270px] w-[270px] bg-[#fafafa] rounded-md mt-2 p-2 select-none"
    >
      <Text variant="h6">{title}</Text>
      <Text variant="p" className="text-zinc-500">
        {children}
      </Text>
    </div>
  );
};
