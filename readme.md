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

Come over to [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

Visit the [contributing guidelines](https://github.com/klaussinani/dsforest/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [In Depth](#in-depth)
- [Usage](#usage)
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

A disjoint-set forest data structure, also known as union–find data structure or merge–find set, is a data structure that tracks a set of elements partitioned into a number of disjoint, non-overlapping subsets. It provides near-constant-time operations, bounded by the inverse Ackermann function, for the following operations:

- Add new sets
- Merge existing sets
- Determine whether elements are in the same set

This performance is achieved through the combined usage of the **union by rank** and **path compression** heuristics, which enable the disjoint-set forest to become an asymptotically optimal data structure.

Every disjoint-set forest consists of a number of elements, where each to element corresponds to a unique id, a parent pointer and a rank value. The parent pointers of elements are arranged to form one or more trees, each representing a set. If an element's parent pointer points to itself, then the element is the root of a tree, thus the representative member of its set. Also, elements that do not point to themselves, are part of the set identified by following the chain of parent pointers upwards until a representative element is reached, at the root of the tree.

Dsforest disjoint-set forests are represented compactly in memory through associative arrays, composed of `(childID, parentValue)` key-value pairs, where each parent element (value) is indicated by its unique child's id (key). By default, the `identity` function `x => x` is used to map element values to their unique ids, though a custom id generating function can be provided as argument on `DisjointSet` class instantiation.

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
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/dsforest/blob/master/license.md)
