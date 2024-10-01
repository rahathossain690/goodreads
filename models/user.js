const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');
const bcrypt = require('bcryptjs');

const SALT_ROUND = 10;

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUND);
});

module.exports = User;