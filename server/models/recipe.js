/**
 * Recipe Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } Recipe
 */
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You haven\'t selected a recipe to update yet'
        },
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The name of recipe is required'
        },
        is: {
          args: /^(\w\s?)+$/i,
          msg: 'Name of recipe must contain alphanumeric characters and single space only'
        },
        len: {
          args: [3, 50],
          msg: 'Name of recipe must be between 3 and 50 characters'
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
    favorites: {
      type: DataTypes.INTEGER,
      set() {
        this.setDataValue('favorites', this.favorites + 1);
      },
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'Favorites must be an integer'
        }
      }
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'Invalid photo url'
        }
      }
    }
  });
  Recipe.prototype.totalVotes = function calcTotalVotes() {
    return parseInt(this.upVotes, 10) - parseInt(this.downVotes, 10);
  };
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id'
    });
    Recipe.belongsToMany(models.User, {
      through: models.SavedRecipe,
      foreignKey: 'recipeId',
      as: 'savedRecipe',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.RecipeVote, {
      foreignKey: 'recipeId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Notification, {
      foreignKey: 'recipeId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Recipe;
};