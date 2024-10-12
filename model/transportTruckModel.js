const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const transportTruckModel = sequelize.define('transport_Truck',{
    transportId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transportName: {
        type: Sequelize.STRING
    },
    transportTruck: {
        type: Sequelize.STRING
    },
    ownerName: {
        type: Sequelize.STRING
    },
    ownerMobileNumber: {
        type: Sequelize.INTEGER
    },
    driverName: {
        type: Sequelize.STRING
    },
    driverMobileNumber: {
        type: Sequelize.INTEGER
    },
    bodyType: {
        type: Sequelize.ENUM("FULL","HALF")
    },
    capacity: {
        type: Sequelize.STRING
    }

}); 

module.exports = transportTruckModel