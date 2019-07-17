# dsforest
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

const set = new DisjointSet(x => x.name);
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
