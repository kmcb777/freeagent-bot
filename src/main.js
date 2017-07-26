const express = require('express');
const web = require('./web');
const rest = require('./rest');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');

const server = express();
const port = process.env.SERVER_PORT || 3000;
const compiler = webpack(config);

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Use sentry if DSN is defined
if (process.env.RAVEN_SENTRY_DSN) {
  server.use(raven.middleware.express.requestHandler(process.env.RAVEN_SENTRY_DSN));
}

if (process.env.NODE_ENV !== 'production') {
  /*server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/assets/'
  }));*/

  server.use(require('webpack-hot-middleware')(compiler));
}

server.set('views', path.join(__dirname, '/web/views'));
server.set('view engine', 'pug');

server.use(web);
server.use('/api', rest);

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
