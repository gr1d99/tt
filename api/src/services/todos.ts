import Todo, {TodoAttributes} from "../db/models/todo";
import express from "express";
import {utils} from "../utils";
import User from "../db/models/user";


class TodosService {
    static async create(data: Pick<TodoAttributes, 'description' | 'userId'>) {
        const todo = Todo.build(data)
        await todo.save()
        return todo

    }

    static async all(query: express.Request['query']) {

        const data =  await Todo.findAndCountAll({
            ...utils.defaultPaginationOptions(query),
            include: [
                {
                    model: User
                }
            ]
        })

        return utils.paginationMeta(data, query)
    }
}

export default TodosService