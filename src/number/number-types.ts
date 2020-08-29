import { LSAwP, LSA } from "../types";

export enum NumberCreatorKeys {
  INCREMENT = 'INCREMENT'
}

export type NumberCreators<
  LeafT extends number = number,
  TreeT = unknown
> = {
  increment(n?: number): LSAwP<number | undefined>
}

export type NumberActions<
  KeyT extends keyof NumberCreators,
  LeafT extends number = number,
  TreeT = unknown
> = ReturnType<NumberCreators<LeafT, TreeT>[KeyT]>

export function isIncrementAction(action: LSA): action is NumberActions<'increment'> {
  return action.leaf.CREATOR_KEY === NumberCreatorKeys.INCREMENT
}