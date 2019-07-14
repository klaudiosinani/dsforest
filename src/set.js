'use strict';

class DisjointSet {
  constructor(idAccessorFn) {
    this._parent = {};
    this._rank = {};
    this._size = {};
    this._sets = 0;
    this._idAccessorFn = idAccessorFn || this._id;
  }

  _id(x) {
    return x;
  }

  includes(value) {
    return Object.prototype.hasOwnProperty.call(this._parent, this._idAccessorFn(value));
  }
}

module.exports = DisjointSet;
