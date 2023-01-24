
import express, { json } from 'express'
import mongoose from 'mongoose'
import http from 'node:http'
import { Server } from 'socket.io'
import { cors } from './middlewares/cors'

import { usersRoutes } from './routes/users.routes'
import { environment } from './utils/environment'

import { websocketRun } from './websocket/websocket'

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

mongoose.set('strictQuery', true)
mongoose.connect(environment.mongoURI)
  .then(() => {
    websocketRun()

    app.use(cors)
    app.use(json())
    app.use(usersRoutes)


    const port = process.env.PORT || 3001
    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.log("Não foi possível conectar ao MongoDB")
    console.log(error.message)
  })

