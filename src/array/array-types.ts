import { LSA, LSAwP } from "../types";
import { Unpacked } from "../types/util-types";

export enum ArrayCreatorKeys {
  CONCAT = 'CONCAT',
  DROP = 'DROP',
  FILTER = 'FILTER',
  PUSH = 'PUSH'
}

export type ArrayCreators<L extends unknown[], T = unknown> = {
  concat(arr: L): LSAwP<L, ArrayCreatorKeys.CONCAT>
  drop(n?: number): LSAwP<number | undefined, ArrayCreatorKeys.DROP>
  filter(cb: FilterCallback<Unpacked<L>>): LSAwP<FilterCallback<Unpacked<L>>, ArrayCreatorKeys.FILTER>,
  push(element: Unpacked<L>, index?: number, replace?: boolean): LSAwP<{ element: Unpacked<L>, index?: number, replace?: boolean }, ArrayCreatorKeys.PUSH>
}

type FilterCallback<E> = (element: E, index: number, source: E[]) => boolean

export type ArrayActions<K extends keyof ArrayCreators<L>, L extends unknown[] = unknown[], T = unknown> = ReturnType<ArrayCreators<L, T>[K]>

export function isDropAction(action: LSA): action is ArrayActions<'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}

export function isConcatActionArray<L extends unknown[]>(action: LSA): action is ArrayActions<'concat', L, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.CONCAT
}

export function isFilterAction<L extends unknown[]>(action: LSA): action is ArrayActions<'filter', L, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.FILTER
}

export function isPushAction<L extends unknown[]>(action: LSA): action is ArrayActions<'push', L, unknown> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.PUSH
}