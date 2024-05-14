import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dentist, DentistsContext } from "@/context/PatientsTable.context"
import { api } from "@/lib/axios"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useContext, useState } from "react"
import { Pencil, Plus, Trash } from "lucide-react"
import CreateDentistRecord from "./CreateDentistRecord.alert"
import { api_routes } from "@/constants/app.routes"

export function DentistActions({ dentist }: { dentist: Dentist }) {
  const { dentists, setDentists } = useContext(DentistsContext)

  const [editOpen, setEditOpen] = useState<boolean>(false)

  function removeDentist() {
    if (!dentists) return
    api.delete(api_routes.remove_dentist(dentist.dentist_id)).then(() => {
      const updatedDentists = dentists.filter(
        (d) => d.dentist_id !== dentist.dentist_id,
      )
      setDentists(updatedDentists)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none outline-none border-none mr-2">
          <DotsHorizontalIcon className="stroke-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Pencil size={14} className="mr-2" />
            Редагувати
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={removeDentist}
            className="text-red-400 focus:text-red-400"
          >
            <Trash size={14} className="mr-2" />
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateDentistRecord
        dentist_defaults={dentist}
        open={editOpen}
        setOpen={setEditOpen}
        id={dentist.dentist_id}
        action="edit"
      />
    </>
  )
}
