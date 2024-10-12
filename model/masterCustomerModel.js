const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterCustomerModel = sequelize.define('master_Customer',{
    customerId:{
        type: Sequelize.STRING,
         primaryKey: true
    },
    customerCode:{
        type: Sequelize.STRING
    },
    customerName:{
        type: Sequelize.STRING
    },
    area: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM("VERIFIED","UNVERIFIED" )
    },
    grade: {
        type: Sequelize.STRING
    },
    pincode: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING
    },
    referenceName1: {
        type: Sequelize.STRING
    },
    reference1ContactNumber: {
        type: Sequelize.STRING
    },
    referenceName2: {
        type: Sequelize.STRING
    },
    reference2ContactNumber: {
        type: Sequelize.STRING
    },
    creditLimit: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    creditDays: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    CustomerStatus: {
        type: Sequelize.ENUM("active","inactive" ,"closed")
    }, 
    allotmentId: {
        type: Sequelize.STRING,
        references: {
          model: 'allot_market_plans', // name of Target model
          key: 'allotmentId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
},{
    timestamps: false
}); 


module.exports = masterCustomerModel