// @ts-nocheck

import { PrismaClient } from "@prisma/client"
import { queries } from "../constants/queries.sql"
import { count, percent_difference } from "../lib/utils"
import {
  CreateDentistBody,
  CreateNewPatient,
  CreateVisitBody,
} from "../types/BodyRequest.types"

const prisma = new PrismaClient()

const getStats = async () => {
  const joined_month_query = await prisma.$queryRawUnsafe(
    queries.joined_month_query,
  )
  const previous_month_query = await prisma.$queryRawUnsafe(
    queries.previous_month_query,
  )
  const this_week_query = await prisma.$queryRawUnsafe(
    queries.this_week_left_query,
  )

  const patients = await prisma.$queryRawUnsafe(queries.get_patients)
  const dentists = await prisma.$queryRawUnsafe(queries.get_dentists)
  const visits = await prisma.$queryRawUnsafe(queries.get_visits)
  const this_month_visits = await prisma.$queryRawUnsafe(
    queries.get_this_month_visits,
  )

  const this_month_count = count(joined_month_query)
  const previous_count = count(previous_month_query)
  const diff = percent_difference(this_month_count, previous_count)

  const this_week_visits_left = count(this_week_query)

  return {
    this_month: {
      list: joined_month_query,
      count: this_month_count,
      previous: previous_count,
      percent_difference: diff,
    },
    this_week_visits_left,
    stats_count: {
      patients: count(patients),
      dentists: count(dentists),
      visits: count(visits),
      this_month_visits: count(this_month_visits),
    },
  }
}

const getAllPatients = async () => {
  const query = await prisma.$queryRawUnsafe(queries.get_patients)

  return query
}

const getAllDentists = async () => {
  const query = await prisma.$queryRawUnsafe(queries.get_dentists)

  return query
}

const getDentistsForOptions = async () => {
  const query = await prisma.$queryRawUnsafe(queries.get_dentists_for_options)

  return query
}

const removePatients = async (id: number) => {
  try {
    await prisma.$queryRawUnsafe(
      `DELETE FROM medical_records WHERE patient_id = ${id}`,
    )
    await prisma.$queryRawUnsafe(
      `DELETE FROM patients WHERE patient_id = ${id}`,
    )

    return {
      message: "Patient was successfully removed",
    }
  } catch (error: any) {
    return {
      ...error,
    }
  }
}

const removeDentists = async (id: number) => {
  try {
    await prisma.$queryRawUnsafe(
      `DELETE FROM dentists WHERE dentist_id = ${id}`,
    )

    return {
      message: "Dentist was successfully removed",
    }
  } catch (error: any) {
    return {
      ...error,
    }
  }
}

type FiltersQuery = {
  full_name?: any
  diagnosis?: any
}

const filterPatients = async (filters: FiltersQuery): Promise<any> => {
  try {
    let query = `SELECT * FROM patients p, medical_records mr WHERE mr.patient_id = p.patient_id`

    for (const filter in filters) {
      if (filters[filter]) {
        query = query + ` AND ${filter} LIKE '%${filters[filter]}%'`
      }
    }

    const patients = await prisma.$queryRawUnsafe(query)

    return patients
  } catch (error: any) {
    return {
      code: "SQL_QRY_ERR",
      error,
    }
  }
}

type UpdatePatientBody = {
  full_name?: string
  date_of_birth?: Date
}

const updatePatients = async ({
  id,
  body,
}: {
  id: number
  body: UpdatePatientBody
}): Promise<any> => {
  try {
    console.log(body)
    const updateData: UpdatePatientBody = {} as UpdatePatientBody
    const parsedPatient = await prisma.patients.findUnique({
      where: {
        patient_id: id,
      },
      select: {
        full_name: true,
        date_of_birth: true,
      },
    })

    for (const key in parsedPatient) {
      updateData[key] = parsedPatient[key]
    }

    for (const key in body) {
      if (key in updateData) {
        updateData[key] = body[key]
      }
    }

    const updatedPatients = await prisma.patients.update({
      where: {
        patient_id: id,
      },
      data: updateData,
    })

    await updateDiagnosis(id, body["diagnosis"])

    return {
      status: 200,
      data: {
        ...updatedPatients,
        diagnosis: body.diagnosis,
      },
    }
  } catch (error) {
    return {
      status: 400,
      error: "Couldn't update patient",
      reason: error,
    }
  }
}

type UpdateDentistBody = {
  full_name?: string
  phone_number?: string
}

const updateDentist = async ({
  id,
  body,
}: {
  id: number
  body: UpdateDentistBody
}): Promise<any> => {
  try {
    const updateData: UpdateDentistBody = {} as UpdateDentistBody
    const parsedPatient = await prisma.dentists.findUnique({
      where: {
        dentist_id: id,
      },
      select: {
        full_name: true,
        phone_number: true,
      },
    })

    for (const key in parsedPatient) {
      updateData[key] = parsedPatient[key]
    }

    for (const key in body) {
      if (key in updateData) {
        updateData[key] = body[key]
      }
    }

    const updatedPatients = await prisma.dentists.update({
      where: {
        dentist_id: id,
      },
      data: updateData,
    })

    return {
      status: 200,
      data: {
        ...updatedPatients,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      status: 400,
      error: "Couldn't update dentist",
      reason: error,
    }
  }
}

const updateDiagnosis = async (id: number, diagnosis: string) => {
  try {
    const medical_record = await prisma.$queryRawUnsafe(
      queries.get_medical_record(id),
    )

    if (medical_record.length === 0) {
      return {
        error: "No medical record were found by given id",
      }
    }

    await prisma.$queryRawUnsafe(queries.update_diagnosis(id, diagnosis))

    return {
      message: `Updated diagnosis to "${diagnosis.toLowerCase()}"`,
    }
  } catch (error) {
    return { ...error }
  }
}

const getPatientVisits = async (id: number) => {
  const visits = await prisma.$queryRawUnsafe(queries.get_patient_visits(id))

  return visits
}

const getAllVisits = async () => {
  const visits = await prisma.$queryRawUnsafe(queries.get_visits)

  return visits
}

const createVisit = async (body: CreateVisitBody) => {
  try {
    const create_visit_request = await prisma.$executeRawUnsafe(
      queries.create_visit(body),
    )

    return create_visit_request
  } catch (error) {
    return error
  }
}

const createDentist = async (body: CreateDentistBody) => {
  try {
    await prisma.$executeRawUnsafe(queries.create_dentist(body))

    let last: any = await prisma.$queryRawUnsafe("SELECT last_insert_id()")

    last.forEach(async (element: any) => {
      last = element["last_insert_id()"].toString()
    })

    return {
      data: {
        dentist_id: last,
        ...body,
      },
    }
  } catch (error) {
    return error
  }
}

const addPatients = async (data: CreateNewPatient) => {
  try {
    await prisma.$queryRawUnsafe(queries.create_patient(data))

    let last: any = await prisma.$queryRawUnsafe("SELECT last_insert_id()")

    last.forEach(async (element: any) => {
      last = element["last_insert_id()"].toString()
      await prisma.$queryRawUnsafe(
        queries.create_medical_record(data.diagnosis, last),
      )
    })

    return {
      message: "Created a new record",
      data: {
        ...data,
        patient_id: last,
      },
    }
  } catch (error) {
    return {
      message: "Error while creating a new record",
      error,
    }
  }
}

export const api_service = {
  getStats,
  getAllPatients,
  getAllDentists,
  getDentistsForOptions,
  addPatients,
  removePatients,
  removeDentists,
  filterPatients,
  updatePatients,
  updateDentist,
  getPatientVisits,
  getAllVisits,
  createVisit,
  createDentist,
  updateDiagnosis,
}
