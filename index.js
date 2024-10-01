const express = require('express');
const sequelize = require('./database/config.js');


const app = express();
app.use(express.json());

const routes = require('./routes');
app.use(routes);

const prepareDummyData = require('./database/prepareDummyData.js');

const port = process.env.PORT || 5000;
sequelize
    .sync({ force: true })
    .then(async () => {
        await prepareDummyData()
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on ${port}`);}
        );
    });