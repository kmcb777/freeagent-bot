export default (sequelize, DataTypes) =>
  sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: true
  })
