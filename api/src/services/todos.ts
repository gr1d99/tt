import type express from 'express'
import { type Optional } from 'sequelize'
import Todo, { type TodoAttributes } from '../db/models/todo'
import { utils } from '../utils'
import User from '../db/models/user'

type TodoData = Pick<TodoAttributes, 'description' | 'userId' | 'id'>
class TodosService {
  static async create (data: Omit<TodoData, 'id'>) {
    const todo = Todo.build(data)
    await todo.save()
    return todo
  }

  static async all (query: express.Request['query']) {
    const data = await Todo.findAndCountAll({
      ...utils.defaultPaginationOptions(query),
      include: [
        {
          model: User
        }
      ]
    })

    return utils.paginationMeta(data, query)
  }

  static async update (data: TodoData) {
    try {
      const todo = await Todo.findByPk(data.id)

      if (todo === null) {
        return todo
      }

      const toUpdateAttrs: Optional<TodoData, 'id'> = { ...data }
      delete toUpdateAttrs.id

      await todo.update(toUpdateAttrs)
      await todo.reload()

      return todo
    } catch (e: any) {
      throw Error(e)
    }
  }

  static async destroy (id: string) {
    try {
      const todo = await Todo.findByPk(id)

      if (todo === null) {
        return todo
      }

      await todo.destroy()

      return todo
    } catch (e: any) {
      throw Error(e)
    }
  }
}

export default TodosService
