import type express from 'express'

import * as console from 'console'
import { utils } from '../utils'
import UsersService from '../services/users'

class UsersController {
  async one (req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.one(req.params.id)

      if (user == null) {
        return res.status(404).send({ errors: ['user not found'] })
      }

      return res.status(200).send(user)
    } catch (e) {
      utils.errorResponse(e, res)
    }
  }

  async create (req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }

  async all (req: express.Request, res: express.Response) {
    try {
      const users = await UsersService.all()
      res.status(200).json(users)
    } catch (e: any) {
      utils.errorResponse(e, res)
    }
  }
}

export default new UsersController()
