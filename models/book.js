const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Book;