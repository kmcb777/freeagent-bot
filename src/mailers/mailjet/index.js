const Mailjet = require('node-mailjet');
const DemoDispatches = require('./mails/demo');

let mailjet = Mailjet.connect(
  process.env.MAILJET_API_PUBLIC_KEY,
  process.env.MAILJET_API_PRIVATE_KEY
);

module.exports = Object.assign(
  DemoDispatches(mailjet)
);
