import { Patient } from "@/types/Patient"
import { createContext } from "react"

export const PatientsContext = createContext<{
  patients: Patient[]
  setPatients: (patients: Patient[]) => void
}>({
  patients: [],
  setPatients: (patients: Patient[]) => {},
})

export type DentistOption = {
  value: string
  label: string
}

export const IndexContext = createContext<{
  index: number
  setIndex: (index: number) => void
}>({
  index: 0,
  setIndex: (index: number) => {},
})

export const DentistOptionContext = createContext<{
  dentistOptions: DentistOption[]
  setDentistOptions: (dentistOptions: DentistOption[]) => void
}>({
  dentistOptions: [],
  setDentistOptions: (dentistOptions: DentistOption[]) => {},
})

export type Dentist = {
  full_name: string
  dentist_id: number
  phone_number: string
}

export const DentistsContext = createContext<{
  dentists: Dentist[]
  setDentists: (dentists: Dentist[]) => void
}>({
  dentists: [],
  setDentists: (dentists: Dentist[]) => {},
})
