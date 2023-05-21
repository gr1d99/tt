import express from 'express'
import cors from 'cors'
import { beforeAll, describe } from '@jest/globals'
import request from 'supertest'
import UsersController from '../../src/controllers/users'
import sequelizeConnection from '../../src/config/db-connect'

const appInstance = () => {
  const app = express()
  const corsOptions = {
    origin: '*'
  }
  app.use(express.json())
  app.use(cors(corsOptions))
  app.use(express.urlencoded({ extended: true }))

  return app
}

describe('/users', () => {
  beforeAll(async () => {
    await sequelizeConnection.authenticate()
  })

  afterAll(async () => {
    await sequelizeConnection.close()
  })

  beforeEach(async () => {
    await sequelizeConnection.sync({ force: true })
  })

  describe('POST /users', () => {
    it('responds with status code 201', (done) => {
      const app = appInstance()
      app.post('/users', UsersController.create)

      void request(app)
        .post('/users')
        .send({ email: 'test@user.com', password: '1234567' })
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err instanceof Error) {
            return done(err)
          }

          return done()
        })
    })

    it('responds with status code 400', (done) => {
      const app = appInstance()
      app.post('/users', UsersController.create)

      void request(app)
        .post('/users')
        .send({ email: 'test@mail.com', password: '' })
        .expect(400)
        .end((err: any, _) => {
          if (err instanceof Error) {
            return done(err)
          }

          return done()
        })

      void request(app)
        .post('/users')
        .send({ email: '', password: '12345678' })
        .expect(400)
        .end((err, res) => done())
    })
  })

  describe('GET /users', () => {
    it('responds with status code 200', (done) => {
      const app = appInstance()
      app.get('/users', UsersController.all)
      void request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err instanceof Error) {
            return done(err)
          }

          return done()
        })
    })
  })
})
