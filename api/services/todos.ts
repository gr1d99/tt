import Todo, {TodoAttributes} from "../db/models/todo";
import express from "express";
import {utils} from "../utils";


class TodosService {
    static async create(data: Required<TodoAttributes>) {
        const todo = Todo.build(data)
        await todo.save()
        return todo

    }

    static async all(query: express.Request['query']) {
        const page = parseInt(query.page as string || '0', 10)
        const limit = parseInt(query.limit as string || '10', 10)
        const data =  await Todo.findAndCountAll({
            offset: (page - 1) * limit,
            limit
        })

        return utils.paginationOptions(data, page, limit)
    }
}

export default TodosService