import { Request, Response } from "express"
import { api_service } from "../services/api.service"

const get_stats = async (req: Request, res: Response) => {
  const stats = await api_service.getStats()

  res.send({
    data: stats,
  })
}

const get_patients = async (req: Request, res: Response) => {
  const patients = await api_service.getAllPatients()

  res.send({
    data: patients,
  })
}

const get_dentists = async (req: Request, res: Response) => {
  const dentists = await api_service.getAllDentists()

  res.send({
    data: dentists,
  })
}

const get_dentists_for_options = async (req: Request, res: Response) => {
  const dentists = await api_service.getDentistsForOptions()

  res.send({
    data: dentists,
  })
}

type PatientRequest = {
  body: {
    name: string
    birth_date: string
    diagnosis: string
  }
} & Request

const add_patients = async (req: PatientRequest, res: Response) => {
  const request = await api_service.addPatients(req.body)

  res.send({
    data: request,
  })
}

const filter_patients = async (req: Request, res: Response) => {
  const request = await api_service.filterPatients(req.query)

  res.status(200).send({
    data: request,
  })
}

const remove_patients = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (typeof id != "number" || isNaN(id)) {
    res.status(400).send({
      message: `${req.params.id} is not valid as an id`,
    })
    return
  }

  const request = await api_service.removePatients(id)

  res.send(request)
}

const remove_dentists = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (typeof id != "number" || isNaN(id)) {
    res.status(400).send({
      message: `${req.params.id} is not valid as an id`,
    })
    return
  }

  const request = await api_service.removeDentists(id)

  res.send(request)
}

const update_patients = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (typeof id != "number" || isNaN(id)) {
    res.status(400).send({
      message: `${req.params.id} is not valid as an id`,
    })
    return
  }

  const response = await api_service.updatePatients({ id, body: req.body })

  res.status(response.status).send(response.data)
}

const update_dentist = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (typeof id != "number" || isNaN(id)) {
    res.status(400).send({
      message: `${req.params.id} is not valid as an id`,
    })
    return
  }

  const response = await api_service.updateDentist({ id, body: req.body })

  res.status(response.status).send(response.data)
}

const get_patient_visits = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (typeof id != "number" || isNaN(id)) {
    res.status(400).send({
      message: `${req.params.id} is not valid as an id`,
    })
    return
  }

  const response = await api_service.getPatientVisits(id)

  res.status(200).send({
    data: response,
  })
}

const get_all_visits = async (req: Request, res: Response) => {
  const response = await api_service.getAllVisits()

  res.status(200).send({
    data: response,
  })
}

const create_visit = async (req: Request, res: Response) => {
  await api_service.createVisit(req.body)

  res.status(200).send("Created a new visit")
}

const create_dentist = async (req: Request, res: Response) => {
  const new_dentist = await api_service.createDentist(req.body)

  res.status(200).send({
    data: new_dentist,
  })
}

const update_diagnosis = async (req: Request, res: Response) => {
  if (req.params?.id && isNaN(parseInt(req.params.id))) {
    res.status(400).send({
      message: `${req.params.id} is not a number`,
    })
    return
  }

  if (!req.body.diagnosis) {
    res.status(400).send({
      message: `No diagnosis provided`,
    })
    return
  }

  const request = await api_service.updateDiagnosis(
    parseInt(req.params.id),
    req.body.diagnosis,
  )

  res.status(200).send({
    ...request,
  })
}

export const api = {
  get_stats,
  get_patients,
  get_dentists,
  get_dentists_for_options,
  add_patients,
  filter_patients,
  remove_patients,
  update_patients,
  update_dentist,
  get_patient_visits,
  get_all_visits,
  create_visit,
  remove_dentists,
  create_dentist,
  update_diagnosis,
}
