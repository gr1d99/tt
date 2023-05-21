import express from "express";
import cors from "cors";
import {describe} from "@jest/globals";
import sequelizeConnection from "../../src/config/db-connect";
import UsersController from '../../src/controllers/users'
import request from 'supertest'

const appInstance = () => {
    const app = express()
    const corsOptions = {
        origin: '*',
    }
    app.use(express.json())
    app.use(cors(corsOptions))
    app.use(express.urlencoded({ extended: true }))

    return app
}

describe('POST /users', () => {
    beforeEach(async () => {
        await sequelizeConnection.authenticate()
        await sequelizeConnection.sync({ force: true })
    })

    afterEach(async () => {
        await sequelizeConnection.close()
    })

    it('creates user successfully', (done) => {
        const app = appInstance()
        app.post('/users', UsersController.create)
        request(app)
            .post('/users')
            .send({ email: 'test@user.com', password: "1234567" })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                }

                return done()
        })
    })
})

