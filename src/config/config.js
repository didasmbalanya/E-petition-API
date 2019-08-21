require("@babel/register");

require('dotenv').config();

console.log(process.env.DB_USER)

module.exports =  {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: `${process.env.DB_NAME}_development`,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": `${process.env.DB_NAME}_test`,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": `${process.env.DB_NAME}_production`,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
};
