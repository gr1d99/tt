import {Sequelize} from "sequelize";

const dbName = process.env.DB_NAME
const dbHost = process.env.DB_HOST
const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbDialect = process.env.DB_DIALECT || 'postgres'

console.log({dbName,dbHost, dbUsername, dbPassword, dbDialect })

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect
})

export default sequelizeConnection
