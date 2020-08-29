import { LSAwP, LSA } from "../types";

export enum BooleanCreatorKeys {
  OFF = 'OFF',
  ON = 'ON'
}

export type BooleanCreators<L extends boolean = boolean, T = unknown> = {
  off(): LSA<BooleanCreatorKeys.OFF>,
  on(): LSA<BooleanCreatorKeys.ON>
}

export type BooleanActions<K extends keyof BooleanCreators, L extends boolean = boolean, T = unknown> = ReturnType<BooleanCreators<L>[K]>


export function isOffAction(action: LSA): action is BooleanActions<'off'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.OFF
}

export function isOnAction(action: LSA): action is BooleanActions<'on'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.ON
}