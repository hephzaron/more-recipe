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
      primaryKey: true,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^(0||1)$/,
          msg: 'Upvotes muse be an integer between 0 and 1'
        }
      }
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^(0||1)$/,
          msg: 'Downvotes muse be an integer between 0 and 1'
        }
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^(0||1)$/,
          msg: 'Likes muse be an integer between 0 and 1'
        }
      }
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^(0||1)$/,
          msg: 'Dislikes muse be an integer between 0 and 1'
        }
      }
    }
  });

  RecipeVote.prototype.handleVotes = function manageVotes(opts) {
    const { upVotes, downVotes } = this;
    let upvotes = upVotes;
    let downvotes = downVotes;
    if (opts.upVotes) {
      downvotes = (downVotes === 1) ? upVotes : downVotes;
      upvotes = (upVotes === 1) ? 0 : 1;
    }
    if (opts.downVotes) {
      upvotes = (upVotes === 1) ? downVotes : upVotes;
      downvotes = (downVotes === 1) ? 0 : 1;
    }
    return {
      upvotes,
      downvotes
    };
  };

  RecipeVote.prototype.handleLikes = function manageLikes(opts) {
    const { likes, dislikes } = this;
    let like = likes;
    let dislike = dislikes;
    if (opts.likes) {
      dislike = (dislikes === 1) ? likes : dislikes;
      like = (likes === 1) ? 0 : 1;
    }
    if (opts.dislikes) {
      like = (likes === 1) ? dislikes : likes;
      dislike = (dislikes === 1) ? 0 : 1;
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