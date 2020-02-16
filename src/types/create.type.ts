import { LeafStandardAction } from "./action.type";

interface LeafCreatorAPIDefaults<LS = any, TS = any> {
  assign: DefaultCreators.Assign<LS>,
  clear: DefaultCreators.Clear,
  concat: DefaultCreators.Concat<LS>,
  do: (callback: (leafState: LS, treeState: TS) => any) => LeafStandardAction,
  drop: (n?: number) => LeafStandardAction,
  filter: (callback: (element: any, index: number, array: any[]) => any[]) => LeafStandardAction,
  increment: (n?: number) => LeafStandardAction
  off: () => LeafStandardAction,
  on: () => LeafStandardAction,
  path: (path: (string | number)[], value: any) => LeafStandardAction,
  push: (element: any, index?: number, replace?: boolean) => LeafStandardAction,
  pushedSet: (value: any) => LeafStandardAction,
  // replace: (pattern: string | RegExp, replacement: string) => LeafStandardAction,
  reset: () => LeafStandardAction,
  set: (key: string, value: LS) => LeafStandardAction,
  toggle: () => LeafStandardAction,
  update: (newVal: LS) => LeafStandardAction
}

namespace DefaultCreators {
  export type Assign<T = object> = (...sources: T[]) => LeafStandardAction <T[]>

  export type Clear = (toNull?: boolean) => LeafStandardAction<boolean>

  export type Concat<LS> = LS extends string
    ? (string: string) => LeafStandardAction<string>
    : LS extends any[] | []
    ? (arr: LS) => LeafStandardAction<LS>
    : (arrayOrString: any[] | string) => LeafStandardAction<any[] | string>
} 

