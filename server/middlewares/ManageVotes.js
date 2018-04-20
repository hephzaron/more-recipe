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
   * @param { object } opts
   * @param { array } voters
   * @returns { object } voters parameter
   */
  static validateVotes(opts, voters) {
    const {
      upCount,
      downCount,
      upVotes,
      downVotes,
      userId,
      recipeId
    } = opts;
    const userUpVoteIndex = voters.findIndex(upvote =>
      upvote === { userId, recipeId, up: true });
    const userDownVoteIndex = voters.findIndex(downvote =>
      downvote === { userId, recipeId, up: false });

    let upVotesCount = upCount;
    let downVotesCount = downCount;
    let userVotes = voters;
    let newVoters;
    let canVote = true;
    if (upVotes) {
      if (userUpVoteIndex === -1 && userDownVoteIndex >= 0) {
        upVotesCount = upCount + 1;
        downVotesCount = downCount - 1;
        newVoters = voters.filter((voter, index) => index !== userDownVoteIndex);
        userVotes = newVoters.concat([{ userId, recipeId, up: true }]);
        canVote = true;
      } else if (userUpVoteIndex === -1 && userDownVoteIndex === -1) {
        upVotesCount = upCount + 1;
        userVotes = voters.concat([{ userId, recipeId, up: true }]);
        canVote = true;
      } else {
        canVote = false;
      }
    } else if (downVotes) {
      if (userUpVoteIndex >= 0 && userDownVoteIndex === -1) {
        upVotesCount = upCount - 1;
        downVotesCount = downCount + 1;
        newVoters = voters.filter((voter, index) => index !== userUpVoteIndex);
        userVotes = newVoters.concat([{ userId, recipeId, up: false }]);
        canVote = true;
      } else if (userUpVoteIndex === -1 && userDownVoteIndex === -1) {
        downVotesCount = downCount + 1;
        userVotes = voters.concat([{ userId, recipeId, up: false }]);
        canVote = true;
      } else {
        canVote = false;
      }
    }
    return {
      upVotesCount,
      downVotesCount,
      userVotes,
      canVote
    };
  }
}
export default ManageVotes;