import { LeafStandardAction } from "./action.type";
import { LeafStandardActionCreator } from "./creator.type";
import LeafReducer from "./reducer.type";

declare namespace DefaultCreators {
  /**
   * The default assign action creator
   * 
   * @template E - Source object shape
   */
  export type Assign<E = object> = <T = E>(...sources: unknown[]) => LeafStandardAction <unknown[]>

  export type Clear = (toNull?: boolean) => LeafStandardAction<boolean>

  export type Concat<LS> =
    LS extends string
      ? (string: string) => LeafStandardAction<string>
      : LS extends any[] | []
        ? (arr: LS) => LeafStandardAction<LS>
        : <T = any[] | string>(arrayOrString:T) => LeafStandardAction<T>

  export type Do<LS, TS> = <T = LS>(callback: (leafState: T, treeState: TS) => T) => LeafStandardAction<(leafState: T, treeState: TS) => T>

  export type Drop = (n?: number) => LeafStandardAction<number>

  export type Filter<E = any> = <T = E>(callback: (element: T, index: number, array: T[]) => boolean) => LeafStandardAction<(element: T, index: number, array: T[]) => boolean>

  export type Increment = (n?: number) => LeafStandardAction<number>

  export type Off = () => LeafStandardAction
  export type On = () => LeafStandardAction

  export type Path<LS> = <T = LS>(path: (string | number)[], value: T) => LeafStandardAction<{ path: (string | number)[], value: T }>

  export type Push<E> = <T = E>(element: T, index?: number, replace?: boolean) => LeafStandardAction<{ element: Toggle, index?: number, replace?: boolean }>

  export type PushedSet<E> = <T = E>(value: T) => LeafStandardAction<T>

  export type Reset = () => LeafStandardAction

  export type Set<LS> = <T = LS>(key: string, value: T) => LeafStandardAction<{ path: [string], value: T }>

  export type Toggle = () => LeafStandardAction

  export type Update<LS> = <T = LS>(newVal: T) => LeafStandardAction<T>
} 

export interface LeafCreatorDefaults<LS = any, TS = any> {
  assign: DefaultCreators.Assign<LS extends Array<infer E> ? E : any>,
  clear: DefaultCreators.Clear,
  concat: DefaultCreators.Concat<unknown>,
  do: DefaultCreators.Do<unknown, TS>,
  drop: DefaultCreators.Drop,
  filter: DefaultCreators.Filter<unknown>,
  increment: DefaultCreators.Increment
  off: DefaultCreators.Off,
  on: DefaultCreators.On,
  path: DefaultCreators.Path<unknown>,
  push: DefaultCreators.Push<unknown>,
  pushedSet: DefaultCreators.PushedSet<LS extends Array<infer E> ? E : any>,
  // replace: (pattern: string | RegExp, replacement: string) => LeafStandardAction,
  reset: DefaultCreators.Reset,
  set: DefaultCreators.Set<unknown>,
  toggle: DefaultCreators.Toggle,
  update: DefaultCreators.Update<unknown>
}

/**
 * @template LRD - LeafReducer.Definition of LeafReducer.Schemas
 */
export type LeafCreatorCustoms<LRD extends LeafReducer.Definitions> =
  LRD extends LeafReducer.Definitions<infer Schemas>
  ? {
      [K in keyof Schemas]: Schemas[K] extends LeafReducer.Schema<infer LS, infer A, infer P>
        ? LeafStandardActionCreator<A, P>
        : LeafStandardActionCreator
    }
  : LeafStandardActionCreator