"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { DatePicker } from "./DatePicker.component"
import { ComboBox } from "./DiagnosisDropdown.component"
import { api } from "@/lib/axios"

import { Text } from "@/components/app-components/typography"
import { api_routes } from "@/constants/app.routes"
import LoadingCircle from "@/components/app-components/LoadingCircle"
import { IndexContext, PatientsContext } from "@/context/PatientsTable.context"
import { Plus } from "lucide-react"
import { diganosis_list } from "@/constants/diagnosis"

export type FormFields = {
  full_name: string
  date_of_birth: Date
  diagnosis: string
}

enum SubmitState {
  inactive,
  submitting,
  successfull,
  failed,
}

export default function CreatePatientRecord({
  patient_defaults,
  open,
  setOpen,
  id,
  action = "add",
}: {
  patient_defaults?: {
    date_of_birth: Date
    full_name: string
    diagnosis: string
  }
  id?: number
  open?: boolean
  setOpen?: (open: boolean) => void
  action?: "add" | "edit"
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      ...patient_defaults,
      diagnosis: patient_defaults?.diagnosis?.toLowerCase(),
    },
  })

  const [submitState, setSubmitState] = useState<SubmitState>(
    SubmitState.inactive,
  )

  const { patients, setPatients } = useContext(PatientsContext)
  const { index } = useContext(IndexContext)

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setSubmitState(SubmitState.submitting)
    if (submitState !== SubmitState.submitting) {
      if (action == "add") {
        api
          .post(api_routes.patients_add, {
            ...data,
          })
          .then((res) => {
            setPatients([...patients, res.data.data.data])
            setSubmitState(SubmitState.successfull)
            setOpen ? setOpen(false) : setInnerOpen(false)
          })
          .catch(() => {
            setSubmitState(SubmitState.failed)
          })
      }
      if (action == "edit" && id && patients) {
        api
          .patch(`/patients/update/${id}`, {
            ...data,
          })
          .then((response) => {
            const updatedPatient = response.data
            const updatedPatients = [...patients]
            updatedPatients[index] = updatedPatient
            setPatients(updatedPatients)
            setSubmitState(SubmitState.successfull)
            setOpen ? setOpen(false) : setInnerOpen(false)
          })
      }
    }
  }

  const watchFields = watch(["date_of_birth", "diagnosis"])

  useEffect(() => {
    register("date_of_birth", {
      value: undefined,
      valueAsDate: true,
      required: "Вкажіть дату народження",
    })
    register("diagnosis", {
      value: undefined,
      required: "Вкажіть діагноз пацієнта",
    })
  }, [register])

  const formRef: any = useRef(null)

  const NameInputField = () => {
    return (
      <div>
        <Input
          className="w-full"
          placeholder="Повне ім'я"
          {...register("full_name", {
            minLength: {
              value: 6,
              message: "Ім'я повинно містити хоча би 6 символів",
            },
            maxLength: {
              value: 255,
              message: "Ім'я не може перевищувати 255 символів",
            },
            required: "Вкажіть повне ім'я",
          })}
        />
        {errors.full_name?.message && (
          <Text className="text-red-400" variant="sm">
            {errors.full_name.message}
          </Text>
        )}
      </div>
    )
  }

  const [innerOpen, setInnerOpen] = useState<boolean>(false)

  return (
    <AlertDialog open={open ? open : innerOpen}>
      <AlertDialogTrigger
        className="self-end ml-auto"
        onClick={() => {
          setOpen ? setOpen(true) : setInnerOpen(true)
        }}
      >
        {action == "add" && (
          <Button className="w-[180px] flex items-center gap-1" variant="link">
            <Plus size={18} />
            Додати пацієнта
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action == "add" ? "Додати пацієнта" : "Редагувати пацієнта"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <NameInputField />
              <div>
                <DatePicker
                  set="date_of_birth"
                  placeholder="Оберіть дату народження"
                  date={watchFields[0]}
                  setValue={setValue}
                />
                {errors.date_of_birth?.message && (
                  <Text className="text-red-400" variant="sm">
                    {errors.date_of_birth.message}
                  </Text>
                )}
              </div>
              <div>
                <ComboBox
                  selectOptionLabel="Оберіть діагноз"
                  options={diganosis_list}
                  set="diagnosis"
                  value={watchFields[1]}
                  setValue={setValue}
                />
                {errors.diagnosis?.message && (
                  <Text className="text-red-400" variant="sm">
                    {errors.diagnosis.message}
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
              setOpen ? setOpen(false) : setInnerOpen(false)
            }}
          >
            Закрити
          </AlertDialogCancel>
          <AlertDialogAction
            className="min-w-20"
            onClick={(e) => {
              e.preventDefault()
              formRef.current?.click()
            }}
          >
            {submitState !== SubmitState.submitting ? (
              action == "add" ? (
                "Додати"
              ) : (
                "Редагувати"
              )
            ) : (
              <LoadingCircle />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
