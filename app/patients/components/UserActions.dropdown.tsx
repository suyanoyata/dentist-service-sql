import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PatientsContext } from "@/context/PatientsTable.context"
import { api } from "@/lib/axios"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useContext, useState } from "react"
import CreatePatientRecord from "./CreatePatientRecord.alert"
import { Patient } from "@/types/Patient"
import { Pencil, Plus, Trash } from "lucide-react"
import { CreatePatientVisit } from "./CreatePatientVisit.alert"

export function DropdownActions({ patient }: { patient: Patient }) {
  const { patients, setPatients } = useContext(PatientsContext)

  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [addOpen, setAddOpen] = useState<boolean>(false)

  function removePatient() {
    if (!patients) return
    api.delete(`/patients/remove/${patient.patient_id}`).then(() => {
      const updatedPatients = patients.filter(
        (p) => p.patient_id !== patient.patient_id,
      )
      setPatients([...updatedPatients])
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none outline-none border-none">
          <DotsHorizontalIcon className="stroke-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setAddOpen(true)
            }}
          >
            <Plus size={14} className="mr-2" />
            Додати відвідування
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Pencil size={14} className="mr-2" />
            Редагувати
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={removePatient}
            className="text-red-400 focus:text-red-400"
          >
            <Trash size={14} className="mr-2" />
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreatePatientRecord
        open={editOpen}
        id={patient.patient_id}
        setOpen={setEditOpen}
        action="edit"
        patient_defaults={patient}
      />
      <CreatePatientVisit open={addOpen} setOpen={setAddOpen} />
    </>
  )
}
