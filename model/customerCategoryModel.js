const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const customerCategoryModel = sequelize.define('cust_category',{
    customerId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}); 

module.exports = customerCategoryModel