import { ActionWithPayload, Action } from "../types";

export enum BooleanCreatorKeys {
  OFF = 'OFF',
  ON = 'ON',
  TOGGLE = 'TOGGLE'
}

export type BooleanCreators<LeafT extends boolean = boolean, TreeT = unknown> = {
  off(): Action,
  on(): Action,
  toggle(): Action
}

export type BooleanActions<
  KeyT extends keyof BooleanCreators,
  LeafT extends boolean = boolean,
  TreeT = unknown
> = ReturnType<BooleanCreators<LeafT, TreeT>[KeyT]>


export function isOffAction(action: Action): action is BooleanActions<'off'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.OFF
}

export function isOnAction(action: Action): action is BooleanActions<'on'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.ON
}

export function isToggleAction(action: Action): action is BooleanActions<'toggle'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.TOGGLE
}