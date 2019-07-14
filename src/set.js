'use strict';

class DisjointSet {
  constructor(keyAccessorFn) {
    this._parent = {};
    this._rank = {};
    this._keyAccessorFn = keyAccessorFn || this._id;
  }

  _id(x) {
    return x;
  }
}

module.exports = DisjointSet;
