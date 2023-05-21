import express from 'express'
import TodosController from '../controllers/todos'

const todosRouter = express.Router()

todosRouter
  .post('/todos', TodosController.create)
  .get('/todos', TodosController.all)
  .put('/todos/:id', TodosController.update)
  .delete('/todos/:id', TodosController.destroy)

export default todosRouter
