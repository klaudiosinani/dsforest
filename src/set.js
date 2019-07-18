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

  areConnected(x, y) {
    if (!this.includes(x) || !this.includes(y)) {
      return false;
    }

    return this._findSet(x) === this._findSet(y);
  }

  clear() {
    this._parent = {};
    this._rank = {};
    this._size = {};
    this._sets = 0;
    return this;
  }

  findSet(value) {
    if (this.includes(value)) {
      return this._findSet(value);
    }

    return undefined;
  }

  getId(value) {
    if (!this.includes(value)) {
      return undefined;
    }

    return this._idAccessorFn(value);
  }

  includes(value) {
    return Object.prototype.hasOwnProperty.call(this._parent, this._idAccessorFn(value));
  }

  isEmpty() {
    return this.forestElements === 0;
  }

  isRepresentative(value) {
    if (!this.includes(value)) {
      return false;
    }

    return this._parent[this._idAccessorFn(value)] === value;
  }

  isSingleton(value) {
    return this._size[this._idAccessorFn(value)] === 1;
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

  setSize(value) {
    if (!this.includes(value)) {
      return 0;
    }

    return this._size[this._idAccessorFn(this._findSet(value))];
  }

  union(x, y) {
    if (this.includes(x) && this.includes(y)) {
      let xRep = this._findSet(x);
      let yRep = this._findSet(y);

      if (xRep !== yRep) {
        let xRepId = this._idAccessorFn(xRep);
        let yRepId = this._idAccessorFn(yRep);
        const rankDiff = this._rank[xRepId] - this._rank[yRepId];

        if (rankDiff === 0) {
          this._rank[xRepId] += 1;
        } else if (rankDiff < 0) {
          [xRep, yRep] = [yRep, xRep];
          [xRepId, yRepId] = [yRepId, xRepId];
        }

        this._parent[yRepId] = xRep;
        this._size[xRepId] += this._size[yRepId];
        delete this._size[yRepId];
        this._sets -= 1;
      }
    }

    return this;
  }
}

module.exports = DisjointSet;
