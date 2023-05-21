import bcrypt from 'bcrypt'
import type express from 'express'
import User, { type UserAttributes } from '../db/models/user'
import Todo from '../db/models/todo'
import { utils } from '../utils'

const SALT_ROUNDS = 10

class UsersService {
  async one (id: string) {
    return await User.findByPk(id)
  }

  async create (data: Required<Pick<UserAttributes, 'email' | 'password'>>) {
    const isEmailTaken = await User.isEmailTaken(data.email)
    if (isEmailTaken) {
      throw new Error('Email is taken')
    }

    const hash = await bcrypt.hash(data.password, SALT_ROUNDS)
    const user = User.build({ ...data, password: hash })

    await user.save()

    if (user) {
      const attributes = user.toJSON()
      delete attributes.password
      return attributes
    }

    return user
  }

  async all () {
    return await User.findAll({
      include: 'todos'
    })
  }

  async allTodos (params: express.Request['params'] & { userId?: string }, query: express.Request['query']) {
    const { userId } = params

    const userTodos = await Todo.findAndCountAll({
      ...utils.defaultPaginationOptions(query),
      where: {
        userId
      }
    })

    return utils.paginationMeta(userTodos, query)
  }
}

export default new UsersService()
