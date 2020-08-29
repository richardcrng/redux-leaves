import { LSAwP, LSA } from "../types";

export enum NumberCreatorKeys {
  INCREMENT = 'INCREMENT'
}

export type NumberCreators<L extends number = number, T = unknown> = {
  increment(n?: number): LSAwP<number | undefined, NumberCreatorKeys.INCREMENT>
}

export type NumberActions<K extends keyof NumberCreators, L extends number = number, T = unknown> = ReturnType<NumberCreators<L>[K]>

export function isIncrementAction(action: LSA): action is NumberActions<'increment'> {
  return action.leaf.CREATOR_KEY === NumberCreatorKeys.INCREMENT
}