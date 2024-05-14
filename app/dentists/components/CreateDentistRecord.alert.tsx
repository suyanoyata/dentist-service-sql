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
import { api } from "@/lib/axios"

import { Text } from "@/components/app-components/typography"
import { api_routes } from "@/constants/app.routes"
import LoadingCircle from "@/components/app-components/LoadingCircle"
import { DentistsContext, IndexContext } from "@/context/PatientsTable.context"
import { Plus } from "lucide-react"

export type FormFields = {
  full_name: string
  phone_number: string
}

enum SubmitState {
  inactive,
  submitting,
  successfull,
  failed,
}

export default function CreateDentistRecord({
  dentist_defaults,
  open,
  setOpen,
  id,
  action = "add",
}: {
  dentist_defaults?: {
    full_name: string
    phone_number: string
  }
  id?: number
  open?: boolean
  setOpen?: (open: boolean) => void
  action?: "add" | "edit"
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: dentist_defaults,
  })

  const [submitState, setSubmitState] = useState<SubmitState>(
    SubmitState.inactive,
  )

  const { dentists, setDentists } = useContext(DentistsContext)
  const { index } = useContext(IndexContext)

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setSubmitState(SubmitState.submitting)
    if (submitState !== SubmitState.submitting) {
      if (action == "add") {
        api
          .post(api_routes.dentists_add, {
            ...data,
          })
          .then((res) => {
            setDentists([...dentists, res.data.data.data])
            setSubmitState(SubmitState.successfull)
            setOpen ? setOpen(false) : setInnerOpen(false)
          })
          .catch(() => {
            setSubmitState(SubmitState.failed)
          })
      }
      if (action == "edit" && id && dentists) {
        api
          .patch(api_routes.update_dentist(id), {
            ...data,
            phone_number: data.phone_number.toString(),
          })
          .then((response) => {
            const updatedDentist = response.data
            const updatedDentists = [...dentists]
            updatedDentists[index] = updatedDentist
            setDentists(updatedDentists)
            setSubmitState(SubmitState.successfull)
            setOpen ? setOpen(false) : setInnerOpen(false)
          })
      }
    }
  }

  const formRef: any = useRef(null)

  const NameInputField = () => {
    return (
      <>
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
        <div>
          <Input
            className="w-full"
            placeholder="Номер телефону"
            {...register("phone_number", {
              minLength: {
                value: 6,
                message: "Номер повинен містити хоча би 6 символів",
              },
              maxLength: {
                value: 15,
                message: "Номер телефону не може перевищувати 255 символів",
              },
              required: "Вкажіть номер телефону",
              valueAsNumber: true,
            })}
          />
          {errors.phone_number?.message && (
            <Text className="text-red-400" variant="sm">
              {errors.phone_number.message}
            </Text>
          )}
        </div>
      </>
    )
  }

  const [innerOpen, setInnerOpen] = useState<boolean>(false)

  return (
    <AlertDialog open={open ? open : innerOpen}>
      <AlertDialogTrigger
        className="self-end"
        onClick={() => {
          setOpen ? setOpen(true) : setInnerOpen(true)
        }}
      >
        {action == "add" && (
          <Button
            className="mb-2 mr-2 w-[180px] flex items-center gap-1"
            variant="link"
          >
            <Plus size={18} />
            Додати лікаря
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action == "add" ? "Додати лікаря" : "Редагувати лікаря"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <NameInputField />
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
