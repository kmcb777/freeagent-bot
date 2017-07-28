import Redis from 'ioredis'

const DemoOneRequests = require('./requests/demo-one')
const DemoTwoRequests = require('./requests/demo-two')

const redis = new Redis(process.env.AUTHENTICATION_DATABASE_URL)

export default Object.assign(
  DemoOneRequests(redis),
  DemoTwoRequests(redis)
)
