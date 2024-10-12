'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addColumn(
      'master_Customers', // name of Source model
      'allotmentId', // name of the key we’re adding 
      {
        type: Sequelize.STRING,
        references: {
          model: 'allot_market_plans', // name of Target model
          key: 'allotmentId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
