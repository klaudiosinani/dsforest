'use strict';
const test = require('ava');
const {DisjointSet} = require('../.');

test('forestElements', t => {
  const set = new DisjointSet();
  t.is(set.forestElements, 0);
});

test('forestSets', t => {
  const set = new DisjointSet();
  t.is(set.forestSets, 0);
});

test('areConnected', t => {
  const set = new DisjointSet();
  t.false(set.areConnected(10, 20));
});

test('clear', t => {
  const set = new DisjointSet();
  t.deepEqual(set.clear(), set);
  t.is(set.forestSets, 0);
  t.is(set.forestElements, 0);
});

test('findSet', t => {
  const set = new DisjointSet();
  t.is(set.findSet(50), undefined);
});

test('getId', t => {
  const set = new DisjointSet();
  t.is(set.getId(50), undefined);
});

test('includes', t => {
  const set = new DisjointSet();
  t.false(set.includes(50));
});

test('isEmpty', t => {
  const set = new DisjointSet();
  t.true(set.isEmpty());
});

test('isRepresentative', t => {
  const set = new DisjointSet();
  t.false(set.isRepresentative(50));
});

test('isSingleton', t => {
  const set = new DisjointSet();
  t.false(set.isSingleton(50));
});

test('setSize', t => {
  const set = new DisjointSet();
  t.is(set.setSize(50), 0);
});

test('union', t => {
  const set = new DisjointSet();
  t.deepEqual(set.union(10, 50), set);
  t.is(set.forestSets, 0);
  t.is(set.forestElements, 0);
});
