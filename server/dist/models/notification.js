'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Notification Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } Notification
 */
exports.default = function (sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You haven\'t selected a notification yet'
        },
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Notification Id must be integer'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'User Id must be integer'
        }
      }
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipient Id must be integer'
        }
      }
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Parent Id must be integer'
        }
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
        }
      }
    },
    notificationType: {
      type: DataTypes.ENUM('Likes', 'Review'),
      allowNull: false
    }
  });

  Notification.associate = function (models) {
    Notification.belongsTo(models.User, {
      foreignKey: 'recipientId',
      targetKey: 'id'
    });
    Notification.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      targetKey: 'id'
    });
  };
  return Notification;
};