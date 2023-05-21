import { ValidationError, type ValidationErrorItem } from 'sequelize'
import { type ValidationError as RequestBodyValidationError } from 'express-json-validator-middleware'
import type express from 'express'
import type Todo from '../db/models/todo'
import { DEFAULT_PAGINATION_LIMIT } from '../constants'

const buildModelErrors = (errors: ValidationErrorItem[]) => errors.map((error) => error.message)

const buildRequestBodyErrors = (error: RequestBodyValidationError) => error.validationErrors.body?.map((err) => err.message)

const errorResponse = (error: any, res: express.Response) => {
  if (error instanceof ValidationError) {
    res.status(422).send({ errors: utils.buildModelErrors(error.errors) })
    return
  }

  if (error instanceof Error) {
    res.status(400).send({ errors: error.message })
    return
  }

  res.status(500).send({ errors: JSON.stringify(error) })
}

const paginationOptionsFromQuery = (query: express.Request['query'] & { page?: string | number, limit?: string | number }) => {
  const page = parseInt(query.page as string || '0', 10)
  const limit = parseInt(query.limit as string || DEFAULT_PAGINATION_LIMIT.toString(), 10)

  return {
    page,
    limit
  }
}
const defaultPaginationOptions = (query: express.Request['query']) => {
  const { page, limit } = paginationOptionsFromQuery(query)
  const draftOffset = (page - 1) * limit
  const offset = draftOffset < 0 ? 0 : draftOffset
  return {
    offset,
    limit
  }
}
const paginationMeta = (data: { rows: Todo[], count: number }, query: express.Request['query']) => {
  const { page, limit } = paginationOptionsFromQuery(query)
  const previous = page === 1 || page === 0 ? 1 : page - 1
  const diff = Math.ceil(data.count / limit)
  const nextPage = diff > page ? page + 1 : page

  return {
    page: page === 0 ? 1 : page,
    limit,
    total: data.count,
    previous,
    next: nextPage,
    data: data.rows
  }
}

export const utils = {
  buildModelErrors,
  errorResponse,
  paginationMeta,
  buildRequestBodyErrors,
  defaultPaginationOptions
}
