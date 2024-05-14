"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Patient } from "@/types/Patient"
import { api } from "@/lib/axios"
import { api_routes } from "@/constants/app.routes"
import {
  Dentist,
  DentistOption,
  DentistOptionContext,
  DentistsContext,
  IndexContext,
  PatientsContext,
} from "@/context/PatientsTable.context"
import { DentistActions } from "./DentistActions.dropdown"
import CreateDentistRecord from "./CreateDentistRecord.alert"

export default function DentistsTable() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [dentistOptions, setDentistOptions] = useState<DentistOption[]>([])
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    api.get(api_routes.patients).then((response) => {
      setPatients(response.data.data)
    })
    api.get(api_routes.dentist_autocomplete).then((response) => {
      setDentistOptions(response.data.data)
    })
    api.get(api_routes.dentists).then((response) => {
      setDentists(response.data.data)
    })
  }, [])

  const Dentist = ({ dentist, index }: { dentist: Dentist; index: number }) => {
    return (
      <TableRow>
        <TableCell className="font-medium">{dentist.dentist_id}</TableCell>
        <TableCell className="font-medium">{dentist.full_name}</TableCell>
        <TableCell className="text-right text-nowrap">
          {dentist.phone_number}
        </TableCell>
        <TableCell
          className="text-right flex justify-end mr-0 pr-0 gap-4 items-baseline"
          onMouseOver={() => {
            setIndex(index)
          }}
        >
          <DentistActions dentist={dentist} />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <PatientsContext.Provider value={{ patients, setPatients }}>
      <DentistOptionContext.Provider
        value={{ dentistOptions, setDentistOptions }}
      >
        <DentistsContext.Provider value={{ dentists, setDentists }}>
          <IndexContext.Provider value={{ index, setIndex }}>
            <CreateDentistRecord />
            <Table className="select-none">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">id</TableHead>
                  <TableHead className="w-[200px]">Імʼя</TableHead>
                  <TableHead className="w-[200px] text-right text-nowrap">
                    Мобільний телефон
                  </TableHead>
                  <TableHead className="text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dentists &&
                  dentists.map((dentist: Dentist, index: number) => (
                    <Dentist
                      index={index}
                      key={dentist?.dentist_id}
                      dentist={dentist}
                    />
                  ))}
              </TableBody>
            </Table>
          </IndexContext.Provider>
        </DentistsContext.Provider>
      </DentistOptionContext.Provider>
    </PatientsContext.Provider>
  )
}
