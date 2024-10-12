const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const customerProductModel = sequelize.define('cust_product',{
    customerId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    }
      
}); 


module.exports = customerProductModel