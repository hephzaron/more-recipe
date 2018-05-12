'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _sockets = require('../sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _expressApp = require('./expressApp');

var _expressApp2 = _interopRequireDefault(_expressApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _expressApp2.default)((0, _express2.default)());
var port = parseInt(process.env.PORT, 10) || 5000;
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);

app.set('port', port);
(0, _sockets2.default)(io);

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});

exports.default = app;