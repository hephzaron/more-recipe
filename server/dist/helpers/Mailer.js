'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

/**
 * @class Mailer
 */

var Mailer = function () {
  /**
   * @memberof Mailer
   * @description Creates an instance of Mailer
   */
  function Mailer() {
    (0, _classCallCheck3.default)(this, Mailer);
    var _process = process,
        _process$env = _process.env,
        GMAIL_USERNAME = _process$env.GMAIL_USERNAME,
        GMAIL_PASSWORD = _process$env.GMAIL_PASSWORD;

    this.transporter = _nodemailer2.default.createTransport({
      service: 'Gmail',
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD
      }
    });
  }

  /**
   * @method from
   * @memberof Mailer
   * @param {string} from
   * @returns { undefined }
   */


  (0, _createClass3.default)(Mailer, [{
    key: 'from',
    value: function from(_from) {
      this.from = _from;
    }

    /**
     * @method to
     * @memberof Mailer
     * @param {string} to
     * @returns { undefined }
     */

  }, {
    key: 'to',
    value: function to(_to) {
      this.to = _to;
    }

    /**
     * @method subject
     * @memberof Mailer
     * @param {string} subject
     * @returns { undefined }
     */

  }, {
    key: 'subject',
    value: function subject(_subject) {
      this.subject = _subject;
    }

    /**
     * @method html
     * @memberof Mailer
     * @param {string} html
     * @returns { undefined }
     */

  }, {
    key: 'html',
    value: function html(_html) {
      this.html = _html;
    }

    /**
     * @method mailParams
     * @memberof Mailer
     * @returns { object } mailParams -mailer parameters
     */

  }, {
    key: 'mailParams',
    value: function mailParams() {
      var from = this.from,
          to = this.to,
          subject = this.subject,
          html = this.html;

      return {
        from: from,
        to: to,
        subject: subject,
        html: html
      };
    }

    /**
     * @method send
     * @memberof Mailer
     * @returns {object} transporter
     */

  }, {
    key: 'send',
    value: function send() {
      return this.transporter.sendMail(this.mailParams(), function (error, info) {
        if (error) {
          return console.log(error.message);
        }
        return console.log('Message sent: %s', info.response);
      });
    }
  }]);
  return Mailer;
}();

exports.default = Mailer;