import { LSAWithPayload, LeafStandardAction } from "../types";

export enum BooleanCreatorKeys {
  OFF = 'OFF',
  ON = 'ON'
}

export type BooleanCreators<L extends boolean = boolean, T = unknown> = {
  off(): LeafStandardAction<BooleanCreatorKeys.OFF>,
  on(): LeafStandardAction<BooleanCreatorKeys.ON>
}

export type BooleanActions<K extends keyof BooleanCreators, L extends boolean = boolean, T = unknown> = ReturnType<BooleanCreators<L>[K]>


export function isOffAction(action: LeafStandardAction): action is BooleanActions<'off'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.OFF
}

export function isOnAction(action: LeafStandardAction): action is BooleanActions<'on'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.ON
}