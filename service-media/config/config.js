require('dotenv').config();
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,

  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_NAME,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_DIALECT
} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT,
    "port": DB_PORT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": PROD_DB_USERNAME,
    "password": PROD_DB_PASSWORD,
    "database": PROD_DB_NAME,
    "host": PROD_DB_HOST,
    "dialect": PROD_DB_DIALECT,
    "port": PROD_DB_PORT
  }
}
