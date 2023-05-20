import express from "express";
import UsersController from "../controllers/users";
import validate from '../middlewares/json-validator'
import schemas from "../schemas";

const usersRouter = express.Router()

usersRouter
    .post(
    '/users',
    validate({
        body: schemas.usersSchema.create
    }),
    UsersController.create)
    .get('/users', UsersController.all)
    .get('/users/:id', UsersController.one)

export default usersRouter
