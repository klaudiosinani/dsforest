'use strict';

class DisjointSet {
  constructor(idAccessorFn) {
    this._parent = [];
    this._rank = [];
    this._idAccessorFn = idAccessorFn || this._id;
  }

  _id(x) {
    return x;
  }
}

module.exports = DisjointSet;
