import { LSAWithPayload, LeafStandardAction } from "../types";

export enum ArrayCreatorKeys {
  DROP = 'DROP'
}

export type ArrayCreators<S = unknown, T = unknown> = {
  drop(n?: number): LSAWithPayload<number | undefined, ArrayCreatorKeys.DROP>
}

export type ArrayActions<K extends keyof ArrayCreators> = ReturnType<ArrayCreators[K]>

export function isDropAction(action: LeafStandardAction): action is ArrayActions<'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}