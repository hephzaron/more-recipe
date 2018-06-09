import Sequelize from 'sequelize';
import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';

const { User, Recipe, Review } = models;
const { Op } = Sequelize;
/**
 * Handles Review request operations
 * @class ReviewController
 * @param { null } void
 */
class ReviewController {
  /**
   * Adds a new review
   * @memberof ReviewController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  static addReview(req, res) {
    const { recipeId } = req.params;
    const { userId, parentId } = req.body;
    return User
      .findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Non existing user cannot review recipe'
          });
        }
        return Recipe
          .findById(recipeId)
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).send({
                message: 'Recipe does not exist'
              });
            }
            return Review
              .find({
                id: parentId,
                recipeId
              })
              .then((review) => {
                if (!review) {
                  return res.status(404).send({
                    message: 'You are trying review an invalid item. Please select an item'
                  });
                }
                Review
                  .create({...req.body, recipeId }, {
                    fields: [
                      'userId',
                      'recipeId',
                      'parentId',
                      'description',
                      'imageUrl'
                    ],
                    returning: true
                  })
                  .then(newReview => res.status(201).send({
                    review: newReview,
                    message: 'You have just reviewed item'
                  }))
                  .catch((error) => {
                    const e = ErrorHandler.handleErrors(error);
                    return res.status(e.statusCode).send({
                      message: e.message
                    });
                  });
              }).catch((error) => {
                const e = ErrorHandler.handleErrors(error);
                return res.status(e.statusCode).send({
                  message: e.message
                });
              });
          }).catch((error) => {
            const e = ErrorHandler.handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      }).catch((error) => {
        const e = ErrorHandler.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Edit a Review
   * @param {object} req
   * @param {object} res
   * @returns { promise } response
   */
  static editReview(req, res) {
    const { reviewId, userId } = req.params;
    return Review
      .findById(reviewId)
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            message: 'Review does not exist'
          });
        }
        if (review.parentId === 0) {
          return res.status(403).send({
            message: 'Recipe cannot be modified here'
          });
        }
        if (review.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to modify this review. Please add your own review instead'
          });
        }
        return review
          .update(req.body, {
            fields: [
              'description',
              'imageUrl'
            ],
            returning: true
          })
          .then(updatedReview => res.status(200).send({
            updatedReview,
            message: 'Your review have been updated successfully'
          }))
          .catch((error) => {
            const e = ErrorHandler.handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      }).catch((error) => {
        const e = ErrorHandler.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Deletes a Review
   * @memberof ReviewController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  static deleteReview(req, res) {
    const { userId, reviewId } = req.params;
    return Review
      .findById(reviewId)
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            message: 'Review does not exist'
          });
        }
        if (review.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to delete this review.'
          });
        }
        if (review.parentId === 0) {
          return res.status(403).send({
            message: 'You are not allowed to delete recipe from here'
          });
        }
        return Review
          .destroy({
            where: {
              [Op.or]: [
                { id: reviewId },
                { parentId: reviewId }
              ]
            }
          }).then(() => res.status(200).send({
            message: 'Review deleted successfully'
          }))
          .catch((error) => {
            const e = ErrorHandler.handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = ErrorHandler.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default ReviewController;