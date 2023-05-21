import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'

import appRouter from './routes'
import requestBodyErrorHandler from './middlewares/request-body-error-handler'

dotenv.config()

const app = express()

const corsOptions = {
  origin: '*'
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' })
})

app.use(appRouter)
app.use(requestBodyErrorHandler)
export default app
