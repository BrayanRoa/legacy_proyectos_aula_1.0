/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { Application } from 'express'
import cors from 'cors'
import personaRouter from './routes/persona.routes'
import { sequelize } from './db/conexion'
import './db/models/index.models'

export class Server {
  private readonly app: Application
  private readonly PORT: string
  private readonly rutas

  constructor () {
    this.app = express()
    this.PORT = process.env.PORT ?? '3000'
    this.rutas = {
      ejemplo: '/api/personas'
    }

    this.db()
    this.middlewares()
    this.routes()
  }

    async db () {
      try {
        await sequelize.sync({force:false})
        console.log(`Conexión a BD exitosa!!`);
      } catch (error) {
        console.log(`No se pudo establecer la conexion - ${error}`);
      }
    }

  private middlewares (): any {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private routes () {
    this.app.use(this.rutas.ejemplo, personaRouter)
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT} - http://localhost:${this.PORT}`)
    })
  }
}

new Server().listen()
