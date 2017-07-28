module.exports = {
  test: {
    use_env_variable: 'MAIN_TEST_DATABASE_URL',
    dialect: 'postgres'
  },
  development: {
    use_env_variable: 'MAIN_DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'MAIN_DATABASE_URL'
  }
}
