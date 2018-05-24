'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * SavedRecipe Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } SavedRecipe
 */
exports.default = function (sequelize, DataTypes) {
  var SavedRecipe = sequelize.define('SavedRecipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        not: {
          args: /^[A-Z]+$/i,
          msg: 'SavedRecipe Id must be integer'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
      primaryKey: true,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
        }
      }
    }
  });
  SavedRecipe.prototype.totalVotes = function () {
    return parseInt(undefined.upVotes, 10) - parseInt(undefined.downVotes, 10);
  };
  return SavedRecipe;
};