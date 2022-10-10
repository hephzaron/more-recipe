"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.registerUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var SERVER_URL = process.env.SERVER_URL;
/**
 * @description Makes network request to create an account for user
 * @param {object} userPayload - user payload for creating a new user
 * @returns { promise } Axios http response
 */

var registerUser = (0, _toolkit.createAsyncThunk)('user/signupStatus', function _callee(userPayload) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(SERVER_URL, "/signup"), userPayload));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", Promise.reject(_context.t0.response.data));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
exports.registerUser = registerUser;
var _default = {};
exports["default"] = _default;