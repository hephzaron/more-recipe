module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RecipeVotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    upVotes: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    downVotes: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    likes: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    dislikes: {
      allowNull: false,
      defaultValue: 0,
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
  down: queryInterface => queryInterface.dropTable('RecipeVotes')
};