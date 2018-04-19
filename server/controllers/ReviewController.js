import { Reviews as ReviewClass } from '../helpers/in-memory';

/**
 * Handles request for recipe reviews
 * @class ReviewController
 * @param { null } void
 */
class ReviewController extends ReviewClass {
  /**
   * Adds a new review to recipe
   * @method addReview
   * @memberof ReviewController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  addReview(req, res) {
    const { recipeId } = req.params;
    const {
      userId,
      description,
      imageURL
    } = req.body;

    return super.create({
      userId,
      recipeId,
      description,
      imageURL
    }).then(reviewedRecipe => res.status(201).send({
      recipe: reviewedRecipe,
      message: `You added a review to ${reviewedRecipe.name}`
    })).catch(() => res.status(500).send({
      message: 'Internal Server Error'
    }));
  }
}

export default ReviewController;