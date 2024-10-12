const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterProductsModel = sequelize.define('master_products',{
    productId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName:{
        type : Sequelize.STRING
    },
    productGroup: {
        type: Sequelize.STRING
    },
},{
    timestamps: false
}); 

module.exports = masterProductsModel