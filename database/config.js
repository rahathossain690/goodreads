const { Sequelize } = require('sequelize');
require('dotenv').config();

const config = {
    dev: {
        storage: "./database.sqlite",
        dialect: "sqlite",
        logging: false,
    },
    test: {
        storage: ":memory:", 
        dialect: "sqlite",
        logging: false,
    },
};

const env = process.env.NODE_ENV || 'dev';
const envConfig = config[env]; 

const sequelize = new Sequelize({
    dialect: envConfig.dialect,
    storage: envConfig.storage,
    logging: envConfig.logging,
});

module.exports = sequelize;