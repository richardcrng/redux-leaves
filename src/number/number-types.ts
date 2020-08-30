import { ActionWithPayload, Action } from "../types";

export enum NumberCreatorKeys {
  INCREMENT = 'INCREMENT'
}

export type NumberCreators<
  LeafT extends number = number,
  TreeT = unknown
> = {
  increment(n?: number): ActionWithPayload<number | undefined>
}

export type NumberActions<
  KeyT extends keyof NumberCreators,
  LeafT extends number = number,
  TreeT = unknown
> = ReturnType<NumberCreators<LeafT, TreeT>[KeyT]>

export function isIncrementAction(action: Action): action is NumberActions<'increment'> {
  return action.leaf.CREATOR_KEY === NumberCreatorKeys.INCREMENT
}