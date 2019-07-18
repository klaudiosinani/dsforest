'use strict';
const test = require('ava');
const {DisjointSet} = require('../.');

test('makeSet', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.deepEqual(set._parent, {10: 10});
  t.deepEqual(set._rank, {10: 0});
  t.deepEqual(set._size, {10: 1});
  t.deepEqual(set._sets, 1);
  t.deepEqual(set.makeSet(10), set);
  t.deepEqual(set._parent, {10: 10});
  t.deepEqual(set._rank, {10: 0});
  t.deepEqual(set._size, {10: 1});
  t.deepEqual(set._sets, 1);
});

test('forestElements', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.forestElements, 1);
});

test('forestSets', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.forestSets, 1);
});

test('areConnected', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.false(set.areConnected(10, 20));
});

test('clear', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.forestSets, 1);
  t.is(set.forestElements, 1);
  t.deepEqual(set.clear(), set);
  t.is(set.forestSets, 0);
  t.is(set.forestElements, 0);
});

test('findSet', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.findSet(10), 10);
  t.is(set.findSet(50), undefined);
});

test('getId', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.getId(10), 10);
  t.is(set.getId(50), undefined);
});

test('includes', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.true(set.includes(10));
  t.false(set.includes(50));
});

test('isEmpty', t => {
  const set = new DisjointSet();
  t.true(set.isEmpty());
  t.deepEqual(set.makeSet(10), set);
  t.false(set.isEmpty());
});

test('isRepresentative', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.true(set.isRepresentative(10));
  t.false(set.isRepresentative(50));
});

test('isSingleton', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.true(set.isSingleton(10));
  t.false(set.isSingleton(50));
});

test('setSize', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.is(set.setSize(10), 1);
  t.is(set.setSize(50), 0);
});

test('union', t => {
  const set = new DisjointSet();
  t.deepEqual(set.makeSet(10), set);
  t.deepEqual(set.union(10, 50), set);
  t.true(set.isSingleton(10));
  t.is(set.forestSets, 1);
  t.is(set.forestElements, 1);
  t.deepEqual(set.union(10, 10), set);
  t.true(set.isSingleton(10));
  t.is(set.forestSets, 1);
  t.is(set.forestElements, 1);
});
