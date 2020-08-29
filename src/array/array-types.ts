import { LSA, LSAwP } from "../types";
import { Unpacked } from "../types/util-types";

export enum ArrayCreatorKeys {
  CONCAT = 'CONCAT',
  DROP = 'DROP',
  FILTER = 'FILTER',
  PUSH = 'PUSH'
}

export type ArrayCreators<
  LeafT extends unknown[],
  TreeT = unknown
> = {
  concat(arr: LeafT): LSAwP<LeafT>
  drop(n?: number): LSAwP<number | undefined>
  filter(cb: FilterCallback<Unpacked<LeafT>>): LSAwP<FilterCallback<Unpacked<LeafT>>>,
  push(element: Unpacked<LeafT>, index?: number, replace?: boolean): LSAwP<{ element: Unpacked<LeafT>, index?: number, replace?: boolean }>
}

type FilterCallback<E> = (element: E, index: number, source: E[]) => boolean

export type ArrayActions<
  KeyT extends keyof ArrayCreators<LeafT>,
  LeafT extends unknown[] = unknown[],
  TreeT = unknown
> = ReturnType<ArrayCreators<LeafT, TreeT>[KeyT]>

export function isDropAction(action: LSA): action is ArrayActions<'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}

export function isConcatActionArray<LeafT extends unknown[]>(action: LSA): action is ArrayActions<'concat', LeafT, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.CONCAT
}

export function isFilterAction<LeafT extends unknown[]>(action: LSA): action is ArrayActions<'filter', LeafT, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.FILTER
}

export function isPushAction<LeafT extends unknown[]>(action: LSA): action is ArrayActions<'push', LeafT, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.PUSH
}