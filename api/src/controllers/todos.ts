import type express from 'express'
import TodosService from '../services/todos'
import { utils } from '../utils'

class TodosController {
  async one (req: express.Request, res: express.Response) {
    try {
      const todo = TodosService.one(req.params.id)

      if (todo === null) {
        return res.status(404).send({ errors: ['Todo not found'] })
      }

      res.status(200).send(todo)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }

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

  async update (req: express.Request, res: express.Response) {
    try {
      const todo = await TodosService.update({ ...req.body, id: req.params.id })

      if (todo === null) {
        return res.status(404).send({ errors: ['Todo not found!'] })
      }

      res.status(200).send(todo)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }

  async destroy (req: express.Request, res: express.Response) {
    try {
      await TodosService.destroy(req.params.id)
      res.status(204).send()
    } catch (e) {
      utils.errorResponse(e, res)
    }
  }
}

export default new TodosController()
