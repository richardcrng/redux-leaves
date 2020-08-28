import { LSAWithPayload, LeafStandardAction } from "../types";

export enum ArrayCreatorKeys {
  CONCAT = 'CONCAT',
  DROP = 'DROP'
}

export type ArrayCreators<L extends unknown[] = unknown[], T = unknown> = {
  concat(arr: L): LSAWithPayload<L, ArrayCreatorKeys.CONCAT>
  drop(n?: number): LSAWithPayload<number | undefined, ArrayCreatorKeys.DROP>
}

export type ArrayActions<K extends keyof ArrayCreators, L = unknown, T = unknown> = ReturnType<ArrayCreators[K]>

export function isDropAction(action: LeafStandardAction): action is ArrayActions<'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}

export function isArrayConcatAction<L>(action: LeafStandardAction): action is ArrayActions<'concat', L> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.CONCAT
}