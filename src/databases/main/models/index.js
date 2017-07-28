import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require('./../config/database.js')[env]
const url = require('url')

let options = {}

Object.keys(config).forEach(key => {
  const value = config[key]

  if (['database', 'username', 'password'].indexOf(key) === -1) {
    options[key] = value
  }

  if (key === 'use_env_variable') {
    if (process.env[value]) {
      const dbUrl = url.parse(process.env[value])

      const protocol = dbUrl.protocol.split(':')[0]

      options.database = dbUrl.pathname.substring(1)

      if (dbUrl.auth) {
        const auth = dbUrl.auth.split(':')

        options.username = auth[0]
        options.password = auth[1]
      }

      /* eslint-disable no-console */
      options = Object.assign(options, {
        protocol,
        host: dbUrl.hostname,
        port: dbUrl.port,
        dialect: protocol,
        logging: console.log
      })
      /* eslint-enable */
    }
  }
})

const sequelize = new Sequelize(options.database, options.username, options.password, options)
const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
