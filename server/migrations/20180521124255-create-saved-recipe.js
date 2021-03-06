module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SavedRecipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recipeId: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
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
  }),
  down: queryInterface => queryInterface.dropTable('SavedRecipes')

};