export type Dict<V, K extends keyof any = string> = Record<K, V>

export type Definitions<V, K extends ReadonlyArray<unknown>> = 
  K extends ReadonlyArray<infer E>
    ? E extends string ? Record<E, V> : { [key: string]: V }
    : { [key: string]: V }