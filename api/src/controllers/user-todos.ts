import type express from 'express'
import { utils } from '../utils'
import UsersService from '../services/users'

class UserTodosController {
  async all (req: express.Request, res: express.Response) {
    try {
      const userTodos = await UsersService.allTodos(req.params, req.query)
      res.status(200).send(userTodos)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }
}

export default new UserTodosController()
