const Redis = require('ioredis');
const DemoOneRequests = require('./requests/demo-one');
const DemoTwoRequests = require('./requests/demo-two');

const redis = new Redis(process.env.AUTHENTICATION_DATABASE_URL);

module.exports = Object.assign(
  DemoOneRequests(redis),
  DemoTwoRequests(redis)
);
