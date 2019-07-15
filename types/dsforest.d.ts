declare namespace disjointSet {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    readonly forestElements: number;
    readonly forestSets: number;
    includes(value: T): boolean;
    makeSet(value: T): this;
  }
}

declare namespace dsforest {
  export interface DisjointSet<T = any> extends disjointSet.Instance<T> {}
}

declare const dsforest: {
  DisjointSet: disjointSet.Constructor;
};

export = dsforest;
