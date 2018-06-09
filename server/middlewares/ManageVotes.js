import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';

const { RecipeVote } = models;
const { handleErrors } = ErrorHandler;
/**
 * Controls and manage upVotes downVotes
 * @class ManageVotes
 */
class ManageVotes {
  /**
   * Prevents recipe creator from voting on created recipe
   * @method restrictCraetor
   * @memberof ManageVotes
   * @param { object } recipe
   * @param { number } userId
   * @returns { boolean } shouldVote
   */
  static restrictCreator(recipe, userId) {
    const shouldVote = parseInt(recipe.userId, 10) === parseInt(userId, 10);
    return {
      shouldVote: !shouldVote
    };
  }

  /**
   * Validates and control user votes
   * @method validateVotes
   * @memberof ManageVotes
   * @param { object } req -request object
   * @param { object } res -response object
   * @returns { object } voters parameter
   */
  static validateVotes(req, res) {
    const { recipeId, userId } = req.params;
    const {
      upVotes,
      downVotes,
      likes,
      dislikes
    } = req.body;
    if (upVotes && downVotes) {
      return res.status(403).send({
        message: 'You can only upVote or downVote one at a time'
      });
    }
    if (likes && dislikes) {
      return res.status(403).send({
        message: 'You can only like or dislike one at a time'
      });
    }
    return RecipeVote
      .findOne({
        where: {
          userId,
          recipeId
        }
      })
      .then((vote) => {
        if (!vote) {
          return RecipeVote
            .create({
              userId,
              recipeId,
              upVotes: upVotes ? 1 : 0,
              downVotes: downVotes ? 1 : 0,
              likes: likes ? 1 : 0,
              dislikes: dislikes ? 1 : 0
            })
            .then(userVote => res.status(200).send({
              userVote,
              message: (userVote.upVotes || userVote.downVotes) === 1 ? 'Voting successful' : ''
            }))
            .catch((error) => {
              const e = handleErrors(error);
              return res.status(e.statusCode).send({
                message: e.message
              });
            });
        }
        const { upvotes, downvotes } = vote.handleVotes({ upVotes, downVotes });
        const { like, dislike } = vote.handleLikes({ likes, dislikes });
        return vote
          .update({
            upVotes: upvotes,
            downVotes: downvotes,
            likes: like,
            dislikes: dislike
          })
          .then(userVote => res.status(200).send({
            userVote,
            message: (userVote.upVotes || userVote.downVotes) ? 'Voting successful' : ''
          }))
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      });
  }
}
export default ManageVotes;