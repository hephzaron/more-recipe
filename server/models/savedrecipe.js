/**
 * SavedRecipe Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } SavedRecipe
 */
export default (sequelize, DataTypes) => {
  const SavedRecipe = sequelize.define('SavedRecipe', {
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
  SavedRecipe.prototype.totalVotes = () => (
    parseInt(this.upVotes, 10) - parseInt(this.downVotes, 10)
  );
  return SavedRecipe;
};