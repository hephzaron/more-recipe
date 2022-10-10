"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fetchOneUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _toolkit = require("@reduxjs/toolkit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-shadow */
_dotenv["default"].config();

var SERVER_URL = process.env.SERVER_URL;
/**
 * Get one user
 * @description Get a user from server
 * @param {integer} id - user id
 * @returns { promise } -Axios http response
 */

var fetchOneUser = (0, _toolkit.createAsyncThunk)('users/fetchOneUserStatus', function _callee(_ref) {
  var id, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = _ref.id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/users/").concat(id)));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", Promise.reject(_context.t0.response.data));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
exports.fetchOneUser = fetchOneUser;
var _default = {};
exports["default"] = _default;