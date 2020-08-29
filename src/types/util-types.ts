export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

export type Unpacked<IsArrayT> = IsArrayT extends (infer U)[] ? U : unknown;

