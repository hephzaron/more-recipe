import dotEnv from 'dotenv';

dotEnv.config();

const {
  TEST_DB_NAME,
  TEST_DB_HOST,
  TEST_DB_PASSWORD,
  TEST_DB_USERNAME,
  PRODUCTION_DB_NAME,
  PRODUCTION_DB_HOST,
  PRODUCTION_DB_PASSWORD,
  PRODUCTION_DB_USERNAME,
  DEVELOPMENT_DB_NAME,
  DEVELOPMENT_DB_HOST,
  DEVELOPMENT_DB_PASSWORD,
  DEVELOPMENT_DB_USERNAME
} = process.env;

module.exports = {
  development: {
    username: DEVELOPMENT_DB_USERNAME,
    password: DEVELOPMENT_DB_PASSWORD,
    database: DEVELOPMENT_DB_NAME,
    host: DEVELOPMENT_DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: TEST_DB_USERNAME,
    password: TEST_DB_PASSWORD,
    database: TEST_DB_NAME,
    host: TEST_DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: PRODUCTION_DB_USERNAME,
    password: PRODUCTION_DB_PASSWORD,
    database: PRODUCTION_DB_NAME,
    host: PRODUCTION_DB_HOST,
    dialect: 'postgres'
  }
};