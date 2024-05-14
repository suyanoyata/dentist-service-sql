import { Text } from "@/components/app-components/typography"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useContext, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { DatePicker } from "./DatePicker.component"
import { ComboBox } from "./DiagnosisDropdown.component"
import {
  DentistOptionContext,
  IndexContext,
  PatientsContext,
} from "@/context/PatientsTable.context"
import { api } from "@/lib/axios"

export type PatientVisitForm = {
  patient_id: number
  dentist_id: number
  visit_date: Date
}

type Dentists = {
  label: string
  value: string
}

export const CreatePatientVisit = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientVisitForm>()

  const watchFields = watch(["visit_date", "dentist_id"])

  useEffect(() => {
    register("visit_date", {
      value: undefined,
      valueAsDate: true,
      required: "Вкажіть дату відвідування",
    })
    register("dentist_id", {
      value: undefined,
      required: "Вкажіть лікаря",
    })
  }, [register])

  const { dentistOptions } = useContext(DentistOptionContext)
  const { patients } = useContext(PatientsContext)
  const { index } = useContext(IndexContext)

  const onSubmit: SubmitHandler<PatientVisitForm> = (data) => {
    const visitBody = {
      patient_id: patients[index].patient_id,
      dentist_id: data.dentist_id,
      visit_date: data.visit_date,
      visit_status: "запланований",
    }

    api.post("/visits/create", {
      ...visitBody,
    })

    setOpen(false)
  }

  const formRef: any = useRef(null)

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="select-none">
            Додати відвідування
          </AlertDialogTitle>
          <AlertDialogDescription>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <DatePicker
                  set="visit_date"
                  fromDate={new Date()}
                  placeholder="Оберіть дату відвідування"
                  date={watchFields[0]}
                  setValue={setValue}
                />
                {errors.visit_date?.message && (
                  <Text className="text-red-400 mt-1" variant="sm">
                    {errors.visit_date.message}
                  </Text>
                )}
              </div>
              <div>
                <ComboBox
                  set="dentist_id"
                  selectOptionLabel="Оберіть лікаря"
                  options={dentistOptions}
                  value={watchFields[1]}
                  setValue={setValue}
                />
                {errors.dentist_id?.message && (
                  <Text className="text-red-400 mt-1" variant="sm">
                    {errors.dentist_id.message}
                  </Text>
                )}
              </div>
              <input type="submit" className="w-0 h-0 hidden" ref={formRef} />
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false)
            }}
          >
            Закрити
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              formRef.current?.click()
            }}
          >
            Створити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
