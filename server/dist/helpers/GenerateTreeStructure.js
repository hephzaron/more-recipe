'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Node
 * @param { data } data
 * @returns { object } data
 */
function Node(data) {
  this.data = data;
  this.children = [];
}

/**
 * @class Tree
 */

var Tree = function () {
  /**
   * @constructor
   * @memberof Tree
   * @description Creates an instance of recipe review tree
   * @returns { object } reviews
   */
  function Tree() {
    (0, _classCallCheck3.default)(this, Tree);

    this.root = null;
  }

  /**
   * Add children to parent node
   * @method add
   * @memberof Tree
   * @param { object } data
   * @param { object } toNodeData
   * @returns {object} node
   */


  (0, _createClass3.default)(Tree, [{
    key: 'add',
    value: function add(data, toNodeData) {
      var node = new Node(data);
      var parent = toNodeData ? this.findBFS(toNodeData) : null;
      if (parent) {
        parent.children.push(node);
      } else {
        if (!this.root) {
          this.root = node;
        }
        return 'Root node is already assigned';
      }
    }

    /**
     * Finds node to to add data to using BFS
     * @param { object } data
     * @returns { object } node
     */

  }, {
    key: 'findBFS',
    value: function findBFS(data) {
      var queue = [this.root];
      while (queue.length) {
        var node = queue.shift();
        if (_lodash2.default.isEqual(node.data, data)) {
          return node;
        }
        node.children.map(function (child) {
          return queue.push(child);
        });
      }
      return null;
    }
  }]);
  return Tree;
}();

exports.default = Tree;