import {ValidationError, ValidationErrorItem} from "sequelize";
import {ValidationError as RequestBodyValidationError } from 'express-json-validator-middleware'
import express from "express";
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

const paginationOptions = (data: {rows: Todo[], count: number}, page: number, limit: number) => {
    const previous = page === 1 ? 1 : page - 1
    const diff = Math.ceil(data.count / limit)
    const nextPage = diff > page ? page + 1 : page

    return {
        page: page,
        limit: limit,
        total: data.count,
        previous: previous,
        next: nextPage,
        data: data.rows,
    }
}

export const utils = {
    buildModelErrors,
    errorResponse,
    paginationOptions,
    buildRequestBodyErrors
}