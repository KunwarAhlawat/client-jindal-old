const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const transportContactModel = sequelize.define('transport_Contact',{
    transportId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transportName: {
        type: Sequelize.STRING
    },
    contactName: {
        type: Sequelize.STRING
    },
    designation: {
        type: Sequelize.STRING
    },
    mobileNumber: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
}); 

module.exports = transportContactModel