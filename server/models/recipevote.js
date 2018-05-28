/**
 * Vote Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } Vote
 */
export default (sequelize, DataTypes) => {
  const RecipeVote = sequelize.define('RecipeVote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Vote Id must be integer'
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
      primaryKey: true,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
        }
      }
    },
    upVotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    downVotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    likes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dislikes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  RecipeVote.prototype.handleVotes = function manageVotes(opts) {
    let upvotes = null;
    let downvotes = null;
    const { upVotes, downVotes } = this;
    if (opts.upVotes) {
      downvotes = downVotes ? upVotes : downVotes;
      upvotes = !upVotes;
    }
    if (opts.downVotes) {
      upvotes = upVotes ? downVotes : upVotes;
      downvotes = !downVotes;
    }
    return {
      upvotes,
      downvotes
    };
  };

  RecipeVote.prototype.handleLikes = function manageLikes(opts) {
    let like = null;
    let dislike = null;
    const { likes, dislikes } = this;
    if (opts.likes) {
      dislike = dislikes ? likes : dislikes;
      like = !likes;
    }
    if (opts.dislikes) {
      like = likes ? dislikes : likes;
      dislike = !dislikes;
    }
    return {
      like,
      dislike
    };
  };
  RecipeVote.associate = (models) => {
    RecipeVote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      targetKey: 'id'
    });
  };
  return RecipeVote;
};