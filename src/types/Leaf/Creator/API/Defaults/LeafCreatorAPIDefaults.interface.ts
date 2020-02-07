import LeafStandardAction from "../../../../Actions/LSA";
import Dict from "../../../../Dict";

export interface LeafCreatorAPIUniversal {
  clear: (toNull?: boolean) => LeafStandardAction
  // apply: (callback: (leafState: any, treeState: any) => any) => LeafStandardAction,
  reset: () => LeafStandardAction
  // update: (newVal: any) => LeafStandardAction
}

export interface LeafCreatorAPIArray<TS extends Dict<any> = Dict<any>, E = any, LS = E[]> {
  apply: <O = E>(callback: (leafState: E[], treeState: TS) => O[]) => LeafStandardAction
  concat: (array: E[]) => LeafStandardAction
  drop: (n?: number) => LeafStandardAction
  filter: <O = E>(callback: (element: E, index: number, array: E[]) => O[]) => LeafStandardAction
  push: (element: E, index?: number, replace?: boolean) => LeafStandardAction
  update: (newVal: E) => LeafStandardAction
}

export interface LeafCreatorAPIBoolean<TS extends Dict<any> = Dict<any>> {
  apply: (callback: (leafState: boolean, treeState: TS) => boolean) => LeafStandardAction
  off: () => LeafStandardAction
  on: () => LeafStandardAction
  toggle: () => LeafStandardAction
  update: (newVal: boolean) => LeafStandardAction
}

export interface LeafCreatorAPINumber<TS extends Dict<any> = Dict<any>> {
  apply: (callback: (leafState: number, treeState: TS) => number) => LeafStandardAction
  increment: (n?: number) => LeafStandardAction
  update: (newVal: number) => LeafStandardAction
}

export interface LeafCreatorAPIObject<TS extends Dict<any> = Dict<any>, LS = any> {
  apply: (callback: (leafState: LS, treeState: TS) => LS) => LeafStandardAction
  assign: (sourceObject: Partial<LS>) => LeafStandardAction
  path: (path: (string | number)[], value: any) => LeafStandardAction
  pushedSet: (value: any) => LeafStandardAction
  set: (key: string, value: any) => LeafStandardAction
  update: (newVal: LS) => LeafStandardAction
}

export interface LeafCreatorAPIString<TS extends Dict<any> = Dict<any>, LS extends string = string> {
  apply: (callback: (leafState: LS, treeState: TS) => LS) => LeafStandardAction
  update: (newVal: LS) => LeafStandardAction
}

type LeafCreatorAPIDefaults<TS extends Dict<any> = Dict<any>, LS = any> = 
  LS extends Array<infer E> ? LeafCreatorAPIUniversal & LeafCreatorAPIArray<TS, E>
    : LS extends boolean ? LeafCreatorAPIUniversal & LeafCreatorAPIBoolean<TS>
    : LS extends number ? LeafCreatorAPIUniversal & LeafCreatorAPINumber<TS>
    : LS extends string ? LeafCreatorAPIUniversal & LeafCreatorAPIString<TS, LS>
    : LS extends {} ? LeafCreatorAPIUniversal & LeafCreatorAPIObject<TS, LS>
    : LeafCreatorAPIUniversal
      & LeafCreatorAPIArray<TS>
      & LeafCreatorAPIBoolean<TS>
      & LeafCreatorAPINumber<TS>
      & LeafCreatorAPIString<TS>
      & LeafCreatorAPIObject<TS>

// interface LeafCreatorAPIDefaults {
//   apply: (callback: (leafState: any, treeState: any) => any) => LeafStandardAction,
//   assign: (...sources: object[]) => LeafStandardAction,
//   clear: (toNull?: boolean) => LeafStandardAction,
//   concat: (arrayOrString: any[] | string) => LeafStandardAction,
//   drop: (n?: number) => LeafStandardAction,
//   filter: (callback: (element: any, index: number, array: any[]) => any[]) => LeafStandardAction,
//   increment: (n?: number) => LeafStandardAction
//   off: () => LeafStandardAction,
//   on: () => LeafStandardAction,
//   path: (path: (string | number)[], value: any) => LeafStandardAction,
//   push: (element: any, index?: number, replace?: boolean) => LeafStandardAction,
//   pushedSet: (value: any) => LeafStandardAction,
//   // replace: (pattern: string | RegExp, replacement: string) => LeafStandardAction,
//   reset: () => LeafStandardAction,
//   set: (key: string, value: any) => LeafStandardAction,
//   toggle: () => LeafStandardAction,
//   update: (newVal: any) => LeafStandardAction
// }

export default LeafCreatorAPIDefaults