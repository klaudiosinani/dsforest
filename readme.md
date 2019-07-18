<h1 align="center">
  Dsforest
</h1>

<h4 align="center">
  Disjoint-set forests for ES6
</h4>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/dsforest">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/dsforest.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/klaussinani/dsforest?branch=master'>
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/klaussinani/dsforest/badge.svg?branch=master">
  </a>
</p>

## Description

ES6 implementation of the disjoint-set forest data structure with TypeScript support.

Visit the [contributing guidelines](https://github.com/klaussinani/dsforest/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [In Depth](#in-depth)
- [Usage](#usage)
- [API](#api)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

### Yarn

```bash
yarn add dsforest
```

### NPM

```bash
npm install dsforest
```

## In Depth

A disjoint-set forest data structure, also known as union–find data structure or merge–find set, is a data structure that tracks a set of elements partitioned into several disjoint, non-overlapping subsets. It provides near-constant-time operations, bounded by the inverse Ackermann function, for the following operations:

- Add new sets
- Merge existing sets
- Determine whether elements are in the same set

This performance is achieved through the combined usage of the **union by rank** and **path compression** heuristics, which enable the disjoint-set forest to become an asymptotically optimal data structure.

Every disjoint-set forest consists of a number of elements, where to each element corresponds a unique id, a parent pointer, and a rank value. The parent pointers of the elements are arranged to form one or more trees, each representing a set. If an element's parent pointer points to the element itself, then the element is the root of its tree, thus the representative member of its set. Also, the elements that do not point to themselves, are part of the set identified by following the chain of parent pointers upwards, know as find-path, until a representative element is reached, at the root of the tree.

Dsforest disjoint-set forests are represented compactly in memory through associative arrays, composed of **(childID, parentValue)** key-value pairs, where each parent element (value) is indicated by its unique child's id (key). By default, the `identity` function (`x => x`) is used to map element values to their unique ids, though a custom id generating function can be provided as argument upon `DisjointSet` class instantiation.

## Usage

Dsforest exposes a chainable API, that can be utilized through a simple and minimal syntax, allowing you to combine methods effectively.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/dsforest/tree/master/test) directory.

```js
'use strict';
const {DisjointSet} = require('dsforest');

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

// Custom function expression to map each color element to exactly one unique id
const idAccessorFn = color => color.name;

const set = new DisjointSet(idAccessorFn);
//=> DisjointSet { parent: { } }

set.isEmpty();
//=> true

set
  .makeSet(colors.red)
  .makeSet(colors.black)
  .makeSet(colors.white)
  .makeSet(colors.green)
  .makeSet(colors.blue);
//=> DisjointSet { parent: {
//  red: { name: 'red', hex: '#FF0000' },
//  black: { name: 'black', hex: '#000000' },
//  white: { name: 'white', hex: '#FFFFFF' },
//  green: { name: 'green', hex: '#00FF00' },
//  blue: { name: 'blue', hex: '#0000FF' } }
// }

set.forestElements;
//=> 5

set.forestSets;
//=> 5

set.areConnected(colors.red, colors.black);
//=> false

set.union(colors.red, colors.white);
//=> DisjointSet { parent: {
//  red: { name: 'red', hex: '#FF0000' },
//  black: { name: 'black', hex: '#000000' },
//  white: { name: 'red', hex: '#FF0000' },
//  green: { name: 'green', hex: '#00FF00' },
//  blue: { name: 'blue', hex: '#0000FF' } }
// }

set.findSet(colors.white);
//=> { name: 'red', hex: '#FF0000' }

set.isSingleton(colors.black);
//=> true

set.setSize(colors.white);
//=> 2

set.union(colors.white, colors.blue);
//=> DisjointSet { parent: {
//  red: { name: 'red', hex: '#FF0000' },
//  black: { name: 'black', hex: '#000000' },
//  white: { name: 'red', hex: '#FF0000' },
//  green: { name: 'green', hex: '#00FF00' },
//  blue: { name: 'red', hex: '#FF0000' } }
// }

set.isRepresentative(colors.blue);
//=> false

set.includes(colors.yellow);
//=> false

set.findSet(colors.yellow);
//=> undefined

set.union(colors.black, colors.green);
//=> DisjointSet { parent: {
//  red: { name: 'red', hex: '#FF0000' },
//  black: { name: 'black', hex: '#000000' },
//  white: { name: 'red', hex: '#FF0000' },
//  green: { name: 'black', hex: '#000000' },
//  blue: { name: 'red', hex: '#FF0000' } }
// }

set.forestSets;
//=> 2

set.getId(colors.green);
//=> green
```

## API

#### set.`forestElements`

- Return Type: `Number`

Returns the number of elements residing in the disjoint-sets of the forest.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30 } }
set.forestElements;
//=> 3
```

#### set.`forestSets`

- Return Type: `Number`

Returns the number of disjoint-sets in the forest.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30 } }
set.forestSets;
//=> 3
set.union(10, 20);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 10,
//   30: 30 } }
set.forestSets;
//=> 2
```

#### set.`areConnected(x, y)`

- Return Type: `DisjointSet`

Determines whether the two given elements `x` and `y` belong to the same disjoint-set/tree, returning `true` or `false` as appropriate.

##### **`x`**

- Type: `Any`

Disjoint-set forest element.

##### **`y`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30 } }
set.areConnected(10, 20);
//=> false
set.union(10, 20);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 10,
//   30: 30 } }
set.areConnected(10, 20);
//=> true
```

#### set.`clear()`

- Return Type: `DisjointSet`

Mutates the disjoint-set forest by removing all residing elements and sets, returning it completely empty.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.forestElements;
//=> 4
set.forestSets;
//=> 4
set.union(10, 40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 10 } }
set.forestElements;
//=> 4
set.forestSets;
//=> 3
set.clear();
//=> DisjointSet { parent: { } }
set.forestElements;
//=> 0
set.forestSets;
//=> 0
```

#### set.`findSet(value)`

- Return Type: `Any | undefined`

Returns the representative element/root of the disjoint-set/tree that element `value` is part of. If the given element is not part of any set/tree, then `undefined` is returned. The method uses the **path compression** heuristic which mutates the parent pointer of each element, part of the find-path, by making it point directly to the set-representative/root.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.findSet(10);
//=> 10
set.union(40, 10);
//=> DisjointSet { parent: {
//   10: 40,
//   20: 20,
//   30: 30
//   40: 10 } }
set.findSet(10);
//=> 40
set.findSet(50);
//=> undefined
```

#### set.`getId(value)`

- Return Type: `Any | undefined`

Returns the unique id that the given `value` element corresponds to and which is used as a key to point to the parent element of `value` in the parent associative array. If the given value element is not part of any disjoint-set, then `undefined` is returned.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.getId(10);
//=> 10
set.getId(50);
//=> undefined
```

#### set.`includes(value)`

- Return Type: `Boolean`

Determines whether the given element `value` is part of a set, returning `true` or `false` as appropriate.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.includes(100);
//=> false
set.includes(20);
//=> true
```

#### set.`isEmpty()`

- Return Type: `Boolean`

Determines whether the disjoint-set forest is empty, returning `true` or `false` as appropriate.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set.isEmpty();
//=> true

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.isEmpty();
//=> false
```

#### set.`isRepresentative(value)`

- Return Type: `Boolean`

Determines whether the given element `value` is the representative element/root of its disjoint-set/tree, returning `true` or `false` as appropriate.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.isRepresentative(50);
//=> false
set.isRepresentative(40);
//=> true
set.union(10, 40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 10 } }
set.isRepresentative(40);
//=> false
set.isRepresentative(10);
//=> true
```

#### set.`isSingleton(value)`

- Return Type: `Boolean`

Determines whether the given element `value` is part of a singleton set/tree, a set of size `1` with `value` as its representative element/root, returning `true` or `false` as appropriate.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.isSingleton(50);
//=> false
set.isSingleton(40);
//=> true
set.union(10, 40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 10 } }
set.isSingleton(40);
//=> false
```

#### set.`makeSet(value)`

- Return Type: `DisjointSet`

Mutates the disjoint-set forest by creating a new singleton set/tree containing the element `value` with a rank of `0`, a parent pointer to itself indicating that the element is the representative member/root of its own set and a corresponding unique id. Returns the disjoint-set forest itself.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set.makeSet(10);
//=> DisjointSet { parent: { 10: 10 } }
set.forestElements;
//=> 1
set
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.forestElements;
//=> 4
```

#### set.`setSize(value)`

- Return Type: `Number`

Returns the size of the disjoint-set that the given element `value` is a member of. If the value is not part of any set, then `0` is returned.

##### **`value`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40 } }
set.setSize(10);
//=> 1
set.setSize(50);
//=> 0
set.union(10, 40);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 10 } }
set.setSize(40);
//=> 2
```

#### set.`union(n)`

- Return Type: `DisjointSet`

Determines the set representatives/roots of the given `x` and `y` elements, and if they are distinct, the sets/trees that `x` and `y` belong to are merged by updating the parent pointer of the set-representative/root with the lower rank to point to the set-representative/root with the higher rank. If instead, the representatives/roots have equal ranks, the set-representative/root of element `x` is chosen **by default** as the parent of the `y` element representative/root, while its rank is also incremented. Returns the disjoint-set forest itself. 

##### **`x`**

- Type: `Any`

Disjoint-set forest element.

##### **`y`**

- Type: `Any`

Disjoint-set forest element.

```js
const {DisjointSet} = require('dsforest');

const set = new DisjointSet();

set
  .makeSet(10)
  .makeSet(20)
  .makeSet(30)
  .makeSet(40)
  .makeSet(50);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 20,
//   30: 30
//   40: 40
//   50: 50 } }
set.union(10, 20);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 10,
//   30: 30
//   40: 40
//   50: 50 } }
set.findSet(20);
//=> 10
set.isRepresentative(10);
//=> true
set.union(40, 30);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 10,
//   30: 40
//   40: 40
//   50: 50 } }
set.findSet(30);
//=> 40
set.isRepresentative(40);
//=> true
set.union(30, 50);
//=> DisjointSet { parent: {
//   10: 10,
//   20: 10,
//   30: 40
//   40: 40
//   50: 40 } }
set.findSet(50);
//=> 40
set.setSize(30);
//=> 3
set.setSize(20);
//=> 2
set.union(20, 50);
//=> DisjointSet { parent: {
//   10: 40,
//   20: 40,
//   30: 40
//   40: 40
//   50: 40 } }
set.findSet(10);
//=> 40
set.forestSets;
//=> 1
```

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/dsforest/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd dsforest`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [avlbinstree](https://github.com/klaussinani/avlbinstree) - AVL self-balancing binary search trees for ES6
- [binstree](https://github.com/klaussinani/binstree) - Binary search trees for ES6
- [doublie](https://github.com/klaussinani/doublie) - Doubly circular & linear linked lists for ES6
- [kiu](https://github.com/klaussinani/kiu) - FIFO Queues for ES6
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/dsforest/blob/master/license.md)
