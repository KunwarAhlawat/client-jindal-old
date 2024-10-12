const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterVendorsModel = sequelize.define('master_vendors',{
    vendorId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendorName:{
        type: Sequelize.STRING
    },
    vendorAddress: {
        type: Sequelize.STRING
    },
    area: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
}); 

module.exports = masterVendorsModel