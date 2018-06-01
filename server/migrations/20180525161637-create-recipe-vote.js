module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RecipeVotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    upVotes: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    downVotes: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    likes: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    dislikes: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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