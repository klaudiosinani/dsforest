'use strict';
const test = require('ava');
const {DisjointSet} = require('../.');

const colors = {
  red: {
    name: 'red',
    hex: '#FF0000'
  },
  black: {
    name: 'black',
    hex: '#000000'
  },
  white: {
    name: 'white',
    hex: '#FFFFFF'
  },
  green: {
    name: 'green',
    hex: '#00FF00'
  },
  blue: {
    name: 'blue',
    hex: '#0000FF'
  },
  yellow: {
    name: 'yellow',
    hex: '#FFFF00'
  }
};

test('makeSet', t => {
  const set = new DisjointSet(x => x.name);
  t.deepEqual(set.makeSet(colors.red), set);
  t.deepEqual(set.makeSet(colors.black), set);
  t.deepEqual(set.makeSet(colors.white), set);
  t.deepEqual(set.makeSet(colors.green), set);
  t.deepEqual(set.makeSet(colors.blue), set);

  t.deepEqual(set._parent.red, colors.red);
  t.deepEqual(set._parent.black, colors.black);
  t.deepEqual(set._parent.white, colors.white);
  t.deepEqual(set._parent.green, colors.green);
  t.deepEqual(set._parent.blue, colors.blue);

  t.is(set._rank.red, 0);
  t.is(set._rank.black, 0);
  t.is(set._rank.white, 0);
  t.is(set._rank.green, 0);
  t.is(set._rank.blue, 0);

  t.is(set._size.red, 1);
  t.is(set._size.black, 1);
  t.is(set._size.white, 1);
  t.is(set._size.green, 1);
  t.is(set._size.blue, 1);

  t.is(set._sets, 5);
});

test('forestElements', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.is(set.forestElements, 5);
});

test('forestSets', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.is(set.forestSets, 5);
});

test('union - equal rank sets x & y', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);

  t.false(set.isSingleton(colors.red));
  t.false(set.isSingleton(colors.black));
  t.true(set.isRepresentative(colors.red));
  t.false(set.isRepresentative(colors.black));
  t.deepEqual(set.findSet(colors.black), colors.red);
  t.deepEqual(set.findSet(colors.red), colors.red);
  t.is(set.setSize(colors.red), 2);
  t.is(set.setSize(colors.black), 2);
  t.is(set.forestSets, 4);
  t.is(set.forestElements, 5);
});

test('union - equal rank sets y & x', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.black, colors.red);

  t.false(set.isSingleton(colors.red));
  t.false(set.isSingleton(colors.black));
  t.true(set.isRepresentative(colors.black));
  t.false(set.isRepresentative(colors.red));
  t.deepEqual(set.findSet(colors.black), colors.black);
  t.deepEqual(set.findSet(colors.red), colors.black);
  t.is(set.setSize(colors.red), 2);
  t.is(set.setSize(colors.black), 2);
  t.is(set.forestSets, 4);
  t.is(set.forestElements, 5);
});

test('union - rank x greater than rank y', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);
  set.union(colors.black, colors.white);

  t.false(set.isSingleton(colors.red));
  t.false(set.isSingleton(colors.black));
  t.false(set.isSingleton(colors.white));
  t.true(set.isRepresentative(colors.red));
  t.false(set.isRepresentative(colors.black));
  t.false(set.isRepresentative(colors.white));
  t.deepEqual(set.findSet(colors.black), colors.red);
  t.deepEqual(set.findSet(colors.white), colors.red);
  t.deepEqual(set.findSet(colors.red), colors.red);
  t.is(set.setSize(colors.red), 3);
  t.is(set.setSize(colors.black), 3);
  t.is(set.setSize(colors.white), 3);
  t.is(set.forestSets, 3);
  t.is(set.forestElements, 5);
});

test('union - rank y greater than rank x', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue)
    .makeSet(colors.yellow);

  set.union(colors.blue, colors.yellow);
  set.union(colors.green, colors.white);
  set.union(colors.blue, colors.green);

  set.union(colors.red, colors.black);

  set.union(colors.red, colors.blue);

  t.false(set.isSingleton(colors.blue));
  t.false(set.isSingleton(colors.red));
  t.false(set.isSingleton(colors.green));
  t.false(set.isSingleton(colors.yellow));
  t.false(set.isSingleton(colors.black));
  t.false(set.isSingleton(colors.white));

  t.true(set.isRepresentative(colors.blue));
  t.false(set.isRepresentative(colors.red));
  t.false(set.isRepresentative(colors.green));
  t.false(set.isRepresentative(colors.yellow));
  t.false(set.isRepresentative(colors.black));
  t.false(set.isRepresentative(colors.white));

  t.deepEqual(set.findSet(colors.blue), colors.blue);
  t.deepEqual(set.findSet(colors.red), colors.blue);
  t.deepEqual(set.findSet(colors.green), colors.blue);
  t.deepEqual(set.findSet(colors.yellow), colors.blue);
  t.deepEqual(set.findSet(colors.black), colors.blue);
  t.deepEqual(set.findSet(colors.white), colors.blue);

  t.is(set.setSize(colors.blue), 6);
  t.is(set.setSize(colors.red), 6);
  t.is(set.setSize(colors.green), 6);
  t.is(set.setSize(colors.yellow), 6);
  t.is(set.setSize(colors.black), 6);
  t.is(set.setSize(colors.white), 6);

  t.is(set.forestSets, 1);
  t.is(set.forestElements, 6);
});

test('areConnected', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);
  t.true(set.areConnected(colors.red, colors.black));
  t.true(set.areConnected(colors.black, colors.red));
  t.false(set.areConnected(colors.red, colors.white));
  t.false(set.areConnected(colors.black, colors.white));
});

test('clear', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.is(set.forestSets, 5);
  t.is(set.forestElements, 5);
  t.deepEqual(set.clear(), set);
  t.is(set.forestSets, 0);
  t.is(set.forestElements, 0);
});

test('findSet', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);

  t.deepEqual(set.findSet(colors.red), colors.red);
  t.deepEqual(set.findSet(colors.black), colors.red);
  t.deepEqual(set.findSet(colors.white), colors.white);
  t.is(set.findSet(colors.yellow), undefined);
});

test('getId', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.is(set.getId(colors.blue), 'blue');
  t.is(set.getId(colors.green), 'green');
  t.is(set.getId(colors.yellow), undefined);
});

test('includes', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.true(set.includes(colors.red));
  t.true(set.includes(colors.green));
  t.false(set.includes(colors.yellow));
});

test('isEmpty', t => {
  const set = new DisjointSet(x => x.name);
  t.true(set.isEmpty());

  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  t.false(set.isEmpty());
});

test('isRepresentative', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);
  set.union(colors.black, colors.white);

  t.true(set.isRepresentative(colors.red));
  t.true(set.isRepresentative(colors.green));
  t.true(set.isRepresentative(colors.blue));
  t.false(set.isRepresentative(colors.black));
  t.false(set.isRepresentative(colors.white));
  t.false(set.isRepresentative(colors.yellow));
});

test('isSingleton', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);
  set.union(colors.black, colors.white);

  t.true(set.isSingleton(colors.blue));
  t.true(set.isSingleton(colors.green));
  t.false(set.isSingleton(colors.red));
  t.false(set.isSingleton(colors.black));
  t.false(set.isSingleton(colors.white));
  t.false(set.isSingleton(colors.yellow));
});

test('setSize', t => {
  const set = new DisjointSet(x => x.name);
  set
    .makeSet(colors.red)
    .makeSet(colors.black)
    .makeSet(colors.white)
    .makeSet(colors.green)
    .makeSet(colors.blue);

  set.union(colors.red, colors.black);
  set.union(colors.black, colors.white);

  t.is(set.setSize(colors.red), 3);
  t.is(set.setSize(colors.black), 3);
  t.is(set.setSize(colors.white), 3);
  t.is(set.setSize(colors.green), 1);
  t.is(set.setSize(colors.blue), 1);
  t.is(set.setSize(colors.yellow), 0);
});
