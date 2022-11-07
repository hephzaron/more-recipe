"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = require("cloudinary");

require("../config/cloudinary");

var _signImage2 = _interopRequireDefault(require("../helpers/signImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cloudName = _cloudinary.v2.config().cloud_name;

var apiKey = _cloudinary.v2.config().api_key;
/**
 * Handles Cloudinary Image verification
 * @class CloudinaryController
 * @param { null } void
 */


var CloudinaryController =
/*#__PURE__*/
function () {
  function CloudinaryController() {
    _classCallCheck(this, CloudinaryController);
  }

  _createClass(CloudinaryController, null, [{
    key: "getCloudinarySignature",

    /**
      * Gets cloudinary configuration
      * @method getCloudinarySignature
      * @memberof CloudinaryController
      * @param { object } req -request
      * @param { object } res -respone
      * @returns { object } server response
      */
    value: function getCloudinarySignature(req, res) {
      try {
        var _signImage = (0, _signImage2["default"])(),
            timestamp = _signImage.timestamp,
            signature = _signImage.signature;

        return res.status(200).send({
          signature: signature,
          timestamp: timestamp,
          cloudName: cloudName,
          apiKey: apiKey
        });
      } catch (error) {
        return res.status(400).send({
          message: error.message
        });
      }
    }
    /**
      * Delete cloudinary image
      * @method deleteCloudinaryImage
      * @memberof CloudinaryController
      * @param { object } req -request
      * @param { object } res -respone
      * @returns { object } server response
      */

  }, {
    key: "deleteCloudinaryImage",
    value: function deleteCloudinaryImage(req, res) {
      var imageName = req.query.imageName;
      return _cloudinary.v2.uploader.destroy("signed_recipe_upload/".concat(imageName), {
        invalidate: true,
        resource_type: 'image'
      }).then(function (response) {
        return res.status(200).send({
          response: response
        });
      })["catch"](function (error) {
        return res.status(400).send({
          message: error.message
        });
      });
    }
  }]);

  return CloudinaryController;
}();

var _default = CloudinaryController;
exports["default"] = _default;