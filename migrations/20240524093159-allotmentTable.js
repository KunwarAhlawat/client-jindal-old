'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allot_market_plan', {
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
        defaultValue: 'running', // Set the default value
        allowNull: false, // Make the field non-null
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
          model: 'master_employees', // Name of Source Model
          key: 'employeeNumber', // Key in Source Model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('allot_market_plan');
  }
};
