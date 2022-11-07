"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePhotoByName = exports.deletePhotoByToken = exports.uploadPhoto = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _toolkit = require("@reduxjs/toolkit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var SERVER_URL = process.env.SERVER_URL;
var cloudinaryName;
/**Make photo credentials available in outer scope*/

var uploadPhoto = (0, _toolkit.createAsyncThunk)('photos/uploadPhotoStatus', function _callee(_ref) {
  var photoFile, formData, cloudinaryConfig, _cloudinaryConfig$dat, apiKey, timestamp, signature, cloudName, cloudinaryUrl, Axios, uploadResponse;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          photoFile = _ref.photoFile;
          _context.prev = 1;
          formData = new FormData();
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/upload/sign")));

        case 5:
          cloudinaryConfig = _context.sent;
          _cloudinaryConfig$dat = cloudinaryConfig.data, apiKey = _cloudinaryConfig$dat.apiKey, timestamp = _cloudinaryConfig$dat.timestamp, signature = _cloudinaryConfig$dat.signature, cloudName = _cloudinaryConfig$dat.cloudName;
          cloudinaryUrl = "https://api.cloudinary.com/v1_1/".concat(cloudName, "/auto/upload");
          cloudinaryName = cloudName;
          formData.append('file', photoFile);
          formData.append('signature', signature);
          formData.append('api_key', apiKey);
          formData.append('timestamp', timestamp);
          formData.append('return_delete_token', true);
          formData.append('eager', 'c_crop,w_400,h_400,g_face|w_200,h_200,c_scale');
          formData.append('folder', 'signed_recipe_upload');
          Axios = _axios["default"].create();
          delete Axios.defaults.headers.common['authorization'];
          _context.next = 20;
          return regeneratorRuntime.awrap(Axios.post(cloudinaryUrl, formData));

        case 20:
          uploadResponse = _context.sent;
          return _context.abrupt("return", uploadResponse.data);

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", Promise.reject(_context.t0));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 24]]);
});
/**
 * deletePhotoByToken
 * @description deletes a recipe photo on failure to create recipe
 * @param { string } cloudName - cloudinary cloud_name
 * @param { string } deleteToken - delete_token of saved photo in cloudinary
 * @returns { promise } -Axios http response from the server
 */

exports.uploadPhoto = uploadPhoto;
var deletePhotoByToken = (0, _toolkit.createAsyncThunk)('photos/deletePhotoStatus', function _callee2(_ref2) {
  var deleteToken, cloudinaryUrl, Axios, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          deleteToken = _ref2.deleteToken;
          cloudinaryUrl = "https://api.cloudinary.com/v1_1/".concat(cloudinaryName, "/delete_by_token");
          Axios = _axios["default"].create();
          delete Axios.defaults.headers.common['authorization'];
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Axios.post(cloudinaryUrl, {
            token: deleteToken
          }));

        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](4);
          return _context2.abrupt("return", Promise.reject(_context2.t0));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 11]]);
});
/**
 * deletePhotoByName
 * @description deletes a photo with call to the backend
 * @param { string } imageName - Name of image
 * @returns { promise } -Axios http response from the server
 */

exports.deletePhotoByToken = deletePhotoByToken;
var deletePhotoByName = (0, _toolkit.createAsyncThunk)('photos/deletePhotoByNameStatus', function _callee3(_ref3) {
  var imageName, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          imageName = _ref3.imageName;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(SERVER_URL, "/upload/delete?imageName=").concat(imageName)));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", Promise.reject(_context3.t0));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
exports.deletePhotoByName = deletePhotoByName;