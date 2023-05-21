import { beforeAll, describe } from '@jest/globals'
import request from 'supertest'
import sequelizeConnection from '../../src/config/db-connect'
import app from '../../src/app'

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

    it('responds with status code 422', (done) => {
      void request(app)
        .post('/users')
        .send({ email: 'test@mail.com', password: '' })
        .expect(422)
        .end((err: any, _) => {
          if (err instanceof Error) {
            return done(err)
          }

          return done()
        })

      void request(app)
        .post('/users')
        .send({ email: '', password: '12345678' })
        .expect(422)
        .end((err, res) => {
          if (err instanceof Error) {
            return done(err)
          }

          return done()
        })
    })
  })

  describe('GET /users', () => {
    it('responds with status code 200', (done) => {
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
