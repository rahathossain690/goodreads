const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');
const User = require('./user');
const Review = require('./review');

const Comment = sequelize.define('Comment', {
  commentText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Review, { foreignKey: 'reviewId', onDelete: 'CASCADE' });

module.exports = Comment;