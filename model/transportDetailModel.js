const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const transportDetailModel = sequelize.define('transport_detail',{
    transportId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transportName: {
        type: Sequelize.STRING
    },
    transportArea: {
        type: Sequelize.STRING
    },
    transportStation: {
        type: Sequelize.STRING
    },
    transportOwner: {
        type: Sequelize.STRING
    },
    bankName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bankAccountNumber: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    ifscCode: {
        type: Sequelize.STRING,
        allowNull: false
    }
}); 

module.exports = transportDetailModel