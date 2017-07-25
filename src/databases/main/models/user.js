module.exports = (sequelize, DataTypes) => {
  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(254),
      unique: true,
      allowNull: false
    },
    password: DataTypes.CHAR(60),
    name: DataTypes.STRING(64),
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    deleted_at: DataTypes.DATE
  };
  const options = {
    timestamp: true
  };

  return sequelize.define('user', definition, options);
};
