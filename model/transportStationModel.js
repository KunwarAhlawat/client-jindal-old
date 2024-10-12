const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const transportStationModel = sequelize.define('transportStation',{
    transportId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transportName: {
        type: Sequelize.STRING
    },
    transportSource: {
        type: Sequelize.STRING
    },
    transportDestination: {
        type: Sequelize.STRING
    },
}); 

module.exports = transportStationModel