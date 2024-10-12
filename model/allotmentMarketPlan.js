const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const allotmentModel = sequelize.define('allot_market_plan',{
   
    allotmentId: {
        type: Sequelize.STRING,
         primaryKey: true,
      },
      planTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PlanStatus: {
        type: Sequelize.ENUM('running', 'completed', 'cancel'),
        defaultValue: 'running', // Default status is 'running'
        allowNull: false, // Cannot be null
      },
      StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EndDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EmpoyeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_employees', // 'Authors' refers to the table name
          key: 'employeeNumber',
        },
         onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
}); 

module.exports = allotmentModel