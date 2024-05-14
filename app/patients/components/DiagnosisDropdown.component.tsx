"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UseFormSetValue } from "react-hook-form"

export function ComboBox({
  options,
  value,
  setValue,
  set,
  selectOptionLabel = "Оберіть...",
  searchLabel = "Шукати",
  noOptionsFoundLabel = "Нічого не знайдено",
}: {
  options: { value: any; label: string }[] | undefined
  value: string | number
  setValue: UseFormSetValue<any>
  set: string
  selectOptionLabel?: string
  searchLabel?: string
  noOptionsFoundLabel?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8"
        >
          {value && options
            ? options.find((option) => option.value === value)?.label
            : selectOptionLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchLabel} />
          <CommandEmpty>{noOptionsFoundLabel}</CommandEmpty>
          <CommandGroup>
            {options &&
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-accent"
                  onSelect={() => {
                    setValue(set, option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function ComboBoxTraditional({
  options,
  value,
  setValue,
  selectOptionLabel = "Оберіть...",
  searchLabel = "Шукати",
  noOptionsFoundLabel = "Нічого не знайдено",
}: {
  options: { value: any; label: string }[] | undefined
  value: string | undefined
  setValue: (value: string) => void
  selectOptionLabel?: string
  searchLabel?: string
  noOptionsFoundLabel?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8"
        >
          {value && options
            ? options.find((option) => option.value === value)?.label
            : selectOptionLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchLabel} />
          <CommandEmpty>{noOptionsFoundLabel}</CommandEmpty>
          <CommandGroup>
            {options &&
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-accent"
                  onSelect={() => {
                    setValue(option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
