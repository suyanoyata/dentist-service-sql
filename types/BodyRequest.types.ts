export type CreateVisitBody = {
  patient_id: number
  dentist_id: number
  visit_date: Date
  visit_status: string
}

export type CreateDentistBody = {
  full_name: string
  phone_number: number
}

export type CreateNewPatient = {
  full_name: string
  date_of_birth: Date
  diagnosis: string
}
