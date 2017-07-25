module.exports = sequelize => ({
  createUser: async (email, password) => {
    const options = {
      where: { email },
      defaults: {
        email,
        password
      },
      raw: true
    };

    return await sequelize.findOrCreate(options);
  },
  selectUserByEmail: async email => {
    const options = {
      where: { email },
      attributes: [
        'id',
        'password',
        'confirmed',
        'active'
      ],
      raw: true
    };

    return await sequelize.findOne(options);
  }
});
