const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');
const User = require('./user');
const Book = require('./book');

const Review = sequelize.define('Review', {
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });

module.exports = Review;