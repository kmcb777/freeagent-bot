'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/database.js')[env];
var url       = require('url');

console.log('config')
console.log(config)
console.log(require(__dirname + '/../config/database.js'))

var options = {};

Object.keys(config).forEach(function (key) {
  const value = config[key]

  if (['database', 'username', 'password'].indexOf(key) === -1) {
    options[key] = value;
  }

  if (key === 'use_env_variable') {
    if (process.env[value]) {
      var dbUrl = url.parse(process.env[value]);

      var protocol = dbUrl.protocol.split(':')[0];

      options.database = dbUrl.pathname.substring(1);

      if (dbUrl.auth) {
        var auth = dbUrl.auth.split(':');

        options.username = auth[0];
        options.password = auth[1];
      }

      options = Object.assign(options, {
        host: dbUrl.hostname,
        port: dbUrl.port,
        dialect: protocol,
        protocol: protocol,
        logging: console.log
      });
    }
  }
});

var sequelize = new Sequelize(options.database, options.username, options.password, options);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    console.log('model')
    console.log(model)
    console.log(typeof model)
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
