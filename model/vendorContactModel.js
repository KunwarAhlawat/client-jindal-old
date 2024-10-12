const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const vendorContactModel = sequelize.define('vendor_Contact',{
    vendorId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendorName: {
        type: Sequelize.STRING
    },
    designation: {
        type: Sequelize.STRING
    },
    mobileNumber: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
}); 

module.exports = vendorContactModel