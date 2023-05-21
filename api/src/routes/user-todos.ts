import express from "express";
import UserTodosController from '../controllers/user-todos'

const userTodosRouter = express.Router()

userTodosRouter.get('/users/:userId/todos', UserTodosController.all)

export default userTodosRouter
