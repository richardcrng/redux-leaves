import { LeafStandardAction } from "./action.type";
import { LeafStandardActionCreator } from "./creator.type";

namespace DefaultCreators {
  /**
   * The default assign action creator
   * 
   * @template E - Source object shape
   */
  export type Assign<E = object> = (...sources: E[]) => LeafStandardAction <E[]>

  export type Clear = (toNull?: boolean) => LeafStandardAction<boolean>

  export type Concat<LS> = LS extends string
    ? (string: string) => LeafStandardAction<string>
    : LS extends any[] | []
    ? (arr: LS) => LeafStandardAction<LS>
    : (arrayOrString: any[] | string) => LeafStandardAction<any[] | string>

  export type Do<LS, TS> = (callback: (leafState: LS, treeState: TS) => LS) => LeafStandardAction<(leafState: LS, treeState: TS) => LS>

  export type Drop = (n?: number) => LeafStandardAction<number>

  export type Filter<T = any> = (callback: (element: T, index: number, array: T[]) => T[]) => LeafStandardAction<(element: T, index: number, array: T[]) => T[]>

  export type Increment = (n?: number) => LeafStandardAction<number>

  export type Off = () => LeafStandardAction
  export type On = () => LeafStandardAction

  export type Path<LS> = (path: (string | number)[], value: LS) => LeafStandardAction<{ path: (string | number)[], value: LS }>

  export type Push<E> = (element: E, index?: number, replace?: boolean) => LeafStandardAction<{ element: E, index?: number, replace?: boolean }>

  export type PushedSet<E> = (value: E) => LeafStandardAction<E>

  export type Reset = () => LeafStandardAction

  export type Set<LS> = (key: string, value: LS) => LeafStandardAction<{ path: [string], value: LS }>

  export type Toggle = () => LeafStandardAction

  export type Update<LS> = (newVal: LS) => LeafStandardAction<LS>
} 

export interface LeafCreatorDefaults<LS = any, TS = any> {
  assign: DefaultCreators.Assign<LS extends Array<infer E> ? E : any>,
  clear: DefaultCreators.Clear,
  concat: DefaultCreators.Concat<LS>,
  do: DefaultCreators.Do<LS, TS>,
  drop: DefaultCreators.Drop,
  filter: DefaultCreators.Filter<LS extends Array<infer E> ? E : any>,
  increment: DefaultCreators.Increment
  off: DefaultCreators.Off,
  on: DefaultCreators.On,
  path: DefaultCreators.Path<LS>,
  push: DefaultCreators.Push<LS extends Array<infer E> ? E : any>,
  pushedSet: DefaultCreators.PushedSet<LS extends Array<infer E> ? E : any>,
  // replace: (pattern: string | RegExp, replacement: string) => LeafStandardAction,
  reset: DefaultCreators.Reset,
  set: DefaultCreators.Set<LS>,
  toggle: DefaultCreators.Toggle,
  update: DefaultCreators.Update<LS>
}

export type LeafCreatorCustoms<RD extends object = any> = {
  [K in keyof RD]: LeafStandardActionCreator
}