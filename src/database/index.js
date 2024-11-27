const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'chat_lms';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASSEORD || 'Postgre9824.pac';
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: console.log,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = { sequelize };