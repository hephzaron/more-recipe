'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Review Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } Review
 */
exports.default = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You haven\'t selected a review to update yet'
        },
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Review Id must be integer'
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
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The description field is required'
        },
        escape: true
      }
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'Upvotes must be an integer'
        }
      }
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'Downvotes must be an integer'
        }
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'Likes must be an integer'
        }
      }
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'dislikes must be an integer'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  });
  Review.prototype.totalVotes = function () {
    return parseInt(undefined.upVotes, 10) - parseInt(undefined.downVotes, 10);
  };
  Review.associate = function (models) {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'RecipeReviews',
      targetKey: 'id'
    });
  };
  return Review;
};