declare namespace disjointSet {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    includes(value: T): boolean;
  }
}

declare namespace dsforest {
  export interface DisjointSet<T = any> extends disjointSet.Instance<T> {}
}

declare const dsforest: {
  DisjointSet: disjointSet.Constructor;
};

export = dsforest;
