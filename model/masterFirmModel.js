const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterFirmModel = sequelize.define('master_firm',{
    firmId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firmName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    GSTNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bankName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    IFSCcode:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ProductProduced:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

}); 

module.exports = masterFirmModel