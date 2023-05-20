import express from "express";
import usersRouter from "./users";
import todosRouter from "./todos";
import userTodosRouter from "./user-todos";

const appRouter = express.Router()

appRouter.use(usersRouter).use(todosRouter).use(userTodosRouter)

export default appRouter
