const express = require('express');
const web = require('./web');
const rest = require('./rest');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000;
const assetsPath = path.resolve(__dirname, './build/app/assets');

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Use sentry if DSN is defined
if (process.env.RAVEN_SENTRY_DSN) {
  server.use(raven.middleware.express.requestHandler(process.env.RAVEN_SENTRY_DSN));
}

server.set('views', path.resolve(__dirname, './web/views'));
server.set('view engine', 'pug');

server.use(web);
server.use('/api', rest);

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(assetsPath));
}

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
