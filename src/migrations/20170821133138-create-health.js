'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('health', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      before_due: {
        type: Sequelize.INTEGER
      },
      after_due: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down:(queryInterface) => queryInterface.dropTable('health'),
};