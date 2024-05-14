import LoadingCircle from "@/components/app-components/LoadingCircle"
import { Text } from "@/components/app-components/typography"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DentistsContext } from "@/context/PatientsTable.context"
import { api } from "@/lib/axios"
import { formatCount } from "@/lib/format_count"
import { formatDate } from "@/lib/format_date"
import { useContext, useEffect, useState } from "react"

enum VisitsLoading {
  IDLE,
  LOADING,
  LOADED,
  FAILED,
}

type Visit = {
  visit_id: number
  patient_id: number
  dentist_id: number
  visit_date: Date
  visit_status: string
}

export const PatientVisits = ({ id }: { id: number }) => {
  const [visits, setVisits] = useState<Visit[]>()
  const [open, setOpen] = useState<boolean>(false)
  const [state, setState] = useState<VisitsLoading>(VisitsLoading.IDLE)
  const { dentists } = useContext(DentistsContext)

  useEffect(() => {
    if (open == true && state == VisitsLoading.IDLE) {
      setState(VisitsLoading.LOADING)
      api
        .get(`/visits/${id}`)
        .then((visits) => {
          setVisits(visits.data.data)
          setState(VisitsLoading.LOADED)
        })
        .catch(() => {
          setState(VisitsLoading.FAILED)
        })
    }
  }, [state, open, id])

  const VisitsRender = () => {
    if (visits?.length == 0) {
      return (
        <div>
          <Text className="select-none">
            У цього пацієнта ще немає відвідувань
          </Text>
        </div>
      )
    } else {
      return (
        <Table className="select-none">
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[170px]">id відвідування</TableHead> */}
              <TableHead className="w-[100px]">Імʼя лікаря</TableHead>
              <TableHead className="text-right text-nowrap">
                Дата відвідування
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits?.map((visit) => {
              const dentist = dentists.find(
                (dentist) => dentist.dentist_id === visit.dentist_id,
              )

              if (!dentist) return

              return (
                <TableRow key={visit.visit_id}>
                  {/* <TableCell className="font-medium text-black">
                    {visit.visit_id}
                  </TableCell> */}
                  <TableCell className="font-medium text-nowrap text-black">
                    {dentist.full_name}
                  </TableCell>
                  <TableCell className="text-right text-nowrap text-black">
                    {formatDate(visit.visit_date)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true)
        }}
        className="hover:text-blue-400 hover:underline"
      >
        Переглянути
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="select-none">
            {state === VisitsLoading.LOADED && (
              <>
                {visits?.length + " "}
                {/* @ts-ignore */}
                {formatCount(visits?.length, [
                  "відвідування",
                  "відвідувань",
                  "відвідувань",
                ])}
              </>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {state == VisitsLoading.LOADING && <LoadingCircle />}
            {state == VisitsLoading.LOADED && <VisitsRender />}
            {state == VisitsLoading.FAILED && (
              <Text className="select-none">
                Сталася помилка під час загрузки
              </Text>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setState(VisitsLoading.IDLE)
              setOpen(false)
            }}
          >
            Закрити
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
