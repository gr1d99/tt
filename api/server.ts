import app from './src/app'
import sequelizeConnection from './src/config/db-connect'

sequelizeConnection.authenticate().then(() => {
  console.log('Database connected')
}).catch((error: any) => {
  console.error('Database connection error, ', error)
})

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})
