import { LSAwP, LSA } from "../types";

export enum StringCreatorKeys {
  CONCAT = 'CONCAT'
}

export type StringCreators<L extends string = string, T = unknown> = {
  concat(str: string): LSAwP<string, StringCreatorKeys.CONCAT>
}

export type StringActions<K extends keyof StringCreators> = ReturnType<StringCreators[K]>

export function isConcatActionString(action: LSA): action is StringActions<'concat'> {
  return action.leaf.CREATOR_KEY === StringCreatorKeys.CONCAT
}