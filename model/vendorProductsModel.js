const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const vendorProductsModel = sequelize.define('vendor_product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    }
      
}); 


module.exports = vendorProductsModel