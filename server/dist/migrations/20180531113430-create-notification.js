'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      recipientId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      parentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      recipeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      notificationType: {
        allowNull: false,
        type: Sequelize.ENUM('Likes', 'Review')
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Notifications');
  }
};