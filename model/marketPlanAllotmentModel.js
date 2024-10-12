const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const marketPigIronModel = sequelize.define('market_plan_allotment',{
    serialNumber:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    representative: {
        type: Sequelize.STRING,
        allowNull: false
    },
    meetingDates: {
        type: Sequelize.STRING,
        allowNull: false
    },
    currentIssue: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: true
}); 

module.exports = marketPigIronModel