import express from 'express'
import cors from 'cors'
import appRouter from "./routes";
import "./config/db-connect";

const app = express()

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
    res.status(200).send({ message: 'pong' })
})

app.use(appRouter)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
