const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');
const User = require('./user');

const Follow = sequelize.define('Follow', {
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    followedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
});

Follow.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
Follow.belongsTo(User, { as: 'followed', foreignKey: 'followedId' });

module.exports = Follow;