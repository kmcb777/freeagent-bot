const express = require('express');
const web = require('./web');
const rest = require('./rest');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000;

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Use sentry if DSN is defined
if (process.env.RAVEN_SENTRY_DSN) {
  server.use(raven.middleware.express.requestHandler(process.env.RAVEN_SENTRY_DSN));
}

server.set('views', path.join(__dirname, '/web/views'));
server.set('view engine', 'pug');

server.use(web);
server.use('/api', rest);

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
