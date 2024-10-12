const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const customerFirmModel = sequelize.define('cust_firm',{
    customerId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firm: {
        type: Sequelize.STRING,
        allowNull: true
    }
}); 

module.exports = customerFirmModel