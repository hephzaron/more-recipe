/**
 * Controls and manage upVotes downVotes
 * @class ManageVotes
 */
class ManageVotes {
  /**
   * Prevents recipe creator from voting on created recipe
   * @method restrictCraetor
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
   * User should vote just once
   * @param { array } votes
   * @param { object } recipe
   * @param { number } userId
   * @returns { object } canVote, message
   */
  static limitVote(votes, recipe, userId) {
    const recipeId = recipe.id;
    const userVote = votes.filter(vote =>
      vote === { recipeId, userId });
    if (!userVote || userVote.length === 0) {
      return {
        canVote: true
      };
    }
    return {
      canVote: false,
      message: 'You are only allowed to vote once'
    };
  }
}
export default ManageVotes;