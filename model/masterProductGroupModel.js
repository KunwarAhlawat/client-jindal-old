const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterProductGroupModel = sequelize.define('master_product_group',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productGroup: {
        type: Sequelize.STRING
    },
}); 

module.exports = masterProductGroupModel