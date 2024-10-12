const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const marketPlanQuantityLedgerModel = sequelize.define('market_plan_quantity_ledger',{
    serialNumber:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    delivery : {
        type: Sequelize.STRING,
        allowNull: false
    }
    
    
},{
    timestamps: true
}); 

module.exports = marketPlanQuantityLedgerModel