module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    upVotes: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    downVotes: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    favorites: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    dislikes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    photoUrl: {
      type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('Recipes')

};