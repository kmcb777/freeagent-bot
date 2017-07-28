import Mailjet from 'node-mailjet'
import DemoDispatches from './mails/demo'

const mailjet = Mailjet.connect(
  process.env.MAILJET_API_PUBLIC_KEY,
  process.env.MAILJET_API_PRIVATE_KEY
)

module.exports = Object.assign(
  DemoDispatches(mailjet)
)
