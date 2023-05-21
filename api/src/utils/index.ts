import {ValidationError, ValidationErrorItem} from "sequelize";
import {ValidationError as RequestBodyValidationError } from 'express-json-validator-middleware'
import express, {query} from "express";
import Todo from "../db/models/todo";

const buildModelErrors = (errors: ValidationErrorItem[]) => {
    return errors.map(error => {
        return error.message
    })
}

const buildRequestBodyErrors = (error: RequestBodyValidationError) => {
    return error.validationErrors.body?.map(error => {
        return error.message
    })
}

const errorResponse = (error: any, res: express.Response) => {
    if (error instanceof ValidationError) {
        return res.status(422).send({ errors: utils.buildModelErrors(error.errors) })
    }

    if (error.message) {
        return res.status(400).send({ errors: error.message })
    }

    res.status(500).send({ errors: JSON.stringify(error) })
}

const paginationOptionsFromQuery = (query: express.Request['query']) => {
    const page = parseInt(query.page as string || '0', 10)
    const limit = parseInt(query.limit as string || '10', 10)

    return {
        page,
        limit
    }
}
const defaultPaginationOptions = (query: express.Request['query']) => {
    const { page, limit } = paginationOptionsFromQuery(query)
    const draftOffset = (page - 1) * limit
    const offset = draftOffset < 0 ? 0 : draftOffset;
    return {
        offset,
        limit,
    }
}
const paginationMeta = (data: {rows: Todo[], count: number}, query: express.Request['query']) => {
    const { page, limit } = paginationOptionsFromQuery(query)
    const previous = page === 1 || page === 0 ? 1 : page - 1
    const diff = Math.ceil(data.count / limit)
    const nextPage = diff > page ? page + 1 : page

    return {
        page: page === 0 ? 1: page,
        limit,
        total: data.count,
        previous: previous,
        next: nextPage,
        data: data.rows,
    }
}

export const utils = {
    buildModelErrors,
    errorResponse,
    paginationMeta,
    buildRequestBodyErrors,
    defaultPaginationOptions
}