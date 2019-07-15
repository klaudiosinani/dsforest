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

  get forestSize() {
    return this._sets;
  }

  includes(value) {
    return Object.prototype.hasOwnProperty.call(this._parent, this._idAccessorFn(value));
  }

  makeSet(value) {
    if (!this.includes(value)) {
      const id = this._idAccessorFn(value);
      this._parent[id] = value;
      this._rank[id] = 0;
      this._size[id] = 1;
      this._sets += 1;
    }

    return this;
  }
}

module.exports = DisjointSet;
