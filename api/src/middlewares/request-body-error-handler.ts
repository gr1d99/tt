import type express from 'express'
import { ValidationError } from 'express-json-validator-middleware'
import { utils } from '../utils'

const requestBodyErrorHandler = async (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof ValidationError) {
    res.status(422).send({ errors: utils.buildRequestBodyErrors(error) })
    next()
  }

  next(error)
}

export default requestBodyErrorHandler
