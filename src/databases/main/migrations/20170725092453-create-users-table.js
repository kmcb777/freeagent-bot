module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        email: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        charset: 'utf8' // default: null
      }
    )
  },
  down: queryInterface => {
    queryInterface.dropTable('users')
  }
}
