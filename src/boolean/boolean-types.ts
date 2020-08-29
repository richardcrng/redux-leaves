import { LSAwP, LSA } from "../types";

export enum BooleanCreatorKeys {
  OFF = 'OFF',
  ON = 'ON'
}

export type BooleanCreators<LeafT extends boolean = boolean, TreeT = unknown> = {
  off(): LSA<BooleanCreatorKeys.OFF>,
  on(): LSA<BooleanCreatorKeys.ON>
}

export type BooleanActions<
  KeyT extends keyof BooleanCreators,
  LeafT extends boolean = boolean,
  TreeT = unknown
> = ReturnType<BooleanCreators<LeafT, TreeT>[KeyT]>


export function isOffAction(action: LSA): action is BooleanActions<'off'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.OFF
}

export function isOnAction(action: LSA): action is BooleanActions<'on'> {
  return action.leaf.CREATOR_KEY === BooleanCreatorKeys.ON
}