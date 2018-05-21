import _ from 'lodash';
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
class Tree {
  /**
   * @constructor
   * @memberof Tree
   * @description Creates an instance of recipe review tree
   * @returns { object } reviews
   */
  constructor() {
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
  add(data, toNodeData) {
    const node = new Node(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;
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
  findBFS(data) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (_.isEqual(node.data, data)) {
        return node;
      }
      node.children.map(child => queue.push(child));
    }
    return null;
  }
}

export default Tree;