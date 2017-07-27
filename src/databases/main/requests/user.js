export default ({ UserModel }) => ({
  createUser: async (email, password) => {
    const options = {
      where: { email },
      defaults: {
        email,
        password
      },
      raw: true
    }

    return UserModel.findOrCreate(options)
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
    }

    return UserModel.findOne(options)
  }
})
