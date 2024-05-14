"use client"

import { stats_strings } from "@/constants/stats.constats"
import { StatsCardInteractive } from "./StatsCard.interactive"
import { StatsCard } from "./StatsCard"
import { Text } from "@/components/app-components/typography"
import { ChevronRight } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Patient } from "@/types/Patient"
import { formatDate } from "@/lib/format_date"

const JoinedPatientsCard = ({ stats }: { stats: any }) => {
  if (stats.this_month.count == 0) {
    return (
      <StatsCardInteractive title={"Немає нових пацієнтів😭"}>
        Цього місяця до нас не приєдналось жодного пацієнта
      </StatsCardInteractive>
    )
  }

  return (
    <StatsCardInteractive title={stats_strings.month_stats.title}>
      {stats_strings.month_stats.body(
        stats.this_month.count,
        stats.this_month.percent_difference,
      )}
      <AlertPatientsList stats={stats} />
    </StatsCardInteractive>
  )
}

const AlertPatientsList = ({ stats }: { stats: any }) => {
  if (stats.this_month.list.length === 0) return null
  return (
    <AlertDialog>
      <AlertDialogTrigger className="block w-full">
        <div className="flex justify-end items-center hover:underline cursor-pointer">
          <Text className="text-[#222]">Переглянути</Text>
          <ChevronRight size={18} className="text-[#222]" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            {stats.this_month.list.map((user: Patient, index: number) => (
              <div
                key={user.patient_id}
                className={`border-t py-3 ${index + 1 == stats.this_month.list.length ? "border-b" : ""} flex`}
              >
                <Text className="text-[#222]">{user.full_name}</Text>
                <Text className="ml-auto">
                  приєднався {formatDate(user.joined)}
                </Text>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрити</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ClientSideCards = ({ stats }: { stats: any }) => {
  return (
    <div className="flex gap-2 overflow-x-scroll">
      <JoinedPatientsCard stats={stats} />
      <StatsCard title={stats_strings.week_stats.title}>
        {stats_strings.week_stats.body(stats.this_week_visits_left)}
      </StatsCard>
    </div>
  )
}
