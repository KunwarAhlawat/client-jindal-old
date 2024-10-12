const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const marketPlanPigIronModel = sequelize.define('market_plan_pig_iron',{
    serialNumber:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
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
    lastDelivery: {
        type: Sequelize.STRING,
        allowNull: false
    },
    representative: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    meetingDates: {
        type: Sequelize.STRING,
        allowNull: false
    },
    currentRemark: {
        type: Sequelize.STRING,
        allowNull: true
    },
    remarkStatus: {
        type: Sequelize.ENUM("VERIFIED","UNVERIFIED")
    },
    nextDate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentIssue: {
        type: Sequelize.STRING,
        allowNull: true
    },
    analysed: {
        type: Sequelize.STRING,
        allowNull: true
    },
    updateTimeStamp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    totalIssue: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: true
}); 

module.exports = marketPlanPigIronModel