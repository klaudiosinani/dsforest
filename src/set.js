'use strict';

class DisjointSet {
  constructor(idAccessorFn) {
    this._parent = {};
    this._rank = {};
    this._size = {};
    this._sets = 0;
    this._idAccessorFn = idAccessorFn || this._id;
  }

  _findSet(value) {
    const id = this._idAccessorFn(value);

    if (this._parent[id] !== value) {
      this._parent[id] = this._findSet(this._parent[id]);
    }

    return this._parent[id];
  }

  _id(x) {
    return x;
  }

  get forestElements() {
    return Object.keys(this._parent).length;
  }

  get forestSets() {
    return this._sets;
  }

  findSet(value) {
    if (this.includes(value)) {
      return this._findSet(value);
    }

    return undefined;
  }

  includes(value) {
    return Object.prototype.hasOwnProperty.call(this._parent, this._idAccessorFn(value));
  }

  areConnected(x, y) {
    if (!this.includes(x) || !this.includes(y)) {
      return false;
    }

    return this._findSet(x) === this._findSet(y);
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
