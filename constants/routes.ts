import { Express } from "express"
import { api } from "../controllers/api.controller"
import { validation } from "../middleware/validators.middleware"

export const routes = (app: Express) => {
  app.get("/api", api.get_stats)
  app.get("/patients", api.get_patients)
  app.get("/visits/:id", api.get_patient_visits)
  app.get("/visits/", api.get_all_visits)
  app.post("/patients/add", validation.validate_add_patient, api.add_patients)
  app.patch(
    "/patients/update/:id",
    validation.validate_update_patient,
    api.update_patients,
  )
  app.patch(
    "/dentists/update/:id",
    validation.validate_update_dentist,
    api.update_dentist,
  )
  app.delete("/patients/remove/:id", api.remove_patients)
  app.delete("/dentists/remove/:id", api.remove_dentists)
  app.get("/dentists", api.get_dentists)
  app.post("/visits/create", api.create_visit)
  app.post("/dentists/create", api.create_dentist)
  app.get("/patients/filter", api.filter_patients)
  app.get("/options/dentists", api.get_dentists_for_options)
}
