const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const UsersRequests = require('./requests/users');

const sequelize = new Sequelize(process.env.MAIN_DATABASE_URL);

const models = {
  UserModel: UserModel(sequelize, Sequelize.DataTypes)
};

module.exports = Object.assign(
  UsersRequests(models.UserModel)
);
