import { userReviews } from '../helpers/dummyData';
import { OrderReviews } from '../middlewares';

/**
 * function
 * @param { object } req
 * @param { object } res
 * @returns { promise } res
 */
export default (req, res) => {
  const inst = new OrderReviews();
  return res.status(200).send(inst.structure(userReviews));
};