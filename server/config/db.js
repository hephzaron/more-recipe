require('dotenv').config();

const {
  TEST_DB_NAME,
  TEST_DB_HOST,
  TEST_DB_PORT,
  TEST_DB_PASSWORD,
  TEST_DB_USERNAME,
  PRODUCTION_DB_NAME,
  PRODUCTION_DB_HOST,
  PRODUCTION_DB_PORT,
  PRODUCTION_DB_PASSWORD,
  PRODUCTION_DB_USERNAME,
  DEVELOPMENT_DB_NAME,
  DEVELOPMENT_DB_HOST,
  DEVELOPMENT_DB_PORT,
  DEVELOPMENT_DB_PASSWORD,
  DEVELOPMENT_DB_USERNAME,
  DATABASE_URL
} = process.env;

const match = DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

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
    username: match[1],
    password: match[2],
    host: match[3],
    port: match[4],
    database: match[5],
    dialect: 'postgres'
  }
};