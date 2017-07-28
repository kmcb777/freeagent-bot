import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import winston from 'winston'
import Raven from 'raven'

import web from './web'
import rest from './rest'

// Creates the logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ timestamp: true, colorize: true })
  ]
})

const server = express()
const port = process.env.PORT || 3000
const assetsPath = path.resolve(__dirname, './assets')

server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// Use sentry if DSN is defined
if (process.env.RAVEN_SENTRY_DSN) {
  Raven.config(process.env.RAVEN_SENTRY_DSN).install()
  server.use(Raven.requestHandler())
}

server.set('views', path.resolve(__dirname, './../src/web/views'))
server.set('view engine', 'pug')

server.use(web)
server.use('/api', rest)
server.use('/assets', express.static(assetsPath))

server.listen(port, () => {
  logger.info(`server running on ${port}`)
})
