'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('allot_market_plans', 'EmpoyeeId', {
      type: Sequelize.STRING,
      references: {
        model: 'master_employees', // Name of Source Model
        key: 'empId', // Key in Source Model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('allot_market_plans', 'EmpoyeeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'master_employees',
        key: 'employeeNumber',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
