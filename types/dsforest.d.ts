declare namespace disjointSet {
  export interface Constructor {
    new <T = any, U = T>(idAccessorFn?: (value: T) => U): Instance<T, U>;
  }

  export interface Instance<T, U> {
    readonly forestElements: number;
    readonly forestSets: number;
    areConnected(x: T, y: T): boolean;
    clear(): this;
    findSet(value: T): T | undefined;
    getId(value: T): U | undefined;
    includes(value: T): boolean;
    isEmpty(): boolean;
    isRepresentative(value: T): boolean;
    isSingleton(value: T): boolean;
    makeSet(value: T): this;
    setSize(value: T): number;
    union(x: T, y: T): this;
  }
}

declare namespace dsforest {
  export interface DisjointSet<T = any, U = T>
    extends disjointSet.Instance<T, U> {}
}

declare const dsforest: {
  DisjointSet: disjointSet.Constructor;
};

export = dsforest;
