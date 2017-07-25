// loading env variables from .env. needed to do this here for migrations scripts.
require('dotenv').config()

module.exports = {
  'development': {
    'use_env_variable': 'MAIN_DATABASE_URL'
  },
  'production': {
    'use_env_variable': 'MAIN_DATABASE_URL'
  }
};
