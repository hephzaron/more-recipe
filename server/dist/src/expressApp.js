'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require('ejs');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressStaticGzip = require('express-static-gzip');

var _expressStaticGzip2 = _interopRequireDefault(_expressStaticGzip);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (expressApp) {
  expressApp.use((0, _morgan2.default)('dev'));
  expressApp.use(_bodyParser2.default.json());
  expressApp.use(_bodyParser2.default.urlencoded({
    extended: false
  }));

  expressApp.get('/api/', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to WAW-Recipe'
    });
  });

  expressApp.use((0, _expressStaticGzip2.default)(_path2.default.join(__dirname, '../client/build')));
  expressApp.use('/docs/v1', _express2.default.static(_path2.default.join(__dirname, '../docs/v1')));
  expressApp.engine('.html', _ejs.renderFile);

  expressApp.use('/api/v1', _routes2.default);
  return expressApp;
};