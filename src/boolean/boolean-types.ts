import { LSAWithPayload, LeafStandardAction } from "../types";

export enum BooleanCreatorKeys {
  OFF = 'OFF'
}

export type BooleanCreators<L extends boolean = boolean, T = unknown> = {
  off(): LeafStandardAction<BooleanCreatorKeys.OFF>
}

export type BooleanActions<K extends keyof BooleanCreators, L extends boolean = boolean, T = unknown> = ReturnType<BooleanCreators<L>[K]>


export function isOffAction(action: LeafStandardAction): action is BooleanActions<'off'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.OFF
}