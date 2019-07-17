import { DisjointSet } from '../..';

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

type Color = { name: string; hex: string };

const set = new DisjointSet<Color, string>(x => x.name);
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
