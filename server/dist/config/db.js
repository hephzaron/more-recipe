'use strict';

require('dotenv').config();

var _process$env = process.env,
    TEST_DB_NAME = _process$env.TEST_DB_NAME,
    TEST_DB_HOST = _process$env.TEST_DB_HOST,
    TEST_DB_PORT = _process$env.TEST_DB_PORT,
    TEST_DB_PASSWORD = _process$env.TEST_DB_PASSWORD,
    TEST_DB_USERNAME = _process$env.TEST_DB_USERNAME,
    PRODUCTION_DB_NAME = _process$env.PRODUCTION_DB_NAME,
    PRODUCTION_DB_HOST = _process$env.PRODUCTION_DB_HOST,
    PRODUCTION_DB_PORT = _process$env.PRODUCTION_DB_PORT,
    PRODUCTION_DB_PASSWORD = _process$env.PRODUCTION_DB_PASSWORD,
    PRODUCTION_DB_USERNAME = _process$env.PRODUCTION_DB_USERNAME,
    DEVELOPMENT_DB_NAME = _process$env.DEVELOPMENT_DB_NAME,
    DEVELOPMENT_DB_HOST = _process$env.DEVELOPMENT_DB_HOST,
    DEVELOPMENT_DB_PORT = _process$env.DEVELOPMENT_DB_PORT,
    DEVELOPMENT_DB_PASSWORD = _process$env.DEVELOPMENT_DB_PASSWORD,
    DEVELOPMENT_DB_USERNAME = _process$env.DEVELOPMENT_DB_USERNAME,
    DATABASE_URL = _process$env.DATABASE_URL;


module.exports = {
  development: {
    username: DEVELOPMENT_DB_USERNAME,
    password: DEVELOPMENT_DB_PASSWORD,
    database: DEVELOPMENT_DB_NAME,
    host: DEVELOPMENT_DB_HOST,
    port: DEVELOPMENT_DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: TEST_DB_USERNAME,
    password: TEST_DB_PASSWORD,
    database: TEST_DB_NAME,
    host: TEST_DB_HOST,
    port: TEST_DB_PORT,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: DATABASE_URL,
    dialect: 'postgres'
  }
};