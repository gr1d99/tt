import {Sequelize} from "sequelize";

const dbName = 'node_rest_101_dev'
const dbHost = '127.0.0.1'
const dbUsername = 'gr1d99'
const dbPassword = ''
const dbDialect = 'postgres'

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect
})

sequelizeConnection.authenticate().then(() => {
    console.log('Database connected')
}).catch((error: any) => {
    console.error('Database connection error, ', error)
})

export default sequelizeConnection
