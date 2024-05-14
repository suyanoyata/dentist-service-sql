export const api_routes = {
  dentists: "/dentists",
  stats: "/api",
  patients: "/patients",
  patients_add: "/patients/add",
  dentists_add: "/dentists/create",
  update_patient_id: (id: number) => `/patients/update/${id}`,
  remove_dentist: (id: number) => `/dentists/remove/${id}`,
  dentist_autocomplete: "/options/dentists",
  update_dentist: (id: number) => `/dentists/update/${id}`,
}
