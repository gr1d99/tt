import { type Dialect } from 'sequelize'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT?: string
      PWD: string
      DB_NAME: string
      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_DIALECT: Dialect
    }
  }
}

export {}
