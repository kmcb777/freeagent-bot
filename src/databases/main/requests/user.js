module.exports = ({ UserModel }) => ({
  createUser: async (email, password) => {
    const options = {
      where: { email },
      defaults: {
        email,
        password
      },
      raw: true
    };

    return await UserModel.findOrCreate(options);
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

    return await UserModel.findOne(options);
  }
});
