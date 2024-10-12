const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const reportModel = sequelize.define('reports', {

  reportId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  issue: {
    type: Sequelize.STRING,

  },
  report: {
    type: Sequelize.STRING,

  },

  meetingTime: {
    type: Sequelize.DATE,

  },
  nextMeetingTime: {
    type: Sequelize.DATE,

  },
  meetingStatus: {
    type: Sequelize.STRING,

  },
  empId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'master_employees', // 'Authors' refers to the table name
      key: 'empId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  customerId: {
    type: Sequelize.STRING,
    allowNull: false,

    references: {
      model: 'master_Customers', // 'Authors' refers to the table name
      key: 'customerId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
});

module.exports = reportModel