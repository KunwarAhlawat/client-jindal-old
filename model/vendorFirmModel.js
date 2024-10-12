const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const vendorFirmModel = sequelize.define('vendor_firm',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firm: {
        type: Sequelize.STRING,
        allowNull: true
    }
}); 

module.exports = vendorFirmModel