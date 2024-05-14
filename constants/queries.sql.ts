import {
  CreateDentistBody,
  CreateNewPatient,
  CreateVisitBody,
} from "../types/BodyRequest.types"

const joined_month_query =
  "SELECT * FROM patients WHERE MONTH(joined) = MONTH(CURRENT_DATE)"
const previous_month_query =
  "SELECT * FROM patients WHERE MONTH(joined) = MONTH(CURRENT_DATE) - 1"
const this_week_left_query =
  "SELECT * FROM visits WHERE WEEK(visit_date) = WEEK(CURRENT_DATE) AND YEAR(visit_date) = YEAR(CURRENT_DATE) AND DAY(visit_date) >= DAY(CURRENT_DATE)"
const get_patients =
  "SELECT * FROM patients INNER JOIN medical_records ON patients.patient_id = medical_records.patient_id"
const get_dentists = "SELECT * FROM dentists"
const get_dentists_for_options =
  "SELECT full_name as label, dentist_id as value FROM dentists"
const get_visits = "SELECT * FROM visits"
const get_this_month_visits =
  "SELECT * FROM visits WHERE MONTH(visit_date) = MONTH(CURRENT_DATE)"
const get_patient_visits = (id: number) => {
  return `SELECT v.* FROM visits v, patients p WHERE v.patient_id = p.patient_id AND p.patient_id = ${id}`
}
const create_visit = (body: CreateVisitBody) => {
  return `INSERT INTO visits (patient_id, dentist_id, visit_date, visit_status) VALUES ('${body.patient_id}', '${body.dentist_id}', '${body.visit_date}', '${body.visit_status}')`
}
const create_dentist = (body: CreateDentistBody) => {
  return `INSERT INTO dentists (full_name, phone_number) VALUES ('${body.full_name}', '${body.phone_number}')`
}
const create_patient = (data: CreateNewPatient) => {
  return `INSERT INTO patients(full_name, date_of_birth)
VALUES ('${data.full_name}', '${new Date(data.date_of_birth).toISOString().split("T")[0]}')`
}
const get_medical_record = (id: number) => {
  return `SELECT * FROM medical_records mr WHERE mr.patient_id = ${id}`
}
const update_diagnosis = (id: number, diagnosis: string) => {
  return `UPDATE medical_records SET diagnosis = '${diagnosis.toLowerCase()}' WHERE patient_id = ${id}`
}
const create_medical_record = (diagnosis: string, patient_id: number) => {
  return `INSERT INTO medical_records(patient_id, diagnosis) VALUES (${patient_id}, '${diagnosis}')`
}

export const queries = {
  joined_month_query,
  previous_month_query,
  this_week_left_query,
  get_patients,
  get_dentists,
  get_dentists_for_options,
  get_visits,
  get_this_month_visits,
  get_patient_visits,
  create_visit,
  create_dentist,
  create_patient,
  get_medical_record,
  update_diagnosis,
  create_medical_record,
  // api.service.ts 144 (updatePatients)
}
