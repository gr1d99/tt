import express from "express";

import {utils} from "../utils";
import UsersService from "../services/users";

class UsersController {
    static async create(req: express.Request, res: express.Response) {
        try {
            const user = await UsersService.create(req.body)
            res.status(201).json(user)
        } catch (e: any) {
            utils.errorResponse(e, res)
        }
    }

    static async all(req: express.Request, res: express.Response) {
        try {
            const users = await UsersService.all()
            res.status(200).json(users)
        } catch (e: any) {
            utils.errorResponse(e, res)
        }
    }
}

export default UsersController
