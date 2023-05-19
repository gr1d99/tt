import {ValidationError} from "sequelize";
import express from "express";
import Todo from "../db/models/todo";

const buildModelErrors = (errors: ValidationError[]) => {
    return errors.map(error => {
        return error.message
    })
}

const errorResponse = (error: any, res: express.Response) => {
    if (error.errors) {
        return res.status(422).send({ error: utils.buildModelErrors(error.errors) })
    }

    if (error.message) {
        return res.status(400).send({ message: error.message })
    }

    res.status(500).send({ message: JSON.stringify(error) })
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
    paginationOptions
}