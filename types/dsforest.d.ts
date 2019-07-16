declare namespace disjointSet {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    readonly forestElements: number;
    readonly forestSets: number;
    areConnected(x: T, y: T): boolean;
    findSet(value: T): T | undefined;
    includes(value: T): boolean;
    isEmpty(): boolean;
    isSingleton(value: T): boolean;
    makeSet(value: T): this;
    setSize(value: T): number;
  }
}

declare namespace dsforest {
  export interface DisjointSet<T = any> extends disjointSet.Instance<T> {}
}

declare const dsforest: {
  DisjointSet: disjointSet.Constructor;
};

export = dsforest;
