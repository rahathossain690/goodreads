const Sequelize = require('sequelize');
const config = require('../database/config.js');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

module.exports = {
    Sequelize,
    sequelize: sequelize
};