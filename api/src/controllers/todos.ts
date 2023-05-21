import type express from 'express'
import TodosService from '../services/todos'
import { utils } from '../utils'

class TodosController {
  async create (req: express.Request, res: express.Response) {
    try {
      const todo = await TodosService.create(req.body)
      res.status(201).send(todo)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }

  async all (req: express.Request, res: express.Response) {
    try {
      const todos = await TodosService.all(req.query)
      res.status(200).send(todos)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }
}

export default new TodosController()
