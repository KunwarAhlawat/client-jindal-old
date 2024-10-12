'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('reports', {
      reportId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.STRING
      },
      empId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'master_employees',  // name of the table the foreign key references
          key: 'empId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      customerId: { 
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'master_customers',  // name of the table the foreign key references
          key: 'customerId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      meetingTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      nextMeetingTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      report: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      issue: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

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
