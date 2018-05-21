module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    salt: {
      allowNull: false,
      type: Sequelize.STRING
    },
    hash: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    age: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    sex: {
      allowNull: false,
      type: Sequelize.ENUM('Male', 'Female')
    },
    facebookOauthID: {
      allowNull: true,
      type: Sequelize.STRING
    },
    googleOauthID: {
      allowNull: true,
      type: Sequelize.STRING
    },
    resetPasswordToken: {
      allowNull: true,
      type: Sequelize.STRING
    },
    resetPasswordExpires: {
      allowNull: true,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
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
  down: queryInterface => queryInterface.dropTable('Users')
};