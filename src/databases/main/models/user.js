module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },{
    tableName: 'users',
    underscored: true,
    timestamps: true
  })
}
