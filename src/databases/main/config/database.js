module.exports = {
  'test': {
    'use_env_variable': 'MAIN_TEST_DATABASE_URL',
    'dialect': 'mysql'
  },
  'development': {
    'use_env_variable': 'MAIN_DATABASE_URL',
    'dialect': 'mysql'
  },
  'production': {
    'use_env_variable': 'MAIN_DATABASE_URL'
  }
};
