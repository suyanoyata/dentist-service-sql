import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

const validate_add_patient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationRules = [
    body("full_name")
      .isLength({ min: 4, max: 255 })
      .withMessage(
        "Name must be more than 4 and less than 255 characters long.",
      )
      .optional(),
    body("date_of_birth")
      .isISO8601()
      .withMessage(`Expected date format, got ${req.body.birth_date}`)
      .optional(),
    body("diagnosis")
      .isString()
      .withMessage("Diagnosis is not valid value")
      .optional(),
  ]

  Promise.all(validationRules.map((validation) => validation.run(req))).then(
    () => {
      const errors = validationResult(req)
      const errorMsgs = errors
        .array()
        .map((item: any) => ({ where: item.path, err: item.msg }))
      if (errors.isEmpty()) {
        next()
      } else {
        res.status(400).send({ status: 400, message: "Error", data: errorMsgs })
      }
    },
  )
}

const validate_update_patient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationRules = [
    body("full_name").isLength({ min: 4, max: 255 }).isString(),
    body("date_of_birth")
      .isISO8601()
      .withMessage(`Expected date format, got ${req.body.birth_date}`),
    body("diagnosis").isString().withMessage("Diagnosis is not valid value"),
  ]

  Promise.all(validationRules.map((validation) => validation.run(req))).then(
    () => {
      const errors = validationResult(req)
      const errorMsgs = errors
        .array()
        .map((item: any) => ({ where: item.path, err: item.msg }))
      if (errors.isEmpty()) {
        next()
      } else {
        res.status(400).send({ status: 400, message: "Error", data: errorMsgs })
      }
    },
  )
}

const validate_update_dentist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationRules = [
    body("full_name").isLength({ min: 4, max: 255 }).isString(),
    body("phone_number")
      .isString()
      .withMessage(`Phone number is incorrect (${req.body.phone_number})`),
  ]

  Promise.all(validationRules.map((validation) => validation.run(req))).then(
    () => {
      const errors = validationResult(req)
      const errorMsgs = errors
        .array()
        .map((item: any) => ({ where: item.path, err: item.msg }))
      if (errors.isEmpty()) {
        next()
      } else {
        res.status(400).send({ status: 400, message: "Error", data: errorMsgs })
      }
    },
  )
}

export const validation = {
  validate_add_patient,
  validate_update_patient,
  validate_update_dentist,
}
