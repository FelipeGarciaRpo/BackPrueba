const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'moderator'),
      allowNull: false,
    },
  },
  {
    tableName: 'users', // Fuerza el uso de la tabla `users`
  }
);

module.exports = User;