'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('histories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            bookId: {
                type: Sequelize.INTEGER
            },
            date_collected: {
                type: Sequelize.DATE
            },
            date_returned: {
                type: Sequelize.DATE
            },
            date_due: {
                type: Sequelize.DATE
            },
            returned: {
                type: Sequelize.BOOLEAN
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        }),
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('histories');
    }
};