import { LSAwP, LSA } from "../types";

export enum StringCreatorKeys {
  CONCAT = 'CONCAT'
}

export type StringCreators<
  LeafT extends string = string,
  TreeT = unknown
> = {
  concat(str: string): LSAwP<string>
}

export type StringActions<
  KeyT extends keyof StringCreators,
  LeafT extends string = string,
  TreeT = unknown
> = ReturnType<StringCreators<LeafT, TreeT>[KeyT]>

export function isConcatActionString(action: LSA): action is StringActions<'concat'> {
  return action.leaf.CREATOR_KEY === StringCreatorKeys.CONCAT
}