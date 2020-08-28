import { LSAWithPayload, LeafStandardAction } from "../types";
import { Unpacked } from "../types/util-types";

export enum ArrayCreatorKeys {
  CONCAT = 'CONCAT',
  DROP = 'DROP',
  FILTER = 'FILTER'
}

export type ArrayCreators<L extends unknown[], T = unknown> = {
  concat(arr: L): LSAWithPayload<L, ArrayCreatorKeys.CONCAT>
  drop(n?: number): LSAWithPayload<number | undefined, ArrayCreatorKeys.DROP>
  filter(cb: FilterCallback<Unpacked<L>>): LSAWithPayload<FilterCallback<Unpacked<L>>, ArrayCreatorKeys.FILTER>
}

type FilterCallback<E> = (element: E) => boolean

export type ArrayActions<K extends keyof ArrayCreators<L>, L extends Array<E> = [], T = unknown, E = unknown> = ReturnType<ArrayCreators<L, T>[K]>

export function isDropAction(action: LeafStandardAction): action is ArrayActions<'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}

export function isConcatActionArray<L extends unknown[]>(action: LeafStandardAction): action is ArrayActions<'concat', L> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.CONCAT
}

export function isFilterAction<L extends E[], E = unknown>(action: LeafStandardAction): action is ArrayActions<'filter', L, unknown, E> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.FILTER
}