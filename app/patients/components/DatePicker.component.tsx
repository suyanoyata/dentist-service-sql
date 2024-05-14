"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Text } from "@/components/app-components/typography"

export function DatePicker({
  date,
  setValue,
  placeholder = "Оберіть дату",
  fromDate,
  set,
}: {
  date: Date
  setValue: any
  set: string
  placeholder?: string
  fromDate?: Date
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <Text variant="sm">{placeholder}</Text>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          fromDate={fromDate}
          mode="single"
          selected={date}
          onSelect={(value) => {
            setValue(set, value)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
