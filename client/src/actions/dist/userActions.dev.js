"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateUser = exports.fetchOneUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _toolkit = require("@reduxjs/toolkit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          localStorage.setItem('userPayload', JSON.stringify(response.data.user));
          return _context.abrupt("return", response.data);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", Promise.reject(_context.t0.response.data));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
/**
 * @function updateUser
 * @description updates a user
 * @param {integer} userId - Id of user performing the action
 * @returns { promise } -Axios http response from the server
 */

exports.fetchOneUser = fetchOneUser;
var updateUser = (0, _toolkit.createAsyncThunk)('user/updateUserStatus', function _callee2(user) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(SERVER_URL, "/users/").concat(user.id), _objectSpread({}, user)));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", Promise.reject(_context2.t0.response.data));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
exports.updateUser = updateUser;
var _default = {};
exports["default"] = _default;