import express from "express";
import usersRouter from "./users";
import todosRouter from "./todos";

const appRouter = express.Router()

appRouter.use(usersRouter).use(todosRouter)

export default appRouter
