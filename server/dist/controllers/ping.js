'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dummyData = require('../helpers/dummyData');

var _middlewares = require('../middlewares');

/**
 * function
 * @param { object } req
 * @param { object } res
 * @returns { promise } res
 */
exports.default = function (req, res) {
  var inst = new _middlewares.OrderReviews();
  return res.status(200).send(inst.structure(_dummyData.userReviews));
};