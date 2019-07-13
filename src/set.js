'use strict';

class DisjointSet {
  constructor() {
    this._parent = [];
    this._rank = [];
  }

  _id(x) {
    return x;
  }
}

module.exports = DisjointSet;
